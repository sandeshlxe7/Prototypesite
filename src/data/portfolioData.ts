export type PhotoCategory = 'Architecture' | 'Editorial' | 'Landscape' | 'Nocturne';

export interface ExifData {
  camera: string;
  lens: string;
  focalLength: '28mm' | '35mm' | '50mm' | '80mm' | '110mm';
  aperture: string;
  shutterSpeed: string;
  iso: number;
  filmStock: string;
}

export interface PhotoWork {
  id: string;
  plateNumber: string;
  title: string;
  series: string;
  category: PhotoCategory;
  year: string;
  location: string;
  client: string;
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1';
  bentoClass: string;
  masonryHeightClass: string;
  imageUrl: string;
  dominantTone: string;
  exif: ExifData;
  curatorNote: string;
  editionAvailable: string;
  printPriceUsd: number;
  zoneDistribution: number[]; // Ansel Adams Zone I to X relative weights
}

export interface MonographBook {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  publisher: string;
  year: string;
  pages: number;
  platesCount: number;
  binding: string;
  isbn: string;
  availability: 'In Print' | 'Archival Edition Only' | 'Second Printing';
  priceUsd: number;
  synopsis: string;
  coverSvg: string;
}

export interface ExhibitionRecord {
  id: string;
  year: string;
  title: string;
  institution: string;
  city: string;
  type: 'Solo Exhibition' | 'Group Biennial' | 'Permanent Acquisition';
  platesExhibited: number;
  catalogRef: string;
}

function encodeSvgDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

/**
 * Generates museum-grade photographic SVG plates with organic lighting gradients,
 * architectural shadow geometry, and fine analog grain texture.
 */
