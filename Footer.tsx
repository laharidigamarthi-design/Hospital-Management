import React from 'react';
import { HeartPulse, ShieldCheck, Phone, MapPin, Mail, Lock } from 'lucide-react';
import { ScreenType } from '../../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                Lumina<span className="text-teal-400">Health</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision medicine and compassionate clinical care powered by state-of-the-art diagnostic facilities and leading regional medical specialists.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-teal-400 bg-teal-950/60 border border-teal-800/60 px-2.5 py-1 rounded-md w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HIPAA Compliant & Encrypted</span>
            </div>
          </div>

          {/* Clinical Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Clinical Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('doctor-dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Doctor Command Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('patient-portal')}
                  className="hover:text-white transition-colors"
                >
                  Patient Health Records
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('appointments')}
                  className="hover:text-white transition-colors"
                >
                  Schedule Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facility')}
                  className="hover:text-white transition-colors"
                >
                  ICU Bed & Ward Manager
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pharmacy')}
                  className="hover:text-white transition-colors"
                >
                  Pharmacy & Dispensary
                </button>
              </li>
            </ul>
          </div>

          {/* Centers of Excellence */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Specialties
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="hover:text-white transition-colors"
                >
                  Cardiovascular Institute
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="hover:text-white transition-colors"
                >
                  Neurological Sciences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="hover:text-white transition-colors"
                >
                  Orthopedic & Joint Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="hover:text-white transition-colors"
                >
                  Pediatrics & Neonatal Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="hover:text-white transition-colors"
                >
                  Comprehensive Oncology
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Campus Contact */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Emergency & Campus
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>Emergency Hotline: (555) 911-HEAL</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>742 Evergreen Medical Way, Metro Health District, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>contact@luminahealth.org</span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-1 rounded">
                  24/7 Level 1 Trauma Center
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2024 Lumina Health Systems. Clinical Clarity Design.</p>
          <div className="flex flex-wrap gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Patient Rights</span>
            <span className="hover:text-slate-300 cursor-pointer">Contact Admin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
