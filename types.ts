export type ScreenType =
  | 'landing'
  | 'doctor-dashboard'
  | 'patient-portal'
  | 'patient-registration'
  | 'appointments'
  | 'medical-records'
  | 'facility'
  | 'pharmacy'
  | 'departments'
  | 'inventory'
  | 'staff'
  | 'analytics'
  | 'settings'
  | 'support';

export type UserRole = 'doctor' | 'patient' | 'admin' | 'public';

export interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  rating: number;
  reviewsCount?: number;
  experienceYears: number;
  location: string;
  consultationFee: number;
  isTelehealth: boolean;
  avatarUrl: string;
  education?: string;
  availableDays?: string[];
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  gender: 'Female' | 'Male' | 'Other';
  dob: string;
  age: number;
  bloodType: string;
  weightKg: number;
  allergies: string[];
  conditions?: string[];
  primaryCareDoctor: string;
  status: 'Stable / Outpatient' | 'Inpatient' | 'Critical' | 'Discharged';
  avatarUrl: string;
  phone?: string;
  email?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientMrn: string;
  patientAvatar?: string;
  doctorName: string;
  department: string;
  date: string; // e.g. "Oct 24, 2024"
  time: string; // e.g. "09:00 AM"
  type: 'General Checkup' | 'Cardiology Review' | 'Blood Test Results' | 'Follow-up' | 'Cardiology Consult' | 'Neurology Consult';
  mode: 'In-person' | 'Telehealth';
  location: string;
  status: 'Completed' | 'Waiting' | 'Checked-in' | 'Scheduled' | 'Cancelled';
  room?: string;
}

export interface Prescription {
  id: string;
  medicineName: string;
  dosage: string;
  instructions: string;
  refillsLeft?: number;
  needsRefill?: boolean;
  prescribedBy?: string;
  datePrescribed?: string;
  expiryDate?: string;
}

export interface LabReport {
  id: string;
  testName: string;
  facility: string;
  date: string;
  status: 'Reviewed' | 'Archived' | 'Pending' | 'Completed';
  category: 'Lab' | 'Imaging' | 'Cardio';
  fileSize?: string;
  resultsSummary?: string;
}

export interface MedicalImageScan {
  id: string;
  title: string;
  date: string;
  modality: 'X-Ray' | 'MRI' | 'CT' | 'Ultrasound';
  bodyPart: string;
  imageUrl: string;
  notes: string;
}

export interface HospitalBed {
  id: string;
  bedNumber: string; // e.g. "Bed 101"
  status: 'occupied' | 'available' | 'maintenance';
  patientName?: string;
  doctorName?: string;
  hasTelemetry?: boolean;
  notes?: string;
  building: string;
  floor: number;
  ward: string;
}

export interface PharmacyItem {
  id: string;
  name: string;
  sku: string;
  category: 'Antibiotics' | 'Analgesics' | 'Cardiology' | 'Gastrointestinal' | 'Respiratory' | 'Neurology';
  stockUnits: number;
  status: 'Healthy' | 'Low' | 'Moderate' | 'Critical';
  pricePerUnit: number;
  expiryDate: string;
  isExpired?: boolean;
  reorderThreshold: number;
}

export interface DepartmentItem {
  id: string;
  name: string;
  specialistsCount: number;
  description: string;
  iconName: string;
  headOfDepartment: string;
  phone: string;
}

export interface ClinicalActivity {
  id: string;
  title: string;
  timeAgo: string;
  patientName: string;
  description: string;
  type: 'lab' | 'prescription' | 'note' | 'admission';
  dotColor: 'green' | 'blue' | 'amber' | 'purple';
}
