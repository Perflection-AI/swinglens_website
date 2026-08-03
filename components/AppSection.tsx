import React from 'react';
import { DownloadCTA } from './DownloadCTA';

export const AppSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">

          {/* Left: Video demo */}
          <div className="relative order-2 lg:order-1">
            <div
              className="relative rounded-3xl overflow-hidden shadow-soft-xl bg-green-dark"
              style={{ aspectRatio: '16/9' }}
            >
              <iframe
                src="https://www.youtube.com/embed/63C_tx5tPwo"
                title="Sneaky Academy — SneakySwing Demo"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="relative z-10 order-1 lg:order-2 pb-10 lg:pb-0 max-w-xl">
            <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Driven by Tech
            </p>
            <h2
              className="tracking-tight text-ink leading-[1.08] mb-4 font-display font-extrabold"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              Our members<br />
              <span className="text-brand">run on SneakySwing.</span>
            </h2>
            <p className="text-base text-subtle mb-8 leading-relaxed max-w-[48ch]">
              Whether you're between lessons or working solo, SneakySwing has your back! Instant AI feedback for golfers without a coach, and a direct line to keep your coach in the loop for those who with a coach.
            </p>

            {/* Button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <DownloadCTA
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
              >
                Download SneakySwing
                <svg className="ml-2 w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </DownloadCTA>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              {/* Avatar stack */}
              <div className="flex -space-x-2.5">
                {['A', 'M', 'S', 'T'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-green-light border-2 border-paper flex items-center justify-center text-[10px] font-bold text-green"
                    style={{ boxShadow: '0 1px 4px rgba(78,78,78,0.12)' }}
                  >
                    {initial}
                  </div>
                ))}
              </div>

              {/* Thin divider */}
              <div className="w-px h-7 bg-ink/10 flex-shrink-0" />

              {/* Rating */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  {[800, 880, 960, 1040, 1120].map((ms, i) => (
                    <span
                      key={i}
                      className="star-item text-[15px] leading-none"
                      style={{
                        '--sd': `${ms}ms`,
                        color: '#C4A84A',
                      } as React.CSSProperties}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-ink text-xs">5.0</span>
                  <span className="text-ink/20 text-xs">·</span>
                  <span className="flex items-center gap-1 text-subtle text-xs">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-ink/50 flex-shrink-0">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple App Store
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
