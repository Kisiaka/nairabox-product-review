import React, { useState, useMemo } from 'react';
import { X, MapPin, Search, Check, Navigation, AlertCircle, Building2, ChevronRight, RotateCcw } from 'lucide-react';
import { NigerianState, LocationSelection } from '../types';
import { NIGERIAN_LOCATIONS } from '../data/sampleLocations';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationSelection;
  onApplyLocation: (location: LocationSelection) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onApplyLocation,
}) => {
  if (!isOpen) return null;

  // Staged state before applying
  const [selectedState, setSelectedState] = useState<NigerianState>(currentLocation.state);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<string | null>(
    currentLocation.neighbourhood
  );
  const [searchFilter, setSearchFilter] = useState('');
  const [geoStatus, setGeoStatus] = useState<string | null>(null);
  const [isDetectingGeo, setIsDetectingGeo] = useState(false);

  // Active state location object
  const activeStateData = useMemo(() => {
    return NIGERIAN_LOCATIONS.find((loc) => loc.state === selectedState) || NIGERIAN_LOCATIONS[0];
  }, [selectedState]);

  // Filtered neighbourhoods based on search query
  const filteredNeighbourhoods = useMemo(() => {
    const query = searchFilter.trim().toLowerCase();
    if (!query) return activeStateData.neighbourhoods;

    return activeStateData.neighbourhoods.filter(
      (n) =>
        n.name.toLowerCase().includes(query) ||
        n.areaType.toLowerCase().includes(query) ||
        n.popularVenues.some((v) => v.toLowerCase().includes(query))
    );
  }, [activeStateData, searchFilter]);

  // Filtered states when searching directly
  const matchingStates = useMemo(() => {
    const query = searchFilter.trim().toLowerCase();
    if (!query) return NIGERIAN_LOCATIONS;
    return NIGERIAN_LOCATIONS.filter(
      (loc) =>
        loc.state.toLowerCase().includes(query) ||
        loc.shortName.toLowerCase().includes(query) ||
        loc.capital.toLowerCase().includes(query) ||
        loc.neighbourhoods.some((n) => n.name.toLowerCase().includes(query))
    );
  }, [searchFilter]);

  // Handlers
  const handleStateSelect = (state: NigerianState) => {
    setSelectedState(state);
    // Reset neighbourhood to "All" when switching state
    setSelectedNeighbourhood(null);
  };

  const handleNeighbourhoodSelect = (neighbourhoodName: string | null) => {
    setSelectedNeighbourhood(neighbourhoodName);
  };

  const handleApply = () => {
    onApplyLocation({
      state: selectedState,
      neighbourhood: selectedNeighbourhood,
    });
    onClose();
  };

  const handleClearSelection = () => {
    setSelectedState('Lagos');
    setSelectedNeighbourhood(null);
    setSearchFilter('');
    setGeoStatus(null);
  };

  // Optional GPS Detection (Demonstrates graceful handling without requiring permissions)
  const handleDetectLocation = () => {
    setIsDetectingGeo(true);
    setGeoStatus('Locating nearby Nigerian cinema & event hubs...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In Nigerian context, default to Lagos - Ikeja for testing or resolve
          setSelectedState('Lagos');
          setSelectedNeighbourhood('Ikeja');
          setGeoStatus('Detected location: Ikeja, Lagos State (Mainland Hub)');
          setIsDetectingGeo(false);
        },
        (error) => {
          // Graceful fallback: set to Ikeja without failing
          setSelectedState('Lagos');
          setSelectedNeighbourhood('Ikeja');
          setGeoStatus('Using default demonstration location: Ikeja, Lagos (Permission optional)');
          setIsDetectingGeo(false);
        },
        { timeout: 3000 }
      );
    } else {
      setSelectedState('Lagos');
      setSelectedNeighbourhood('Ikeja');
      setGeoStatus('Defaulted to Ikeja, Lagos (GPS not supported)');
      setIsDetectingGeo(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-modal-title"
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 id="location-modal-title" className="text-base font-bold text-white">
                Select Your Location
              </h2>
              <p className="text-xs text-slate-400">
                Choose a Nigerian state and specific neighbourhood
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close location selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar inside Modal */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search state or neighbourhood (e.g., Ikeja, Lekki, Wuse)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-9 pr-8 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 top-2.5 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Optional Geolocation trigger */}
          <div className="mt-2.5 flex items-center justify-between flex-wrap gap-2">
            <button
              onClick={handleDetectLocation}
              disabled={isDetectingGeo}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-emerald-950/40 border border-emerald-900/40 transition-colors cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${isDetectingGeo ? 'animate-spin' : ''}`} />
              <span>{isDetectingGeo ? 'Locating...' : 'Use my current location (demo)'}</span>
            </button>

            {geoStatus && (
              <span className="text-[11px] text-emerald-300 font-mono flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                {geoStatus}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body: Two-column / Stacked selection */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* Step 1: State Selection */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                1. Select Nigerian State
              </span>
              <span className="text-xs text-slate-400">
                {matchingStates.length} states available
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {matchingStates.map((loc) => {
                const isSelected = selectedState === loc.state;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleStateSelect(loc.state)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/80 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-semibold block leading-tight">
                        {loc.shortName}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {loc.neighbourhoods.length} neighbourhoods
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Neighbourhood Selection within Selected State */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                2. Select Neighbourhood in {activeStateData.shortName}
              </span>
              <span className="text-xs text-emerald-400">
                Granular filter
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Option to select All neighbourhoods in this state */}
              <button
                onClick={() => handleNeighbourhoodSelect(null)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedNeighbourhood === null
                    ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div>
                  <span className="text-sm font-semibold block">
                    All {activeStateData.shortName}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Browse all events across the state
                  </span>
                </div>
                {selectedNeighbourhood === null && (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Specific Neighbourhoods */}
              {filteredNeighbourhoods.map((n) => {
                const isSelected = selectedNeighbourhood === n.name;
                return (
                  <button
                    key={n.id}
                    onClick={() => handleNeighbourhoodSelect(n.name)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold truncate">
                          {n.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {n.areaType}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                        {n.popularVenues[0]}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {filteredNeighbourhoods.length === 0 && (
              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-400">
                No neighbourhoods matched "{searchFilter}" in {selectedState}. Try another search term.
              </div>
            )}
          </div>

          {/* Prototype Scope Clarification */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
            <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="text-slate-200 font-medium">Prototype Coverage:</span> Demonstration inventory covers curated venues in Lagos (Ikeja, Lekki, VI, Yaba, Agege, Ikorodu), Abuja, Port Harcourt, and Kano State (Sabo Gerri, Emir Mall FilmOne Cinema).
            </p>
          </div>

        </div>

        {/* Footer: Preview and Actions */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={handleClearSelection}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 p-1 cursor-pointer"
              title="Reset location selection"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <div className="text-xs truncate">
              <span className="text-slate-400">Selected: </span>
              <span className="font-semibold text-emerald-400">
                {selectedNeighbourhood ? `${selectedNeighbourhood}, ${selectedState}` : `All of ${selectedState}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <span>Apply Location</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
