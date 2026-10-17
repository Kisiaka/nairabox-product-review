import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onOpenLocationModal: () => void;
  onOpenWalkthroughModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLocationModal,
  onOpenWalkthroughModal,
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                N
              </div>
              <span className="text-base font-bold text-white font-sans">
                nairabox
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Location-Based Discovery Prototype. A proposed enhancement to Nigerian movie and event ticketing discovery across states and neighbourhoods.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-semibold mb-3">
              Locations
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenLocationModal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Lagos (Ikeja, Lekki, VI, Yaba, Agege, Ikorodu)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLocationModal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Abuja (Wuse, Maitama, Garki)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLocationModal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Port Harcourt (GRA, Trans-Amadi)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLocationModal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400/90 font-medium"
                >
                  Kano (Sabo Gerri, Emir Mall)
                </button>
              </li>
            </ul>
          </div>

          {/* Prototype Disclosure */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-semibold mb-3">
              Prototype Evaluation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenWalkthroughModal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-medium"
                >
                  Open 3-5 Min Review Guide
                </button>
              </li>
              <li>Exploratory Research Synthesis</li>
              <li>Structured Match Verification</li>
              <li>Eventbrite Benchmark Comparative</li>
            </ul>
          </div>

          {/* Notice */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Notice</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Demonstration prototype with illustrative event data. Not affiliated with or connected to live Nairabox production systems.
            </p>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <span>&copy; {new Date().getFullYear()} Nairabox Location Discovery Prototype. All sample data illustrative.</span>
          <div className="flex items-center gap-4">
            <span className="font-mono text-emerald-400">V1.1 PROTOTYPE</span>
            <span>·</span>
            <span>Lag / Abj / PH / Kano</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
