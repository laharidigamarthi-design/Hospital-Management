import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Star,
  Video,
  Building,
  Calendar as CalendarIcon,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { Doctor, Appointment, ScreenType } from '../../types';

interface ScheduleConsultationViewProps {
  doctors: Doctor[];
  onBookAppointment: (appointment: Appointment) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const ScheduleConsultationView: React.FC<ScheduleConsultationViewProps> = ({
  doctors,
  onBookAppointment,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || 'doc-1');
  const [consultationMode, setConsultationMode] = useState<'In-person' | 'Telehealth'>('In-person');
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [bookedNotice, setBookedNotice] = useState<string | null>(null);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    const matchesLoc =
      selectedLocation === 'All' ||
      (selectedLocation === 'Telehealth' ? doc.isTelehealth : doc.location === selectedLocation);

    return matchesSearch && matchesDept && matchesLoc;
  });

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '11:30 AM'];
  const afternoonSlots = ['01:00 PM', '02:30 PM', '03:45 PM', '04:30 PM'];

  const handleConfirmBooking = () => {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: 'pat-1',
      patientName: 'Sarah Jenkins',
      patientMrn: '#LH-8924-A',
      doctorName: selectedDoctor.name,
      department: selectedDoctor.department,
      date: `Oct ${selectedDay}, 2024`,
      time: selectedSlot,
      type: `${selectedDoctor.department} Consult` as Appointment['type'],
      mode: consultationMode,
      location: consultationMode === 'Telehealth' ? 'Virtual Care Room B' : selectedDoctor.location,
      status: 'Scheduled',
      room: 'Room 402',
    };

    onBookAppointment(newApt);
    setBookedNotice(`Appointment confirmed with ${selectedDoctor.name} for Oct ${selectedDay} at ${selectedSlot}!`);
    setTimeout(() => {
      setBookedNotice(null);
      onNavigate('patient-portal');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Schedule Consultation
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Find and book appointments with specialized clinical practitioners.
        </p>
      </div>

      {bookedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-3 animate-in fade-in duration-150">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{bookedNotice}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search practitioner or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            id="doctor-search-input"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none text-slate-700"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Oncology">Oncology</option>
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none text-slate-700"
          >
            <option value="All">All Locations</option>
            <option value="Main Campus">Main Campus</option>
            <option value="North Wing">North Wing</option>
            <option value="East Wing">East Wing</option>
            <option value="Telehealth">Telehealth Only</option>
          </select>
        </div>

      </div>

      {/* Main Grid: Doctors list (Span 2) + Booking Side Panel (Span 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Doctor Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredDoctors.map((doc) => {
            const isSelected = selectedDoctorId === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctorId(doc.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white ${
                  isSelected
                    ? 'border-teal-600 ring-2 ring-teal-600/10 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
                id={`doctor-card-${doc.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {doc.rating}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-teal-700">{doc.role}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{doc.education}</p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-2">
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-400" />
                          {doc.location}
                        </span>
                        <span>•</span>
                        <span>{doc.experienceYears}+ Yrs Exp</span>
                        {doc.isTelehealth && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-indigo-600 font-medium">
                              <Video className="w-3 h-3" />
                              Telehealth
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Consultation Fee</p>
                      <p className="text-base font-extrabold text-slate-900">${doc.consultationFee}</p>
                    </div>

                    <button
                      className={`mt-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>Select</span>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Booking Details Panel */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Booking Details
            </h3>

            {/* Consultation Mode Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setConsultationMode('In-person')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    consultationMode === 'In-person'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  In-Person
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationMode('Telehealth')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    consultationMode === 'Telehealth'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Telehealth (Video)
                </button>
              </div>
            </div>

            {/* Select Date Mini Calendar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">Select Date</label>
                <span className="text-xs font-semibold text-teal-600">October 2024</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="text-[10px] font-bold text-slate-400 py-1">
                    {d}
                  </span>
                ))}
                {/* days 21 to 27 */}
                {[21, 22, 23, 24, 25, 26, 27].map((day) => {
                  const isCurrent = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'bg-teal-600 text-white shadow-sm font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Available Slots (Oct {selectedDay})
              </label>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Morning</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSlot === slot
                            ? 'bg-teal-50 border-teal-600 text-teal-700 font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Afternoon</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSlot === slot
                            ? 'bg-teal-50 border-teal-600 text-teal-700 font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Practitioner:</span>
                <span className="font-semibold text-slate-900">{selectedDoctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-semibold text-slate-900">
                  Oct {selectedDay}, 2024 at {selectedSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mode:</span>
                <span className="font-semibold text-slate-900">{consultationMode}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                <span>Total Fee</span>
                <span>${selectedDoctor.consultationFee}.00</span>
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm shadow-teal-600/20 transition-colors flex items-center justify-center gap-2"
              id="confirm-booking-btn"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Booking</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
