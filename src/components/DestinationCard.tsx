import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Destination } from '@/data/destinations';

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

const badgeVariants: Record<string, { label: string; className: string }> = {
  top: { label: 'TOP', className: 'bg-emerald-500 hover:bg-emerald-600' },
  hit: { label: 'HIT', className: 'bg-violet-500 hover:bg-violet-600' },
  sale: { label: 'SLEVA', className: 'bg-rose-500 hover:bg-rose-600' },
  new: { label: 'NOVÉ', className: 'bg-blue-500 hover:bg-blue-600' },
  exotic: { label: 'EXOTIKA', className: 'bg-amber-500 hover:bg-amber-600' },
  luxury: { label: 'LUXUS', className: 'bg-amber-600 hover:bg-amber-700' },
};

export default function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${destination.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={destination.gallery[0]}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Badge */}
        {destination.badge && badgeVariants[destination.badge] && (
          <Badge
            className={`absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 ${badgeVariants[destination.badge].className}`}
          >
            {badgeVariants[destination.badge].label}
          </Badge>
        )}

        {/* Emoji */}
        <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg">
          {destination.emoji}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
              {destination.flag} {destination.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              {destination.country}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">
              {destination.price.toLocaleString('cs')} Kč
            </p>
            <p className="text-xs text-gray-400">/ osoba</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 group-hover:gap-3 transition-all">
          <span>Zobrazit detail</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
