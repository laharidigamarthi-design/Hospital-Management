import React, { useState } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  Sun,
  Contrast,
  RotateCw,
  Maximize2,
  Minimize2,
  Ruler,
  Layers,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
} from 'lucide-react';
import { MedicalImageScan } from '../../types';

interface DicomViewerModalProps {
  scans: MedicalImageScan[];
  initialScanId?: string;
  onClose: () => void;
}

export const DicomViewerModal: React.FC<DicomViewerModalProps> = ({
  scans,
  initialScanId,
  onClose,
}) => {
  const [currentIdx, setCurrentIdx] = useState(
    initialScanId ? Math.max(0, scans.findIndex((s) => s.id === initialScanId)) : 0
  );
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [inverted, setInverted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showRuler, setShowRuler] = useState(false);

  const currentScan = scans[currentIdx] || scans[0];

  const resetAdjustments = () => {
    setZoom(1);
    setBrightness(100);
    setContrast(100);
    setInverted(false);
    setRotation(0);
    setShowRuler(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200">
      
      {/* Top DICOM PACS Bar */}
      <div className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between text-white shrink-0">
        
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
          <span className="text-xs font-mono font-bold text-teal-400">
            LUMINA PACS DICOM VIEWER v3.4
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-semibold text-slate-200">
            {currentScan.title} ({currentScan.modality})
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setInverted(!inverted)}
            className={`p-1.5 rounded-lg transition-colors ${
              inverted ? 'text-teal-400 bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Invert Grayscale"
          >
            <Contrast className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowRuler(!showRuler)}
            className={`p-1.5 rounded-lg transition-colors ${
              showRuler ? 'text-teal-400 bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Measurement Caliper"
          >
            <Ruler className="w-4 h-4" />
          </button>
          <button
            onClick={resetAdjustments}
            className="px-2 py-1 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
          >
            Reset
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-rose-900/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

      </div>

      {/* Main DICOM Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Thumbnails List */}
        <div className="w-48 bg-slate-950/80 border-r border-slate-800/80 p-3 space-y-3 overflow-y-auto hidden md:block shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Series & Scans ({scans.length})
          </p>
          {scans.map((scan, idx) => (
            <div
              key={scan.id}
              onClick={() => {
                setCurrentIdx(idx);
                resetAdjustments();
              }}
              className={`p-2 rounded-xl border cursor-pointer transition-all ${
                currentIdx === idx
                  ? 'border-teal-500 bg-teal-950/30'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <img
                src={scan.imageUrl}
                alt={scan.title}
                referrerPolicy="no-referrer"
                className="w-full h-20 object-cover rounded-lg mb-1.5"
              />
              <p className="text-[11px] font-bold text-slate-200 truncate">{scan.title}</p>
              <p className="text-[9px] text-slate-400">{scan.modality} • {scan.date}</p>
            </div>
          ))}
        </div>

        {/* Image Stage Container */}
        <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-black">
          
          {/* Overlay Diagnostics Metadata HUD */}
          <div className="absolute top-4 left-4 font-mono text-[11px] text-teal-400/90 leading-tight space-y-1 pointer-events-none drop-shadow-md z-10">
            <p className="font-bold text-white">PATIENT: ELEANOR VANCE (34F)</p>
            <p>MRN: 84729-10A</p>
            <p>STUDY: {currentScan.title}</p>
            <p>MODALITY: {currentScan.modality} / {currentScan.bodyPart}</p>
            <p>DATE: {currentScan.date}</p>
          </div>

          <div className="absolute top-4 right-4 font-mono text-[11px] text-teal-400/90 text-right leading-tight space-y-1 pointer-events-none drop-shadow-md z-10">
            <p>WINDOW: LUNG/TISSUE</p>
            <p>W: 1500  L: -600</p>
            <p>ZOOM: {(zoom * 100).toFixed(0)}%</p>
            <p>BRIGHTNESS: {brightness}%</p>
            <p>CONTRAST: {contrast}%</p>
          </div>

          {/* Interactive Scaled & Rotated Scan Image */}
          <div
            className="transition-transform duration-100 flex items-center justify-center max-w-full max-h-full"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              filter: `brightness(${brightness}%) contrast(${contrast}%) ${inverted ? 'invert(1)' : ''}`,
            }}
          >
            <img
              src={currentScan.imageUrl}
              alt={currentScan.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-[75vw] object-contain rounded shadow-2xl"
            />
          </div>

          {/* Virtual Caliper / Measurement Overlay */}
          {showRuler && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-64 border-b-2 border-dashed border-teal-400 relative">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-mono text-teal-300 bg-slate-900 px-2 py-0.5 rounded">
                  4.82 cm ± 0.05
                </span>
              </div>
            </div>
          )}

          {/* Radiologist Note Panel at Bottom */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 backdrop-blur max-w-2xl mx-auto z-10">
            <span className="font-bold text-teal-400 uppercase tracking-wider text-[10px] block mb-0.5">
              Radiology Diagnostic Impression
            </span>
            <p>{currentScan.notes}</p>
          </div>

        </div>

      </div>

      {/* Bottom Slider Adjustments Bar */}
      <div className="h-14 bg-slate-950 border-t border-slate-800 px-6 flex items-center justify-between text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-slate-400" />
            <span>Brightness</span>
            <input
              type="range"
              min="50"
              max="150"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-24 accent-teal-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Contrast className="w-3.5 h-3.5 text-slate-400" />
            <span>Contrast</span>
            <input
              type="range"
              min="50"
              max="150"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-24 accent-teal-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Downloading DICOM Raw File (DCM): ${currentScan.title}.dcm`)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DCM</span>
          </button>
        </div>
      </div>

    </div>
  );
};
