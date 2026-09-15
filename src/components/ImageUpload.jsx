import { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';

export default function ImageUpload({ onImageSelect, selectedFile, onClear, onResults }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target?.files?.[0];
      if (file) onImageSelect(file);
    },
    [onImageSelect]
  );

  const analyzeImage = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("[https://skin-care-app-8mx8.onrender.com](https://www.google.com/search?q=https://skin-care-app-8mx8.onrender.com)", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      if (onResults) {
        onResults(data); 
      }
    } catch (error) {
      console.error("Error connecting to the backend server:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (selectedFile) {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative rounded-soft-lg overflow-hidden bg-beige-200 border-2 border-beige-300 shadow-soft">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Upload preview"
            className="w-full max-h-80 object-contain"
          />
          <button
            type="button"
            onClick={onClear}
            disabled={isAnalyzing}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-warmGray hover:bg-pink-light hover:text-darkBrown shadow-soft transition-colors disabled:opacity-50"
            aria-label="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="w-full py-3 px-4 bg-pink-accent hover:bg-pink-light text-white font-medium rounded-soft-lg shadow-soft transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Image'
          )}
        </button>
      </div>
    );
  }

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex flex-col items-center justify-center min-h-[240px] rounded-soft-lg border-2 border-dashed cursor-pointer transition-all duration-smooth ${
        isDragging
          ? 'border-pink-accent bg-pink-light/30'
          : 'border-beige-300 bg-beige-200/50 hover:border-pink hover:bg-pink-light/20'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="sr-only"
      />
      <Upload className="w-12 h-12 text-pink-accent mb-3" strokeWidth={1.5} />
      <span className="text-darkBrown font-medium text-center px-4">
        Drag and drop your image here, or click to upload
      </span>
      <span className="text-warmGray text-sm mt-1">Supports JPG, PNG, WebP</span>
      <ImageIcon className="w-8 h-8 text-beige-300 mt-2 opacity-60" />
    </label>
  );
}
