import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Ticket, ArrowUpRight, Search } from 'lucide-react';
import { StructuredEvent } from '../types';

interface EventCardProps {
  event: StructuredEvent;
  onSelectEvent: (event: StructuredEvent) => void;
  searchQuery?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  searchQuery,
}) => {
  const [imageError, setImageError] = useState(false);

  // Formatting price in Nigerian Naira
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      onClick={() => onSelectEvent(event)}
      className="group bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 cursor-pointer"
    >
      {/* Card Image Slot (Lead with visual, 16:9 ratio) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        {!imageError ? (
          <img
            src={event.image}
            alt={event.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400">
            <Ticket className="w-8 h-8 text-emerald-400/80 mb-2" />
            <span className="text-xs font-semibold text-slate-300 text-center">{event.title}</span>
            <span className="text-[11px] text-slate-500 mt-1">{event.category}</span>
          </div>
        )}

        {/* Subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />

        {/* Floating Category and Area Label */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-400 font-semibold text-[11px] border border-slate-800">
            {event.category}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-200 text-[11px] border border-slate-800 font-mono">
            {event.neighbourhood}
          </span>
        </div>

        {/* Price Tag pinned to bottom right of visual */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 font-bold text-xs shadow-md tabular-nums">
            From {formatPrice(event.priceRange.min)}
          </span>
        </div>
      </div>

      {/* Card Content & Zero-Pill Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          
          {/* Structured Match Reason Highlight (Directly proves the core requirement!) */}
          {event.highlightMatchReason && (
            <div className="mb-2.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-[11px] text-emerald-300 flex items-center gap-1.5 font-mono">
              <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{event.highlightMatchReason}</span>
            </div>
          )}

          {/* Date & Time Clean Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1 text-slate-300 font-medium">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {event.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              {event.time}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          {/* Venue & Structured Neighbourhood */}
          <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">
              <span className="font-semibold text-white">{event.venue}</span>
              <span className="text-slate-400">, {event.neighbourhood}</span>
            </span>
          </div>

          {/* Concise Description */}
          <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 truncate max-w-[180px]">
            By {event.organizer}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectEvent(event);
            }}
            className="flex items-center gap-1 font-semibold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
          >
            <span>View details</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
