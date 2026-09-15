import pandas as pd
import torch
import timm
from torchvision import transforms
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import os
import json

class SkinDataset(Dataset):
    def __init__(self, csv_file, img_dir, transform=None):
        self.df = pd.read_csv(csv_file).dropna(subset=['label'])
        unique_labels = sorted(self.df['label'].unique().tolist())
        self.label_to_id = {label: i for i, label in enumerate(unique_labels)}
        self.id_to_label = {i: label for i, label in enumerate(unique_labels)}
        
        with open('label_mapping.json', 'w') as f:
            json.dump(self.id_to_label, f)
            
        self.df['target'] = self.df['label'].map(self.label_to_id)
        self.img_dir = img_dir
        self.transform = transform

    def __len__(self): 
        return len(self.df)

    def __getitem__(self, idx):
        img_name = os.path.join(self.img_dir, f"{self.df.iloc[idx]['md5hash']}.jpg")
        try:
            image = Image.open(img_name).convert('RGB')
        except FileNotFoundError:
            image = Image.new('RGB', (288, 288))
            
        label = self.df.iloc[idx]['target'] 
        if self.transform: 
            image = self.transform(image)
        return image, torch.tensor(label, dtype=torch.long)

transform = transforms.Compose([
    transforms.Resize((288, 288)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(20),
    transforms.ColorJitter(brightness=0.1, contrast=0.1),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

dataset = SkinDataset('../dataset/fitzpatrick17k.csv', '../dataset/images', transform)
loader = DataLoader(dataset, batch_size=16, shuffle=True)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

num_classes = len(dataset.label_to_id)
model = timm.create_model('efficientnet_b2', pretrained=True, num_classes=num_classes)
model = model.to(device)

optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

class_counts = dataset.df['target'].value_counts().sort_index().values
weights = 1.0 / torch.tensor(class_counts, dtype=torch.float)
weights = weights / weights.sum() * num_classes
weights = weights.to(device)
loss_function = torch.nn.CrossEntropyLoss(weight=weights)

checkpoint_path = 'pause_checkpoint.pth'
start_epoch = 0
start_batch = 0

if os.path.exists(checkpoint_path):
    checkpoint = torch.load(checkpoint_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
    torch.set_rng_state(checkpoint['rng_state']) 
    start_epoch = checkpoint['epoch']
    start_batch = checkpoint['batch_idx'] + 1 

model.train()

try:
    for epoch in range(start_epoch, 15):
        for batch_idx, (images, labels) in enumerate(loader):
            if epoch == start_epoch and batch_idx < start_batch:
                continue
                
            images = images.to(device)
            labels = labels.to(device)
            
            optimizer.zero_grad()
            loss = loss_function(model(images), labels)
            loss.backward()
            optimizer.step()
            
            print(f"Epoch {epoch} | Batch {batch_idx} processed. Loss: {loss.item()}") 
        start_batch = 0 
        
except KeyboardInterrupt:
    torch.save({
        'epoch': epoch,
        'batch_idx': batch_idx,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'rng_state': torch.get_rng_state()
    }, checkpoint_path)
    exit(0)

torch.save(model.state_dict(), 'skin_model.pth')
if os.path.exists(checkpoint_path):
    os.remove(checkpoint_path)