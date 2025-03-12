import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <Loader className="h-12 w-12 text-blue-600 animate-spin" />
      <p className="mt-4 text-xl font-medium text-gray-700">Loading...</p>
    </div>
  );
}
