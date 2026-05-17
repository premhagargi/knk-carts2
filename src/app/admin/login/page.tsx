import LoginForm from './login-form';

export const dynamic = 'force-dynamic';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <div className="min-h-screen bg-admin-bg text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <span className="inline-block text-2xl font-bold tracking-tightest uppercase italic">
            <span className="bg-primary px-1 text-black">VCR</span>{' '}
            <span>ADMIN</span>
          </span>
        </div>
        <div className="bg-admin-surface border border-admin-border p-10">
          <h1 className="text-3xl font-black uppercase tracking-tightest mb-2">
            Sign in
          </h1>
          <p className="text-xs uppercase tracking-widest font-bold text-admin-muted mb-10">
            VCR studio access only
          </p>
          <LoginForm next={searchParams.next ?? '/admin'} />
        </div>
      </div>
    </div>
  );
}
