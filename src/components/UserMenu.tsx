import React, { useState, useRef, useEffect } from 'react';
import { User, Ticket, MapPin, LogOut, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserMenuProps {
  onOpenMyTickets: () => void;
  onOpenLocationModal: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  onOpenMyTickets,
  onOpenLocationModal,
}) => {
  const { user, signOut, bookedTickets } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-slate-900 border border-slate-700/80 hover:border-emerald-500/60 transition-colors cursor-pointer group"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-600 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
          {initials}
        </div>
        <span className="text-xs font-semibold text-slate-200 group-hover:text-white max-w-[100px] truncate hidden sm:inline">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-transform" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          
          {/* User profile header */}
          <div className="p-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-slate-950 font-bold text-sm flex items-center justify-center shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <span className="text-sm font-bold text-white block truncate">
                  {user.name}
                </span>
                <span className="text-xs text-slate-400 block truncate">
                  {user.email}
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                {user.authProvider === 'google' ? 'Google Account' : 'Email Account'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="py-1">
            <button
              onClick={() => {
                setDropdownOpen(false);
                onOpenMyTickets();
              }}
              className="w-full px-3 py-2 text-xs text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-emerald-400" />
                <span>My Booked Tickets</span>
              </div>
              <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[11px] font-mono font-semibold text-emerald-400">
                {bookedTickets.length}
              </span>
            </button>

            <button
              onClick={() => {
                setDropdownOpen(false);
                onOpenLocationModal();
              }}
              className="w-full px-3 py-2 text-xs text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Preferred Location</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {user.preferredLocation?.neighbourhood || 'Ikeja'}
              </span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="pt-1 border-t border-slate-800/80">
            <button
              onClick={() => {
                setDropdownOpen(false);
                signOut();
              }}
              className="w-full px-3 py-2 text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
