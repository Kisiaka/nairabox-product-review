import React from 'react';
import { MapPin, SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';
import { StructuredEvent, LocationSelection, EventCategory } from '../types';
import { EventCard } from './EventCard';
import { EmptyState } from './EmptyState';
import { NIGERIAN_LOCATIONS } from '../data/sampleLocations';

interface EventGridProps {
  events: StructuredEvent[];
  currentLocation: LocationSelection;
  onSelectNeighbourhood: (name: string | null) => void;
  onSelectState: (state: any) => void;
  onOpenLocationModal: () => void;
  onSelectEvent: (event: StructuredEvent) => void;
  query: string;
  onClearQuery: () => void;
  category: EventCategory;
  onSelectCategory: (cat: EventCategory) => void;
  onResetAllFilters: () => void;
  onBroadenLocation: () => void;
}

export const EventGrid: React.FC<EventGridProps> = ({
  events,
  currentLocation,
  onSelectNeighbourhood,
  onSelectState,
  onOpenLocationModal,
  onSelectEvent,
  query,
  onClearQuery,
  category,
  onSelectCategory,
  onResetAllFilters,
  onBroadenLocation,
}) => {
  // Find current state locations to show quick neighbourhood switcher
  const currentStateData = NIGERIAN_LOCATIONS.find((l) => l.state === currentLocation.state) || NIGERIAN_LOCATIONS[0];

  const headerLocationTitle = currentLocation.neighbourhood && currentLocation.neighbourhood !== 'all'
    ? `Events in ${currentLocation.neighbourhood}, ${currentStateData.shortName}`
    : `Events across ${currentStateData.shortName}`;

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Location Results Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          {/* Breadcrumb style text */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{currentLocation.state}</span>
            {currentLocation.neighbourhood && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-emerald-400 font-semibold">{currentLocation.neighbourhood}</span>
              </>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span>{headerLocationTitle}</span>
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {events.length} {events.length === 1 ? 'event' : 'events'}
            </span>
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            {currentLocation.neighbourhood
              ? `Filtered specifically to ${currentLocation.neighbourhood} venues and cinemas.`
              : `Showing events across all neighbourhoods in ${currentLocation.state}.`}
          </p>
        </div>

        {/* Quick Location switcher chips for current state */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-mono mr-1">Quick switch:</span>
          
          <button
            onClick={() => onSelectNeighbourhood(null)}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
              currentLocation.neighbourhood === null
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All {currentStateData.shortName}
          </button>

          {currentStateData.neighbourhoods.slice(0, 4).map((n) => {
            const isSelected = currentLocation.neighbourhood === n.name;
            return (
              <button
                key={n.id}
                onClick={() => onSelectNeighbourhood(n.name)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {n.name}
              </button>
            );
          })}

          <button
            onClick={onOpenLocationModal}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer font-medium"
          >
            More locations...
          </button>
        </div>
      </div>

      {/* Active Filter Pills Bar (if query or category active) */}
      {(query || category !== 'All' || currentLocation.neighbourhood) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400">Active filters:</span>

          {currentLocation.neighbourhood && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-200">
              <span>Neighbourhood: <strong className="text-emerald-400">{currentLocation.neighbourhood}</strong></span>
              <button
                onClick={() => onSelectNeighbourhood(null)}
                className="hover:text-white cursor-pointer ml-1"
                title="Remove neighbourhood filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {category !== 'All' && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-200">
              <span>Category: <strong className="text-emerald-400">{category}</strong></span>
              <button
                onClick={() => onSelectCategory('All')}
                className="hover:text-white cursor-pointer ml-1"
                title="Clear category filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {query && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-200">
              <span>Search: <strong className="text-emerald-400">"{query}"</strong></span>
              <button
                onClick={onClearQuery}
                className="hover:text-white cursor-pointer ml-1"
                title="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={onResetAllFilters}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer ml-2"
          >
            Reset all
          </button>
        </div>
      )}

      {/* Grid of Event Cards or Empty State */}
      <div className="mt-6">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelectEvent={onSelectEvent}
                searchQuery={query}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            query={query}
            category={category}
            location={currentLocation}
            onClearQuery={onClearQuery}
            onBroadenLocation={onBroadenLocation}
            onOpenLocationModal={onOpenLocationModal}
            onResetAllFilters={onResetAllFilters}
          />
        )}
      </div>

    </section>
  );
};
