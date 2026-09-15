import { Activity } from 'lucide-react';

export default function ResultsCard({ data }) {
  if (!data) return null;

  // Format the disease string to look professional (e.g., capitalize first letters)
  const formattedPrediction = data.prediction
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-white rounded-soft-lg p-6 shadow-soft border-2 border-beige-300 flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-beige-300 pb-4">
        <Activity className="w-8 h-8 text-pink-accent" />
        <div>
          <h2 className="text-xl font-bold text-darkBrown">
            {formattedPrediction}
          </h2>
          <p className="text-warmGray text-sm font-medium">
            Confidence Score: {data.confidence}%
          </p>
        </div>
      </div>
      
      <p className="text-sm text-warmGray leading-relaxed">
        The model identified visual patterns highly consistent with <strong>{formattedPrediction}</strong>. 
        This is an AI estimation based on visual data and should not substitute a professional medical diagnosis. 
        Please consult a certified dermatologist for evaluation.
      </p>
    </div>
  );
}