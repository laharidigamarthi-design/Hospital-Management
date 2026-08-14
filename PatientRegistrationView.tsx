import React, { useState } from 'react';
import {
  User,
  Shield,
  FileCheck,
  Lock,
  Upload,
  Camera,
  Calendar,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HeartPulse,
} from 'lucide-react';
import { Patient, ScreenType } from '../../types';

interface PatientRegistrationViewProps {
  onRegisterComplete: (patient: Patient) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const PatientRegistrationView: React.FC<PatientRegistrationViewProps> = ({
  onRegisterComplete,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Jenkins',
    dob: '1985-10-14',
    gender: 'Female' as 'Female' | 'Male' | 'Other',
    phone: '+1 (555) 234-8921',
    email: 'sarah.jenkins@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    address: '742 Evergreen Terrace, Metro City, CA',
    insuranceProvider: 'Blue Cross Shield Platinum',
    insurancePolicy: 'BCS-892401-CA',
    bloodType: 'O+',
    allergies: 'Penicillin',
    conditions: 'Mild Hypertension',
    emergencyContact: 'Mark Jenkins (Spouse) - +1 (555) 234-8922',
  });

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Contact & Insurance', icon: Shield },
    { id: 3, title: 'Medical History', icon: HeartPulse },
    { id: 4, title: 'Security & Consent', icon: Lock },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete Registration
      const newPatient: Patient = {
        id: `pat-${Date.now()}`,
        mrn: `LH-${Math.floor(1000 + Math.random() * 9000)}-A`,
        name: `${formData.firstName} ${formData.lastName}`,
        gender: formData.gender,
        dob: formData.dob,
        age: 39,
        bloodType: formData.bloodType || 'O+',
        weightKg: 68,
        allergies: formData.allergies ? [formData.allergies] : [],
        conditions: formData.conditions ? [formData.conditions] : [],
        primaryCareDoctor: 'Dr. Elena Rostova',
        status: 'Stable / Outpatient',
        avatarUrl: formData.avatarUrl,
        phone: formData.phone,
        email: formData.email,
      };

      setSubmittedSuccess(true);
      setTimeout(() => {
        onRegisterComplete(newPatient);
        onNavigate('patient-portal');
      }, 1800);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, avatarUrl: url });
    }
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Registration Complete!</h2>
        <p className="text-xs text-slate-500 mt-2">
          Your Lumina Health Medical Record has been generated. Redirecting to your patient portal...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Patient Registration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete the form below to enroll in Lumina Health digital care system.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isDone = currentStep > s.id;
            const isCurrent = currentStep === s.id;

            return (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-teal-600 text-white'
                        : isCurrent
                        ? 'bg-teal-50 border-2 border-teal-600 text-teal-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Step {s.id}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 ${
                      currentStep > s.id ? 'bg-teal-600' : 'bg-slate-200'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        
        {/* STEP 1: Personal Info (Image 5) */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              1. Personal Information
            </h2>

            {/* Photo Upload Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Patient Photograph
              </label>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden shrink-0 relative group">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-6 h-6 text-slate-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    id="patient-photo-input"
                  />
                </div>
                <div className="text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">Upload profile image</p>
                  <p className="text-[11px] text-slate-400">JPG, PNG up to 5MB for clinical biometric record</p>
                  <label
                    htmlFor="patient-photo-input"
                    className="inline-block mt-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer text-[11px] transition-colors"
                  >
                    Select File
                  </label>
                </div>
              </div>
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Legal First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. Sarah"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  id="reg-first-name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Legal Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="e.g. Jenkins"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  id="reg-last-name"
                />
              </div>
            </div>

            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    id="reg-dob"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Gender Identity
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value as 'Female' | 'Male' | 'Other' })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  id="reg-gender"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Non-binary / Other</option>
                </select>
              </div>
            </div>

            {/* Primary Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Primary Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  id="reg-phone"
                />
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: Contact & Insurance */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              2. Contact & Insurance Coverage
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address (for portal login & lab alerts)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Residential Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Policy / Member ID
                </label>
                <input
                  type="text"
                  value={formData.insurancePolicy}
                  onChange={(e) => setFormData({ ...formData, insurancePolicy: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Medical History */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              3. Clinical History & Allergies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Blood Type
                </label>
                <select
                  value={formData.bloodType}
                  onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Known Drug & Environmental Allergies
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="e.g. Penicillin, Latex, Sulfa"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Pre-existing Conditions / Chronic Diagnoses
              </label>
              <input
                type="text"
                value={formData.conditions}
                onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                placeholder="e.g. Hypertension, Asthma, Diabetes"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Emergency Contact Name & Number
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Security & Consent */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              4. Consent & Security Acknowledgment
            </h2>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-3 leading-relaxed">
              <p className="font-semibold text-slate-800">
                HIPAA & Medical Information Release Authorization
              </p>
              <p>
                By completing this registration, you consent to Lumina Health Systems maintaining your electronic health records (EHR) and facilitating communication between attending physicians, licensed diagnostic labs, and inpatient care providers.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                defaultChecked
                id="consent-check"
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 mt-0.5"
              />
              <label htmlFor="consent-check" className="text-xs text-slate-700 font-medium">
                I acknowledge the privacy practices and certify that the clinical information provided is accurate to the best of my knowledge.
              </label>
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm shadow-teal-600/20 transition-colors flex items-center gap-2"
            id="reg-next-btn"
          >
            <span>{currentStep === 4 ? 'Submit Registration' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
