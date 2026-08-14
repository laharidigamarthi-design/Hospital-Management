import React, { useState } from 'react';
import {
  HeartPulse,
  Search,
  Bell,
  Settings,
  PhoneCall,
  UserCheck,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  Calendar,
  Layers,
  FileText,
} from 'lucide-react';
import { ScreenType, UserRole } from '../../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onRoleChange,
  onOpenEmergency,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'STAT Lab Results', desc: 'Emma Lawson blood panel is ready for review', time: '10m ago', unread: true },
    { id: 2, title: 'Prescription Refill', desc: 'Sarah Jenkins requested Atorvastatin 20mg renewal', time: '45m ago', unread: true },
    { id: 3, title: 'Bed 105 Maintenance', desc: 'Terminal cleaning completed in ICU Bay 2', time: '2h ago', unread: false },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
              id="header-brand-logo"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Lumina<span className="text-teal-600 font-semibold">Health</span>
                </span>
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                  Systems
                </span>
              </div>
            </button>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
              <button
                onClick={() => onNavigate('appointments')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  currentScreen === 'appointments'
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Find Doctor
              </button>

              <button
                onClick={() => onNavigate('departments')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  currentScreen === 'departments'
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Services
              </button>

              <button
                onClick={() => onNavigate('doctor-dashboard')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  currentScreen === 'doctor-dashboard'
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Clinical Hub
              </button>

              <button
                onClick={() => onNavigate('patient-portal')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                  currentScreen === 'patient-portal'
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Patient Portal
              </button>

              <button
                onClick={onOpenEmergency}
                className="px-3 py-1.5 text-xs uppercase font-bold tracking-wide text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg flex items-center gap-1.5 transition-colors border border-rose-200/80 ml-2"
                id="header-emergency-btn"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                Emergency
              </button>
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            {/* Persona Switcher Badge */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs font-medium text-slate-700 border border-slate-200 transition-colors"
                id="role-switcher-btn"
                title="Switch View Perspective"
              >
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="hidden sm:inline">Role:</span>
                <span className="font-semibold text-slate-900 capitalize">
                  {userRole === 'doctor' ? 'Dr. Carter (MD)' : userRole === 'patient' ? 'Sarah Jenkins' : 'Visitor'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch App View
                  </div>
                  <button
                    onClick={() => {
                      onRoleChange('doctor');
                      onNavigate('doctor-dashboard');
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      userRole === 'doctor' ? 'text-teal-700 font-semibold bg-teal-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>🩺 Clinician (Dr. Carter)</span>
                    {userRole === 'doctor' && <span className="text-[10px] text-teal-600 font-bold">ACTIVE</span>}
                  </button>
                  <button
                    onClick={() => {
                      onRoleChange('patient');
                      onNavigate('patient-portal');
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      userRole === 'patient' ? 'text-teal-700 font-semibold bg-teal-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>👤 Patient (Sarah Jenkins)</span>
                    {userRole === 'patient' && <span className="text-[10px] text-teal-600 font-bold">ACTIVE</span>}
                  </button>
                  <button
                    onClick={() => {
                      onRoleChange('public');
                      onNavigate('landing');
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      userRole === 'public' ? 'text-teal-700 font-semibold bg-teal-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>🌐 Public Hospital Portal</span>
                    {userRole === 'public' && <span className="text-[10px] text-teal-600 font-bold">ACTIVE</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                id="header-notifications-btn"
                aria-label="View notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-600 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Clinical Alerts</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded-md">2 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-3 py-1.5 bg-slate-50 text-center border-t border-slate-100">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-[11px] text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <button
              onClick={() => {
                if (userRole === 'doctor') onNavigate('doctor-dashboard');
                else if (userRole === 'patient') onNavigate('patient-portal');
                else onNavigate('landing');
              }}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-teal-500/20 transition-all"
              id="header-user-avatar"
            >
              <img
                src={
                  userRole === 'patient'
                    ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
                    : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80'
                }
                alt="User profile"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
