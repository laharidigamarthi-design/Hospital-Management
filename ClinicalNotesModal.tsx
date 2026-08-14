import React, { useState } from 'react';
import { X, FileEdit, Check, Sparkles } from 'lucide-react';
import { Patient } from '../../types';

interface ClinicalNotesModalProps {
  patients: Patient[];
  onSaveNote: (note: { patientName: string; title: string; text: string }) => void;
  onClose: () => void;
}

export const ClinicalNotesModal: React.FC<ClinicalNotesModalProps> = ({
  patients,
  onSaveNote,
  onClose,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'pat-1');
  const [noteType, setNoteType] = useState('SOAP Note');
  const [subjective, setSubjective] = useState('Patient presents for routine follow-up. Reports good medication tolerance, occasional mild dyspnea with vigorous exertion.');
  const [objective, setObjective] = useState('BP: 118/76 mmHg, HR: 72 bpm regular rhythm, Lungs clear to auscultation bilaterally. No peripheral edema.');
  const [assessment, setAssessment] = useState('Essential hypertension, well-controlled on current regimen. Seasonal mild asthma.');
  const [plan, setPlan] = useState('1. Continue Lisinopril 10mg PO daily.\n2. Albuterol inhaler 2 puffs PRN.\n3. Repeat lipid panel and comprehensive metabolic panel in 6 months.');

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNote({
      patientName: selectedPatient.name,
      title: `${noteType} Recorded`,
      text: `S: ${subjective} | A: ${assessment} | P: ${plan}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">Physician Clinical Documentation (EHR SOAP)</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (MRN: #{p.mrn})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Encounter Type</label>
            <select
              value={noteType}
              onChange={(e) => setNoteType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            >
              <option value="SOAP Note">SOAP Progress Note</option>
              <option value="Consultation Note">Cardiology Consultation</option>
              <option value="Discharge Summary">Inpatient Discharge Summary</option>
              <option value="Procedure Note">Minor Outpatient Procedure</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">S — Subjective (Patient History & Symptoms)</label>
          <textarea
            rows={2}
            value={subjective}
            onChange={(e) => setSubjective(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">O — Objective (Vitals & Physical Exam)</label>
          <textarea
            rows={2}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">A — Assessment (Diagnosis & Clinical Impression)</label>
          <textarea
            rows={2}
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">P — Plan (Orders, Medications & Follow-up)</label>
          <textarea
            rows={2}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
            required
          />
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
            Sign & Commit to EHR Chart
          </button>
        </div>
      </form>
    </div>
  );
};
