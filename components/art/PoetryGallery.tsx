"use client";

import { useState } from "react";
import type { PoetryCollection } from "@/lib/types/content";

interface PoetryGalleryProps {
  collection: PoetryCollection;
  subsectionTitle: string;
}

function HaikuCard({
  item,
  isExpanded,
  onToggle,
}: {
  item: PoetryCollection["items"][number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.imageUrl);
  const poemText = item.poem ?? item.excerpt ?? "";

  const handleImgError = () => {
    if (imgSrc.includes("i2c.seadn.io")) {
      setImgSrc(imgSrc.replace("i2c.seadn.io", "i.seadn.io").split("?")[0]);
      return;
    }
    setImgFailed(true);
  };

  return (
    <article
      className={`group relative w-full overflow-hidden rounded-xl border bg-surface transition-all ${
        isExpanded
          ? "border-accent-warm/60 ring-1 ring-accent-warm/30"
          : "border-border hover:border-accent-warm/40"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={isExpanded}
      >
        <div
          className={`relative w-full overflow-hidden bg-background/50 ${
            isExpanded ? "min-h-[20rem] sm:min-h-[24rem]" : "aspect-square"
          }`}
        >
          {!imgFailed && imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc}
              alt=""
              className={`h-full w-full transition-transform duration-300 ${
                isExpanded
                  ? "object-contain p-4"
                  : "object-cover group-hover:scale-[1.02]"
              }`}
              referrerPolicy="no-referrer"
              onError={handleImgError}
            />
          ) : (
            <div className="flex h-full min-h-[12rem] items-center justify-center px-4 text-center text-xs text-muted">
              {item.title}
            </div>
          )}
        </div>
        {isExpanded && poemText ? (
          <div className="border-t border-border p-5 sm:p-6">
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted">
              {poemText}
            </p>
          </div>
        ) : null}
      </button>

      {isExpanded ? (
        <a
          href={item.openseaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/90 text-muted backdrop-blur-sm transition-colors hover:border-accent-warm/40 hover:text-foreground"
          aria-label="Open full piece"
          onClick={(e) => e.stopPropagation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      ) : null}
    </article>
  );
}

export function PoetryGallery({
  collection,
  subsectionTitle,
}: PoetryGalleryProps) {
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);

  const toggleExpand = (openseaUrl: string) => {
    setExpandedUrl((current) => (current === openseaUrl ? null : openseaUrl));
  };

  return (
    <div className="space-y-8">
      <h4 className="text-base font-semibold tracking-tight">{subsectionTitle}</h4>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collection.items.map((item) => {
          const isExpanded = expandedUrl === item.openseaUrl;
          return (
            <li
              key={item.openseaUrl}
              className={isExpanded ? "sm:col-span-2 lg:col-span-2" : undefined}
            >
              <HaikuCard
                item={item}
                isExpanded={isExpanded}
                onToggle={() => toggleExpand(item.openseaUrl)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
