// Hardcoded VCR content for the public site. Swap to Supabase later by
// replacing these imports — the shapes match the products / services /
// projects tables.

export type Product = {
  slug: string;
  name: string;
  category: 'racing' | 'rental' | 'twin-seater' | 'off-road' | 'junior';
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
  image?: string;
};

export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  features: string[];
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  location: string;
  year: number;
  description: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: 'genesis-sxx5',
    name: 'Genesis SXX5',
    category: 'racing',
    shortDescription: 'Flagship sprint-racing chassis — KnK Karts × VCR.',
    description:
      'The Genesis SXX5 is VCR\'s reference design for sprint racing. Built around a CrMo tubular spaceframe with optimized torsional response, the SXX5 powers championship grids across India and partner circuits abroad.',
    specs: {
      Chassis: 'CrMo tubular spaceframe',
      Wheelbase: '1040 mm',
      Track: '1130 mm (rear)',
      Brakes: 'Hydraulic disc, rear axle',
      Engine: 'Customer choice — Rotax / X30 / TM',
      Weight: '78 kg (chassis only)',
    },
    featured: true,
  },
  {
    slug: 'genesis-s25',
    name: 'Genesis S25',
    category: 'racing',
    shortDescription: 'Mid-tier sprint chassis tuned for club-level grids.',
    description:
      'The S25 inherits the SXX5 geometry with a relaxed front-end pickup for forgiving handling — the preferred choice for driver development programs and arrive-and-drive race events.',
    specs: {
      Chassis: 'CrMo tubular spaceframe',
      Wheelbase: '1040 mm',
      Brakes: 'Hydraulic disc, rear axle',
      Engine: 'Rotax Max / 4-stroke 200cc',
      Weight: '79 kg (chassis only)',
    },
  },
  {
    slug: 'ts22',
    name: 'TS22 Twin Seater',
    category: 'twin-seater',
    shortDescription: 'Side-by-side twin-seater for instruction and experience drives.',
    description:
      'The TS22 was engineered for rental operators who want to offer ride-along experiences. A widened front-end and reinforced floorpan support a passenger seat without compromising the kart\'s natural handling.',
    specs: {
      Seating: '2 (side-by-side)',
      Brakes: 'Hydraulic disc, dual circuit',
      Engine: '4-stroke 270cc / EV option',
      Weight: '142 kg',
    },
  },
  {
    slug: 'sport',
    name: 'VCR Sport',
    category: 'rental',
    shortDescription: 'Rental-grade chassis built for 12-hour daily duty cycles.',
    description:
      'The Sport is VCR\'s answer to rental operators who refuse to compromise on driver feel. Heavy-gauge tubing, replaceable wear surfaces, and a service-friendly engine bay drive down per-lap maintenance cost.',
    specs: {
      Chassis: 'Reinforced tubular',
      Brakes: 'Hydraulic disc, rear axle',
      Engine: '4-stroke 200/270cc',
      Bodywork: 'CIK-spec impact-resistant',
      Weight: '118 kg',
    },
    featured: true,
  },
  {
    slug: 'mudslinger-sr-iii',
    name: 'Mudslinger SR-III',
    category: 'off-road',
    shortDescription: 'Off-road buggy for adventure parks and rough terrain circuits.',
    description:
      'The third-generation Mudslinger introduces long-travel suspension and a roll-cage rated for adventure-park duty. Designed for operators running rough-terrain experiences alongside their kart fleet.',
    specs: {
      Chassis: 'Roll-caged steel space frame',
      Suspension: 'Independent, long travel',
      Brakes: 'Hydraulic disc, all wheels',
      Engine: '4-stroke 390cc',
      Weight: '210 kg',
    },
  },
  {
    slug: 'knk-cub',
    name: 'KNK Cub',
    category: 'junior',
    shortDescription: 'Entry-level junior kart for ages 6–10.',
    description:
      'The Cub is the gateway product in the KnK × VCR range — a scaled junior chassis with conservative power delivery, used by driver-development academies and family-entertainment venues.',
    specs: {
      'Age range': '6–10 years',
      Engine: '4-stroke 120cc, governed',
      Brakes: 'Hydraulic disc, rear axle',
      Weight: '62 kg',
    },
  },
];

