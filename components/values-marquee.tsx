"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { valuesCards } from "@/lib/about-content";

type ValueCard = (typeof valuesCards)[number];

const SCROLL_SPEED = 0.6;
const RESUME_DELAY_MS = 2000;

function ValueCardArticle({ card }: { card: ValueCard }) {
  return (
    <article
      className={`flex h-[350px] w-[320px] shrink-0 flex-col items-center rounded-[28px] px-6 pb-0 pt-8 text-center sm:h-[350px] sm:w-[360px] lg:h-[500px] lg:w-[420px] xl:h-[540px] xl:w-[560px] 2xl:h-[571px] 2xl:w-[675px] ${card.bgClass}`}
    >
      <h3 className={`text-[22px] font-bold sm:text-[24px] lg:text-[36px] xl:text-[42px] 2xl:text-[50px] ${card.titleClass}`}>
        {card.title}
      </h3>
      <p
        className={`mt-3 text-[14px] font-medium leading-[129%] tracking-[-1.5%] lg:text-[20px] xl:text-[24px] 2xl:text-[24px] ${card.descriptionMaxWClass} ${card.titleClass} opacity-90`}
      >
        {card.description}
      </p>
      <div className="relative mt-auto h-[180px] w-full sm:h-[200px] lg:h-[280px] xl:h-[320px] 2xl:h-[390px]">
        <Image
          src={card.imageSrc}
          alt=""
          fill
          sizes="675px"
          className="object-contain object-bottom"
          aria-hidden
        />
      </div>
    </article>
  );
}

export function ValuesMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotionRef = useRef(false);

  const marqueeItems = [...valuesCards, ...valuesCards];

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
      aria-label="Our values"
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
      <div className="values-marquee-track flex w-max gap-6 px-4 sm:px-6 lg:gap-5 2xl:gap-[24px]">
        {marqueeItems.map((card, index) => (
          <ValueCardArticle key={`${card.title}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}
