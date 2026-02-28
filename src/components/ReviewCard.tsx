import { Star, Quote } from 'lucide-react';
import type { Review } from '@/data/destinations';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative group hover:shadow-lg transition-all duration-300">
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
        <Quote className="w-4 h-4 text-indigo-600" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-2xl">
          {review.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.destination}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
    </div>
  );
}
