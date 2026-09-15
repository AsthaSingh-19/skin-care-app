import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

/**
 * SearchBar - Prominent search with optional suggestions/autocomplete.
 * suggestions: array of { id, name } for dropdown
 * onSearch: (query) => void
 * placeholder, size (normal | large)
 */
export default function SearchBar({
  onSearch,
  suggestions = [],
  placeholder = 'Search skin conditions...',
  size = 'large',
}) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filteredSuggestions = query.trim()
    ? suggestions.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions.slice(0, 8);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query, filteredSuggestions.length]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      listRef.current.children[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(query.trim());
    inputRef.current?.blur();
  };

  const handleSelectSuggestion = (item) => {
    setQuery(item.name);
    setShowSuggestions(false);
    onSearch(item.name);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) {
      if (e.key === 'Escape') setShowSuggestions(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) =>
        i < filteredSuggestions.length - 1 ? i + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) =>
        i > 0 ? i - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(filteredSuggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const isLarge = size === 'large';
  const inputClass = `w-full rounded-soft-lg border-2 border-beige-300 bg-cream text-darkBrown placeholder-warmGray/70 focus:border-pink-accent focus:ring-2 focus:ring-pink-accent/20 outline-none ${
    isLarge ? 'pl-5 pr-12 py-4 text-base md:text-lg' : 'pl-4 pr-10 py-3 text-base'
  }`;

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClass}
          aria-label="Search skin conditions"
          aria-autocomplete="list"
          aria-expanded={showSuggestions && filteredSuggestions.length > 0}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-soft text-warmGray hover:bg-pink-light hover:text-darkBrown transition-colors"
          aria-label="Search"
        >
          <Search className={isLarge ? 'w-6 h-6' : 'w-5 h-5'} />
        </button>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 mt-2 py-2 bg-white rounded-soft-lg border border-beige-300 shadow-soft-lg z-10 max-h-60 overflow-auto"
        >
          {filteredSuggestions.map((item, i) => (
            <li
              key={item.id}
              role="option"
              aria-selected={highlightedIndex === i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelectSuggestion(item);
              }}
              className={`px-4 py-3 cursor-pointer text-left text-warmGray hover:bg-pink-light/50 ${
                highlightedIndex === i ? 'bg-pink-light/50' : ''
              } ${i === 0 ? 'rounded-t-lg' : ''} ${
                i === filteredSuggestions.length - 1 ? 'rounded-b-lg' : ''
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
