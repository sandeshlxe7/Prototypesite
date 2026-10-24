import React, { useMemo, useState } from 'react';
import {
  Aperture,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  Eye,
  Grid,
  LayoutGrid,
  Layers,
  Sliders,
  Sun,
  Moon,
} from 'lucide-react';
import {
  EXHIBITION_HISTORY,
  MONOGRAPH_BOOKS,
  PhotoCategory,
  PhotoWork,
  PORTFOLIO_WORKS,
  MonographBook,
} from './data/portfolioData';
import { PhotoFrame } from './components/PhotoFrame';
import { LightboxModal } from './components/LightboxModal';

type LayoutMode = 'bento' | 'masonry' | 'contact';
type FocalFilter = 'All' | '28mm' | '35mm' | '50mm' | '80mm' | '110mm';
type ExhibitionFilter = 'All' | 'Solo Exhibition' | 'Group Biennial' | 'Permanent Acquisition';

export default function App() {
  // Gallery interactive states
  const [selectedCategory, setSelectedCategory] = useState<'All' | PhotoCategory>('All');
  const [selectedFocal, setSelectedFocal] = useState<FocalFilter>('All');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('bento');
  const [showExifOverlay, setShowExifOverlay] = useState<boolean>(true);
  const [isLightSurface, setIsLightSurface] = useState<boolean>(false);

  // Lightbox & Monograph inspection states
  const [activeLightboxWork, setActiveLightboxWork] = useState<PhotoWork | null>(null);
  const [activeMonograph, setActiveMonograph] = useState<MonographBook | null>(null);

  // Exhibition filter state
  const [exhibitionFilter, setExhibitionFilter] = useState<ExhibitionFilter>('All');

  // Commission & Archival Print Inquiry form state
  const [inquiryType, setInquiryType] = useState<'Editorial Commission' | 'Archival Print Acquisition' | 'Monograph Order'>('Editorial Commission');
  const [selectedPlateTitle, setSelectedPlateTitle] = useState<string>('PLATE I · 02 — Naoshima Sea Pavilion IV');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [projectBrief, setProjectBrief] = useState<string>('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const heroWork = PORTFOLIO_WORKS[0];

  const filteredWorks = useMemo(() => {
    return PORTFOLIO_WORKS.filter((work) => {
      const matchesCategory = selectedCategory === 'All' || work.category === selectedCategory;
      const matchesFocal = selectedFocal === 'All' || work.exif.focalLength === selectedFocal;
      return matchesCategory && matchesFocal;
    });
  }, [selectedCategory, selectedFocal]);

  const filteredExhibitions = useMemo(() => {
    if (exhibitionFilter === 'All') return EXHIBITION_HISTORY;
    return EXHIBITION_HISTORY.filter((item) => item.type === exhibitionFilter);
  }, [exhibitionFilter]);

  const handleInquireFromLightbox = (work: PhotoWork) => {
    setActiveLightboxWork(null);
    setInquiryType('Archival Print Acquisition');
    setSelectedPlateTitle(`${work.plateNumber} — ${work.title} ($${work.printPriceUsd.toLocaleString()})`);
    setSubmittedRef(null);
    const el = document.getElementById('commission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderMonograph = (book: MonographBook) => {
    setActiveMonograph(null);
    setInquiryType('Monograph Order');
    setSelectedPlateTitle(`Monograph ${book.index}: ${book.title} (${book.publisher}, $${book.priceUsd})`);
    setSubmittedRef(null);
    const el = document.getElementById('commission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRef(`SL-2026-${randomCode}`);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedFocal('All');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isLightSurface
          ? 'bg-[#F7F6F2] text-[#141413]'
          : 'bg-[#050505] text-[#F4F4F5]'
      }`}
    >
      {/* 1. TOP BAR CONTRACT: One-row, 3-zone header separated by gap-8 */}
      <header
        className={`sticky top-0 z-30 flex items-center justify-between gap-8 border-b px-6 py-4 backdrop-blur-md transition-colors lg:px-12 ${
          isLightSurface
            ? 'border-[#E2DFD7] bg-[#F7F6F2]/90'
            : 'border-[#18181B] bg-[#050505]/90'
        }`}
      >
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight whitespace-nowrap shrink-0"
        >
          Soren Lindqvist
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className={`hidden md:flex items-center gap-8 text-sm font-medium ${
            isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
          }`}
        >
          <a
            href="#works"
            className={`transition-colors whitespace-nowrap shrink-0 hover:underline hover:underline-offset-4 ${
              isLightSurface ? 'hover:text-zinc-950' : 'hover:text-white'
            }`}
          >
            Selected Works
          </a>
          <a
            href="#monographs"
            className={`transition-colors whitespace-nowrap shrink-0 hover:underline hover:underline-offset-4 ${
              isLightSurface ? 'hover:text-zinc-950' : 'hover:text-white'
            }`}
          >
            Monographs
          </a>
          <a
            href="#exhibitions"
            className={`transition-colors whitespace-nowrap shrink-0 hover:underline hover:underline-offset-4 ${
              isLightSurface ? 'hover:text-zinc-950' : 'hover:text-white'
            }`}
          >
            Exhibitions
          </a>
          <a
            href="#commission"
            className={`transition-colors whitespace-nowrap shrink-0 hover:underline hover:underline-offset-4 ${
              isLightSurface ? 'hover:text-zinc-950' : 'hover:text-white'
            }`}
          >
            Commission
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="#commission"
            className="rounded-lg bg-[#E11D48] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#BE123C] whitespace-nowrap shrink-0"
          >
            Book Inquiry
          </a>
        </div>
      </header>

      {/* 2. HERO SPLIT SECTION (Left Typographic Hierarchy, Right Matching-Height Visual Container) */}
      <section className="mx-auto max-w-[1380px] px-6 pt-10 pb-14 lg:px-12 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Typographic Hierarchy */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Quiet unboxed regional & practice kicker */}
              <div
                className={`flex flex-wrap items-center gap-2 text-xs ${
                  isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                <span>Stockholm & Zürich</span>
                <span aria-hidden="true">·</span>
                <span>Architectural & Fine Art Monograph Studio</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">Archive 2018–2026</span>
              </div>

              {/* Balanced Hero Display Headline */}
              <h1
                style={{ textWrap: 'balance' }}
                className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-[54px] lg:leading-[1.08]"
              >
                Architecture of shadow, silence, and{' '}
                <span className="font-editorial font-normal italic">
                  silver halide
                </span>{' '}
                permanence.
              </h1>

              {/* Body Lead Prose */}
              <p
                className={`mt-6 max-w-[62ch] text-base leading-relaxed ${
                  isLightSurface ? 'text-zinc-700' : 'text-zinc-300'
                }`}
              >
                Soren Lindqvist is a Nordic architectural and documentary photographer
                working primarily with medium-format digital backs and 4×5 large-format
                sheet film. His plates examine brutalist concrete, coastal basalt
                littorals, and quiet human silhouettes at civil twilight.
              </p>
            </div>

            {/* Hero Actions & Studio Representation Note */}
            <div className="mt-10 pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#works"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E11D48] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-[#BE123C] whitespace-nowrap shrink-0"
                >
                  <span>Browse Selected Works</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  onClick={() => setActiveLightboxWork(heroWork)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isLightSurface
                      ? 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100'
                      : 'border-zinc-800 bg-zinc-900/90 text-zinc-200 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Featured Plate (EXIF)</span>
                </button>
              </div>

              <div
                className={`mt-8 flex flex-wrap items-center gap-2 text-xs ${
                  isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                <span>Represented by Galerie Nordenhake</span>
                <span aria-hidden="true">·</span>
                <span>Available for Q4 2026 & Q1 2027 Editorial Monographs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Matching-Height Signature Plate Container */}
          <div className="flex lg:col-span-6">
            <div
              onClick={() => setActiveLightboxWork(heroWork)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveLightboxWork(heroWork);
                }
              }}
              aria-label={`Open ${heroWork.title} in high-resolution lightbox`}
              className={`group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border cursor-pointer ${
                isLightSurface ? 'border-[#DFDCD4]' : 'border-[#1F1F23]'
              } min-h-[380px] lg:h-full`}
            >
              <img
                src={heroWork.imageUrl}
                alt={`${heroWork.title} — ${heroWork.series}`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
              />

              {/* Measured Scrim Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

              {/* Top Frame Stamp */}
              <div className="relative z-10 flex items-center justify-between p-6">
                <span className="font-mono-tabular text-xs tracking-wider text-zinc-200">
                  FEATURED MONOGRAPH PLATE · {heroWork.plateNumber}
                </span>
                <span className="rounded-lg bg-black/60 px-3 py-1.5 font-mono-tabular text-xs text-zinc-200 backdrop-blur-xs">
                  Click for 1.85x Loupe
                </span>
              </div>

              {/* Bottom Hero Plate Technical Caption */}
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                  <span>{heroWork.series}</span>
                  <span aria-hidden="true">·</span>
                  <span>{heroWork.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular">{heroWork.year}</span>
                </div>
                <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white">
                  {heroWork.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/15 pt-3 font-mono-tabular text-xs text-zinc-300">
                  <span>{heroWork.exif.camera}</span>
                  <span aria-hidden="true">·</span>
                  <span>{heroWork.exif.lens}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {heroWork.exif.aperture} at {heroWork.exif.shutterSpeed}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>ISO {heroWork.exif.iso}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
        <div
          className={`mt-12 grid grid-cols-2 gap-6 border-t pt-8 lg:grid-cols-4 ${
            isLightSurface ? 'border-[#E2DFD7]' : 'border-[#18181B]'
          }`}
        >
          <div>
            <p className="font-mono-tabular text-2xl font-semibold tracking-tight sm:text-3xl">
              14 Solo Shows
            </p>
            <p
              className={`mt-1 text-xs ${
                isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              Exhibited across Stockholm, Zürich, Paris & Amsterdam (2018–2026)
            </p>
          </div>

          <div>
            <p className="font-mono-tabular text-2xl font-semibold tracking-tight sm:text-3xl">
              3 Monographs
            </p>
            <p
              className={`mt-1 text-xs ${
                isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              Published in hardcover editions by Mack Books, Steidl & Kodoji Press
            </p>
          </div>

          <div>
            <p className="font-mono-tabular text-2xl font-semibold tracking-tight sm:text-3xl">
              140+ Archival Prints
            </p>
            <p
              className={`mt-1 text-xs ${
                isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              Held in permanent museum and private architectural collections
            </p>
          </div>

          <div>
            <p className="font-mono-tabular text-2xl font-semibold tracking-tight sm:text-3xl">
              100% Optical
            </p>
            <p
              className={`mt-1 text-xs ${
                isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              Captured on 4×5 sheet film, 120 roll film & 100MP medium format
            </p>
          </div>
        </div>
      </section>

      {/* 3. SUBTLE ANIMATED MARQUEE SECTION DIVIDER */}
      <div
        aria-hidden="true"
        className={`overflow-hidden border-y py-3.5 ${
          isLightSurface
            ? 'border-[#E2DFD7] bg-[#EFECE6]'
            : 'border-[#18181B] bg-[#09090B]'
        }`}
      >
        <div className="animate-marquee flex items-center gap-8 text-xs tracking-widest uppercase">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-8 shrink-0">
              <span className="font-editorial text-sm italic normal-case">
                selected works 2023–2026
              </span>
              <span>·</span>
              <span>architectural monographs</span>
              <span>·</span>
              <span className="font-editorial text-sm italic normal-case">
                silver gelatin baryta prints
              </span>
              <span>·</span>
              <span>medium & large format studies</span>
              <span>·</span>
              <span className="font-editorial text-sm italic normal-case">
                optical darkroom archive
              </span>
              <span>·</span>
              <span>curated exhibition plates</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RESPONSIVE PHOTOGRAPHY GALLERY (BENTO / MASONRY / CONTACT SHEET) */}
      <main id="works" className="mx-auto max-w-[1380px] px-6 py-16 lg:px-12 lg:py-24">
        {/* Section Heading & Viewing Ambient Controls */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div
              className={`flex items-center gap-2 text-xs ${
                isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              <span>01. Curated Portfolio</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">
                Showing {filteredWorks.length} of {PORTFOLIO_WORKS.length} Plates
              </span>
            </div>
            <h2
              style={{ textWrap: 'balance' }}
              className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Selected Works & Contact Sheets
            </h2>
          </div>

          {/* Viewing Surface & Technical EXIF Toggles (In-Workspace Toolbar) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowExifOverlay((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                showExifOverlay
                  ? isLightSurface
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-zinc-100 text-zinc-950'
                  : isLightSurface
                    ? 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <Aperture className="h-3.5 w-3.5" />
              <span>{showExifOverlay ? 'EXIF Spec: Visible' : 'EXIF Spec: Hidden'}</span>
            </button>

            <button
              onClick={() => setIsLightSurface((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                isLightSurface
                  ? 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {isLightSurface ? (
                <>
                  <Moon className="h-3.5 w-3.5" />
                  <span>Darkroom Matte (#050505)</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5" />
                  <span>Archival Paper (#F7F6F2)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Filter & Layout Controls Bar */}
        <div
          className={`mt-8 flex flex-col justify-between gap-4 border-y py-4 lg:flex-row lg:items-center ${
            isLightSurface ? 'border-[#E2DFD7]' : 'border-[#18181B]'
          }`}
        >
          {/* Category Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['All', 'Architecture', 'Editorial', 'Landscape', 'Nocturne'] as const).map(
              (category) => {
                const count =
                  category === 'All'
                    ? PORTFOLIO_WORKS.length
                    : PORTFOLIO_WORKS.filter((w) => w.category === category).length;
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#E11D48] text-white'
                        : isLightSurface
                          ? 'text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-950'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                    }`}
                  >
                    {category === 'All' ? 'All Series' : category}{' '}
                    <span className="ml-1 font-mono-tabular opacity-75">({count})</span>
                  </button>
                );
              }
            )}
          </div>

          {/* Right Controls: Focal Length Filter + Layout Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Optical Focal Length Filter */}
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs ${
                  isLightSurface ? 'text-zinc-500' : 'text-zinc-500'
                }`}
              >
                Optics:
              </span>
              {(['All', '28mm', '35mm', '50mm', '80mm', '110mm'] as FocalFilter[]).map(
                (focal) => (
                  <button
                    key={focal}
                    onClick={() => setSelectedFocal(focal)}
                    className={`rounded-md px-2.5 py-1.5 font-mono-tabular text-xs transition-colors whitespace-nowrap shrink-0 ${
                      selectedFocal === focal
                        ? isLightSurface
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-200 text-zinc-950 font-medium'
                        : isLightSurface
                          ? 'text-zinc-600 hover:bg-zinc-200/60'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    {focal}
                  </button>
                )
              )}
            </div>

            {/* Layout Mode Switcher */}
            <div
              className={`flex items-center gap-1 rounded-lg border p-1 ${
                isLightSurface
                  ? 'border-zinc-300 bg-[#EFECE6]'
                  : 'border-zinc-800 bg-[#0C0C0E]'
              }`}
            >
              <button
                onClick={() => setLayoutMode('bento')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  layoutMode === 'bento'
                    ? isLightSurface
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Bento</span>
              </button>
              <button
                onClick={() => setLayoutMode('masonry')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  layoutMode === 'masonry'
                    ? isLightSurface
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Editorial</span>
              </button>
              <button
                onClick={() => setLayoutMode('contact')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  layoutMode === 'contact'
                    ? isLightSurface
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>Contact Sheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid Execution */}
        {filteredWorks.length === 0 ? (
          <div
            className={`mt-10 flex flex-col items-center justify-center rounded-2xl border p-12 text-center ${
              isLightSurface
                ? 'border-zinc-300 bg-[#EFECE6]'
                : 'border-zinc-800 bg-[#0B0B0D]'
            }`}
          >
            <Camera className="h-8 w-8 text-zinc-500" />
            <h3 className="mt-3 font-display text-lg font-semibold">
              No plates match this optical combination
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              No photographs in the {selectedCategory} series were recorded with a{' '}
              {selectedFocal} focal length lens.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-[#E11D48] px-4 py-2 text-xs font-medium text-white hover:bg-[#BE123C] whitespace-nowrap shrink-0"
            >
              Reset Series & Optical Filters
            </button>
          </div>
        ) : (
          <div
            className={`mt-8 grid gap-6 ${
              layoutMode === 'bento'
                ? 'grid-cols-1 md:grid-cols-3 md:auto-rows-[310px]'
                : layoutMode === 'masonry'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredWorks.map((work) => (
              <PhotoFrame
                key={work.id}
                work={work}
                layoutMode={layoutMode}
                showExifOverlay={showExifOverlay}
                isLightSurface={isLightSurface}
                onSelect={(w) => setActiveLightboxWork(w)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 5. PUBLISHED MONOGRAPHS SECTION */}
      <section
        id="monographs"
        className={`border-t py-16 lg:py-24 ${
          isLightSurface ? 'border-[#E2DFD7] bg-[#EFECE6]/60' : 'border-[#18181B] bg-[#08080A]'
        }`}
      >
        <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div
                className={`flex items-center gap-2 text-xs ${
                  isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                <span>02. Printed Publications</span>
                <span aria-hidden="true">·</span>
                <span>Tritone Offset & Smyth-Sewn Hardcovers</span>
              </div>
              <h2
                style={{ textWrap: 'balance' }}
                className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Published Monographs
              </h2>
            </div>
            <p
              className={`max-w-md text-xs leading-relaxed ${
                isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              Each volume is printed on archival Japanese or German uncoated stock in
              strictly numbered runs. Select any monograph to inspect its colophon or
              reserve a signed copy.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {MONOGRAPH_BOOKS.map((book) => (
              <article
                key={book.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-colors ${
                  isLightSurface
                    ? 'border-[#DFDCD4] bg-[#F7F6F2]'
                    : 'border-[#1F1F23] bg-[#0C0C0E]'
                }`}
              >
                <div>
                  {/* Cover Preview Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#09090B]">
                    <img
                      src={book.coverSvg}
                      alt={`${book.title} monograph cover`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-white">
                      <span className="font-editorial text-xl italic">
                        {book.title}
                      </span>
                      <span className="font-mono-tabular text-xs text-zinc-300">
                        {book.year}
                      </span>
                    </div>
                  </div>

                  {/* Unboxed Monograph Metadata */}
                  <div
                    className={`mt-5 flex flex-wrap items-center gap-1.5 text-xs ${
                      isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                    }`}
                  >
                    <span className="font-mono-tabular">Vol. {book.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{book.publisher}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{book.platesCount} Plates</span>
                  </div>

                  <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight">
                    {book.title}
                  </h3>
                  <p
                    className={`mt-0.5 font-editorial text-base italic ${
                      isLightSurface ? 'text-zinc-700' : 'text-zinc-300'
                    }`}
                  >
                    {book.subtitle}
                  </p>

                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                    }`}
                  >
                    {book.synopsis}
                  </p>
                </div>

                <div
                  className={`mt-6 border-t pt-4 ${
                    isLightSurface ? 'border-[#E2DFD7]' : 'border-[#1F1F23]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={
                        isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                      }
                    >
                      {book.availability} · {book.pages} pp.
                    </span>
                    <span className="font-mono-tabular text-sm font-semibold">
                      ${book.priceUsd}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2.5">
                    <button
                      onClick={() => setActiveMonograph(book)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        isLightSurface
                          ? 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-zinc-700 hover:text-white'
                      }`}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Inspect Colophon</span>
                    </button>

                    <button
                      onClick={() => handleOrderMonograph(book)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#E11D48] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#BE123C] whitespace-nowrap shrink-0"
                    >
                      <span>Reserve Copy</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXHIBITIONS & PERMANENT COLLECTIONS LEDGER */}
      <section
        id="exhibitions"
        className={`border-t py-16 lg:py-24 ${
          isLightSurface ? 'border-[#E2DFD7]' : 'border-[#18181B]'
        }`}
      >
        <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div
                className={`flex items-center gap-2 text-xs ${
                  isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                <span>03. Curatorial Record</span>
                <span aria-hidden="true">·</span>
                <span>Institutional Shows & Museum Holdings</span>
              </div>
              <h2
                style={{ textWrap: 'balance' }}
                className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Selected Exhibitions & Collections
              </h2>
            </div>

            {/* Exhibition Type Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  'All',
                  'Solo Exhibition',
                  'Group Biennial',
                  'Permanent Acquisition',
                ] as ExhibitionFilter[]
              ).map((type) => (
                <button
                  key={type}
                  onClick={() => setExhibitionFilter(type)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    exhibitionFilter === type
                      ? 'bg-[#E11D48] text-white'
                      : isLightSurface
                        ? 'text-zinc-600 hover:bg-zinc-200/70'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Tabular Exhibition Index */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr
                  className={`border-b text-xs ${
                    isLightSurface
                      ? 'border-zinc-300 text-zinc-500'
                      : 'border-zinc-800 text-zinc-400'
                  }`}
                >
                  <th className="py-3.5 pr-4 font-medium">Year</th>
                  <th className="px-4 py-3.5 font-medium">Exhibition / Acquisition Title</th>
                  <th className="px-4 py-3.5 font-medium">Institution & City</th>
                  <th className="px-4 py-3.5 font-medium">Classification</th>
                  <th className="px-4 py-3.5 text-right font-medium">Plates</th>
                  <th className="py-3.5 pl-4 text-right font-medium">Catalog Ref</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isLightSurface ? 'divide-zinc-200' : 'divide-zinc-800/80'
                }`}
              >
                {filteredExhibitions.map((ex) => (
                  <tr
                    key={ex.id}
                    className={`transition-colors ${
                      isLightSurface
                        ? 'hover:bg-zinc-200/40'
                        : 'hover:bg-zinc-900/50'
                    }`}
                  >
                    <td className="py-4 pr-4 font-mono-tabular text-xs text-zinc-400 whitespace-nowrap">
                      {ex.year}
                    </td>
                    <td className="px-4 py-4 font-display font-medium">
                      {ex.title}
                    </td>
                    <td
                      className={`px-4 py-4 text-xs ${
                        isLightSurface ? 'text-zinc-600' : 'text-zinc-300'
                      }`}
                    >
                      {ex.institution} · {ex.city}
                    </td>
                    <td
                      className={`px-4 py-4 text-xs ${
                        isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                      }`}
                    >
                      {ex.type}
                    </td>
                    <td className="px-4 py-4 text-right font-mono-tabular text-xs">
                      {ex.platesExhibited}
                    </td>
                    <td className="py-4 pl-4 text-right font-mono-tabular text-xs text-zinc-400 whitespace-nowrap">
                      {ex.catalogRef}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. COMMISSION & ARCHIVAL PRINT INQUIRY SECTION */}
      <section
        id="commission"
        className={`border-t py-16 lg:py-24 ${
          isLightSurface
            ? 'border-[#E2DFD7] bg-[#EFECE6]'
            : 'border-[#18181B] bg-[#09090B]'
        }`}
      >
        <div className="mx-auto max-w-[1380px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Direct Studio Contact & Archival Process */}
            <div className="lg:col-span-5">
              <div
                className={`flex items-center gap-2 text-xs ${
                  isLightSurface ? 'text-zinc-600' : 'text-zinc-400'
                }`}
              >
                <span>04. Studio Inquiries & Print Room</span>
                <span aria-hidden="true">·</span>
                <span>Direct Dispatch</span>
              </div>

              <h2
                style={{ textWrap: 'balance' }}
                className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Commission a Monograph or Acquire Archival Editions
              </h2>

              <p
                className={`mt-4 text-sm leading-relaxed ${
                  isLightSurface ? 'text-zinc-700' : 'text-zinc-300'
                }`}
              >
                All silver gelatin and archival pigment prints are hand-inspected,
                embossed, and numbered on the verso by Soren Lindqvist in Stockholm.
                Editorial and architectural commissions are booked worldwide.
              </p>

              <dl
                className={`mt-8 space-y-4 border-t pt-6 text-xs ${
                  isLightSurface ? 'border-zinc-300' : 'border-zinc-800'
                }`}
              >
                <div>
                  <dt className="text-zinc-500">Stockholm Darkroom & Archive</dt>
                  <dd className="mt-1 font-medium">
                    Hornsgatan 42, 118 21 Stockholm, Sweden
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Gallery Representation</dt>
                  <dd className="mt-1 font-medium">
                    Galerie Nordenhake · Stockholm / Berlin / Mexico City
                  </dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Archival Certification</dt>
                  <dd className="mt-1 font-mono-tabular">
                    ISO 18902 Museum Permanence Standard · Signed Certificate Included
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleFormSubmit}
                className={`rounded-2xl border p-6 sm:p-8 ${
                  isLightSurface
                    ? 'border-[#DFDCD4] bg-[#F7F6F2]'
                    : 'border-[#1F1F23] bg-[#0C0C0E]'
                }`}
              >
                {/* Inquiry Type Selector */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400">
                    Nature of Inquiry
                  </label>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {(
                      [
                        'Editorial Commission',
                        'Archival Print Acquisition',
                        'Monograph Order',
                      ] as const
                    ).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => {
                          setInquiryType(type);
                          setSubmittedRef(null);
                        }}
                        className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          inquiryType === type
                            ? 'border-[#E11D48] bg-[#E11D48] text-white'
                            : isLightSurface
                              ? 'border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Plate or Monograph Selector */}
                <div className="mt-5">
                  <label
                    htmlFor="plate-select"
                    className="block text-xs font-medium text-zinc-400"
                  >
                    Referenced Plate, Series, or Publication
                  </label>
                  <select
                    id="plate-select"
                    value={selectedPlateTitle}
                    onChange={(e) => setSelectedPlateTitle(e.target.value)}
                    className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-xs font-mono-tabular focus:outline-2 focus:outline-[#E11D48] ${
                      isLightSurface
                        ? 'border-zinc-300 bg-white text-zinc-900'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-100'
                    }`}
                  >
                    {PORTFOLIO_WORKS.map((w) => (
                      <option
                        key={w.id}
                        value={`${w.plateNumber} — ${w.title} ($${w.printPriceUsd.toLocaleString()})`}
                      >
                        {w.plateNumber} — {w.title} ({w.editionAvailable} · $
                        {w.printPriceUsd.toLocaleString()})
                      </option>
                    ))}
                    {MONOGRAPH_BOOKS.map((b) => (
                      <option
                        key={b.id}
                        value={`Monograph ${b.index}: ${b.title} (${b.publisher}, $${b.priceUsd})`}
                      >
                        Monograph {b.index}: {b.title} ({b.publisher} · ${b.priceUsd})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Client Details */}
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-xs font-medium text-zinc-400"
                    >
                      Full Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Dr. Clara Lindholm"
                      className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-[#E11D48] ${
                        isLightSurface
                          ? 'border-zinc-300 bg-white text-zinc-900'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-100'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-email"
                      className="block text-xs font-medium text-zinc-400"
                    >
                      Email Address *
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="clara@architektur-zuerich.ch"
                      className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-[#E11D48] ${
                        isLightSurface
                          ? 'border-zinc-300 bg-white text-zinc-900'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-100'
                      }`}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="client-org"
                    className="block text-xs font-medium text-zinc-400"
                  >
                    Institution, Publication, or Private Collection
                  </label>
                  <input
                    id="client-org"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="ETH Zürich Architectural Archive / Private Collector"
                    className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-[#E11D48] ${
                      isLightSurface
                        ? 'border-zinc-300 bg-white text-zinc-900'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-100'
                    }`}
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="project-brief"
                    className="block text-xs font-medium text-zinc-400"
                  >
                    Commission Scope, Framing Preference, or Shipping Destination
                  </label>
                  <textarea
                    id="project-brief"
                    rows={3}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Specify location dates, architectural subject, or museum framing requirements..."
                    className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-2 focus:outline-[#E11D48] ${
                      isLightSurface
                        ? 'border-zinc-300 bg-white text-zinc-900'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-100'
                    }`}
                  />
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <span className="text-xs text-zinc-400">
                    Direct studio response within 24 hours.
                  </span>

                  <button
                    type="submit"
                    className="rounded-lg bg-[#E11D48] px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#BE123C] whitespace-nowrap shrink-0"
                  >
                    Submit Studio Dossier
                  </button>
                </div>

                {submittedRef && (
                  <div
                    role="status"
                    className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-4 text-xs text-emerald-200"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-semibold">
                        Inquiry Registered · Reference {submittedRef}
                      </p>
                      <p className="mt-1 text-emerald-300/90">
                        Thank you, {clientName}. Your {inquiryType.toLowerCase()} dossier
                        regarding <span className="font-mono-tabular">{selectedPlateTitle}</span>{' '}
                        has been routed to Stockholm studio registrar.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. QUIET EDITORIAL FOOTER */}
      <footer
        className={`border-t py-10 text-xs ${
          isLightSurface
            ? 'border-[#E2DFD7] text-zinc-600'
            : 'border-[#18181B] text-zinc-500'
        }`}
      >
        <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-12">
          <div>
            <span className="font-display font-semibold text-zinc-300">
              Soren Lindqvist Studio
            </span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>All photographs © 2018–2026 Soren Lindqvist. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#works" className="hover:underline whitespace-nowrap shrink-0">
              Selected Works
            </a>
            <a href="#monographs" className="hover:underline whitespace-nowrap shrink-0">
              Monographs
            </a>
            <a href="#exhibitions" className="hover:underline whitespace-nowrap shrink-0">
              Exhibitions
            </a>
            <a href="#commission" className="hover:underline whitespace-nowrap shrink-0">
              Print Inquiries
            </a>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN LIGHTBOX & OPTICAL LOUPE MODAL */}
      <LightboxModal
        work={activeLightboxWork}
        works={filteredWorks.length > 0 ? filteredWorks : PORTFOLIO_WORKS}
        onClose={() => setActiveLightboxWork(null)}
        onSelectWork={(w) => setActiveLightboxWork(w)}
        onInquirePrint={handleInquireFromLightbox}
      />

      {/* MONOGRAPH COLOPHON INSPECTION MODAL */}
      {activeMonograph && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeMonograph.title} colophon details`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0C0C0E] p-6 text-zinc-100 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono-tabular text-xs text-zinc-400">
                  MONOGRAPH COLOPHON · VOL. {activeMonograph.index}
                </span>
                <h3 className="mt-1 font-display text-2xl font-semibold">
                  {activeMonograph.title}
                </h3>
                <p className="font-editorial text-base italic text-zinc-300">
                  {activeMonograph.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveMonograph(null)}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:text-white whitespace-nowrap shrink-0"
              >
                Close
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-zinc-800 py-4 text-xs">
              <div>
                <dt className="text-zinc-500">Publisher</dt>
                <dd className="mt-0.5 font-medium text-zinc-200">
                  {activeMonograph.publisher}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">ISBN-13</dt>
                <dd className="mt-0.5 font-mono-tabular text-zinc-200">
                  {activeMonograph.isbn}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Binding Specification</dt>
                <dd className="mt-0.5 text-zinc-200">{activeMonograph.binding}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Extent & Plates</dt>
                <dd className="mt-0.5 font-mono-tabular text-zinc-200">
                  {activeMonograph.pages} Pages · {activeMonograph.platesCount} Tritone Plates
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs leading-relaxed text-zinc-300">
              {activeMonograph.synopsis}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono-tabular text-base font-semibold">
                ${activeMonograph.priceUsd} USD
              </span>
              <button
                onClick={() => handleOrderMonograph(activeMonograph)}
                className="rounded-lg bg-[#E11D48] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#BE123C] whitespace-nowrap shrink-0"
              >
                Reserve Signed Monograph
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
