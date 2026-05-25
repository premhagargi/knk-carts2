// Cache tags shared between public ISR reads (next/cache unstable_cache) and the
// admin write routes that revalidate them. A successful write to a table calls
// revalidateTag(CACHE_TAGS.<table>), which invalidates every cached entry for
// that collection — both the listing pages and the per-slug detail pages — so
// admin edits show up on the public site on the next request.
export const CACHE_TAGS = {
  products: 'content:products',
  services: 'content:services',
  projects: 'content:projects',
  posts: 'content:posts',
} as const;
