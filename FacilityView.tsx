import React, { useState } from 'react';
import {
  Building2,
  Plus,
  FileSpreadsheet,
  Activity,
  Bed,
  CheckCircle2,
  Wrench,
  Search,
  Users,
  HeartPulse,
  User,
  Stethoscope,
  X,
} from 'lucide-react';
import { HospitalBed, ScreenType } from '../../types';

interface FacilityViewProps {
  beds: HospitalBed[];
  onUpdateBeds: (beds: HospitalBed[]) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const FacilityView: React.FC<FacilityViewProps> = ({
  beds,
  onUpdateBeds,
  onNavigate,
}) => {
  const [selectedBuilding, setSelectedBuilding] = useState('North Wing');
  const [selectedFloor, setSelectedFloor] = useState(2);
  const [selectedWard, setSelectedWard] = useState('Intensive Care Unit (ICU)');
  const [selectedBed, setSelectedBed] = useState<HospitalBed | null>(null);
  const [showAddBedModal, setShowAddBedModal] = useState(false);
  const [newBedNumber, setNewBedNumber] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'occupied' | 'available' | 'maintenance'>('all');

  const buildings = ['North Wing', 'South Wing', 'Annex'];
  const floors = [1, 2, 3, 4];
  const wards = ['Intensive Care Unit (ICU)', 'Maternity Ward', 'Surgical Recovery'];

  const filteredBeds = beds.filter((b) => {
    const matchesLocation =
      b.building === selectedBuilding && b.floor === selectedFloor && b.ward === selectedWard;
    const matchesFilter = filterStatus === 'all' || b.status === filterStatus;
    return matchesLocation && matchesFilter;
  });

  const occupiedCount = beds.filter((b) => b.status === 'occupied').length;
  const availableCount = beds.filter((b) => b.status === 'available').length;
  const maintenanceCount = beds.filter((b) => b.status === 'maintenance').length;
  const occupancyRate = Math.round((occupiedCount / (beds.length || 1)) * 100);

  const handleStatusToggle = (bedId: string, newStatus: HospitalBed['status']) => {
    const updated = beds.map((b) => {
      if (b.id === bedId) {
        if (newStatus === 'available') {
          return { ...b, status: newStatus, patientName: undefined, doctorName: undefined, notes: undefined };
        } else if (newStatus === 'maintenance') {
          return { ...b, status: newStatus, notes: 'Out of Service - Cleaning Req.' };
        } else {
          return {
            ...b,
            status: newStatus,
            patientName: 'Admitted Patient',
            doctorName: 'Dr. Sarah Jenkins',
            hasTelemetry: true,
          };
        }
      }
      return b;
    });
    onUpdateBeds(updated);
    if (selectedBed && selectedBed.id === bedId) {
      setSelectedBed(updated.find((b) => b.id === bedId) || null);
    }
  };

  const handleAddBed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBedNumber) return;

    const newBed: HospitalBed = {
      id: `bed-${Date.now()}`,
      bedNumber: newBedNumber.startsWith('Bed') ? newBedNumber : `Bed ${newBedNumber}`,
      status: 'available',
      building: selectedBuilding,
      floor: selectedFloor,
      ward: selectedWard,
      hasTelemetry: true,
    };

