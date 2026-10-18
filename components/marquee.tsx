"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

const SCROLL_SPEED = 0.6;
const RESUME_DELAY_MS = 2000;

type MarqueeProps = {
  label: string;
  trackClassName: string;
  /** The items, rendered once for screen readers. */
  children: ReactNode;
  /** The same items again with aria-hidden, so the loop is seamless. */
  clone: ReactNode;
};

export function Marquee({ label, trackClassName, children, clone }: MarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const el = scrollRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        el.scrollLeft += SCROLL_SPEED;
        wrapScroll();
      }
      raf = requestAnimationFrame(tick);
    };

    // Only animate while on screen.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
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
      role="region"
      aria-label={label}
      tabIndex={0}
      className="values-marquee relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing"
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
      onFocus={pause}
      onBlur={scheduleResume}
    >
      <div className={`flex w-max ${trackClassName}`}>
        {children}
        {clone}
      </div>
    </div>
  );
}
