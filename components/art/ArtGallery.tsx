import Link from "next/link";
import Image from "next/image";
import type { ArtPiece } from "@/lib/types/content";
import { Badge } from "@/components/ui/Badge";

interface ArtGalleryProps {
  pieces: ArtPiece[];
}

export function ArtGallery({ pieces }: ArtGalleryProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {pieces.map((piece) => (
        <li key={piece.slug}>
          <Link
            href={`/art/${piece.slug}`}
            className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-accent-warm/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={piece.thumbnail}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge>{piece.medium}</Badge>
              </div>
              <h3 className="text-lg font-semibold group-hover:text-accent-warm transition-colors">
                {piece.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{piece.summary}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
