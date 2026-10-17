import React from 'react';
import {
  X,
  Sparkles,
  CheckCircle,
  Search,
  MapPin,
  ArrowRight,
  HelpCircle,
  Layers,
  Compass,
  FileText,
} from 'lucide-react';
import { NigerianState, LocationSelection, EventCategory } from '../types';

interface WalkthroughGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScenario: (
    location: LocationSelection,
    query: string,
    category: EventCategory
  ) => void;
}

export const WalkthroughGuideModal: React.FC<WalkthroughGuideModalProps> = ({
  isOpen,
  onClose,
  onApplyScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="walkthrough-guide-title"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 id="walkthrough-guide-title" className="text-base font-bold text-white">
                3–5 Minute Product Review Walkthrough
              </h2>
              <p className="text-xs text-slate-400">
                Nairabox Location-Based Event Discovery Prototype
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close walkthrough guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          
          {/* Qualitative Research Context */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Research Foundation (6 Exploratory Interviews + Teardown)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on qualitative interviews with Nigerian moviegoers and event seekers, direct Nairabox interface inspection, and an Eventbrite teardown. These directional findings address four key friction areas:
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-white block mb-0.5">1. Granular Neighbourhoods</span>
                <span className="text-slate-400">Users want to select Ikeja, Lekki, or Yaba, not just generic "Lagos".</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-white block mb-0.5">2. Structured Search</span>
                <span className="text-slate-400">Matches events when the venue/neighbourhood is not in the event title.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-white block mb-0.5">3. Location Relevance</span>
                <span className="text-slate-400">Prevents browsing irrelevant faraway venues across the Nigerian mainland/island divide.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-semibold text-white block mb-0.5">4. Upcoming Verification</span>
                <span className="text-slate-400">Clear dates, schedules, venues, and ticket price transparency in ₦.</span>
              </div>
            </div>
          </div>

          {/* 1-Click Interactive Test Scenarios */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Interactive Test Scenarios (Click to Run Instantly)
            </h3>

            <div className="space-y-3">
              
              {/* Scenario 1: Structured Search */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Scenario 1: Structured Location Search</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800">
                      Primary Test Case
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Searches for <strong className="text-emerald-400">"Ikeja"</strong>. Notice that <strong className="text-slate-200">"Echoes of the Homeland"</strong> and <strong className="text-slate-200">"Cinema Under the Stars"</strong> appear because their structured venue is in Ikeja, even though their titles do not say "Ikeja".
                  </p>
                </div>
                <button
                  onClick={() => {
                    onApplyScenario({ state: 'Lagos', neighbourhood: null }, 'Ikeja', 'All');
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Run Scenario 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scenario 2: Granular Neighbourhood Selection */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block">Scenario 2: Mainland vs Island Filtering</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Sets location strictly to <strong className="text-emerald-400">Victoria Island, Lagos</strong>. Discovers exclusive Island events (Afrobeats Live at Eko Hotel, Live Standup at Terra Kulture) without Mainland clutter.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onApplyScenario({ state: 'Lagos', neighbourhood: 'Victoria Island' }, '', 'All');
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs shrink-0 transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <span>Run Scenario 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scenario 3: Cross-State Discovery */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block">Scenario 3: Multi-State Coverage (Abuja FCT)</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Switches state to <strong className="text-emerald-400">Federal Capital Territory (Abuja) · Wuse</strong>. Verifies location switching updates results instantly to Silverbird Entertainment Centre Abuja.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onApplyScenario({ state: 'Federal Capital Territory (Abuja)', neighbourhood: 'Wuse' }, '', 'All');
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs shrink-0 transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <span>Run Scenario 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scenario 4: Empty State & Recovery */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block">Scenario 4: Contextual Empty State & 1-Click Broaden</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Filters by <strong className="text-emerald-400">Yaba</strong> with query <strong className="text-slate-200">"Comedy"</strong>. Demonstrates the contextual empty state that preserves user location and provides a 1-click "Broaden to all Lagos State" button.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onApplyScenario({ state: 'Lagos', neighbourhood: 'Yaba' }, 'Comedy', 'All');
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs shrink-0 transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <span>Run Scenario 4</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scenario 5: Kano State Cinema Discovery */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block">Scenario 5: Kano State Cinema Discovery</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Switches state to <strong className="text-emerald-400">Kano State · Emir Mall (FilmOne Cinema)</strong>. Surfaces the gala Kannywood/Nollywood premiere screening at FilmOne Cinema Emir Mall.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onApplyScenario({ state: 'Kano', neighbourhood: 'Emir Mall (FilmOne Cinema)' }, '', 'All');
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shrink-0 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Run Kano Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Prototype Design Principles */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <span className="text-slate-200 font-semibold block">Craft & Compliance Highlights:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong className="text-slate-300">New User Onboarding & Auth:</strong> Sign up or sign in with Email & Password or Google ID, with location preference sync.</li>
              <li><strong className="text-slate-300">Zero-Pill Metadata Discipline:</strong> Clean inline typographic separators (`·`), no pill badge sandwiches on cards.</li>
              <li><strong className="text-slate-300">Tabular Numerals:</strong> Strict vertical baseline alignment for all Naira (₦) ticket prices.</li>
              <li><strong className="text-slate-300">Mobile-First Touch Architecture:</strong> Thumb-friendly touch targets (min 44px) and adaptive bottom action bars.</li>
              <li><strong className="text-slate-300">Structured Data Grounding:</strong> Fictional demonstration events with complete venue, landmark, and neighbourhood metadata.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors cursor-pointer"
          >
            Dismiss Guide
          </button>
        </div>

      </div>
    </div>
  );
};
