import { Ghost, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      {/* Ghost Icon */}
      <Ghost className="h-24 w-24 text-gray-700 mb-4" />

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>

      {/* Description */}
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>

      {/* Go Home Button */}
      <Link href="/">
        <button className="mt-6 flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
          <ArrowLeft className="h-5 w-5" />
          Go Home
        </button>
      </Link>
    </div>
  );
}
