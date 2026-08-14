import React, { useState } from 'react';
import { ScreenType, UserRole, Patient, Appointment, Prescription, HospitalBed, PharmacyItem, MedicalImageScan } from './types';
import {
  INITIAL_PATIENTS,
  DOCTORS,
  INITIAL_APPOINTMENTS,
  SARAH_PRESCRIPTIONS,
  ELEANOR_PRESCRIPTIONS,
  SARAH_LAB_REPORTS,
  ELEANOR_LAB_REPORTS,
  MEDICAL_SCANS,
  HOSPITAL_BEDS,
  PHARMACY_ITEMS,
  DEPARTMENTS,
  CLINICAL_ACTIVITIES,
} from './data/mockData';

// Common Components
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';

// Screen Views
import { LandingView } from './components/views/LandingView';
import { DoctorDashboardView } from './components/views/DoctorDashboardView';
import { PatientPortalView } from './components/views/PatientPortalView';
import { PatientRegistrationView } from './components/views/PatientRegistrationView';
import { ScheduleConsultationView } from './components/views/ScheduleConsultationView';
import { MedicalRecordsView } from './components/views/MedicalRecordsView';
import { FacilityView } from './components/views/FacilityView';
import { PharmacyView } from './components/views/PharmacyView';
import { DepartmentsView } from './components/views/DepartmentsView';

// Modals
import { DicomViewerModal } from './components/modals/DicomViewerModal';
import { NewPrescriptionModal } from './components/modals/NewPrescriptionModal';
import { ClinicalNotesModal } from './components/modals/ClinicalNotesModal';
import { PaymentModal } from './components/modals/PaymentModal';
import { EmergencyModal } from './components/modals/EmergencyModal';

