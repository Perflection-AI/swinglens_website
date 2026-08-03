import React from 'react';
import { getPath, getBasePath } from '../utils/paths';

const handleVideoReady = (e: React.SyntheticEvent<HTMLVideoElement>) => {
  e.currentTarget.style.opacity = '1';
};

const navigateTo = (path: string) => {
  const base = getBasePath();
  const url = `${base}${path}`.replace(/\/+/g, '/');
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
};

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
              Driven by Tech<br />
              <span className="text-brand">Rooted in Community</span>
            </h1>

            <p className="hero-enter text-base text-subtle mb-8 leading-relaxed max-w-[48ch]" style={{ animationDelay: '80ms' }}>
              Sneaky Academy brings together golfers striving to improve and coaches ready to help, powered by technology that keeps the coaching going between lessons.
            </p>

            {/* Buttons — clear hierarchy: primary fill vs ghost */}
            <div className="hero-enter flex flex-col sm:flex-row gap-3" style={{ animationDelay: '160ms' }}>
              <button
                onClick={() => navigateTo('students')}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
              >
                I'm a golfer
                <svg className="ml-2 w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button
                onClick={() => navigateTo('coaches')}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
              >
                I'm a coach
                <svg className="ml-2 w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
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
