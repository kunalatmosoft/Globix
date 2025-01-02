import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to home page
        </Link>
      </div>
    </div>
  );
}
