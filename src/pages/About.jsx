import { Heart, Shield, Info } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';

/**
 * About page - Purpose, how it works, limitations, disclaimers.
 */
export default function About() {
  return (
    <main className="min-h-[calc(100vh-8rem)] max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-poppins font-bold text-2xl md:text-3xl text-darkBrown text-center mb-8">
        About SkinCare Check
      </h1>

      <div className="space-y-8 text-warmGray">
        <section className="flex gap-4">
          <Heart className="w-8 h-8 text-pink-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-poppins font-semibold text-darkBrown text-lg mb-2">Purpose</h2>
            <p>
              SkinCare Check is an informational tool to help you learn about common skin conditions,
              their symptoms, possible causes, and general care tips. We aim to support your
              awareness and encourage timely visits to healthcare providers when needed.
            </p>
          </div>
        </section>

        <section className="flex gap-4">
          <Info className="w-8 h-8 text-pink-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-poppins font-semibold text-darkBrown text-lg mb-2">How it works</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Scan Your Skin:</strong> Upload or capture a photo. Our tool provides possible condition suggestions and general advice. This is not a medical diagnosis.</li>
              <li><strong>Search Conditions:</strong> Look up conditions by name to read about symptoms, causes, when to see a doctor, and care tips.</li>
            </ul>
          </div>
        </section>

        <section className="flex gap-4">
          <Shield className="w-8 h-8 text-pink-accent flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-poppins font-semibold text-darkBrown text-lg mb-2">Limitations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>This tool does not replace a professional medical diagnosis or treatment.</li>
              <li>Image analysis is for informational purposes only and may not be accurate.</li>
              <li>Always consult a qualified healthcare provider or dermatologist for any skin concern.</li>
              <li>Do not delay seeking medical help based on information from this site.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </main>
  );
}