    onUpdateBeds([...beds, newBed]);
    setNewBedNumber('');
    setShowAddBedModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Facility Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage building occupancy, ward status, and acute bed telemetry availability.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert("Exporting Facility Ward & Telemetry Bed Report (PDF)...")}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Generate Report</span>
          </button>

          <button
            onClick={() => setShowAddBedModal(true)}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-teal-600/20"
            id="facility-add-bed-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Bed</span>
          </button>
        </div>
      </div>

      {/* Location Navigation Selector Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        
        {/* Building Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Building:</span>
          {buildings.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBuilding(b)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedBuilding === b
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Floor and Ward Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Floor Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Floor:</span>
            {floors.map((fl) => (
              <button
                key={fl}
                onClick={() => setSelectedFloor(fl)}
                className={`w-9 h-8 rounded-lg text-xs font-bold transition-all ${
                  selectedFloor === fl
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Fl {fl}
              </button>
            ))}
          </div>

          {/* Active Wards */}
          <div className="flex flex-wrap items-center gap-2">
            {wards.map((ward) => (
              <button
                key={ward}
                onClick={() => setSelectedWard(ward)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedWard === ward
                    ? 'bg-teal-50 text-teal-700 border border-teal-200 font-bold'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {ward}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Floor Status KPI Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg shrink-0">
            {occupancyRate}%
          </div>
          <div className="flex-1 sm:flex-none">
            <p className="text-xs font-bold text-slate-900">
              {selectedBuilding} • Floor {selectedFloor} Occupancy Rate
            </p>
            <div className="w-48 bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Counts & Status Filter Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              filterStatus === 'all' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Beds ({beds.length})
          </button>
          <button
            onClick={() => setFilterStatus('occupied')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              filterStatus === 'occupied'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Occupied ({occupiedCount})
          </button>
          <button
            onClick={() => setFilterStatus('available')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              filterStatus === 'available'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Available ({availableCount})
          </button>
          <button
            onClick={() => setFilterStatus('maintenance')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              filterStatus === 'maintenance'
                ? 'bg-amber-600 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Maintenance ({maintenanceCount})
          </button>
        </div>
      </div>

      {/* Bed Grid Section (Image 13) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => {
          const isOccupied = bed.status === 'occupied';
          const isAvailable = bed.status === 'available';
          const isMaintenance = bed.status === 'maintenance';

          return (
            <div
              key={bed.id}
              onClick={() => setSelectedBed(bed)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white relative overflow-hidden flex flex-col justify-between min-h-[145px] ${
                isOccupied
                  ? 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                  : isAvailable
                  ? 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-300 hover:shadow-md'
                  : 'border-amber-200 bg-amber-50/20 hover:border-amber-300 hover:shadow-md'
              }`}
              id={`facility-bed-card-${bed.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-900">{bed.bedNumber}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      isOccupied
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isAvailable
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {isOccupied && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                    {isAvailable && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                    {isMaintenance && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                    {bed.status}
                  </span>
                </div>

                {isOccupied && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{bed.patientName}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Stethoscope className="w-3 h-3 text-teal-600" />
                      <span>{bed.doctorName}</span>
                    </p>
                  </div>
                )}

                {isAvailable && (
                  <div className="mt-4 text-center py-2">
                    <span className="text-xs font-semibold text-emerald-700">Ready for Admission</span>
                  </div>
                )}

                {isMaintenance && (
                  <div className="mt-2 space-y-1">
                    <p className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-amber-600" />
                      <span>{bed.notes || 'Cleaning & Sanitation'}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>{selectedWard}</span>
                {bed.hasTelemetry && isOccupied && (
                  <span className="flex items-center gap-1 text-teal-600 font-bold">
                    <Activity className="w-3 h-3" />
                    Live
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bed Detail Drawer / Modal */}
      {selectedBed && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedBed.bedNumber} — {selectedBed.ward}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBed(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">
                    {selectedBed.building}, Floor {selectedBed.floor}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="font-bold capitalize text-slate-900">{selectedBed.status}</span>
                </div>
                {selectedBed.patientName && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Admitted Patient:</span>
                    <span className="font-bold text-slate-900">{selectedBed.patientName}</span>
                  </div>
                )}
                {selectedBed.doctorName && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Attending Physician:</span>
                    <span className="font-medium text-slate-900">{selectedBed.doctorName}</span>
                  </div>
                )}
              </div>

              {/* Status Action Buttons */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Update Bed State
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleStatusToggle(selectedBed.id, 'occupied')}
                    className="py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                  >
                    Set Occupied
                  </button>
                  <button
                    onClick={() => handleStatusToggle(selectedBed.id, 'available')}
                    className="py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                  >
                    Set Available
                  </button>
                  <button
                    onClick={() => handleStatusToggle(selectedBed.id, 'maintenance')}
                    className="py-2 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                  >
                    Sanitation
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedBed(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Bed Modal */}
      {showAddBedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddBed}
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add New Hospital Bed</h3>
              <button
                type="button"
                onClick={() => setShowAddBedModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Bed Identifier / Number
              </label>
              <input
                type="text"
                value={newBedNumber}
                onChange={(e) => setNewBedNumber(e.target.value)}
                placeholder="e.g. Bed 109 or ICU-B4"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-500 space-y-1">
              <p>Building: <span className="font-semibold text-slate-800">{selectedBuilding}</span></p>
              <p>Floor: <span className="font-semibold text-slate-800">Floor {selectedFloor}</span></p>
              <p>Ward: <span className="font-semibold text-slate-800">{selectedWard}</span></p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddBedModal(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow"
              >
                Add Bed
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
