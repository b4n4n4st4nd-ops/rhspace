import Image from "next/image";
import type { EnsoImage } from "@/lib/types/content";

interface EnsoGalleryProps {
  images: EnsoImage[];
}

export function EnsoGallery({ images }: EnsoGalleryProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <li
          key={image.src}
          className="group overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent-warm/30"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <p className="px-4 py-3 text-xs text-muted leading-relaxed">
            {image.alt}
          </p>
        </li>
      ))}
    </ul>
  );
}
