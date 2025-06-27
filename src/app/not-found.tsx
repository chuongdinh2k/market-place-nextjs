import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-black">
      <div className="w-full max-w-md p-8 bg-gray-50 border border-gray-100 rounded-lg shadow-sm text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">404</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
