// Seeds the blog with a curated set of posts drawn from VCR / KnK Karts'
// public positioning (Belagavi karting manufacturer since 1999/2000, 350+
// B2B clients, Genesis chassis family, track-design services).
//
// Run: npm run seed:posts
// Safe to re-run: existing slugs are skipped.

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  featured?: boolean;
  // Publish date offset, in days back from today.
  daysAgo: number;
};

const posts: SeedPost[] = [
  {
    slug: 'designing-the-genesis-sxx5',
    title: 'Designing the Genesis SXX5',
    author: 'Ishaan Singh',
    daysAgo: 14,
    featured: true,
    excerpt:
      "Inside VCR's flagship sprint chassis — the geometry, the torsional brief, and the trade-offs we refused to make.",
    body: `When we began the SXX5 program in 2022, the brief was deceptively simple: a sprint chassis that wouldn't punish a mid-pack driver for an imperfect entry. The previous generation handled beautifully in expert hands and turned into a wrestling match for everyone else.

We started with torsional response. The earlier CrMo frames were, frankly, too stiff at the front-end pickup. Under braking the kart would push wide unless the driver was geometrically perfect with their inputs. That's a fine quality on a national-championship grid; it's a disaster at an arrive-and-drive race night.

The fix wasn't dramatic. A relocated front pickup, a wider rear track, and an aluminium seat-mount cluster that lets the seat take a controlled flex through the apex. None of those changes is novel on its own. What's novel is the way they cooperate — the seat flex meters the chassis flex, the front pickup gives the driver a less binary entry, and the rear track widens the stable window without dulling rotation on power.

We built the SXX5 to be the chassis that 80% of the grid is fastest in. Champions will always find another tenth in something more pointed. That's fine. We're not designing for champions. We're designing for the championship.`,
  },
  {
    slug: 'monsoon-grade-track-drainage',
    title: 'Monsoon-grade track drainage',
    author: 'VCR Engineering',
    daysAgo: 38,
    excerpt:
      "Notes from designing drainage for venues that take 200 mm of rain in a single afternoon.",
    body: `In Belagavi we plan for 200 mm of rain in an afternoon. That number isn't hypothetical — it's the design load for every karting venue we've commissioned in tropical climates, from the Western Ghats to coastal Sri Lanka.

The trick is to do most of the work below the surface. Cambered tarmac and well-cut gutters carry the first 20 mm an hour; everything beyond that is the job of the subsurface drainage network — perforated pipe runs at 1.5 m intervals, wrapped in geotextile, falling to a single outfall pit on the low side of the paddock.

We've seen too many tracks built without subsurface drainage. They look fine in the dry season. They become unusable for half the year.

A few field-tested rules:

— Plan your hydrology before you plan your racing line. The lay of the land decides where water goes; trying to fight it with gutters alone is a losing argument.

— Cambered surfaces beat crowned ones for karting. The kart's roll axis is so close to the ground that a crowned surface introduces understeer that drivers misread as a chassis problem.

— Spec the outfall pit twice as large as the calculation says. Silt fills it in three seasons regardless.`,
  },
  {
    slug: 'rental-fleet-economics-101',
    title: 'Rental fleet economics 101',
    author: 'Indrajeet Singh',
    daysAgo: 62,
    featured: true,
    excerpt:
      "What 25 years of partnering with rental operators has taught us about per-lap maintenance cost.",
    body: `The single best predictor of rental fleet profitability is per-lap maintenance cost — and it's the metric most operators don't track.

Most operators track utilization (how many laps per hour their fleet runs) and revenue per lane. Both matter. Neither tells you whether you're actually making money.

Track per-lap cost, and the obvious wins reveal themselves. A four-dollar sprocket lasting 1,500 laps versus 4,000 laps is not a four-dollar decision. Over a season at typical commercial utilization, it's a forty-thousand-dollar decision. Same logic applies to bearings, chains, brake pads, and the bodywork panels that visitors inevitably crash into the tyre stacks.

The discipline is straightforward:

— Tag every consumable in your inventory with a unit cost and an installation date.

— Log every replacement against the hour-meter on the kart it came off.

— Once a quarter, compute per-lap cost by part class. The expensive parts will surprise you, and they won't be the expensive parts.

The operators in the VCR network who run this discipline are, on average, twelve points more profitable than those who don't. There's no magic in the chassis we sell them. The magic is in the metric they let drive their purchasing.`,
  },
  {
    slug: 'why-we-still-hand-build',
    title: 'Why we still hand-build every chassis',
    author: 'Indrajeet Singh',
    daysAgo: 95,
    excerpt:
      "Robotic welding cells were never going to give us what kart racing actually needs.",
    body: `Every few years a karting manufacturer announces they're automating their chassis welding. We've watched this cycle since the early 2000s. Without exception, the results are chassis that are dimensionally perfect and dynamically dead.

Karting is the only motorsport where the chassis itself is a suspension element. There's no shock, no spring, no anti-roll bar. The chassis takes the load. That makes the weld bead — the heat-affected zone around it, the residual stress, the small geometric tolerances within the tube intersections — part of how the kart drives.

A robotic cell can replicate a weld to within a thousandth of an inch. What it can't replicate is the welder reading the tube, slowing down on a thin-walled section, adjusting amperage on a tee joint where heat sink is uneven. Our welders in Belagavi have been doing this for fifteen, twenty years each. The chassis they produce are not dimensionally perfect. They are dynamically alive.

We've made our peace with the trade-off. We will never be the cheapest manufacturer in our category. We will keep being the one drivers prefer when they sit in five chassis blind and pick the one that feels right. That's still us. We intend to keep it that way.`,
  },
  {
    slug: 'lighting-night-karting',
    title: 'Lighting a karting circuit for night operations',
    author: 'VCR Engineering',
    daysAgo: 142,
    excerpt:
      "The photometric brief that lets operators add four hours of revenue per day.",
    body: `Most karting venues we visit have lighting designed for parking lots, not racing surfaces. The difference matters more than operators realise.

A parking-lot lighting design optimises for uniform horizontal illuminance — the same lux value across the whole surface, measured looking down. That's fine when the question is "can a person walking across the lot see where they're going." It's wrong when the question is "can a driver at 60 km/h see a curb apex 30 metres ahead."

For karting we design for vertical illuminance along the racing line, with a deliberate hot-spot on apex curbing, and glare control so drivers aren't blinded coming over a crest. We use 4000 K fixtures over the racing surface and 3000 K over the paddock — cooler over the track keeps the driver alert, warmer in the paddock makes the venue feel hospitable to spectators.

The operating-cost calculation is the easy part. Lighting the track adds roughly 12% to monthly utility cost. Done right, it adds four hours of revenue per day. Done wrong, it adds glare complaints and driver fatigue.`,
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

  let inserted = 0;
  let skipped = 0;

  for (const p of posts) {
    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', p.slug)
      .maybeSingle();

    if (existing) {
      console.log(`  ↷ skip ${p.slug} (already exists)`);
      skipped++;
      continue;
    }

    const publishedAt = new Date(Date.now() - p.daysAgo * 86_400_000).toISOString();

    const { error } = await supabase.from('posts').insert({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      body: p.body,
      author: p.author,
      featured: p.featured ?? false,
      published_at: publishedAt,
    });

    if (error) {
      console.error(`  ✗ failed ${p.slug}:`, error.message);
      continue;
    }
    console.log(`  ✓ insert ${p.slug}`);
    inserted++;
  }

  console.log(`\nDone — inserted ${inserted}, skipped ${skipped}.`);
}

main().catch((e) => {
  console.error('✗ Unexpected error:', e);
  process.exit(1);
});
