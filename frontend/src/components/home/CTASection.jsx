import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-green-600 text-white py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get Rid of Pests Today
        </h2>

        <p className="text-lg text-green-100 mb-8">
          Fast, reliable fumigation services for homes and businesses across Nairobi.
          Book now or get an instant quote in seconds.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          
          <Link
            to="/quote"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Instant Quote
          </Link>

          <Link
            to="/book"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Book Service
          </Link>

        </div>

      </div>
    </section>
  );
}