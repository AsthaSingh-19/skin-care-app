import { AlertCircle } from 'lucide-react';

/**
 * Disclaimer component - Prominent medical disclaimer on every page.
 * Use compact prop for footer/smaller areas.
 */
export default function Disclaimer({ compact = false, className = '' }) {
  const text =
    'This tool is for informational purposes only and does not replace professional medical advice. Always consult a qualified healthcare provider.';

  if (compact) {
    return (
      <div className={`flex items-start gap-2 text-warmGray text-sm ${className}`.trim()}>
        <AlertCircle className="w-4 h-4 text-pink-accent flex-shrink-0 mt-0.5" />
        <p>{text}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-soft-lg bg-pink-light/50 border border-pink/30 text-darkBrown ${className}`.trim()}
      role="alert"
    >
      <AlertCircle className="w-6 h-6 text-pink-accent flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-darkBrown">Medical Disclaimer</p>
        <p className="text-sm mt-1 text-warmGray">{text}</p>
      </div>
    </div>
  );
}
