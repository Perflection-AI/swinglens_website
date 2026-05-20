import React from 'react';
import { getPath } from '../utils/paths';

const handleVideoReady = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  e.currentTarget.style.opacity = '1';
};

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

export const Hero: React.FC = () => {
  const videoUrl = getPath('assets/golf_video.mp4');

  return (
    <section className="relative overflow-hidden bg-paper">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:min-h-[100vh] lg:items-center">

          {/* Left: Copy */}
          <div className="relative z-10 pt-28 pb-20 lg:py-0 max-w-xl">

            <h1
              className="hero-enter tracking-tight text-ink leading-[1.08] mb-4 font-display font-extrabold"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', animationDelay: '0ms' }}
            >
              A golf coach,<br />
              <span className="text-brand">in your pocket.</span>
            </h1>

            <p className="hero-enter text-base text-subtle mb-8 leading-relaxed max-w-[48ch]" style={{ animationDelay: '80ms' }}>
              Real coaching methodology, AI precision. The only swing app that combines tour-proven instruction with instant video analysis.
            </p>

            {/* Buttons — clear hierarchy: primary fill vs ghost */}
            <div className="hero-enter flex flex-col sm:flex-row gap-3" style={{ animationDelay: '160ms' }}>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-full shadow-card hover:brightness-110 transition-all duration-200"
              >
                Join as a coach
                <svg className="ml-2 w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-ink/60 bg-transparent border border-ink/15 rounded-full hover:text-ink hover:border-ink/25 transition-all duration-200"
              >
                Try SneakySwing
              </a>
            </div>

            {/* Social proof */}
            <div
              className="hero-enter mt-10 flex items-center gap-4"
              style={{ animationDelay: '240ms' }}
            >
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

          {/* Right: Video */}
          <div className="hero-enter hidden lg:block relative self-stretch" style={{ animationDelay: '120ms' }}>
            <div className="absolute inset-y-2 left-0 right-[-8vw] rounded-3xl overflow-hidden shadow-soft-xl bg-green-dark">
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlay={handleVideoReady}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '50% 80%', opacity: 0, transition: 'opacity 0.7s ease-out' }}
              />
              <div className="absolute inset-0 bg-ink/10 pointer-events-none" />
            </div>
          </div>

          {/* Mobile: video strip */}
          <div className="lg:hidden relative mt-2 mb-8 rounded-2xl overflow-hidden bg-green-dark" style={{ aspectRatio: '8/9' }}>
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={handleVideoReady}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: '50% 80%', opacity: 0, transition: 'opacity 0.7s ease-out' }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
