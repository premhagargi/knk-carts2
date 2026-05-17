// Seeds the initial admin user for VCR.
//
//   1. Ensure .env contains NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
//   2. Set SEED_ADMIN_EMAIL (defaults to admin@vcr.studio).
//      If SEED_ADMIN_PASSWORD is unset, a random 16-char password is generated
//      and printed to stdout once — copy it, then rotate from the Supabase
//      dashboard.
//   3. Run: npm run seed:admin
//
// Safe to re-run: if the user already exists, this exits with an explanatory
// message and does NOT mutate the existing user's password.

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

function generatePassword(): string {
  // 16 chars, URL-safe base64 (≈ 96 bits of entropy)
  return randomBytes(12).toString('base64url');
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.error(
      '✗ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env',
    );
    process.exit(1);
  }

  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@vcr.studio';
  const password = process.env.SEED_ADMIN_PASSWORD || generatePassword();
  const wasGenerated = !process.env.SEED_ADMIN_PASSWORD;

  const supabase = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Check existence first to avoid clobbering the password on re-runs.
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) {
    console.error('✗ Could not list users:', listErr.message);
    process.exit(1);
  }
  const existing = list.users.find((u) => u.email === email);
  if (existing) {
    console.log(`ℹ User ${email} already exists (id=${existing.id}). No changes made.`);
    console.log('   To rotate the password, use the Supabase dashboard.');
    return;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    console.error('✗ Failed to create user:', error.message);
    process.exit(1);
  }

  console.log('✓ Admin user created');
  console.log('  email:    ', email);
  if (wasGenerated) {
    console.log('  password: ', password, '   ← COPY THIS NOW. It will not be shown again.');
  } else {
    console.log('  password:  (from SEED_ADMIN_PASSWORD env)');
  }
  console.log('  user id:  ', data.user?.id);
}

main().catch((e) => {
  console.error('✗ Unexpected error:', e);
  process.exit(1);
});
