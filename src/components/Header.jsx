import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';

/**
 * Header component - Clean navigation with links to all main sections.
 * Responsive with mobile hamburger menu.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/scan', label: 'Scan Your Skin' },
    { to: '/search', label: 'Search Conditions' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-cream border-b border-beige-300/50 shadow-soft sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-darkBrown font-poppins font-semibold text-lg md:text-xl hover:text-pink-accent transition-colors duration-smooth"
          >
            <Heart className="w-7 h-7 text-pink-accent" strokeWidth={2} />
            <span>SkinCare Check</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-soft text-sm font-medium transition-all duration-smooth ${
                  isActive(to)
                    ? 'bg-pink-light text-darkBrown'
                    : 'text-warmGray hover:bg-beige-200 hover:text-darkBrown'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-soft text-warmGray hover:bg-beige-200 hover:text-darkBrown focus:outline-none focus:ring-2 focus:ring-pink-accent/50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-beige-300/50 animate-in fade-in duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-soft text-base font-medium ${
                    isActive(to) ? 'bg-pink-light text-darkBrown' : 'text-warmGray hover:bg-beige-200'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
