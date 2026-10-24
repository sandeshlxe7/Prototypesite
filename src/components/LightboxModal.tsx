import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  X,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import { PhotoWork } from '../data/portfolioData';

interface LightboxModalProps {
  work: PhotoWork | null;
  works: PhotoWork[];
  onClose: () => void;
  onSelectWork: (work: PhotoWork) => void;
  onInquirePrint: (work: PhotoWork) => void;
}

const ROMAN_ZONES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export const LightboxModal: React.FC<LightboxModalProps> = ({
  work,
  works,
  onClose,
  onSelectWork,
  onInquirePrint,
}) => {
  const [isLoupeZoomed, setIsLoupeZoomed] = useState(false);
  const [panOrigin, setPanOrigin] = useState({ x: 50, y: 50 });
  const [showZoneSystem, setShowZoneSystem] = useState(true);

  useEffect(() => {
    setIsLoupeZoomed(false);
    setPanOrigin({ x: 50, y: 50 });
  }, [work?.id]);

  useEffect(() => {
    if (!work) return;

    const currentIndex = works.findIndex((w) => w.id === work.id);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && works.length > 1) {
        const nextIdx = (currentIndex + 1) % works.length;
        onSelectWork(works[nextIdx]);
      } else if (e.key === 'ArrowLeft' && works.length > 1) {
        const prevIdx = (currentIndex - 1 + works.length) % works.length;
        onSelectWork(works[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work, works, onClose, onSelectWork]);

  if (!work) return null;

  const currentIndex = works.findIndex((w) => w.id === work.id);
  const prevWork = works[(currentIndex - 1 + works.length) % works.length];
  const nextWork = works[(currentIndex + 1) % works.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isLoupeZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPanOrigin({
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y)),
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${work.title} high-resolution lightbox inspection`}
      className="fixed inset-0 z-50 flex flex-col bg-[#050505]/96 backdrop-blur-md lg:flex-row"
    >
      {/* Top Toolbar on Mobile / Floating Controls */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-3.5 lg:hidden">
        <span className="font-mono-tabular text-xs text-zinc-400">
          {work.plateNumber} ({currentIndex + 1} / {works.length})
        </span>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 whitespace-nowrap shrink-0"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Left / Main High-Resolution Plate Stage */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4 sm:p-8 lg:p-12">
        {/* Stage Top Bar (Desktop) */}
        <div className="pointer-events-none absolute inset-x-8 top-6 hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-3 font-mono-tabular text-xs text-zinc-400">
            <span>{work.plateNumber}</span>
            <span aria-hidden="true">·</span>
            <span>
              FRAME {String(currentIndex + 1).padStart(2, '0')} OF{' '}
              {String(works.length).padStart(2, '0')}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => setIsLoupeZoomed((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white whitespace-nowrap shrink-0"
            >
              {isLoupeZoomed ? (
                <>
                  <ZoomOut className="h-3.5 w-3.5" />
                  <span>Reset 1.0x View</span>
                </>
              ) : (
                <>
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>Optical Loupe 1.85x</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* High-Resolution Image Viewport */}
        <div
          onClick={() => setIsLoupeZoomed((prev) => !prev)}
          onMouseMove={handleMouseMove}
          className={`relative flex max-h-[68vh] w-full max-w-4xl items-center justify-center overflow-hidden rounded-xl border border-zinc-800/80 bg-[#09090B] shadow-2xl lg:max-h-[78vh] ${
            isLoupeZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          <img
            src={work.imageUrl}
            alt={`${work.title} — ${work.series}`}
            referrerPolicy="no-referrer"
            style={{
              transform: isLoupeZoomed ? 'scale(1.85)' : 'scale(1)',
              transformOrigin: `${panOrigin.x}% ${panOrigin.y}%`,
            }}
            className="max-h-[68vh] w-full object-contain transition-transform duration-150 ease-out lg:max-h-[78vh]"
          />
        </div>

        {/* Prev / Next Plate Controls */}
        {works.length > 1 && (
          <div className="mt-5 flex items-center gap-4">
            <button
              onClick={() => onSelectWork(prevWork)}
              aria-label={`Previous plate: ${prevWork.title}`}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Plate</span>
            </button>

            <span className="font-mono-tabular text-xs text-zinc-500">
              Use ← / → or ESC
            </span>

            <button
              onClick={() => onSelectWork(nextWork)}
              aria-label={`Next plate: ${nextWork.title}`}
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white whitespace-nowrap shrink-0"
            >
              <span>Next Plate</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Right Curatorial & Darkroom EXIF Dossier Panel */}
      <aside className="flex w-full flex-col justify-between overflow-y-auto border-t border-zinc-800/80 bg-[#0A0A0C] p-6 sm:p-8 lg:w-[420px] lg:border-t-0 lg:border-l">
        <div>
          {/* Top Dossier Header + Desktop Close Button */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span>{work.category}</span>
                <span aria-hidden="true">·</span>
                <span>{work.series}</span>
              </div>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
                {work.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close viewer (ESC)"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white lg:flex shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Unboxed Location, Date & Client Credits */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <span>{work.location}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{work.year}</span>
            <span aria-hidden="true">·</span>
            <span>{work.client}</span>
          </div>

          {/* Curatorial Field Note */}
          <p className="mt-5 border-t border-zinc-800/80 pt-5 text-sm leading-relaxed text-zinc-300">
            {work.curatorNote}
          </p>

          {/* Technical EXIF Specification Grid */}
          <div className="mt-6 border-t border-zinc-800/80 pt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold tracking-wide text-zinc-400">
                Optical & Exposure Record
              </h3>
              <span className="font-mono-tabular text-xs text-zinc-500">
                {work.aspectRatio}
              </span>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div>
                <dt className="text-zinc-500">Camera Body</dt>
                <dd className="mt-0.5 font-mono-tabular text-zinc-200">
                  {work.exif.camera}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Optics</dt>
                <dd className="mt-0.5 font-mono-tabular text-zinc-200">
                  {work.exif.lens}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Exposure</dt>
                <dd className="mt-0.5 font-mono-tabular text-zinc-200">
                  {work.exif.aperture} at {work.exif.shutterSpeed}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Sensitivity / Stock</dt>
                <dd className="mt-0.5 font-mono-tabular text-zinc-200">
                  ISO {work.exif.iso} · {work.exif.filmStock}
                </dd>
              </div>
            </dl>
          </div>

          {/* Ansel Adams Zone System Luminance Histogram */}
          <div className="mt-6 border-t border-zinc-800/80 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-zinc-400">
                Zone System Luminance (I–X)
              </span>
              <button
                onClick={() => setShowZoneSystem((prev) => !prev)}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 whitespace-nowrap shrink-0"
              >
                <SlidersHorizontal className="h-3 w-3" />
                <span>{showZoneSystem ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            {showZoneSystem && (
              <div className="mt-3">
                <div className="flex h-16 items-end gap-1.5 pt-2">
                  {work.zoneDistribution.map((val, idx) => (
                    <div
                      key={ROMAN_ZONES[idx]}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <div
                        style={{ height: `${Math.max(12, val * 2.1)}px` }}
                        className="w-full rounded-t-xs bg-zinc-600/80 transition-opacity hover:bg-zinc-300"
                        title={`Zone ${ROMAN_ZONES[idx]}: ${val}% tonal density`}
                      />
                      <span className="font-mono-tabular text-[10px] text-zinc-500">
                        {ROMAN_ZONES[idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Archival Print Collector Acquisition Footer */}
        <div className="mt-8 border-t border-zinc-800/80 pt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-zinc-400">{work.editionAvailable}</span>
            <span className="font-mono-tabular text-base font-semibold text-white">
              ${work.printPriceUsd.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => onInquirePrint(work)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E11D48] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#BE123C] whitespace-nowrap shrink-0"
          >
            <span>Acquire Archival Print or License</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </div>
  );
};
