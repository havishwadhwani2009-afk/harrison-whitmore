import { StarIcon } from "./icons";

export function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5 text-fg">
        {[1, 2, 3, 4, 5].map((n) => (
          <StarIcon key={n} className="h-3.5 w-3.5" filled={n <= Math.round(rating)} />
        ))}
      </div>
      <span className="text-sm text-fg-muted">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}
