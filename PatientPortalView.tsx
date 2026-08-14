import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Pill,
  FileText,
  CreditCard,
  Download,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Plus,
  RefreshCw,
  Droplet,
  Scale,
  ShieldAlert,
  Phone,
  Video,
} from 'lucide-react';
import { Patient, Prescription, LabReport, ScreenType } from '../../types';

interface PatientPortalViewProps {
  patient: Patient;
  prescriptions: Prescription[];
  labReports: LabReport[];
  onNavigate: (screen: ScreenType) => void;
  onOpenPayment: () => void;
  onOpenDicomViewer: (scanId?: string) => void;
}

export const PatientPortalView: React.FC<PatientPortalViewProps> = ({
  patient,
  prescriptions,
  labReports,
  onNavigate,
  onOpenPayment,
  onOpenDicomViewer,
}) => {
  const [refillRequested, setRefillRequested] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (testName: string) => {
    setDownloadNotice(`Downloading secure PDF: ${testName}...`);
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  const handleRequestRefill = () => {
    setRefillRequested(true);
    setTimeout(() => setRefillRequested(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Patient Profile Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500/30 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
                <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  #{patient.mrn}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                DOB: {patient.dob} ({patient.age} yrs) • Primary: {patient.primaryCareDoctor}
              </p>

              {/* Patient Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  <Droplet className="w-3 h-3 text-rose-500" />
                  <span>Blood: {patient.bloodType}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                  <Scale className="w-3 h-3 text-blue-500" />
                  <span>{patient.weightKg} kg</span>
                </span>

                {patient.allergies.map((allergy, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold"
                  >
                    <ShieldAlert className="w-3 h-3 text-amber-500" />
                    <span>Allergy: {allergy}</span>
                  </span>
                ))}

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-teal-500" />
                  <span>{patient.status}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onNavigate('appointments')}
              className="flex-1 md:flex-none px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl shadow-sm shadow-teal-600/20 transition-colors flex items-center justify-center gap-1.5"
              id="patient-book-consult-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={() => onNavigate('patient-registration')}
              className="flex-1 md:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
            >
              Update Details
            </button>
          </div>

        </div>
      </div>

      {downloadNotice && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-xl flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>{downloadNotice}</span>
          </div>
        </div>
      )}

      {/* Main Content Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Appointment Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                Upcoming Appointment
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md border border-teal-200">
                In 3 Days
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-4">
                {/* Date Badge */}
                <div className="w-16 h-16 rounded-xl bg-teal-600 text-white flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider">THU</span>
                  <span className="text-xl font-extrabold leading-none">24</span>
                  <span className="text-[9px] font-medium text-teal-200">OCT</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Cardiology Consult with Dr. Marcus Thorne
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>10:00 AM (45 mins)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lumina Heart Center, East Wing, Room 402</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('appointments')}
                  className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => alert("Check-in details: Please bring photo ID and insurance card. Fast lane check-in active at East Wing kiosk.")}
                  className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
                >
                  Check-in Details
                </button>
              </div>
            </div>
          </div>

          {/* Active Prescriptions Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Prescriptions</h3>
                <p className="text-xs text-slate-400">Current ongoing medication regimen</p>
              </div>
              <button
                onClick={handleRequestRefill}
                disabled={refillRequested}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                id="patient-refill-btn"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refillRequested ? 'animate-spin' : ''}`} />
                <span>{refillRequested ? 'Refill Requested!' : 'Request Refill'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{rx.medicineName}</h4>
                        {rx.needsRefill && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-700">
                            Needs Refill
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{rx.instructions}</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Prescribed by {rx.prescribedBy} • Refills left: {rx.refillsLeft}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('pharmacy')}
                    className="text-xs font-medium text-slate-500 hover:text-slate-900 shrink-0"
                  >
                    Details &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Lab Reports & Records */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Lab Reports & Records</h3>
                <p className="text-xs text-slate-400">Diagnostic panels & certified radiological records</p>
              </div>
              <button
                onClick={() => onNavigate('medical-records')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {labReports.map((lab) => (
                <div
                  key={lab.id}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/60 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{lab.testName}</h4>
                      <p className="text-[11px] text-slate-400">
                        {lab.facility} • {lab.date} ({lab.fileSize})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {lab.category === 'Imaging' && (
                      <button
                        onClick={() => onOpenDicomViewer()}
                        className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                        DICOM Scan
                      </button>
                    )}
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

        {/* Right Column: Billing Summary & Quick Access */}
        <div className="space-y-6">
          
          {/* Billing Summary Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Billing Summary
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded border border-amber-200">
                Pending
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs text-slate-500">Current Outstanding Balance</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-0.5">$145.50</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 mb-5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Lab Services (Oct 15)</span>
                <span className="font-semibold text-slate-900">$85.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Consult Copay (Sep 28)</span>
                <span className="font-semibold text-slate-900">$60.50</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                <span>Total Amount Due</span>
                <span>$145.50</span>
              </div>
            </div>

            <button
              onClick={onOpenPayment}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm shadow-teal-600/20 transition-colors flex items-center justify-center gap-2"
              id="patient-pay-now-btn"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Now →</span>
            </button>
          </div>

          {/* Care Team Quick Contacts */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Your Care Team
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1594824813680-60b8d576a445?auto=format&fit=crop&w=120&q=80"
                    alt="Dr. Elena Rostova"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Dr. Elena Rostova</p>
                    <p className="text-[10px] text-slate-400">Primary Neurologist</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Connecting to Dr. Elena Rostova's clinical coordinator...")}
                  className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  title="Contact Doctor"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                    alt="Dr. Marcus Thorne"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Dr. Marcus Thorne</p>
                    <p className="text-[10px] text-slate-400">Cardiology Specialist</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Connecting to Cardiology Clinic Desk...")}
                  className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  title="Contact Doctor"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
