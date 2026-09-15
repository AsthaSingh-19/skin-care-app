from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import torch
import timm
from torchvision import transforms
from PIL import Image
import io
import json

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Load the dictionary mapping IDs to disease names
with open('label_mapping.json', 'r') as f:
    id_to_label = json.load(f)

num_classes = len(id_to_label)
model = timm.create_model('efficientnet_b2', pretrained=False, num_classes=num_classes)

# Load the final trained model weights directly
model.load_state_dict(torch.load('skin_model.pth', map_location='cpu'))
model.eval()

transform = transforms.Compose([
    transforms.Resize((288, 288)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")
    tensor = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        probs = torch.nn.functional.softmax(model(tensor)[0], dim=0)
        confidence, pred = torch.max(probs, 0)
        
    # Looking up the actual disease name using the predicted ID
    predicted_disease_name = id_to_label[str(pred.item())]
        
    return {
        "prediction": predicted_disease_name, 
        "confidence": round(confidence.item() * 100, 2)
    }