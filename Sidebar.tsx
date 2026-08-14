import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Pill,
  Package,
  Building2,
  UserCheck,
  BarChart3,
  HelpCircle,
  Settings,
  LogOut,
  HeartPulse,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  collapsed = false,
}) => {
  const mainNavItems = [
    { id: 'doctor-dashboard' as ScreenType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patient-portal' as ScreenType, label: 'Patients', icon: Users, badge: '5 Active' },
    { id: 'appointments' as ScreenType, label: 'Appointments', icon: Calendar, badge: '8 Today' },
    { id: 'medical-records' as ScreenType, label: 'Medical Records', icon: FileText },
    { id: 'pharmacy' as ScreenType, label: 'Pharmacy', icon: Pill },
    { id: 'facility' as ScreenType, label: 'Facility', icon: Building2, badge: '82%' },
    { id: 'staff' as ScreenType, label: 'Staff', icon: UserCheck },
    { id: 'departments' as ScreenType, label: 'Departments', icon: Package },
  ];

  const bottomNavItems = [
    { id: 'support' as ScreenType, label: 'Support', icon: HelpCircle },
    { id: 'settings' as ScreenType, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] select-none">
      
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100">
        <button
          onClick={() => onNavigate('doctor-dashboard')}
          className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold text-slate-900 leading-tight truncate">
              Lumina Medical
            </h2>
            <p className="text-[11px] font-medium text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded mt-0.5 inline-block">
              Clinical Command Center
            </p>
          </div>
        </button>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Clinical Operations
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
              id={`sidebar-link-${item.id}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive
                      ? 'bg-teal-700 text-teal-100'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Nav Items */}
      <div className="p-3 border-t border-slate-100 space-y-1 bg-slate-50/50">
        <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          System
        </div>
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4 text-slate-400" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* User Card / Logout */}
        <div className="pt-2 mt-2 border-t border-slate-200/80">
          <button
            onClick={() => onNavigate('landing')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-rose-600 transition-colors group"
            title="Return to Public Portal"
          >
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                alt="Dr. Carter"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">Dr. Carter</p>
                <p className="text-[10px] text-slate-400">Chief Medical Officer</p>
              </div>
            </div>
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
          </button>
        </div>

      </div>
    </aside>
  );
};