export default function App() {
  // Navigation & Role State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [userRole, setUserRole] = useState<UserRole>('public');

  // Application Data States
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-1'); // Sarah Jenkins
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [sarahPrescriptions, setSarahPrescriptions] = useState<Prescription[]>(SARAH_PRESCRIPTIONS);
  const [eleanorPrescriptions, setEleanorPrescriptions] = useState<Prescription[]>(ELEANOR_PRESCRIPTIONS);
  const [beds, setBeds] = useState<HospitalBed[]>(HOSPITAL_BEDS);
  const [pharmacyItems, setPharmacyItems] = useState<PharmacyItem[]>(PHARMACY_ITEMS);
  const [activities, setActivities] = useState(CLINICAL_ACTIVITIES);

  // Modals
  const [showDicomViewer, setShowDicomViewer] = useState(false);
  const [activeScanId, setActiveScanId] = useState<string | undefined>(undefined);
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [showClinicalNotes, setShowClinicalNotes] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  // Selected Patient Details
  const activePatient = patients.find((p) => p.id === selectedPatientId) || patients[0];
  const activePrescriptions = selectedPatientId === 'pat-2' ? eleanorPrescriptions : sarahPrescriptions;
  const activeLabReports = selectedPatientId === 'pat-2' ? ELEANOR_LAB_REPORTS : SARAH_LAB_REPORTS;

  // Handlers
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    // Align role perspective smoothly
    if (screen === 'doctor-dashboard' || screen === 'facility' || screen === 'pharmacy') {
      setUserRole('doctor');
    } else if (screen === 'patient-portal') {
      setUserRole('patient');
    } else if (screen === 'landing') {
      setUserRole('public');
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
  };

  const handleBookAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
    // Also add to clinical activity
    const newActivity = {
      id: `act-${Date.now()}`,
      title: 'New Consultation Booked',
      timeAgo: 'Just now',
      patientName: newApt.patientName,
      description: `${newApt.type} scheduled with ${newApt.doctorName} for ${newApt.date}.`,
      type: 'admission' as const,
      dotColor: 'blue' as const,
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handlePrescribe = (newRx: Prescription) => {
    if (selectedPatientId === 'pat-2') {
      setEleanorPrescriptions((prev) => [newRx, ...prev]);
    } else {
      setSarahPrescriptions((prev) => [newRx, ...prev]);
    }
    const newActivity = {
      id: `act-${Date.now()}`,
      title: 'Prescription Issued',
      timeAgo: 'Just now',
      patientName: activePatient.name,
      description: `Authorized ${newRx.medicineName} (${newRx.dosage}) for ${activePatient.name}.`,
      type: 'prescription' as const,
      dotColor: 'blue' as const,
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleSaveNote = (note: { patientName: string; title: string; text: string }) => {
    const newActivity = {
      id: `act-${Date.now()}`,
      title: 'Clinical SOAP Note Added',
      timeAgo: 'Just now',
      patientName: note.patientName,
      description: note.text,
      type: 'note' as const,
      dotColor: 'amber' as const,
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleOpenDicom = (scanId?: string) => {
    setActiveScanId(scanId);
    setShowDicomViewer(true);
  };

  // Determine layout style:
  // Is this a command center / dashboard internal screen?
  const isCommandCenterScreen = [
    'doctor-dashboard',
    'medical-records',
    'facility',
    'pharmacy',
    'inventory',
    'staff',
    'analytics',
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Application Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        onOpenEmergency={() => setShowEmergency(true)}
      />

      {/* Main Body Layout */}
      {isCommandCenterScreen ? (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Clinical Command Center Sidebar */}
          <Sidebar currentScreen={currentScreen} onNavigate={handleNavigate} />

          {/* Main Command Center Content Pane */}
          <main className="flex-1 p-6 lg:p-8 overflow-x-hidden min-w-0">
            {currentScreen === 'doctor-dashboard' && (
              <DoctorDashboardView
                appointments={appointments}
                activities={activities}
                onNavigate={handleNavigate}
                onOpenNewPrescription={() => setShowNewPrescription(true)}
                onOpenClinicalNotes={() => setShowClinicalNotes(true)}
                onSelectPatient={(pid) => setSelectedPatientId(pid)}
              />
            )}

            {currentScreen === 'medical-records' && (
              <MedicalRecordsView
                patient={patients.find((p) => p.id === 'pat-2') || patients[1]} // Eleanor Vance
                prescriptions={eleanorPrescriptions}
                labReports={ELEANOR_LAB_REPORTS}
                scans={MEDICAL_SCANS}
                onOpenDicomViewer={handleOpenDicom}
                onOpenNewPrescription={() => setShowNewPrescription(true)}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'facility' && (
              <FacilityView
                beds={beds}
                onUpdateBeds={setBeds}
                onNavigate={handleNavigate}
              />
            )}

            {currentScreen === 'pharmacy' && (
              <PharmacyView
                items={pharmacyItems}
                onUpdateItems={setPharmacyItems}
                onNavigate={handleNavigate}
              />
            )}

            {(currentScreen === 'staff' || currentScreen === 'analytics') && (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold capitalize text-slate-900">{currentScreen} Overview</h2>
                <p className="text-xs text-slate-500">
                  Clinical staffing rotas, credentialing records, and hospital performance metrics.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase">On-Duty Physicians</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">42 MDs</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase">Nursing Staff</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">128 RNs</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase">ICU Readiness</p>
                    <p className="text-2xl font-extrabold text-teal-600 mt-1">99.4%</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        /* Standalone Screen Views */
        <main className="flex-1">
          {currentScreen === 'landing' && <LandingView onNavigate={handleNavigate} />}

          {currentScreen === 'patient-portal' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <PatientPortalView
                patient={patients[0]} // Sarah Jenkins
                prescriptions={sarahPrescriptions}
                labReports={SARAH_LAB_REPORTS}
                onNavigate={handleNavigate}
                onOpenPayment={() => setShowPayment(true)}
                onOpenDicomViewer={handleOpenDicom}
              />
            </div>
          )}

          {currentScreen === 'patient-registration' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <PatientRegistrationView
                onRegisterComplete={(p) => {
                  setPatients([p, ...patients]);
                  setSelectedPatientId(p.id);
                }}
                onNavigate={handleNavigate}
              />
            </div>
          )}

          {currentScreen === 'appointments' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ScheduleConsultationView
                doctors={DOCTORS}
                onBookAppointment={handleBookAppointment}
                onNavigate={handleNavigate}
              />
            </div>
          )}

          {currentScreen === 'departments' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <DepartmentsView
                departments={DEPARTMENTS}
                onNavigate={handleNavigate}
              />
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals */}
      {showDicomViewer && (
        <DicomViewerModal
          scans={MEDICAL_SCANS}
          initialScanId={activeScanId}
          onClose={() => setShowDicomViewer(false)}
        />
      )}

      {showNewPrescription && (
        <NewPrescriptionModal
          patients={patients}
          onPrescribe={handlePrescribe}
          onClose={() => setShowNewPrescription(false)}
        />
      )}

      {showClinicalNotes && (
        <ClinicalNotesModal
          patients={patients}
          onSaveNote={handleSaveNote}
          onClose={() => setShowClinicalNotes(false)}
        />
      )}

      {showPayment && (
        <PaymentModal
          onSuccess={() => {}}
          onClose={() => setShowPayment(false)}
        />
      )}

      {showEmergency && (
        <EmergencyModal onClose={() => setShowEmergency(false)} />
      )}

    </div>
  );
}

