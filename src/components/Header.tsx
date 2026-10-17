import React from 'react';
import { MapPin, Sparkles, Compass, Film, Calendar } from 'lucide-react';
import { LocationSelection } from '../types';
import { AuthMode } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  currentLocation: LocationSelection;
  onOpenLocationModal: () => void;
  onOpenWalkthroughModal: () => void;
  onSelectCategory: (category: any) => void;
  activeCategory: string;
  onOpenAuthModal: (mode: AuthMode) => void;
  onOpenMyTickets: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenWalkthroughModal,
  onSelectCategory,
  activeCategory,
  onOpenAuthModal,
  onOpenMyTickets,
}) => {
  const { user } = useAuth();
  const locationText = currentLocation.neighbourhood && currentLocation.neighbourhood !== 'all'
    ? `${currentLocation.neighbourhood}, ${currentLocation.state}`
    : `${currentLocation.state} (All)`;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark (Anti-slop 3-zone contract) */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-sm shadow-emerald-500/20 group-hover:bg-emerald-400 transition-colors">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
                  nairabox
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400 border border-emerald-500/30 px-1 py-0.2 rounded">
                    Concept
                  </span>
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => onSelectCategory('All')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'All' ? 'text-emerald-400 font-semibold' : ''
              }`}
            >
              Explore All
            </button>
            <button
              onClick={() => onSelectCategory('Movies')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeCategory === 'Movies' ? 'text-emerald-400 font-semibold' : ''
              }`}
            >
              <Film className="w-4 h-4 text-slate-400" />
              Cinemas & Movies
            </button>
            <button
              onClick={() => onSelectCategory('Music & Concerts')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeCategory === 'Music & Concerts' ? 'text-emerald-400 font-semibold' : ''
              }`}
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              Live Concerts
            </button>
            <button
              onClick={onOpenLocationModal}
              className="hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 text-slate-400"
            >
              <Compass className="w-4 h-4" />
              Browse Cities
            </button>
          </nav>

          {/* Zone 3: Primary Action & Location Switcher & Auth */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Location selector trigger button */}
            <button
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs sm:text-sm font-medium text-slate-200 transition-colors cursor-pointer shadow-sm group"
              title="Change your state or neighbourhood"
              aria-label="Change location"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="max-w-[100px] sm:max-w-[140px] truncate">
                {locationText}
              </span>
              <span className="text-[10px] text-emerald-400 uppercase font-mono font-medium ml-0.5 hidden lg:inline">
                Change
              </span>
            </button>

            {/* Auth Buttons: Sign In / Sign Up OR User Profile */}
            {user ? (
              <UserMenu
                onOpenMyTickets={onOpenMyTickets}
                onOpenLocationModal={onOpenLocationModal}
              />
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuthModal('signin')}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuthModal('signup')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Product review guide trigger */}
            <button
              onClick={onOpenWalkthroughModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors cursor-pointer shadow-sm"
              title="View Product Review Walkthrough & Test Cases"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Guide</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
