import React from 'react';
import { X, Ticket, Calendar, Clock, MapPin, QrCode, Download, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreEvents: () => void;
}

export const MyTicketsModal: React.FC<MyTicketsModalProps> = ({
  isOpen,
  onClose,
  onExploreEvents,
}) => {
  const { user, bookedTickets } = useAuth();

  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-tickets-title"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Ticket className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 id="my-tickets-title" className="text-base font-bold text-white">
                My Tickets & Passes
              </h2>
              <p className="text-xs text-slate-400">
                {user ? `Signed in as ${user.name}` : 'Saved passes'} · {bookedTickets.length} active
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close tickets modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {bookedTickets.length > 0 ? (
            bookedTickets.map((t) => (
              <div
                key={t.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                      {t.eventCategory}
                    </span>
                    <h3 className="text-base font-bold text-white">{t.eventTitle}</h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Booking Ref</span>
                    <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400">{t.bookingRef}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{t.date} · {t.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{t.venue} ({t.neighbourhood})</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dashed border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono">
                      {t.quantity}x {t.tierName}
                    </span>
                    <span className="font-bold text-white font-mono tabular-nums">
                      {formatPrice(t.totalAmount)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Simulated pass download for ${t.bookingRef}`)}
                      className="text-xs text-slate-300 hover:text-emerald-400 flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-slate-900"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                    <div className="w-7 h-7 bg-white p-0.5 rounded flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-slate-950" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Tickets Booked Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore movies and upcoming events in your preferred Nigerian neighbourhood and book a test ticket!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreEvents();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm transition-colors"
              >
                <span>Browse Upcoming Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
