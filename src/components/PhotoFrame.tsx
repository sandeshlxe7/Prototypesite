import React, { useState } from 'react';
import { Aperture, Maximize2 } from 'lucide-react';
import { PhotoWork } from '../data/portfolioData';

interface PhotoFrameProps {
  work: PhotoWork;
  layoutMode: 'bento' | 'masonry' | 'contact';
  showExifOverlay: boolean;
  isLightSurface: boolean;
  onSelect: (work: PhotoWork) => void;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  work,
  layoutMode,
  showExifOverlay,
  isLightSurface,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);

  const aspectClass =
    layoutMode === 'bento'
      ? 'h-full min-h-[280px] md:min-h-[320px]'
      : layoutMode === 'contact'
        ? 'aspect-square'
        : work.masonryHeightClass;

  return (
    <article
      onClick={() => onSelect(work)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(work);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Inspect ${work.title}, ${work.category} photograph (${work.year})`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48] cursor-pointer ${
        layoutMode === 'bento' ? work.bentoClass : ''
      } ${
        isLightSurface
          ? 'bg-[#EFECE6] border-[#DFDCD4] hover:border-[#B8B3A8]'
          : 'bg-[#0C0C0E] border-[#1F1F23] hover:border-[#3F3F46]'
      }`}
    >
      {/* Media Container */}
      <div className={`relative w-full overflow-hidden ${aspectClass} bg-[#09090B]`}>
        {!imageError ? (
          <img
            src={work.imageUrl}
            alt={`${work.title} — ${work.series}, photographed in ${work.location}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          /* Zero-Broken-Image Policy Resilient Fallback */
          <div
            className="flex h-full w-full flex-col items-center justify-center p-6 text-center"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${work.dominantTone}33, #09090B 80%)`,
            }}
          >
            <Aperture className="mb-3 h-7 w-7 text-zinc-400 opacity-75" />
            <span className="font-editorial text-lg italic text-zinc-200">{work.title}</span>
            <span className="mt-1 font-mono-tabular text-xs text-zinc-400">
              {work.plateNumber} · {work.location}
            </span>
          </div>
        )}

        {/* Measured Contrast Scrim for Overlays */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-150 ${
            showExifOverlay || layoutMode === 'bento'
              ? 'opacity-90 group-hover:opacity-100'
              : 'opacity-0 group-hover:opacity-95'
          }`}
        />

        {/* Top Contact-Sheet Frame Number & Expand Affordance */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="font-mono-tabular text-[11px] tracking-wider text-zinc-300/90 drop-shadow-sm">
            {work.plateNumber}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/55 text-zinc-200 opacity-0 backdrop-blur-xs transition-opacity duration-150 group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Bottom Caption & Unboxed Metadata inside Bento / Hover Overlay */}
        <div
          className={` inset-x-0 bottom-0 flex flex-col justify-end p-5 transition-opacity duration-150 ${
            layoutMode === 'bento'
              ? 'absolute opacity-100'
              : 'absolute opacity-0 group-hover:opacity-100'
          }`}
        >
          {/* Quiet 1-line unboxed metadata with typographic separators (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-300">
            <span>{work.category}</span>
            <span aria-hidden="true">·</span>
            <span>{work.location}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{work.year}</span>
          </div>

          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-white md:text-xl">
            {work.title}
          </h3>

          {/* Technical EXIF Bar (Tabular Numerals) */}
          {showExifOverlay && (
            <div className="mt-2.5 flex flex-wrap items-center gap-2 border-t border-white/15 pt-2.5 font-mono-tabular text-[11px] text-zinc-300">
              <span>{work.exif.camera}</span>
              <span aria-hidden="true">/</span>
              <span>{work.exif.focalLength}</span>
              <span aria-hidden="true">·</span>
              <span>{work.exif.aperture}</span>
              <span aria-hidden="true">·</span>
              <span>{work.exif.shutterSpeed}</span>
              <span aria-hidden="true">·</span>
              <span>ISO {work.exif.iso}</span>
            </div>
          )}
        </div>
      </div>

      {/* Below-Frame Editorial Caption for Masonry & Contact Sheet Modes */}
      {layoutMode !== 'bento' && (
        <div
          className={`flex flex-col justify-between gap-1.5 p-4 ${
            isLightSurface ? 'text-zinc-900' : 'text-zinc-100'
          }`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-base font-semibold tracking-tight truncate">
              {work.title}
            </h3>
            <span
              className={`font-mono-tabular text-xs shrink-0 ${
                isLightSurface ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              {work.year}
            </span>
          </div>

          {/* Unboxed static metadata */}
          <div
            className={`flex flex-wrap items-center gap-1.5 text-xs ${
              isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            <span>{work.category}</span>
            <span aria-hidden="true">·</span>
            <span>{work.location}</span>
            {showExifOverlay && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  {work.exif.focalLength} {work.exif.aperture}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
};
