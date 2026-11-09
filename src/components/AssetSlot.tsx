// src/components/AssetSlot.tsx
// In dev mode shows a dashed placeholder with slot metadata.
// In production renders the real <img>.

import { useState } from "react";

interface AssetSlotProps {
  id: string;
  filename: string;
  size?: string;
  ratio?: string;
  description?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

const isDev = import.meta.env.DEV;

export function AssetSlot({
  id,
  filename,
  size = "",
  ratio = "",
  description = "",
  alt,
  className = "",
  imgClassName = "",
  style,
  priority = false,
}: AssetSlotProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const src = `/assets/${filename}`;

  if (!isDev) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${imgClassName} ${className}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={style}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${
        !isLoaded || hasError ? "asset-slot" : ""
      } ${className}`}
      style={style}
    >
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName} ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {(!isLoaded || hasError) && (
        <div className="asset-slot__overlay w-full h-full flex flex-col items-center justify-center gap-1 p-3 text-center pointer-events-none absolute inset-0">
          <span className="asset-slot__id text-[9px] opacity-50">[ {id} ]</span>
          <span className="font-mono text-[9px] opacity-60">{filename}</span>
          {size && <span className="text-[9px] opacity-50">{size} · {ratio}</span>}
          {description && (
            <span className="text-[10px] mt-1 leading-snug opacity-70 max-w-[200px]">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
