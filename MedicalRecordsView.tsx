import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  Clock,
  Pill,
  Plus,
  FileText,
  Download,
  Eye,
  ShieldAlert,
  ChevronRight,
  Upload,
  UserCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Patient, Prescription, LabReport, MedicalImageScan, ScreenType } from '../../types';

interface MedicalRecordsViewProps {
  patient: Patient;
  prescriptions: Prescription[];
  labReports: LabReport[];
  scans: MedicalImageScan[];
  onOpenDicomViewer: (scanId?: string) => void;
  onOpenNewPrescription: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const MedicalRecordsView: React.FC<MedicalRecordsViewProps> = ({
  patient,
  prescriptions,
  labReports,
  scans,
  onOpenDicomViewer,
  onOpenNewPrescription,
  onNavigate,
}) => {
  const [downloadAlert, setDownloadAlert] = useState<string | null>(null);

  const handleDownload = (name: string) => {
    setDownloadAlert(`Exporting official EHR record: ${name}`);
    setTimeout(() => setDownloadAlert(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <span>MEDICAL RECORDS</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-teal-600 font-bold">PATIENT MRN-{patient.mrn}</span>
      </div>

      {downloadAlert && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600" />
          <span>{downloadAlert}</span>
        </div>
      )}

      {/* Patient Profile Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
                <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  MRN: {patient.mrn}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.gender}, {patient.age} yrs (DOB: {patient.dob}) • {patient.bloodType}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                {patient.allergies.map((allergy, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
                  >
                    <ShieldAlert className="w-3 h-3 text-rose-500" />
                    <span>{allergy}</span>
                  </span>
                ))}

                {patient.conditions?.map((cond, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold"
                  >
                    <span>{cond}</span>
                  </span>
                ))}

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-teal-500" />
                  <span>{patient.status}</span>
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('patient-registration')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
          >
            Update Record
          </button>

        </div>
      </div>

      {/* Vitals Snapshot Card (4 Metric Blocks) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Vitals Snapshot
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Last taken: 2h ago</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-rose-600 mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-600">Blood Pressure</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900">118/76</p>
            <p className="text-[10px] text-slate-400">mmHg (Normal)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-teal-600 mb-1">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-600">Heart Rate</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900">72</p>
            <p className="text-[10px] text-slate-400">bpm (Resting)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-600">Temperature</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900">98.6</p>
            <p className="text-[10px] text-slate-400">°F (Oral)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Wind className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-600">SpO2 Oxygen</span>
            </div>
            <p className="text-xl font-extrabold text-slate-900">99%</p>
            <p className="text-[10px] text-slate-400">Room air</p>
          </div>

        </div>
      </div>

      {/* Main Grid: Left 2 Cols (Clinical Timeline & Lab Reports), Right 1 Col (Prescriptions & Imaging) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Clinical Timeline */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-5">
              Clinical Timeline
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white"></div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Blood Panel Results</h4>
                  <span className="text-[11px] text-slate-400">Today, 09:00</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  CBC and Comprehensive Metabolic Panel completed. Electrolytes and liver panels within normal ranges.
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white"></div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Prescription Renewal</h4>
                  <span className="text-[11px] text-slate-400">Oct 12, 2024</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Albuterol Sulfate Inhaler authorized for 6-month seasonal asthma maintenance.
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-400 ring-4 ring-white"></div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Outpatient Consultation</h4>
                  <span className="text-[11px] text-slate-400">Sep 05, 2024</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Routine checkup with Dr. Aris. Reported mild seasonal allergies, prescribed Loratadine.
                </p>
              </div>

            </div>
          </div>

          {/* Lab Reports Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Diagnostic Lab Reports
                </h3>
              </div>
              <button
                onClick={() => alert("Showing all historical laboratory records for this patient.")}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {labReports.map((lab) => (
                <div
                  key={lab.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{lab.testName}</p>
                      <p className="text-[11px] text-slate-400">
                        {lab.date} • {lab.facility}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        lab.status === 'Reviewed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {lab.status}
                    </span>
                    <button
                      onClick={() => handleDownload(lab.testName)}
                      className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Active Prescriptions & Imaging Scans */}
        <div className="space-y-6">
          
          {/* Active Prescriptions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Active Prescriptions
              </h3>
              <button
                onClick={onOpenNewPrescription}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                id="med-records-add-rx-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Rx</span>
              </button>
            </div>

            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rx.medicineName}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {rx.dosage} • {rx.instructions}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Imaging & Scans (DICOM) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Imaging & Scans
              </h3>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                DICOM 3.0
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  onClick={() => onOpenDicomViewer(scan.id)}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 cursor-pointer aspect-video bg-slate-950"
                >
                  <img
                    src={scan.imageUrl}
                    alt={scan.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="text-[11px] font-bold leading-tight truncate">{scan.title}</p>
                    <p className="text-[9px] text-slate-300">{scan.modality} • {scan.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenDicomViewer()}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              id="open-dicom-viewer-btn"
            >
              <Eye className="w-4 h-4 text-teal-400" />
              <span>Open DICOM Image Viewer</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
