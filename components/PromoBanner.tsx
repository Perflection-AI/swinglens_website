import React, { useEffect, useRef } from 'react';
import { StoreLink } from './StoreLink';

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

/**
 * Persistent site-wide promo strip, pinned above the floating nav on every
 * page. Measures its own height and writes it to a CSS variable so the nav
 * (positioned in index.html's inline <style>) can offset itself below it,
 * regardless of whether the banner wraps to one or two lines.
 */
export const PromoBanner: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty('--promo-banner-height', `${el.offsetHeight}px`);
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="fixed top-0 left-0 right-0 z-[1500]">
      <StoreLink
        href={APP_STORE_URL}
        className="group flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-2 text-center bg-green text-white text-[11px] sm:text-xs font-semibold hover:brightness-110 transition-all duration-200"
      >
        <span className="underline underline-offset-2 decoration-white/50 group-hover:decoration-white">📲 Download the app</span>
        <span className="opacity-50">→</span>
        <span>Use coach code <strong className="font-extrabold">Q7BSEH</strong></span>
        <span className="opacity-50">→</span>
        <span>Free analysis by Coach J.R. Pond<span className="opacity-75 font-normal"> (first 100 only)</span></span>
        <span className="w-[15px] h-[15px] rounded-[3px] bg-white/20 inline-grid place-items-center text-xs leading-none flex-shrink-0 group-hover:bg-white/30 transition-colors duration-200">
          ›
        </span>
      </StoreLink>
    </div>
  );
};
