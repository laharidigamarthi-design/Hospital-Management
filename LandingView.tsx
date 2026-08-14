import React from 'react';
import {
  Heart,
  Brain,
  Bone,
  Smile,
  Microscope,
  Calendar,
  Search,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Users,
  Activity,
  ChevronRight,
  Stethoscope,
  Building,
  Pill,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface LandingViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const centersOfExcellence = [
    {
      title: 'Cardiology Institute',
      icon: Heart,
      color: 'rose',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      description: 'Advanced cardiac diagnostics, interventional catheterization, and round-the-clock arrhythmia management.',
    },
    {
      title: 'Neurology Sciences',
      icon: Brain,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      description: 'Comprehensive neurological diagnostic imaging, stroke protocol management, and neuro-oncology surgery.',
    },
    {
      title: 'Orthopedics & Joint',
      icon: Bone,
      color: 'cyan',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      description: 'Minimally invasive joint reconstructions, robotic arthroplasty, and specialized sports injury recovery.',
    },
    {
      title: 'Pediatrics & Neonatal',
      icon: Smile,
      color: 'amber',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      description: 'Compassionate pediatric specialty clinic, Level IV NICU care, and holistic adolescent preventive medicine.',
    },
    {
      title: 'Comprehensive Oncology',
      icon: Microscope,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      description: 'Targeted molecular therapies, genomic sequencing, precision radiation, and multidisciplinary tumor boards.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section with Hospital Photo Backdrop */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=80"
            alt="Modern Hospital Facility"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-wide mb-6">
              <Award className="w-3.5 h-3.5 text-teal-300" />
              <span>Ranked #1 in Regional Clinical Care & Safety</span>
            </div>

            {/* Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Precision Medicine. <br className="hidden sm:inline" />
              <span className="text-teal-400">Compassionate Care.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Experience world-class healthcare tailored to you. Our state-of-the-art facilities, certified diagnostic telemetry, and leading specialists are dedicated to your well-being.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('appointments')}
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-600/30 hover:shadow-teal-500/40 transition-all flex items-center gap-2"
                id="hero-book-apt-btn"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('appointments')}
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2 backdrop-blur-sm"
                id="hero-find-doctor-btn"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Find a Doctor</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Statistics Bar */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            <div className="flex items-center gap-4 pt-2 lg:pt-0">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">500+</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Specialist Doctors</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-2 lg:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">24/7</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Emergency Care</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100k+</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patients Annually</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">15+</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Years of Excellence</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Centers of Excellence Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
              Clinical Specializations
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Centers of Excellence
            </h2>
          </div>
          <button
            onClick={() => onNavigate('departments')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 group"
          >
            <span>Explore all clinical departments</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centersOfExcellence.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
                <button
                  onClick={() => onNavigate('departments')}
                  className="text-xs font-bold text-slate-900 flex items-center gap-1 group-hover:text-teal-600"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {/* Call to Register / Patient Onboarding Card */}
          <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-800/80 text-teal-200 text-[11px] font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>New Patient Registration</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Register with Lumina Today</h3>
              <p className="text-xs text-teal-100/80 leading-relaxed">
                Create your secure digital health passport, upload medical records, and gain direct access to our specialist network.
              </p>
            </div>
            <button
              onClick={() => onNavigate('patient-registration')}
              className="mt-6 w-full py-2.5 bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              id="landing-register-patient-btn"
            >
              <span>Begin Registration</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Direct Interactive Modules Banner */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Integrated Medical Ecosystem
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">
                Experience the Clinical Command Center
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Seamlessly toggle between Dr. Carter's clinician command center, patient health records, inpatient ICU telemetry, and pharmacy inventory control.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('doctor-dashboard')}
                className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Doctor Command Center</span>
              </button>

              <button
                onClick={() => onNavigate('patient-portal')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Patient Health Portal</span>
              </button>

              <button
                onClick={() => onNavigate('facility')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Building className="w-4 h-4" />
                <span>ICU & Bed Management</span>
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
