// Tiny browser fetch wrapper for the REST API. Throws on non-2xx with the
// server's error message; returns the unwrapped `data` payload on success.

export type ApiError = Error & { status: number };

async function request<T>(
  path: string,
  init: RequestInit & { method?: string } = {},
): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (res.status === 204) return undefined as T;

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // empty / non-JSON body
  }

  if (!res.ok) {
    const err = new Error(
      (body as { error?: string })?.error ?? `HTTP ${res.status}`,
    ) as ApiError;
    err.status = res.status;
    throw err;
  }

  return (body as { data: T }).data;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  del: <T = void>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
};
