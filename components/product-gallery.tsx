"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [paused, setPaused] = useState(false);
  const image = siteConfig.galleryImages[active];
  const change = (delta: number) => setActive((current) => (current + delta + siteConfig.galleryImages.length) % siteConfig.galleryImages.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % siteConfig.galleryImages.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="gallery" role="region" aria-roledescription="عارض صور" aria-label="صور بوكس هديتنا" onKeyDown={(event) => { if (event.key === "ArrowLeft") change(1); if (event.key === "ArrowRight") change(-1); }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="gallery-main" onTouchStart={(event) => { (event.currentTarget as HTMLDivElement).dataset.touchX = String(event.touches[0].clientX); }} onTouchEnd={(event) => {
        const start = Number((event.currentTarget as HTMLDivElement).dataset.touchX || 0);
        const distance = event.changedTouches[0].clientX - start;
        if (Math.abs(distance) > 44) change(distance > 0 ? -1 : 1);
      }}>
        {failed[image.src] ? <div className="image-placeholder"><ImageOff size={34} /><span>صورة البوكس</span></div> :
          <Image key={image.src} src={image.src} alt={image.alt} fill priority={active === 0} sizes="(max-width: 760px) 92vw, 500px" className="gallery-photo" onError={() => setFailed((state) => ({ ...state, [image.src]: true }))} />}
        <button className="gallery-arrow gallery-prev" aria-label="الصورة السابقة" onClick={() => change(-1)}><ChevronRight size={19} /></button>
        <button className="gallery-arrow gallery-next" aria-label="الصورة التالية" onClick={() => change(1)}><ChevronLeft size={19} /></button>
        <span className="gallery-count" dir="ltr">{active + 1} / {siteConfig.galleryImages.length}</span>
      </div>
      <div className="gallery-thumbnails" role="tablist" aria-label="اختاري صورة">
        {siteConfig.galleryImages.map((item, index) => (
          <button key={item.src} role="tab" aria-selected={index === active} aria-label={`عرض الصورة ${index + 1}`} className={`gallery-thumb ${index === active ? "is-active" : ""}`} onClick={() => setActive(index)}>
            {failed[item.src] ? <ImageOff size={18} /> : <Image src={item.src} alt="" fill sizes="76px" onError={() => setFailed((state) => ({ ...state, [item.src]: true }))} />}
          </button>
        ))}
      </div>
    </div>
  );
}
