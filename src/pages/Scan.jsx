import { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import ResultsCard from '../components/ResultsCard';

export default function Scan() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-6">
      <ImageUpload 
        selectedFile={file} 
        onImageSelect={setFile} 
        onClear={() => { 
          setFile(null); 
          setResults(null); 
        }} 
        onResults={setResults} 
      />
      {results && <ResultsCard data={results} />}
    </div>
  );
}