export const PHOTO_PLATES = {
  travertineColonade: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="sky1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#171614"/>
          <stop offset="55%" stop-color="#2c2925"/>
          <stop offset="100%" stop-color="#0d0c0b"/>
        </linearGradient>
        <linearGradient id="sunBeam" x1="0" y1="0.2" x2="1" y2="0.8">
          <stop offset="0%" stop-color="#e7dcc8" stop-opacity="0.42"/>
          <stop offset="55%" stop-color="#b8a890" stop-opacity="0.14"/>
          <stop offset="100%" stop-color="#0a0a09" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="colLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#dcd2c0"/>
          <stop offset="28%" stop-color="#9c9282"/>
          <stop offset="30%" stop-color="#22201d"/>
          <stop offset="100%" stop-color="#11100e"/>
        </linearGradient>
        <filter id="grain1">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.09"/>
          </feComponentTransfer>
          <feBlend mode="overlay" in2="SourceGraphic"/>
        </filter>
      </defs>
      <rect width="1200" height="900" fill="url(#sky1)"/>
      <!-- Architectural brutalist colonnade -->
      <polygon points="0,640 1200,520 1200,900 0,900" fill="#121110"/>
      <!-- Diagonal sunlight casts on travertine floor -->
      <polygon points="140,0 440,0 1120,900 620,900" fill="url(#sunBeam)"/>
      <polygon points="520,0 760,0 1200,720 1020,900" fill="url(#sunBeam)"/>
      <!-- Monumental Pillars -->
      <rect x="80" y="0" width="150" height="720" fill="url(#colLight)"/>
      <rect x="370" y="0" width="165" height="680" fill="url(#colLight)"/>
      <rect x="680" y="0" width="180" height="640" fill="url(#colLight)"/>
      <rect x="1010" y="0" width="190" height="600" fill="url(#colLight)"/>
      <!-- Long architectural cast shadows -->
      <polygon points="80,720 230,720 680,900 390,900" fill="#070706" opacity="0.92"/>
      <polygon points="370,680 535,680 1090,900 780,900" fill="#070706" opacity="0.92"/>
      <!-- Solitary human figure in long coat with cast shadow -->
      <ellipse cx="615" cy="738" rx="9" ry="9" fill="#090908"/>
      <path d="M604,748 L626,748 L631,812 L599,812 Z" fill="#090908"/>
      <polygon points="602,812 630,812 850,895 795,898" fill="#050504" opacity="0.85"/>
      <rect width="1200" height="900" filter="url(#grain1)" opacity="0.55"/>
    </svg>
  `),

  concreteCantilever: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
      <defs>
        <linearGradient id="dawnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e2226"/>
          <stop offset="52%" stop-color="#6e7880"/>
          <stop offset="68%" stop-color="#c4cbd0"/>
          <stop offset="100%" stop-color="#2c3135"/>
        </linearGradient>
        <linearGradient id="seaGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8b959c"/>
          <stop offset="30%" stop-color="#454c52"/>
          <stop offset="100%" stop-color="#14171a"/>
        </linearGradient>
        <linearGradient id="concreteFace" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stop-color="#d6dad8"/>
          <stop offset="45%" stop-color="#8b908e"/>
          <stop offset="100%" stop-color="#26292b"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="560" fill="url(#dawnSky)"/>
      <rect y="560" width="1600" height="340" fill="url(#seaGlass)"/>
      <!-- Distant misty horizon line -->
      <rect y="556" width="1600" height="8" fill="#dfe4e8" opacity="0.35"/>
      <!-- Cantilevered Tadao-style concrete pavilion -->
      <polygon points="0,120 1180,230 1180,450 0,490" fill="url(#concreteFace)"/>
      <polygon points="0,450 1180,450 1090,510 0,530" fill="#181a1c"/>
      <rect x="180" y="450" width="90" height="310" fill="#23272a"/>
      <rect x="640" y="450" width="76" height="280" fill="#1a1d20"/>
      <!-- Architectural aperture cut-out glowing with morning mist -->
      <rect x="780" y="285" width="240" height="115" fill="#ced5da" opacity="0.88"/>
      <!-- Water reflection -->
      <rect x="780" y="565" width="240" height="190" fill="#cfd6dc" opacity="0.16"/>
      <line x1="0" y1="630" x2="1600" y2="630" stroke="#cdd4da" stroke-opacity="0.15" stroke-width="1.5"/>
      <line x1="200" y1="710" x2="1400" y2="710" stroke="#cdd4da" stroke-opacity="0.1" stroke-width="1"/>
    </svg>
  `),

  sculpturalLinenPortrait: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="900" height="1200">
      <defs>
        <linearGradient id="studioWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#cfc8bc"/>
          <stop offset="58%" stop-color="#8c8478"/>
          <stop offset="100%" stop-color="#282521"/>
        </linearGradient>
        <linearGradient id="coatFold" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stop-color="#f0eae1"/>
          <stop offset="50%" stop-color="#b5aba0"/>
          <stop offset="100%" stop-color="#332f2b"/>
        </linearGradient>
      </defs>
      <rect width="900" height="1200" fill="url(#studioWall)"/>
      <!-- Hard architectural window shadow across wall -->
      <polygon points="0,0 420,0 0,680" fill="#1e1c19" opacity="0.72"/>
      <polygon points="560,0 900,0 900,1200 220,1200" fill="#181614" opacity="0.82"/>
      <!-- Minimalist sculptural silhouette -->
      <ellipse cx="450" cy="340" rx="68" ry="86" fill="#231f1c"/>
      <path d="M450,254 C490,254 518,292 518,340 C518,388 490,426 450,426 Z" fill="#b89f88" opacity="0.7"/>
      <!-- High collar & structured coat shoulders -->
      <polygon points="365,410 535,410 695,550 740,1200 160,1200 205,550" fill="url(#coatFold)"/>
      <!-- Deep sculptural pleat shadow -->
      <polygon points="455,410 535,410 640,1200 435,1200" fill="#211e1b" opacity="0.86"/>
      <line x1="365" y1="410" x2="455" y2="980" stroke="#fffbf5" stroke-opacity="0.35" stroke-width="2"/>
    </svg>
  `),

  nordicBasaltStacks: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="icelandFog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#bfc6cc"/>
          <stop offset="55%" stop-color="#dde2e6"/>
          <stop offset="100%" stop-color="#7c858e"/>
        </linearGradient>
        <linearGradient id="atlanticLongExp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#cfd5da"/>
          <stop offset="40%" stop-color="#69727a"/>
          <stop offset="100%" stop-color="#1b1f24"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="540" fill="url(#icelandFog)"/>
      <rect y="540" width="1200" height="360" fill="url(#atlanticLongExp)"/>
      <!-- Distant headland in fog -->
      <polygon points="0,540 0,390 290,420 560,540" fill="#707880" opacity="0.45"/>
      <!-- Monolithic black basalt sea stacks -->
      <polygon points="380,580 430,190 495,165 555,580" fill="#181b1e"/>
      <polygon points="495,165 530,210 555,580 495,580" fill="#0d0f12"/>
      <polygon points="620,610 665,260 725,290 775,610" fill="#1e2226"/>
      <polygon points="700,275 725,290 775,610 715,610" fill="#0e1013"/>
      <polygon points="210,630 238,410 285,435 310,630" fill="#252a2e"/>
      <!-- Ethereal mist bank drifting across stacks -->
      <rect x="0" y="490" width="1200" height="95" fill="#e2e6ea" opacity="0.42"/>
      <!-- Reflections on glassy water -->
      <rect x="415" y="580" width="115" height="220" fill="#0f1215" opacity="0.45"/>
      <rect x="645" y="610" width="105" height="180" fill="#0f1215" opacity="0.38"/>
    </svg>
  `),

  kyotoRainNocturne: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="nightAlley" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#07090d"/>
          <stop offset="60%" stop-color="#101620"/>
          <stop offset="100%" stop-color="#06080c"/>
        </linearGradient>
        <radialGradient id="amberLantern" cx="0.68" cy="0.42" r="0.35">
          <stop offset="0%" stop-color="#ffcf70" stop-opacity="0.95"/>
          <stop offset="28%" stop-color="#e15b26" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#07090d" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="wetCobble" cx="0.68" cy="0.78" r="0.38">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.55"/>
          <stop offset="45%" stop-color="#9a3412" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#06080c" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#nightAlley)"/>
      <!-- Perspective timber machiya walls -->
      <polygon points="0,0 430,260 430,620 0,900" fill="#05070a"/>
      <polygon points="1200,0 730,260 730,620 1200,900" fill="#040609"/>
      <!-- Warm lantern glow & wet slate reflection -->
      <rect width="1200" height="900" fill="url(#amberLantern)"/>
      <rect y="550" width="1200" height="350" fill="url(#wetCobble)"/>
      <!-- Glowing shoji & lantern -->
      <rect x="775" y="340" width="46" height="68" rx="8" fill="#fde68a"/>
      <rect x="750" y="455" width="75" height="145" fill="#d97706" opacity="0.28"/>
      <!-- Distant figure with umbrella in mist -->
      <path d="M535,470 Q580,435 625,470 Z" fill="#090c12"/>
      <rect x="572" y="470" width="16" height="105" fill="#05070a"/>
      <!-- Wet cobblestone horizontal specular streaks -->
      <rect x="745" y="650" width="95" height="6" fill="#fbbf24" opacity="0.55"/>
      <rect x="730" y="690" width="125" height="8" fill="#f59e0b" opacity="0.4"/>
      <rect x="710" y="745" width="155" height="10" fill="#ea580c" opacity="0.3"/>
      <rect x="510" y="620" width="380" height="2" fill="#93c5fd" opacity="0.2"/>
    </svg>
  `),

  zurichKunsthalleStair: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" width="900" height="900">
      <defs>
        <linearGradient id="stairGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e5e5e0"/>
          <stop offset="50%" stop-color="#7c7c78"/>
          <stop offset="100%" stop-color="#171716"/>
        </linearGradient>
      </defs>
      <rect width="900" height="900" fill="#181817"/>
      <circle cx="450" cy="450" r="390" fill="url(#stairGrad)"/>
      <circle cx="490" cy="420" r="260" fill="#121211"/>
      <circle cx="515" cy="400" r="145" fill="#d6d5ce"/>
      <!-- Geometric spiral steps -->
      <polygon points="450,450 840,320 840,510" fill="#292927" opacity="0.8"/>
      <polygon points="450,450 680,820 460,840" fill="#1f1f1d" opacity="0.9"/>
      <polygon points="450,450 110,640 60,440" fill="#b5b4ad" opacity="0.45"/>
    </svg>
  `),

  atacamaSaltDusk: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="desertSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#161922"/>
          <stop offset="65%" stop-color="#594a47"/>
          <stop offset="100%" stop-color="#c99e82"/>
        </linearGradient>
        <linearGradient id="duneShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#8c6d58"/>
          <stop offset="52%" stop-color="#221d1c"/>
          <stop offset="100%" stop-color="#121010"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="520" fill="url(#desertSky)"/>
      <!-- Sweeping ridge lines -->
      <path d="M0,520 Q340,340 720,460 T1200,390 L1200,900 L0,900 Z" fill="#2d2523"/>
      <path d="M0,620 Q480,430 890,590 T1200,530 L1200,900 L0,900 Z" fill="url(#duneShade)"/>
      <!-- Salt flat crystalline foreground -->
      <polygon points="0,760 1200,690 1200,900 0,900" fill="#d5cabd" opacity="0.22"/>
    </svg>
  `),

  berlinUbahnSodium: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
      <defs>
        <linearGradient id="sodiumTunnel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0f1412"/>
          <stop offset="50%" stop-color="#293830"/>
          <stop offset="100%" stop-color="#0b0f0d"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#sodiumTunnel)"/>
      <!-- Vanishing point perspective lines -->
      <polygon points="0,0 1200,0 820,310 380,310" fill="#17221c"/>
      <polygon points="0,900 1200,900 820,590 380,590" fill="#0d120f"/>
      <!-- Fluorescent ceiling light strips -->
      <rect x="565" y="60" width="70" height="14" fill="#ecfccb"/>
      <rect x="578" y="160" width="44" height="10" fill="#d9f99d"/>
      <rect x="588" y="235" width="24" height="6" fill="#bef264"/>
      <!-- Tiled station pillars -->
      <rect x="190" y="120" width="85" height="660" fill="#1e2d24"/>
      <rect x="925" y="120" width="85" height="660" fill="#1e2d24"/>
      <rect x="330" y="240" width="52" height="420" fill="#15201a"/>
      <rect x="818" y="240" width="52" height="420" fill="#15201a"/>
    </svg>
  `),

  atelierHandsSilver: encodeSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" width="900" height="1200">
      <defs>
        <radialGradient id="spotLight" cx="0.5" cy="0.48" r="0.48">
          <stop offset="0%" stop-color="#d4d4d0"/>
          <stop offset="55%" stop-color="#454542"/>
          <stop offset="100%" stop-color="#080808"/>
        </radialGradient>
      </defs>
      <rect width="900" height="1200" fill="url(#spotLight)"/>
      <!-- Ceramic vessel & sculptural hands study in silver gelatin -->
      <path d="M310,560 C290,410 370,330 450,330 C530,330 610,410 590,560 C575,690 520,790 450,790 C380,790 325,690 310,560 Z" fill="#dcdad3"/>
      <path d="M450,330 C530,330 610,410 590,560 C575,690 520,790 450,790 Z" fill="#242422"/>
      <rect x="220" y="790" width="460" height="410" fill="#121211"/>
      <line x1="220" y1="790" x2="680" y2="790" stroke="#e4e4df" stroke-opacity="0.4" stroke-width="2"/>
    </svg>
  `),
};

export const PORTFOLIO_WORKS: PhotoWork[] = [
  {
    id: 'work-01',
    plateNumber: 'PLATE I · 01',
    title: 'Colonnade at EUR Dusk',
    series: 'Roman Rationalism Study',
    category: 'Architecture',
    year: '2026',
    location: 'Rome, Italy',
    client: 'Domus Monograph Commission',
    aspectRatio: '4:3',
    bentoClass: 'md:col-span-1 md:row-span-1',
    masonryHeightClass: 'aspect-[4/3]',
    imageUrl: PHOTO_PLATES.travertineColonade,
    dominantTone: '#9C9282',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'Summilux-M 35mm f/1.4 ASPH',
      focalLength: '35mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/250s',
      iso: 125,
      filmStock: 'B&W Warm Selenium Toning',
    },
    curatorNote:
      'Captured during the final twelve minutes of autumnal solstice light across the Palazzo della Civiltà Italiana travertine arcade. The solitary pedestrian anchors the monumental scale.',
    editionAvailable: 'Edition 3 of 10 · 40×50 in. Archival Baryta',
    printPriceUsd: 3400,
    zoneDistribution: [14, 22, 18, 12, 9, 8, 7, 5, 3, 2],
  },
  {
    id: 'work-02',
    plateNumber: 'PLATE I · 02',
    title: 'Naoshima Sea Pavilion IV',
    series: 'Silent Concrete & Tide',
    category: 'Architecture',
    year: '2026',
    location: 'Kagawa Prefecture, Japan',
    client: 'Benesse Art Site Archive',
    aspectRatio: '16:9',
    bentoClass: 'md:col-span-2 md:row-span-2',
    masonryHeightClass: 'aspect-[16/9]',
    imageUrl: PHOTO_PLATES.concreteCantilever,
    dominantTone: '#8B959C',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 28P f/4',
      focalLength: '28mm',
      aperture: 'f/11',
      shutterSpeed: '4.0s',
      iso: 64,
      filmStock: 'HNCS Natural Medium Format',
    },
    curatorNote:
      'A four-second exposure using a 6-stop neutral density filter flattens the Seto Inland Sea into brushed pewter, isolating the cantilevered board-formed concrete horizon.',
    editionAvailable: 'Edition 2 of 7 · 48×72 in. Diasec Museum Mount',
    printPriceUsd: 5200,
    zoneDistribution: [6, 12, 18, 22, 16, 11, 8, 4, 2, 1],
  },
  {
    id: 'work-03',
    plateNumber: 'PLATE I · 03',
    title: 'Silhouette in Raw Linen',
    series: 'Form & Drapery Study',
    category: 'Editorial',
    year: '2025',
    location: 'Antwerp, Belgium',
    client: 'A Magazine Curated By',
    aspectRatio: '3:4',
    bentoClass: 'md:col-span-1 md:row-span-2',
    masonryHeightClass: 'aspect-[3/4]',
    imageUrl: PHOTO_PLATES.sculpturalLinenPortrait,
    dominantTone: '#B5ABA0',
    exif: {
      camera: 'Pentax 67II',
      lens: 'SMC Pentax 67 105mm f/2.4',
      focalLength: '110mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/125s',
      iso: 400,
      filmStock: 'Kodak Portra 400 (120 Roll)',
    },
    curatorNote:
      'Unmodified north-facing skylight in a former Antwerp textile warehouse cuts across the structural pleating of an unbleached Flemish linen overcoat.',
    editionAvailable: 'Edition 5 of 15 · 24×32 in. Hahnemühle Photo Rag',
    printPriceUsd: 2100,
    zoneDistribution: [10, 15, 19, 14, 12, 11, 9, 6, 3, 1],
  },
  {
    id: 'work-04',
    plateNumber: 'PLATE I · 04',
    title: 'Reynisdrangar Sea Stacks in Fog',
    series: 'Subarctic Littoral',
    category: 'Landscape',
    year: '2025',
    location: 'Vík í Mýrdal, Iceland',
    client: 'Solo Monograph Plate',
    aspectRatio: '4:3',
    bentoClass: 'md:col-span-1 md:row-span-1',
    masonryHeightClass: 'aspect-[4/3]',
    imageUrl: PHOTO_PLATES.nordicBasaltStacks,
    dominantTone: '#7C858E',
    exif: {
      camera: 'Chamonix 45F-2 4×5 Field',
      lens: 'Rodenstock Grandagon-N 90mm',
      focalLength: '28mm',
      aperture: 'f/22',
      shutterSpeed: '15.0s',
      iso: 100,
      filmStock: 'Ilford Delta 100 Sheet Film',
    },
    curatorNote:
      'Exposed on 4×5 large-format sheet film as advection fog rolled across the black volcanic littoral, erasing the boundary between ocean swell and sky.',
    editionAvailable: 'Edition 4 of 12 · 32×40 in. Silver Gelatin Fiber',
    printPriceUsd: 3800,
    zoneDistribution: [8, 11, 14, 15, 16, 15, 11, 6, 3, 1],
  },
  {
    id: 'work-05',
    plateNumber: 'PLATE I · 05',
    title: 'Pontocho Rain & Amber Lantern',
    series: 'Kyoto Nocturnes',
    category: 'Nocturne',
    year: '2026',
    location: 'Kyoto, Japan',
    client: 'Fondation Cartier Exhibition',
    aspectRatio: '4:3',
    bentoClass: 'md:col-span-1 md:row-span-1',
    masonryHeightClass: 'aspect-[4/3]',
    imageUrl: PHOTO_PLATES.kyotoRainNocturne,
    dominantTone: '#D97706',
    exif: {
      camera: 'Leica MP (0.72x)',
      lens: 'Noctilux-M 50mm f/1.2 ASPH',
      focalLength: '50mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/60s',
      iso: 800,
      filmStock: 'CineStill 800T Tungsten',
    },
    curatorNote:
      'Handheld at f/1.4 during a late October downpour. Halation from the single cedar-framed lantern bleeds into the wet granite flagstones.',
    editionAvailable: 'Edition 1 of 10 · 30×40 in. Chromogenic C-Print',
    printPriceUsd: 2950,
    zoneDistribution: [28, 24, 16, 10, 7, 5, 4, 3, 2, 1],
  },
  {
    id: 'work-06',
    plateNumber: 'PLATE I · 06',
    title: 'Helix Ocular, Kunsthaus',
    series: 'Swiss Concrete Geometries',
    category: 'Architecture',
    year: '2025',
    location: 'Zürich, Switzerland',
    client: 'GTA Verlag Zürich',
    aspectRatio: '1:1',
    bentoClass: 'md:col-span-1 md:row-span-1',
    masonryHeightClass: 'aspect-square',
    imageUrl: PHOTO_PLATES.zurichKunsthalleStair,
    dominantTone: '#7C7C78',
    exif: {
      camera: 'Hasselblad 500C/M',
      lens: 'Carl Zeiss Planar 80mm f/2.8',
      focalLength: '80mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/30s',
      iso: 400,
      filmStock: 'Kodak Tri-X 400 (6×6 Square)',
    },
    curatorNote:
      'Looking vertically through the central stairwell oculus. The 6×6 medium format square frame resolves the tension between spiral motion and brutalist mass.',
    editionAvailable: 'Edition 6 of 15 · 28×28 in. Silver Gelatin',
    printPriceUsd: 2400,
    zoneDistribution: [15, 18, 16, 14, 12, 10, 7, 5, 2, 1],
  },
  {
    id: 'work-07',
    plateNumber: 'PLATE I · 07',
    title: 'Salar de Tara Last Light',
    series: 'Altiplano Horizon',
    category: 'Landscape',
    year: '2024',
    location: 'Atacama Desert, Chile',
    client: 'Aperture Portfolio Prize',
    aspectRatio: '4:3',
    bentoClass: 'md:col-span-2 md:row-span-1',
    masonryHeightClass: 'aspect-[4/3]',
    imageUrl: PHOTO_PLATES.atacamaSaltDusk,
    dominantTone: '#8C6D58',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 55V f/2.5',
      focalLength: '50mm',
      aperture: 'f/11',
      shutterSpeed: '1/15s',
      iso: 64,
      filmStock: 'HNCS 16-bit Linear RAW',
    },
    curatorNote:
      'At 4,300 meters elevation, atmospheric scattering strips the horizon to raw ochre and iron oxide shadows across wind-carved ignimbrite ridges.',
    editionAvailable: 'Edition 2 of 8 · 40×54 in. Archival Pigment',
    printPriceUsd: 3900,
    zoneDistribution: [12, 19, 21, 16, 12, 9, 6, 3, 1, 1],
  },
  {
    id: 'work-08',
    plateNumber: 'PLATE I · 08',
    title: 'U-Bahnhof Schloßstraße 02:14',
    series: 'Sodium Vapor Transit',
    category: 'Nocturne',
    year: '2025',
    location: 'Berlin, Germany',
    client: 'Neue Nationalgalerie Archive',
    aspectRatio: '4:3',
    bentoClass: 'md:col-span-1 md:row-span-1',
    masonryHeightClass: 'aspect-[4/3]',
    imageUrl: PHOTO_PLATES.berlinUbahnSodium,
    dominantTone: '#293830',
    exif: {
      camera: 'Leica SL3',
      lens: 'APO-Summicron-SL 35mm f/2',
      focalLength: '35mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/10s',
      iso: 400,
      filmStock: 'Mercury Vapor Color Matrix',
    },
    curatorNote:
      'Symmetrical one-point perspective study of 1970s West Berlin brutalist transit infrastructure after the final night train departure.',
    editionAvailable: 'Edition 4 of 10 · 30×40 in. Archival Baryta',
    printPriceUsd: 2700,
    zoneDistribution: [22, 25, 19, 12, 8, 6, 4, 2, 1, 1],
  },
  {
    id: 'work-09',
    plateNumber: 'PLATE I · 09',
    title: 'Stoneware Vessel in Chiaroscuro',
    series: 'Quiet Objects Study',
    category: 'Editorial',
    year: '2026',
    location: 'Copenhagen, Denmark',
    client: 'Kinfolk Issue 52 Commission',
    aspectRatio: '3:4',
    bentoClass: 'md:col-span-1 md:row-span-1',
    masonryHeightClass: 'aspect-[3/4]',
    imageUrl: PHOTO_PLATES.atelierHandsSilver,
    dominantTone: '#8C8C86',
    exif: {
      camera: 'Hasselblad 500C/M',
      lens: 'Carl Zeiss Makro-Planar 120mm',
      focalLength: '110mm',
      aperture: 'f/11',
      shutterSpeed: '1/4s',
      iso: 100,
      filmStock: 'Ilford FP4 Plus 125',
    },
    curatorNote:
      'Photographed in ceramicist Astrid Krogh’s north-lit courtyard studio using a single black flag to carve the stoneware vessel’s meridian.',
    editionAvailable: 'Edition 7 of 15 · 20×24 in. Silver Gelatin',
    printPriceUsd: 1850,
    zoneDistribution: [18, 20, 16, 12, 10, 9, 7, 5, 2, 1],
  },
];

export const MONOGRAPH_BOOKS: MonographBook[] = [
  {
    id: 'mono-01',
    index: '01',
    title: 'Silent Concrete & Tide',
    subtitle: 'Architectural Meditations Along the Seto Inland Sea',
    publisher: 'Mack Books, London',
    year: '2026',
    pages: 196,
    platesCount: 84,
    binding: 'Linen Hardcover with Tipped-in Baryta Plate',
    isbn: '978-1-915743-42-8',
    availability: 'In Print',
    priceUsd: 85,
    synopsis:
      'Recorded over four winters across Naoshima, Teshima, and Inujima. Printed in tritone offset on unweighted Japanese Munken paper with an essay by architectural historian Ken Tadashi Oshima.',
    coverSvg: PHOTO_PLATES.concreteCantilever,
  },
  {
    id: 'mono-02',
    index: '02',
    title: 'Subarctic Littoral',
    subtitle: 'Large-Format Studies of the North Atlantic Basalt Coast',
    publisher: 'Steidl, Göttingen',
    year: '2024',
    pages: 164,
    platesCount: 62,
    binding: 'Exposed Smyth-Sewn Spine with Debossed Cloth',
    isbn: '978-3-96999-218-0',
    availability: 'Second Printing',
    priceUsd: 95,
    synopsis:
      'Produced entirely with a 4×5 field camera in Iceland and the Faroe Islands. Each plate is reproduced at 1:1 contact-sheet scale alongside field exposure notes.',
    coverSvg: PHOTO_PLATES.nordicBasaltStacks,
  },
  {
    id: 'mono-03',
    index: '03',
    title: 'Roman Rationalism at Dusk',
    subtitle: 'Shadow Geometry of Interwar Stone Colonnades',
    publisher: 'Kodoji Press, Baden',
    year: '2023',
    pages: 128,
    platesCount: 48,
    binding: 'Swiss-Bound Travertine Paper Boards',
    isbn: '978-3-03747-119-7',
    availability: 'Archival Edition Only',
    priceUsd: 240,
    synopsis:
      'A study of limestone and travertine facades in Rome, Milan, and Como during the final fifteen minutes before civil twilight.',
    coverSvg: PHOTO_PLATES.travertineColonade,
  },
];

export const EXHIBITION_HISTORY: ExhibitionRecord[] = [
  {
    id: 'ex-01',
    year: '2026',
    title: 'Forms of Silence: Concrete & Sea',
    institution: 'Fotografiska Stockholm',
    city: 'Stockholm, Sweden',
    type: 'Solo Exhibition',
    platesExhibited: 42,
    catalogRef: 'CAT-FS-2026-04',
  },
  {
    id: 'ex-02',
    year: '2025',
    title: 'New Topographics of the North Atlantic',
    institution: 'Louisiana Museum of Modern Art',
    city: 'Humlebæk, Denmark',
    type: 'Group Biennial',
    platesExhibited: 18,
    catalogRef: 'CAT-LM-2025-11',
  },
  {
    id: 'ex-03',
    year: '2025',
    title: 'Nocturnes in Tungsten & Rain',
    institution: 'Fondation Henri Cartier-Bresson',
    city: 'Paris, France',
    type: 'Solo Exhibition',
    platesExhibited: 34,
    catalogRef: 'CAT-HCB-2025-02',
  },
  {
    id: 'ex-04',
    year: '2024',
    title: 'Architecture of Shadow (Permanent Collection)',
    institution: 'Kunsthaus Zürich',
    city: 'Zürich, Switzerland',
    type: 'Permanent Acquisition',
    platesExhibited: 12,
    catalogRef: 'ACQ-KHZ-2024-89',
  },
  {
    id: 'ex-05',
    year: '2023',
    title: 'Silver Gelatin Now: Contemporary Darkroom Practice',
    institution: 'Foam Fotografiemuseum',
    city: 'Amsterdam, Netherlands',
    type: 'Group Biennial',
    platesExhibited: 15,
    catalogRef: 'CAT-FOAM-2023-07',
  },
];
