'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { X, UploadCloud } from 'lucide-react';

export type ImageAsset = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  alt?: string;
};

type Props = {
  name: string;
  entity: 'products' | 'services' | 'projects' | 'posts';
  multiple?: boolean;
  defaultValue?: ImageAsset[];
  label?: string;
};

// Renders a hidden <input name={name}> carrying the JSON-encoded array of
// images. Form submission picks it up like any other field.
export default function ImageField({
  name,
  entity,
  multiple = true,
  defaultValue = [],
  label = 'Images',
}: Props) {
  const [assets, setAssets] = useState<ImageAsset[]>(defaultValue);

  const fetchSignature = async (
    paramsToSign: Record<string, string | number>,
  ): Promise<string> => {
    const res = await fetch('/api/cloudinary/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entity, paramsToSign }),
    });
    if (!res.ok) throw new Error('Sign request failed');
    const data = await res.json();
    return data.signature as string;
  };

  return (
    <div className="space-y-3">
      <label className="block text-[10px] uppercase tracking-widest font-bold text-admin-muted">
        {label}
      </label>

      <input type="hidden" name={name} value={JSON.stringify(assets)} />

      {assets.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {assets.map((a) => (
            <div
              key={a.public_id}
              className="relative aspect-square bg-admin-bg border border-admin-border group"
            >
              <Image
                src={a.secure_url}
                alt={a.alt ?? ''}
                fill
                sizes="200px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setAssets((prev) =>
                    prev.filter((x) => x.public_id !== a.public_id),
                  )
                }
                className="absolute top-1 right-1 bg-black/80 p-1 hover:bg-primary transition-colors"
                aria-label="Remove image"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        onSuccess={(result) => {
          const info = result?.info;
          if (!info || typeof info === 'string') return;
          const a: ImageAsset = {
            public_id: info.public_id,
            secure_url: info.secure_url,
            width: info.width,
            height: info.height,
          };
          setAssets((prev) => (multiple ? [...prev, a] : [a]));
        }}
        options={{
          multiple,
          folder: `vcr/${entity}`,
          sources: ['local', 'url', 'camera'],
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center gap-3 border border-admin-border bg-admin-surface-2 px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-white/80 hover:border-primary hover:text-white transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            {multiple ? 'Add images' : assets.length ? 'Replace' : 'Add image'}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
