import React, { useState } from 'react';
import {
  Activity,
  Brain,
  Bone,
  Smile,
  Sparkles,
  Microscope,
  Users,
  Search,
  ChevronRight,
  ArrowRight,
  Phone,
  Calendar,
  X,
  Stethoscope,
} from 'lucide-react';
import { DepartmentItem, ScreenType } from '../../types';

interface DepartmentsViewProps {
  departments: DepartmentItem[];
  onNavigate: (screen: ScreenType) => void;
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({
  departments,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<DepartmentItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return Activity;
      case 'Brain':
        return Brain;
      case 'Bone':
        return Bone;
      case 'Smile':
        return Smile;
      case 'Sparkles':
        return Sparkles;
      case 'Microscope':
        return Microscope;
      default:
        return Stethoscope;
    }
  };

  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Medical Departments
        </h1>
        <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
          Explore our comprehensive range of specialized clinical services. Our world-class facilities are equipped to provide precise, patient-centered care.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search departments, services, or condition..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          id="dept-search-input"
        />
      </div>

      {/* 6 Department Cards Grid (Image 17) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => {
          const Icon = getIcon(dept.iconName);

          return (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              id={`dept-card-${dept.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {dept.specialistsCount} Specialists
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors mb-2">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {dept.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedDept(dept)}
                  className="text-xs font-bold text-slate-900 group-hover:text-teal-600 flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('appointments')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                  title="Book in Department"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Department of {selectedDept.name}
                </h3>
                <p className="text-xs text-slate-500">Lumina Clinical Center of Excellence</p>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-700 leading-relaxed">{selectedDept.description}</p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Head of Department:</span>
                  <span className="font-bold text-slate-900">{selectedDept.headOfDepartment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Board-Certified Specialists:</span>
                  <span className="font-semibold text-slate-900">{selectedDept.specialistsCount} Physicians</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Direct Clinical Desk:</span>
                  <span className="font-semibold text-teal-700">{selectedDept.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => alert(`Calling Department Desk: ${selectedDept.phone}`)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Call Desk</span>
              </button>

              <button
                onClick={() => {
                  setSelectedDept(null);
                  onNavigate('appointments');
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow flex items-center gap-1.5"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
