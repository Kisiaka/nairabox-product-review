import React from 'react';
import { SearchX, MapPin, ArrowRight, RotateCcw, Globe } from 'lucide-react';
import { LocationSelection, EventCategory } from '../types';

interface EmptyStateProps {
  query: string;
  category: EventCategory;
  location: LocationSelection;
  onClearQuery: () => void;
  onBroadenLocation: () => void;
  onOpenLocationModal: () => void;
  onResetAllFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  query,
  category,
  location,
  onClearQuery,
  onBroadenLocation,
  onOpenLocationModal,
  onResetAllFilters,
}) => {
  const isNeighbourhoodRestricted = Boolean(location.neighbourhood && location.neighbourhood !== 'all');

  return (
    <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-8">
      
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mx-auto mb-4 text-emerald-400">
        <SearchX className="w-7 h-7" />
      </div>

      {/* Main Title */}
      <h3 className="text-xl font-bold text-white mb-2">
        No events found matching your criteria
      </h3>

      {/* Contextual description preserving location */}
      <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-6">
        {query ? (
          <>
            No upcoming events found for <span className="text-emerald-400 font-semibold">"{query}"</span> in{' '}
            <span className="text-white font-medium">
              {location.neighbourhood ? `${location.neighbourhood}, ${location.state}` : location.state}
            </span>
            {category !== 'All' ? ` under ${category}` : ''}.
          </>
        ) : (
          <>
            No upcoming {category !== 'All' ? category.toLowerCase() : 'events'} currently scheduled in{' '}
            <span className="text-white font-medium">
              {location.neighbourhood ? `${location.neighbourhood}, ${location.state}` : location.state}
            </span>.
          </>
        )}
      </p>

      {/* Action Buttons to broaden or adjust */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        
        {/* If user selected a specific neighbourhood, offer 1-click broaden to entire state! */}
        {isNeighbourhoodRestricted && (
          <button
            onClick={onBroadenLocation}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>Broaden to all {location.state}</span>
          </button>
        )}

        {/* Clear query if query exists */}
        {query && (
          <button
            onClick={onClearQuery}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700/80 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Clear search term</span>
          </button>
        )}

        {/* Change location */}
        <button
          onClick={onOpenLocationModal}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700/80 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Change location</span>
        </button>

      </div>

      {/* Helpful prototype inventory disclaimer */}
      <div className="mt-8 pt-6 border-t border-slate-800/60 text-xs text-slate-400">
        <p className="max-w-lg mx-auto">
          <span className="font-semibold text-slate-300">Prototype Note:</span> This is a demonstration environment with curated sample events across Lagos (Ikeja, Lekki, VI, Yaba, Agege, Ikorodu), Abuja, Port Harcourt, and Kano State (Sabo Gerri, Emir Mall FilmOne Cinema).
        </p>
      </div>

    </div>
  );
};
