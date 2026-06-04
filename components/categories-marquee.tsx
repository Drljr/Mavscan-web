"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

const categories = [
  { name: "Health Products", imageSrc: "/asset/category-health-products.webp" },
  { name: "Wellness Products", imageSrc: "/asset/Rectangle%201722.webp" },
  { name: "Cosmetics", imageSrc: "/asset/Rectangle%201723.webp" },
  { name: "Beverages", imageSrc: "/asset/category-beverages.webp" },
] as const;

type Category = (typeof categories)[number];

const SCROLL_SPEED = 0.6;
const RESUME_DELAY_MS = 2000;

function CategoryCard({ item }: { item: Category }) {
  return (
    <article className="relative h-[min(85vw,280px)] w-[min(85vw,280px)] shrink-0 overflow-hidden rounded-[30px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] lg:h-[480px] lg:w-[480px] xl:h-[520px] xl:w-[520px] 2xl:h-[583px] 2xl:w-[583px]">
      <Image
        src={item.imageSrc}
        alt={item.name}
        fill
        draggable={false}
        sizes="(min-width: 1536px) 583px, (min-width: 1280px) 520px, (min-width: 1024px) 480px, (min-width: 768px) 400px, (min-width: 640px) 320px, 280px"
        className="object-cover object-center select-none"
        onDragStart={(e) => e.preventDefault()}
      />
      <div className="absolute bottom-[20px] left-[20px] right-[20px] text-center text-[18px] font-normal leading-[100%] tracking-[-3%] text-white sm:text-[20px]">
        {item.name}
      </div>
    </article>
  );
}

export function CategoriesMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotionRef = useRef(false);

  const marqueeItems = [...categories, ...categories];

  const wrapScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) {
      el.scrollLeft -= half;
    }
  }, []);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
      resumeTimeoutRef.current = null;
    }, RESUME_DELAY_MS);
  }, []);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const el = scrollRef.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      if (
        !prefersReducedMotionRef.current &&
        !isPausedRef.current &&
        !isDraggingRef.current
      ) {
        el.scrollLeft += SCROLL_SPEED;
        wrapScroll();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [wrapScroll]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleScroll = () => {
    if (isDraggingRef.current) wrapScroll();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    pause();
    dragStartRef.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.classList.add("values-marquee--dragging");
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const { x, scrollLeft } = dragStartRef.current;
    el.scrollLeft = scrollLeft - (e.clientX - x);
    wrapScroll();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    isDraggingRef.current = false;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.classList.remove("values-marquee--dragging");
    }
    scheduleResume();
  };

  return (
    <div
      ref={scrollRef}
      className="values-marquee relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing"
      aria-label="Product categories"
      onScroll={handleScroll}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={(e) => {
        if (isDraggingRef.current) endDrag(e);
      }}
      onMouseEnter={pause}
      onMouseLeave={() => {
        if (!isDraggingRef.current) scheduleResume();
      }}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
      onWheel={() => {
        pause();
        scheduleResume();
      }}
    >
      <div className="values-marquee-track flex w-max gap-5 px-4 sm:px-6 md:gap-6 lg:gap-5 2xl:gap-8">
        {marqueeItems.map((item, index) => (
          <CategoryCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}