export const services: Service[] = [
  {
    slug: 'track-design',
    name: 'Track Design & Layout',
    shortDescription: 'End-to-end karting circuit design — from concept lines to construction drawings.',
    description:
      'VCR designs karting circuits for commercial operators, motorsport academies, and entertainment venues. Every project starts from a driving-experience brief and ends with construction-ready drawings.',
    features: [
      'Site survey and feasibility study',
      'Racing-line and elevation modeling',
      'Pit, paddock, and spectator layout',
      'Construction-issue drawing sets',
    ],
  },
  {
    slug: 'safety-barriers',
    name: 'Safety Barrier Systems',
    shortDescription: 'CIK-aligned modular barriers, run-off design, and impact analysis.',
    description:
      'Barrier specifications, tyre-stack geometries, and run-off zoning that meet international karting safety conventions while remaining cost-feasible for regional operators.',
    features: [
      'Tyre and conveyor-belt barrier systems',
      'Run-off and gravel-trap design',
      'Impact-zone risk assessment',
      'Maintenance schedule documentation',
    ],
  },
  {
    slug: 'kart-lifting-systems',
    name: 'Kart Lifting & Pit Systems',
    shortDescription: 'Pit-lane hydraulic lifts and kart-handling infrastructure.',
    description:
      'Custom kart-lifting systems for pit lanes and workshops — hydraulic ground lifts, overhead rigs, and roller systems designed for rapid kart turnaround.',
    features: [
      'Hydraulic floor lifts',
      'Overhead handling rigs',
      'Workshop layout planning',
    ],
  },
  {
    slug: 'lighting',
    name: 'Circuit Lighting',
    shortDescription: 'LED lighting design for night karting operations.',
    description:
      'Lighting plans that meet driver-visibility targets across the racing line, pit lane, and spectator areas while controlling glare and power draw.',
    features: [
      'Photometric plans',
      'Pole placement and run-off clearances',
      'Energy and operations cost modeling',
    ],
  },
  {
    slug: 'drainage',
    name: 'Track Drainage',
    shortDescription: 'Surface and subsurface drainage for year-round operations.',
    description:
      'Hydrological surveys and drainage design that keep tracks raceable through monsoon-grade rainfall — engineered with operators in tropical climates in mind.',
    features: [
      'Hydrology and runoff modeling',
      'Cambered surface and gutter design',
      'Subsurface drainage networks',
    ],
  },
  {
    slug: 'consultancy',
    name: 'Business & Operations Consultancy',
    shortDescription: 'Strategy for new operators — from business plan to grand opening.',
    description:
      'Drawing on three decades of operator partnerships, VCR advises new ventures on fleet sizing, pricing, staffing, and revenue mix.',
    features: [
      'Market and competitor analysis',
      'Fleet and revenue modeling',
      'Operator training programs',
    ],
  },
  {
    slug: 'rental-support',
    name: 'Rental Operations Support',
    shortDescription: 'Ongoing operations support for the VCR rental program.',
    description:
      'Spares, technical training, and operational benchmarking for rental operators running VCR/KnK fleets.',
    features: [
      'Spares stocking guidance',
      'Technician training',
      'Operations benchmarking',
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'meco-kartopia-bengaluru',
    title: 'Meco Kartopia — Bengaluru',
    client: 'Meco Motorsports',
    location: 'Bengaluru, India',
    year: 2021,
    description:
      'Full circuit redesign with revised racing line, expanded run-off zones, and a refurbished VCR Sport fleet.',
    featured: true,
  },
  {
    slug: 'speed-track-colombo',
    title: 'Speed Track Colombo',
    location: 'Colombo, Sri Lanka',
    year: 2019,
    description:
      'Greenfield outdoor karting venue — site survey, layout, drainage, and barrier systems.',
    featured: true,
  },
  {
    slug: 'nairobi-karting-park',
    title: 'Nairobi Karting Park',
    location: 'Nairobi, Kenya',
    year: 2018,
    description:
      'Track refurbishment and fleet supply for one of East Africa\'s flagship karting venues.',
  },
  {
    slug: 'gulf-karting-academy',
    title: 'Gulf Karting Academy',
    location: 'Dubai, UAE',
    year: 2022,
    description:
      'Driver-development academy fleet — Genesis S25 chassis with custom academy livery and instrumentation.',
  },
  {
    slug: 'santiago-karting',
    title: 'Santiago Karting',
    location: 'Santiago, Chile',
    year: 2017,
    description:
      'Track lighting redesign for extended evening operations and event hosting.',
  },
  {
    slug: 'windhoek-adventure-park',
    title: 'Windhoek Adventure Park',
    client: 'Namib Leisure',
    location: 'Windhoek, Namibia',
    year: 2023,
    description:
      'Mudslinger SR-III off-road circuit alongside an existing kart track — full design and barrier package.',
  },
];

export const stats = {
  yearsOfOperation: 25,
  countriesServed: 12,
  b2bClients: 350,
  foundedYear: 2000,
};

export const countries = [
  'Australia',
  'Canada',
  'Germany',
  'USA',
  'Singapore',
  'Malaysia',
  'Kenya',
  'Nigeria',
  'Sri Lanka',
  'Chile',
  'Namibia',
  'India',
];
