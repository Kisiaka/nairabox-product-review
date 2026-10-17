import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, Ticket, MapPin, Calendar, Clock, QrCode, Download, ArrowLeft, UserPlus, LogIn, Check } from 'lucide-react';
import { StructuredEvent, TicketTier } from '../types';
import { useAuth } from '../context/AuthContext';
import { AuthMode } from '../types/auth';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: StructuredEvent | null;
  selectedTier: TicketTier | null;
  quantity: number;
  onOpenAuthModal: (mode: AuthMode) => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  event,
  selectedTier,
  quantity,
  onOpenAuthModal,
}) => {
  const { user, addBookedTicket } = useAuth();
  const savedRef = useRef(false);

  const totalAmount = selectedTier ? selectedTier.price * quantity : 0;
  const bookingRef = useRef(`NBX-${Math.floor(100000 + Math.random() * 900000)}`).current;

  useEffect(() => {
    if (isOpen && event && selectedTier && !savedRef.current) {
      addBookedTicket({
        eventId: event.id,
        eventTitle: event.title,
        eventCategory: event.category,
        eventImage: event.image,
        date: event.date,
        time: event.time,
        venue: event.venue,
        neighbourhood: event.neighbourhood,
        state: event.state,
        tierName: selectedTier.name,
        quantity,
        totalAmount,
        bookingRef,
      });
      savedRef.current = true;
    }
    if (!isOpen) {
      savedRef.current = false;
    }
  }, [isOpen, event, selectedTier, quantity, totalAmount, bookingRef, addBookedTicket]);

  if (!isOpen || !event || !selectedTier) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-voucher-title"
      >
        
        {/* Success Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-slate-950 flex flex-col items-center text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-full bg-slate-950/20 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-7 h-7 text-slate-950" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest font-bold opacity-80">
            PROTOTYPE BOOKING CONFIRMED
          </span>
          <h2 id="booking-voucher-title" className="text-2xl font-black mt-1">
            You're All Set!
          </h2>
          <p className="text-xs text-slate-950/80 mt-1 max-w-xs">
            Demonstration ticket voucher generated for location discovery review.
          </p>
        </div>

        {/* Realistic Ticket Voucher Body */}
        <div className="p-6 bg-slate-900 space-y-4">
          
          {/* User account state banner */}
          {user ? (
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Saved to your account (<strong className="text-white">{user.name}</strong>)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Synced</span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-xs">
              <div className="min-w-0">
                <span className="font-semibold text-white block truncate">Want to save this pass?</span>
                <span className="text-slate-400 text-[11px]">Sign up with email or Google ID</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onOpenAuthModal('signup')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => onOpenAuthModal('signin')}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* Ticket Information Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 relative">
            
            {/* Top row */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400">Booking Reference</span>
                <div className="text-sm font-mono font-bold text-emerald-400">{bookingRef}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400">Total Charged</span>
                <div className="text-sm font-mono font-bold text-white tabular-nums">{formatPrice(totalAmount)}</div>
              </div>
            </div>

            {/* Event Name */}
            <div>
              <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold">{event.category}</span>
              <h3 className="text-base font-bold text-white leading-snug">{event.title}</h3>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{event.time}</span>
              </div>
            </div>

            {/* Location & Venue highlight */}
            <div className="flex items-start gap-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">{event.venue}</div>
                <div className="text-slate-400 text-[11px]">{event.venueLandmark} ({event.neighbourhood}, {event.state})</div>
              </div>
            </div>

            {/* Tier & Seats */}
            <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-medium">{quantity}x {selectedTier.name}</span>
              </div>
              <span className="text-slate-400 font-mono">Admission Ready</span>
            </div>

            {/* Simulated QR Code Bar */}
            <div className="border-t border-dashed border-slate-800 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white p-1 rounded-md flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-slate-950" />
                </div>
                <div className="text-[11px] text-slate-400">
                  <span>Digital Pass</span>
                  <div className="font-mono text-emerald-400 text-[10px]">NAIRABOX-DEMO-VALID</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Present at Box Office
              </span>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to discovery</span>
            </button>
            <button
              onClick={() => {
                alert(`Voucher for ${bookingRef} downloaded! Saved to your passes.`);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download voucher</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
