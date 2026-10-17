import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Ticket,
  ShieldCheck,
  Building2,
  Share2,
  Check,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react';
import { StructuredEvent, TicketTier } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthMode } from '../types/auth';

interface EventDetailsModalProps {
  event: StructuredEvent | null;
  onClose: () => void;
  onStartBooking: (event: StructuredEvent, selectedTier: TicketTier, quantity: number) => void;
  onOpenAuthModal?: (mode: AuthMode) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  onClose,
  onStartBooking,
  onOpenAuthModal,
}) => {
  const { user } = useAuth();
  if (!event) return null;

  const [selectedTierId, setSelectedTierId] = useState<string>(
    event.ticketTiers[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeTier = event.ticketTiers.find((t) => t.id === selectedTierId) || event.ticketTiers[0];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBookingSubmit = () => {
    if (activeTier) {
      onStartBooking(event, activeTier, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-details-title"
      >
        
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-emerald-400 font-semibold">{event.category}</span>
            <span aria-hidden="true">/</span>
            <span>{event.neighbourhood}, {event.state}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Share event link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Back to search results"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Visual Hero Banner */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-slate-950">
            <img
              src={event.image}
              alt={event.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            
            {/* Upcoming Verification Badge */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                  Verified Upcoming Event
                </span>
                {event.duration && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs font-mono border border-slate-700 hidden sm:inline">
                    {event.duration}
                  </span>
                )}
                {event.ageRating && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs font-mono border border-slate-700 hidden sm:inline">
                    Rated {event.ageRating}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Core Body Container */}
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Title & Organizer */}
            <div>
              <h1 id="event-details-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {event.title}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Organized by <span className="text-slate-200 font-medium">{event.organizer}</span>
              </p>
            </div>

            {/* Essential Info Grid (Date, Time, Location) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Date & Time Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">
                    Date & Schedule
                  </span>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {event.date}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>

              {/* Structured Location Breakdown Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-mono text-slate-400 tracking-wider">
                      Location & Venue
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                      {event.neighbourhood}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5 truncate">
                    {event.venue}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {event.venueLandmark}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    State: {event.state} · City: {event.city}
                  </div>
                </div>
              </div>

            </div>

            {/* Description & Overview */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono mb-2">
                About this Event
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {event.longDescription}
              </p>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-500 font-mono">Tags:</span>
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[11px] border border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Ticket Tier Selection Section */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-emerald-400" />
                    Select Ticket Option
                  </h3>
                  <p className="text-xs text-slate-400">
                    Prototype selection — no payment card charged
                  </p>
                </div>
                <span className="text-xs text-emerald-400 font-mono">
                  Instant E-Ticket Delivery
                </span>
              </div>

              <div className="space-y-2.5">
                {event.ticketTiers.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500/80 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            {tier.name}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            ({tier.available} left)
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 block mt-0.5">
                          {tier.perks}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                          {formatPrice(tier.price)}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isSelected
                              ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                              : 'border-slate-700 bg-slate-800'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-medium">
                  Number of tickets:
                </span>
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 flex items-center justify-center cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white w-6 text-center tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(6, quantity + 1))}
                    disabled={quantity >= 6}
                    className="w-7 h-7 rounded text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 flex items-center justify-center cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Account Status / Sign In prompt */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {user ? (
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span>Booking as <strong className="text-white">{user.name}</strong> ({user.email})</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-slate-400">Not signed in?</span>
                    {onOpenAuthModal && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenAuthModal('signup')}
                          className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                        >
                          Sign Up
                        </button>
                        <span className="text-slate-600">·</span>
                        <button
                          type="button"
                          onClick={() => onOpenAuthModal('signin')}
                          className="text-slate-300 hover:text-white cursor-pointer"
                        >
                          Sign In
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Modal Sticky Bottom Action Strip */}
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Total Price:</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
              {formatPrice((activeTier?.price || 0) * quantity)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Back to search
            </button>
            <button
              onClick={handleBookingSubmit}
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>Continue to booking</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
