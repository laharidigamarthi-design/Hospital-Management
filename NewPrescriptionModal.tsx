import React, { useState } from 'react';
import { X, Pill, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { Prescription, Patient } from '../../types';

interface NewPrescriptionModalProps {
  patients: Patient[];
  onPrescribe: (prescription: Prescription) => void;
  onClose: () => void;
}

export const NewPrescriptionModal: React.FC<NewPrescriptionModalProps> = ({
  patients,
  onPrescribe,
  onClose,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'pat-1');
  const [medName, setMedName] = useState('Lisinopril');
  const [dosage, setDosage] = useState('10mg');
  const [instructions, setInstructions] = useState('1 tablet daily, morning');
  const [refills, setRefills] = useState(2);
  const [notes, setNotes] = useState('Monitor BP at 4-week follow-up');

  const commonMeds = [
    { name: 'Lisinopril', dosage: '10mg', defaultInstr: '1 tablet daily, morning' },
    { name: 'Atorvastatin', dosage: '20mg', defaultInstr: '1 tablet daily, evening' },
    { name: 'Albuterol Sulfate', dosage: '90mcg Inhaler', defaultInstr: '2 puffs q4-6h PRN' },
    { name: 'Amoxicillin', dosage: '500mg', defaultInstr: '1 capsule q8h for 7 days' },
    { name: 'Metformin', dosage: '850mg', defaultInstr: '1 tablet twice daily with meals' },
  ];

  const handleMedSelect = (m: (typeof commonMeds)[0]) => {
    setMedName(m.name);
    setDosage(m.dosage);
    setInstructions(m.defaultInstr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      medicineName: `${medName} ${dosage}`,
      dosage,
      instructions,
      refillsLeft: refills,
      needsRefill: false,
      prescribedBy: 'Dr. Carter',
      datePrescribed: 'Oct 24, 2024',
    };

    onPrescribe(newRx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">Issue Electronic Prescription (e-Rx)</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Patient</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (MRN: #{p.mrn}) — Allergy: {p.allergies.join(', ') || 'None'}
              </option>
            ))}
          </select>
        </div>

        {/* Quick select medication */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Quick Select Formulary</label>
          <div className="flex flex-wrap gap-1.5">
            {commonMeds.map((m) => (
              <button
                key={m.name}
                type="button"
                onClick={() => handleMedSelect(m)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                  medName === m.name
                    ? 'bg-teal-50 border-teal-600 text-teal-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {m.name} {m.dosage}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Medication Name</label>
            <input
              type="text"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Dosage / Strength</label>
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Sig / Patient Instructions</label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Authorized Refills</label>
            <input
              type="number"
              min="0"
              max="12"
              value={refills}
              onChange={(e) => setRefills(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Signature</label>
            <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 font-serif italic">
              Dr. Carter, MD (NPI: #1892049)
            </div>
          </div>
        </div>

        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-800 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>Formulary check passed. No known contraindications with patient record.</span>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow"
          >
            Authorize & Sign e-Rx
          </button>
        </div>
      </form>
    </div>
  );
};
