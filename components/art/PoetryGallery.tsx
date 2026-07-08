import Image from "next/image";
import type { PoetryCollection } from "@/lib/types/content";
import { Button } from "@/components/ui/Button";

interface PoetryGalleryProps {
  collection: PoetryCollection;
  subsectionTitle: string;
  subsectionBody: string;
  collectionButtonLabel: string;
}

export function PoetryGallery({
  collection,
  subsectionTitle,
  subsectionBody,
  collectionButtonLabel,
}: PoetryGalleryProps) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-semibold">{subsectionTitle}</h3>
        <p className="mt-3 max-w-2xl text-muted leading-relaxed">
          {subsectionBody}
        </p>
        <div className="mt-6">
          <Button href={collection.collectionUrl} external variant="secondary">
            {collectionButtonLabel}
          </Button>
        </div>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collection.items.map((item) => (
          <li key={item.openseaUrl}>
            <a
              href={item.openseaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent-warm/50"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-background/90 via-background/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-foreground">
                    Read poem · Collect on OpenSea
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium group-hover:text-accent-warm transition-colors">
                  {item.title}
                </p>
                {(item.excerpt || item.poem) && (
                  <p className="mt-2 text-sm text-muted whitespace-pre-line">
                    {item.excerpt ?? item.poem}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
