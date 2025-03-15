import { Link } from "next-view-transitions";

export function AnimatedName() {
  return (
    <div>
      <Link href="/" className="flex mb-8 text-gray-400 fade-in font-semibold">
        Jorge Delgadillo
      </Link>
    </div>
  );
}
