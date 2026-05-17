import { NextResponse, type NextRequest } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

// next-cloudinary's <CldUploadWidget signatureEndpoint="..."> contract:
//   - POSTs { paramsToSign: { timestamp, folder, source, ...whatever else } }
//   - Expects { signature } back (raw, NOT wrapped in { data }).
// The signature MUST cover the exact set of params the widget will then send
// to Cloudinary, otherwise Cloudinary rejects with "Invalid Signature".

type Body = { paramsToSign?: Record<string, string | number> };

const ALLOWED_FOLDER_PREFIX = 'vcr/';
const ALLOWED_ENTITIES = new Set([
  'vcr/products',
  'vcr/services',
  'vcr/projects',
  'vcr/posts',
]);

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if ('response' in auth) return auth.response;

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const paramsToSign = body.paramsToSign;
  if (!paramsToSign || typeof paramsToSign !== 'object') {
    return NextResponse.json(
      { error: 'paramsToSign is required' },
      { status: 400 },
    );
  }

  // Folder check: any vcr/<entity>[/...] path inside our four known buckets.
  const folder = typeof paramsToSign.folder === 'string' ? paramsToSign.folder : '';
  const root = folder.split('/').slice(0, 2).join('/');
  if (!folder.startsWith(ALLOWED_FOLDER_PREFIX) || !ALLOWED_ENTITIES.has(root)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
  }

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({ signature });
}
