import React, { useState } from 'react';
import {
  Users,
  Clock,
  DollarSign,
  FileEdit,
  Pill,
  MoreVertical,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Search,
  Filter,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { Appointment, ClinicalActivity, ScreenType } from '../../types';

interface DoctorDashboardViewProps {
  appointments: Appointment[];
  activities: ClinicalActivity[];
  onNavigate: (screen: ScreenType) => void;
  onOpenNewPrescription: () => void;
  onOpenClinicalNotes: () => void;
  onSelectPatient: (patientId: string) => void;
}

export const DoctorDashboardView: React.FC<DoctorDashboardViewProps> = ({
  appointments,
  activities,
  onNavigate,
  onOpenNewPrescription,
  onOpenClinicalNotes,
  onSelectPatient,
}) => {
  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [appointmentList, setAppointmentList] = useState<Appointment[]>(appointments);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    setAppointmentList((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Good Morning, Dr. Carter
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Here is your clinical overview for today, Thursday, October 24th.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenClinicalNotes}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            id="doctor-notes-btn"
          >
            <FileEdit className="w-3.5 h-3.5 text-teal-600" />
            <span>Clinical Notes</span>
          </button>

          <button
            onClick={onOpenNewPrescription}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-teal-600/20"
            id="doctor-new-prescription-btn"
          >
            <Pill className="w-3.5 h-3.5" />
            <span>New Prescription</span>
          </button>
        </div>
      </div>

      {/* Top 3 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Patients Today
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">24</span>
              <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                +4 vs yesterday
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pending Consultations
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">8</span>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                Next in 15 mins
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Daily Clinical Billings
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">$1,240</span>
              <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                Targets met
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Grid: Left 2 Cols (Appointments + Activity), Right 1 Col (Calendar + Events) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Appointments Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Today's Appointments</h3>
                <p className="text-xs text-slate-400">Scheduled clinical patient consultations</p>
              </div>
              <button
                onClick={() => onNavigate('appointments')}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <span>View Full Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/75 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Consultation Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointmentList.map((apt) => {
                    const statusStyles = {
                      Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      Waiting: 'bg-amber-50 text-amber-700 border-amber-200',
                      'Checked-in': 'bg-blue-50 text-blue-700 border-blue-200',
                      Scheduled: 'bg-slate-100 text-slate-600 border-slate-200',
                      Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
                    }[apt.status];

                    return (
                      <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-[11px]">
                              {apt.patientName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  onSelectPatient(apt.patientId);
                                  onNavigate('medical-records');
                                }}
                                className="font-semibold text-slate-900 hover:text-teal-600 transition-colors text-left"
                              >
                                {apt.patientName}
                              </button>
                              <p className="text-[10px] text-slate-400">{apt.patientMrn}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {apt.time}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-slate-700">{apt.type}</span>
                          <span className="block text-[10px] text-slate-400">{apt.mode}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusStyles}`}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === apt.id ? null : apt.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            aria-label="Appointment options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === apt.id && (
                            <div className="absolute right-4 top-10 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 text-left animate-in fade-in duration-100">
                              <button
                                onClick={() => {
                                  onSelectPatient(apt.patientId);
                                  onNavigate('medical-records');
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                <span>Patient Chart</span>
                              </button>
                              <button
                                onClick={() => handleStatusChange(apt.id, 'Checked-in')}
                                className="w-full px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Mark Checked-in</span>
                              </button>
                              <button
                                onClick={() => handleStatusChange(apt.id, 'Completed')}
                                className="w-full px-3 py-2 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Mark Completed</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Clinical Activity Feed Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Recent Clinical Activity</h3>
              <span className="text-[11px] text-teal-600 font-semibold cursor-pointer hover:underline">
                Live Feed
              </span>
            </div>

            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="mt-1">
                    <span
                      className={`block w-2.5 h-2.5 rounded-full ${
                        act.dotColor === 'green'
                          ? 'bg-emerald-500'
                          : act.dotColor === 'blue'
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                    ></span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-800">
                        {act.title}
                        <span className="font-medium text-slate-500 ml-1.5">— {act.patientName}</span>
                      </p>
                      <span className="text-[10px] text-slate-400">{act.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Calendar Widget + Upcoming Events */}
        <div className="space-y-6">
          
          {/* Interactive Mini Calendar Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-900">October 2024</h3>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Calendar Days of Week */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-2">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>

            {/* Calendar Dates Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Prev month fill */}
              <span className="py-1.5 text-slate-300">29</span>
              <span className="py-1.5 text-slate-300">30</span>
              {/* Oct 1-31 */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const isSelected = selectedDate === day;
                const hasAppointments = day === 24 || day === 25 || day === 28;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`py-1.5 rounded-lg text-xs font-semibold relative transition-all ${
                      isSelected
                        ? 'bg-teal-600 text-white font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{day}</span>
                    {hasAppointments && !isSelected && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Department Meeting</h4>
                  <p className="text-[11px] text-slate-500">1:00 PM – 2:00 PM • Conf. 302</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Medical Board Review</h4>
                  <p className="text-[11px] text-slate-500">Tomorrow, 10:00 AM • Boardroom A</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
