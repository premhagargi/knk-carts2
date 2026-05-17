import { slugify } from '@/lib/slug';

export type ImageAsset = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  alt?: string;
};

function asString(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}

function asImageArray(v: unknown): ImageAsset[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (x): x is ImageAsset =>
      x &&
      typeof x === 'object' &&
      typeof (x as ImageAsset).public_id === 'string' &&
      typeof (x as ImageAsset).secure_url === 'string',
  );
}

// ---------- Products ----------

export type ProductInput = {
  name: string;
  slug: string;
  category: string;
  short_description: string | null;
  description: string | null;
  specs: Record<string, unknown>;
  price_inr: number | null;
  featured: boolean;
  images: ImageAsset[];
};

export function parseProductInput(body: unknown): ProductInput | string {
  if (!body || typeof body !== 'object') return 'Invalid body';
  const b = body as Record<string, unknown>;

  const name = asString(b.name);
  if (!name) return 'name is required';
  const slug = asString(b.slug) ?? slugify(name);
  if (!slug) return 'slug is required';
  const category = asString(b.category);
  if (!category) return 'category is required';

  let specs: Record<string, unknown> = {};
  if (b.specs && typeof b.specs === 'object' && !Array.isArray(b.specs)) {
    specs = b.specs as Record<string, unknown>;
  } else if (typeof b.specs === 'string' && b.specs.trim()) {
    try {
      specs = JSON.parse(b.specs);
    } catch {
      return 'specs must be valid JSON';
    }
  }

  const price_inr =
    typeof b.price_inr === 'number' && Number.isFinite(b.price_inr)
      ? b.price_inr
      : typeof b.price_inr === 'string' && b.price_inr.trim()
        ? Number(b.price_inr)
        : null;

  return {
    name,
    slug,
    category,
    short_description: asString(b.short_description) ?? null,
    description: asString(b.description) ?? null,
    specs,
    price_inr: Number.isFinite(price_inr as number) ? (price_inr as number) : null,
    featured: Boolean(b.featured),
    images: asImageArray(b.images),
  };
}

// ---------- Services ----------

export type ServiceInput = {
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  features: string[];
  hero_image: ImageAsset | null;
  gallery: ImageAsset[];
};

export function parseServiceInput(body: unknown): ServiceInput | string {
  if (!body || typeof body !== 'object') return 'Invalid body';
  const b = body as Record<string, unknown>;

  const name = asString(b.name);
  if (!name) return 'name is required';
  const slug = asString(b.slug) ?? slugify(name);
  if (!slug) return 'slug is required';

  let features: string[] = [];
  if (Array.isArray(b.features)) {
    features = b.features.filter((f): f is string => typeof f === 'string' && f.trim().length > 0);
  } else if (typeof b.features === 'string') {
    features = b.features
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  let hero_image: ImageAsset | null = null;
  if (b.hero_image && typeof b.hero_image === 'object') {
    if (Array.isArray(b.hero_image)) {
      const [first] = asImageArray(b.hero_image);
      hero_image = first ?? null;
    } else {
      const arr = asImageArray([b.hero_image]);
      hero_image = arr[0] ?? null;
    }
  }

  return {
    name,
    slug,
    short_description: asString(b.short_description) ?? null,
    description: asString(b.description) ?? null,
    features,
    hero_image,
    gallery: asImageArray(b.gallery),
  };
}

// ---------- Projects ----------

export type ProjectInput = {
  title: string;
  slug: string;
  client: string | null;
  location: string | null;
  year: number | null;
  description: string | null;
  featured: boolean;
  images: ImageAsset[];
};

export function parseProjectInput(body: unknown): ProjectInput | string {
  if (!body || typeof body !== 'object') return 'Invalid body';
  const b = body as Record<string, unknown>;

  const title = asString(b.title);
  if (!title) return 'title is required';
  const slug = asString(b.slug) ?? slugify(title);
  if (!slug) return 'slug is required';

  const yearRaw =
    typeof b.year === 'number'
      ? b.year
      : typeof b.year === 'string' && b.year.trim()
        ? parseInt(b.year, 10)
        : null;
  const year = Number.isFinite(yearRaw as number) ? (yearRaw as number) : null;

  return {
    title,
    slug,
    client: asString(b.client) ?? null,
    location: asString(b.location) ?? null,
    year,
    description: asString(b.description) ?? null,
    featured: Boolean(b.featured),
    images: asImageArray(b.images),
  };
}

// ---------- Posts ----------

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  author: string | null;
  featured: boolean;
  cover_image: ImageAsset | null;
  published_at: string | null; // ISO string or null = draft
};

export function parsePostInput(body: unknown): PostInput | string {
  if (!body || typeof body !== 'object') return 'Invalid body';
  const b = body as Record<string, unknown>;
  const title = asString(b.title);
  if (!title) return 'title is required';
  const slug = asString(b.slug) ?? slugify(title);
  if (!slug) return 'slug is required';
  const bodyText = asString(b.body);
  if (!bodyText) return 'body is required';

  let cover_image: ImageAsset | null = null;
  if (b.cover_image && typeof b.cover_image === 'object') {
    if (Array.isArray(b.cover_image)) {
      const [first] = asImageArray(b.cover_image);
      cover_image = first ?? null;
    } else {
      const arr = asImageArray([b.cover_image]);
      cover_image = arr[0] ?? null;
    }
  }

  let published_at: string | null = null;
  if (typeof b.published_at === 'string' && b.published_at.trim()) {
    const d = new Date(b.published_at);
    if (Number.isNaN(d.getTime())) return 'published_at is not a valid date';
    published_at = d.toISOString();
  }

  return {
    title,
    slug,
    excerpt: asString(b.excerpt) ?? null,
    body: bodyText,
    author: asString(b.author) ?? null,
    featured: Boolean(b.featured),
    cover_image,
    published_at,
  };
}

// ---------- Inquiries ----------

export type InquiryInput = {
  name: string;
  email: string;
  company: string | null;
  inquiry_type: string | null;
  message: string;
};

export function parseInquiryInput(body: unknown): InquiryInput | string {
  if (!body || typeof body !== 'object') return 'Invalid body';
  const b = body as Record<string, unknown>;
  const name = asString(b.name);
  const email = asString(b.email);
  const message = asString(b.message);
  if (!name) return 'name is required';
  if (!email) return 'email is required';
  if (!message) return 'message is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'email is not valid';
  return {
    name,
    email,
    message,
    company: asString(b.company) ?? null,
    inquiry_type: asString(b.inquiry_type) ?? null,
  };
}

export type InquiryStatus = 'new' | 'read' | 'archived';
export function parseInquiryStatus(s: unknown): InquiryStatus | null {
  return s === 'new' || s === 'read' || s === 'archived' ? s : null;
}
