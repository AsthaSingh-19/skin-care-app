import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsCard from '../components/ResultsCard';
import Disclaimer from '../components/Disclaimer';
import skinConditions from '../data/skinConditions.json';

/**
 * Search page - Large search bar, autocomplete, results card.
 */
export default function Search() {
  const [submittedQuery, setSubmittedQuery] = useState('');

  const suggestions = useMemo(
    () => skinConditions.map((c) => ({ id: c.id, name: c.name })),
    []
  );

  const handleSearch = (query) => {
    setSubmittedQuery(query);
  };

  const result = useMemo(() => {
    if (!submittedQuery.trim()) return null;
    const q = submittedQuery.toLowerCase().trim();
    return skinConditions.find(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().replace(/-/g, ' ').includes(q)
    );
  }, [submittedQuery]);

  return (
    <main className="min-h-[calc(100vh-8rem)] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-poppins font-bold text-2xl md:text-3xl text-darkBrown text-center mb-2">
        Search Conditions
      </h1>
      <p className="text-warmGray text-center mb-8">
        Type a skin condition name to see symptoms, causes, and care recommendations.
      </p>

      <Disclaimer className="mb-8" />

      <div className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          suggestions={suggestions}
          placeholder="e.g. Acne, Eczema, Psoriasis..."
          size="large"
        />
      </div>

      {submittedQuery && (
        <div className="space-y-4">
          {result ? (
            <ResultsCard
              title={result.name}
              symptoms={result.symptoms}
              causes={result.causes}
              whenToSeeDoctor={result.whenToSeeDoctor}
              careTips={result.careTips}
            />
          ) : (
            <div className="p-6 rounded-soft-lg bg-beige-200/50 border border-beige-300 text-center text-warmGray">
              No condition found for &quot;{submittedQuery}&quot;. Try another name or browse common conditions like Acne, Eczema, or Psoriasis.
            </div>
          )}
        </div>
      )}

      {!submittedQuery && (
        <div className="text-center text-warmGray text-sm py-8">
          <p>Try searching for: Acne, Eczema, Psoriasis, Rosacea, Contact Dermatitis, Melasma, Vitiligo, Fungal Infections, Cold Sores, Skin Tags, and more.</p>
        </div>
      )}
    </main>
  );
}
