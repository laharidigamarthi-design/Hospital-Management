import React from 'react';
import { X, PhoneCall, ShieldAlert, Ambulance, AlertOctagon, MapPin, HeartPulse } from 'lucide-react';

interface EmergencyModalProps {
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-200 animate-in zoom-in-95 duration-150 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-rose-900">
                Emergency & Trauma Center
              </h3>
              <p className="text-xs text-rose-600 font-semibold">24/7 Level 1 Adult & Pediatric Trauma</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Life-Threatening Warning Banner */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-rose-800">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>If you are experiencing a life-threatening emergency, call 911 immediately.</span>
          </div>
          <p className="text-[11px] text-rose-700 leading-relaxed">
            For chest pain, severe shortness of breath, sudden numbness or speech difficulty, head trauma, or uncontrollable bleeding, immediately proceed to the nearest emergency room.
          </p>
        </div>

        {/* Direct Action Hotlines */}
        <div className="space-y-3">
          <a
            href="tel:911"
            className="w-full p-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5" />
              <span>Call 911 (Emergency Dispatch)</span>
            </div>
            <span className="text-xs bg-rose-700/80 px-2 py-1 rounded">Immediate</span>
          </a>

          <a
            href="tel:5559114325"
            className="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <Ambulance className="w-5 h-5 text-teal-400" />
              <div>
                <p className="font-bold">Lumina Direct ER Intake Desk</p>
                <p className="text-[10px] text-slate-400">+1 (555) 911-HEAL (4325)</p>
              </div>
            </div>
            <span className="text-[11px] text-teal-400 font-bold">Fast Lane</span>
          </a>
        </div>

        {/* ER Facility Location */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs">
          <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-slate-900">Emergency Department Entrance</p>
            <p className="text-slate-500 mt-0.5">
              Bay 1 Ambulance Bay & Walk-in Triage: 742 Evergreen Medical Way, Metro District (Follow RED Emergency Signs).
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
};
