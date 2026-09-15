import { Link } from 'react-router-dom';
import { ScanSearch, Search, Heart } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';

/**
 * Homepage - Hero, brief explanation, CTAs, and trust disclaimer.
 */
export default function Home() {
  return (
    <main className="min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-beige-200 via-cream to-pink-light/20 rounded-soft-lg mx-4 mt-6 md:mx-6 md:mt-8 p-8 md:p-12 lg:p-16 shadow-soft">
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-darkBrown leading-tight">
            Your skin deserves gentle care
          </h1>
          <p className="mt-4 text-warmGray text-lg md:text-xl max-w-xl">
            Get quick, informational insights about common skin conditions and when to seek professional help.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/scan"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-soft-lg bg-pink-accent text-white font-semibold shadow-soft hover:bg-pink hover:shadow-soft-lg transition-all duration-smooth text-base"
            >
              <ScanSearch className="w-5 h-5" />
              Scan Your Skin
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-soft-lg bg-white border-2 border-beige-300 text-darkBrown font-semibold hover:border-pink-accent hover:bg-pink-light/30 transition-all duration-smooth text-base"
            >
              <Search className="w-5 h-5" />
              Search Conditions
            </Link>
          </div>
        </div>
        <div className="absolute right-4 bottom-4 opacity-20 pointer-events-none">
          <Heart className="w-32 h-32 text-pink-accent" strokeWidth={1} />
        </div>
      </section>

      {/* How it works / Trust */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <h2 className="font-poppins font-semibold text-xl md:text-2xl text-darkBrown text-center mb-6">
          How it works
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-warmGray">
          <div className="p-5 rounded-soft-lg bg-beige-200/50 border border-beige-300/50">
            <ScanSearch className="w-10 h-10 text-pink-accent mb-3" />
            <h3 className="font-semibold text-darkBrown">Scan Your Skin</h3>
            <p className="mt-2 text-sm">
              Upload or capture a photo of your skin. Our tool suggests possible conditions and general care tips. This is not a diagnosis—always confirm with a doctor.
            </p>
          </div>
          <div className="p-5 rounded-soft-lg bg-beige-200/50 border border-beige-300/50">
            <Search className="w-10 h-10 text-pink-accent mb-3" />
            <h3 className="font-semibold text-darkBrown">Search Conditions</h3>
            <p className="mt-2 text-sm">
              Look up symptoms, causes, and care recommendations for many common skin conditions. Use it to learn and prepare for a visit to your healthcare provider.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10">
          <Disclaimer />
        </div>
      </section>
    </main>
  );
}
