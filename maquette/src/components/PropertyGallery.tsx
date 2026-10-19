"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import manifest from "@/content/images.generated.json";

type Entry = { width: number; height: number; blurDataURL: string };
const meta = (f: string) => (manifest as Record<string, Entry>)[f];

/** Main photo + thumbnails; opens a keyboard-friendly full-screen viewer. */
export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const step = (d: number) => setIndex((i) => (i + d + images.length) % images.length);
  const current = images[index];
  const alt = (i: number) => `Visuel de démonstration ${i + 1} sur ${images.length} : ${title}`;

  return (
    <div>
      <button type="button" className="relative block w-full overflow-hidden rounded-[var(--radius-card)]" onClick={() => dialogRef.current?.showModal()}>
        <Image src={`/images/${current}`} alt={alt(index)} width={meta(current).width} height={meta(current).height} placeholder="blur" blurDataURL={meta(current).blurDataURL} priority sizes="(min-width: 1024px) 60vw, 100vw" className="aspect-[4/3] w-full object-cover" />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
          Agrandir · {index + 1}/{images.length}
        </span>
      </button>
      <ul className="mt-3 grid grid-cols-4 gap-2" aria-label="Miniatures">
        {images.map((f, i) => (
          <li key={f}>
            <button type="button" aria-label={`Afficher l'image ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} className="block w-full overflow-hidden rounded-lg ring-accent aria-[current=true]:ring-3">
              <Image src={`/images/${f}`} alt="" width={meta(f).width} height={meta(f).height} sizes="20vw" className="aspect-[4/3] w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`Photos : ${title}`}
        className="m-auto max-h-[92vh] w-[min(96vw,70rem)] rounded-2xl bg-bg p-0 text-ink backdrop:bg-black/85"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <Image src={`/images/${current}`} alt={alt(index)} width={meta(current).width} height={meta(current).height} sizes="96vw" className="max-h-[75vh] w-full object-contain" />
        <div className="flex items-center justify-between gap-3 p-4">
          <span>
            {index + 1}/{images.length}
          </span>
          <span className="flex gap-2">
            <button type="button" className="btn btn-ghost min-h-11 px-4" onClick={() => step(-1)} aria-label="Image précédente">←</button>
            <button type="button" className="btn btn-ghost min-h-11 px-4" onClick={() => step(1)} aria-label="Image suivante">→</button>
            <button type="button" className="btn btn-primary min-h-11 px-4" onClick={() => dialogRef.current?.close()}>Fermer</button>
          </span>
        </div>
      </dialog>
    </div>
  );
}
