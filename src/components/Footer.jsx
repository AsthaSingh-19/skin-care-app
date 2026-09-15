import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Disclaimer from './Disclaimer';

/**
 * Footer component - Site info and disclaimer.
 */
export default function Footer() {
  return (
    <footer className="bg-beige-300/30 border-t border-beige-300/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-darkBrown font-poppins font-semibold">
            <Heart className="w-5 h-5 text-pink-accent" strokeWidth={2} />
            <span>SkinCare Check</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/" className="text-warmGray hover:text-darkBrown hover:underline">
              Home
            </Link>
            <Link to="/scan" className="text-warmGray hover:text-darkBrown hover:underline">
              Scan
            </Link>
            <Link to="/search" className="text-warmGray hover:text-darkBrown hover:underline">
              Search
            </Link>
            <Link to="/about" className="text-warmGray hover:text-darkBrown hover:underline">
              About
            </Link>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-beige-300/50">
          <Disclaimer compact />
        </div>
        <p className="mt-4 text-sm text-warmGray/80 text-center">
          © {new Date().getFullYear()} SkinCare Check. For informational purposes only.
        </p>
      </div>
    </footer>
  );
}
