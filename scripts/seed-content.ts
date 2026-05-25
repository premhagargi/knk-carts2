// Seeds products, services, and projects with the exact content that the
// marketing site previously hardcoded in src/lib/vcr-content.ts. This gives
// the public pages real data to render and surfaces the same records in the
// admin panel, where the client can keep, edit, or replace them.
//
// Run: npm run seed:content
// Safe to re-run: existing slugs are skipped (never overwrites client edits).

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

type ProductSeed = {
  slug: string;
  name: string;
  category: string;
  short_description: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
};

type ServiceSeed = {
  slug: string;
  name: string;
  short_description: string;
  description: string;
  features: string[];
};

type ProjectSeed = {
  slug: string;
  title: string;
  client?: string;
  location: string;
  year: number;
  description: string;
  featured?: boolean;
};

const products: ProductSeed[] = [
  {
    slug: 'genesis-sxx5',
    name: 'Genesis SXX5',
    category: 'racing',
    short_description: 'Flagship sprint-racing chassis — KnK Karts × VCR.',
    description:
      "The Genesis SXX5 is VCR's reference design for sprint racing. Built around a CrMo tubular spaceframe with optimized torsional response, the SXX5 powers championship grids across India and partner circuits abroad.",
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
    short_description: 'Mid-tier sprint chassis tuned for club-level grids.',
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
    short_description: 'Side-by-side twin-seater for instruction and experience drives.',
    description:
      "The TS22 was engineered for rental operators who want to offer ride-along experiences. A widened front-end and reinforced floorpan support a passenger seat without compromising the kart's natural handling.",
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
    short_description: 'Rental-grade chassis built for 12-hour daily duty cycles.',
    description:
      "The Sport is VCR's answer to rental operators who refuse to compromise on driver feel. Heavy-gauge tubing, replaceable wear surfaces, and a service-friendly engine bay drive down per-lap maintenance cost.",
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
    short_description: 'Off-road buggy for adventure parks and rough terrain circuits.',
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
    short_description: 'Entry-level junior kart for ages 6–10.',
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

const services: ServiceSeed[] = [
  {
    slug: 'track-design',
    name: 'Track Design & Layout',
    short_description: 'End-to-end karting circuit design — from concept lines to construction drawings.',
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
    short_description: 'CIK-aligned modular barriers, run-off design, and impact analysis.',
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
    short_description: 'Pit-lane hydraulic lifts and kart-handling infrastructure.',
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
    short_description: 'LED lighting design for night karting operations.',
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
    short_description: 'Surface and subsurface drainage for year-round operations.',
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
    short_description: 'Strategy for new operators — from business plan to grand opening.',
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
    short_description: 'Ongoing operations support for the VCR rental program.',
    description:
      'Spares, technical training, and operational benchmarking for rental operators running VCR/KnK fleets.',
    features: [
      'Spares stocking guidance',
      'Technician training',
      'Operations benchmarking',
    ],
  },
];

const projects: ProjectSeed[] = [
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
      "Track refurbishment and fleet supply for one of East Africa's flagship karting venues.",
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

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Inserts rows by slug, skipping any that already exist so the client's own
  // edits are never clobbered on a re-run. The table name is dynamic, so the
  // query builder is loosely typed here.
  async function seedTable(
    table: string,
    rows: Array<{ slug: string } & Record<string, unknown>>,
  ) {
    let inserted = 0;
    let skipped = 0;

    console.log(`\n${table}:`);
    for (const row of rows) {
      const { data: existing } = await supabase
        .from(table)
        .select('id')
        .eq('slug', row.slug)
        .maybeSingle();

      if (existing) {
        console.log(`  ↷ skip ${row.slug} (already exists)`);
        skipped++;
        continue;
      }

      const { error } = await (supabase.from(table) as any).insert(row);
      if (error) {
        console.error(`  ✗ failed ${row.slug}:`, error.message);
        continue;
      }
      console.log(`  ✓ insert ${row.slug}`);
      inserted++;
    }

    console.log(`  → inserted ${inserted}, skipped ${skipped}.`);
  }

  await seedTable(
    'products',
    products.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      short_description: p.short_description,
      description: p.description,
      specs: p.specs,
      featured: p.featured ?? false,
      images: [],
    })),
  );

  await seedTable(
    'services',
    services.map((s) => ({
      slug: s.slug,
      name: s.name,
      short_description: s.short_description,
      description: s.description,
      features: s.features,
      gallery: [],
    })),
  );

  await seedTable(
    'projects',
    projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      client: p.client ?? null,
      location: p.location,
      year: p.year,
      description: p.description,
      featured: p.featured ?? false,
      images: [],
    })),
  );

  console.log('\nDone.');
}

main().catch((e) => {
  console.error('✗ Unexpected error:', e);
  process.exit(1);
});
