import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Reveal } from './Reveal';
import { Features } from './Features';
import { FunFeatures } from './FunFeatures';
import { SwingRecord } from './SwingRecord';
import { DownloadCTA } from './DownloadCTA';
import { getBasePath, getPath } from '../utils/paths';

const navigateTo = (path: string) => {
  const base = getBasePath();
  window.history.pushState({}, '', `${base}${path}`.replace(/\/+/g, '/'));
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
};

const paths = [
  {
    badge: 'Have a coach?',
    title: 'Stay connected, all week long.',
    body: "Your coach's AI Twin keeps the relationship going between lessons — real methodology, sharper progress tracking, no lost momentum.",
    items: [
      'Every swing logged and shared with your coach automatically',
      "Ask your coach's AI Twin questions any day of the week",
      'Walk into every lesson already knowing what to work on',
    ],
  },
  {
    badge: "Don't have a coach yet?",
    title: 'Get matched with a real coach.',
    body: 'No coach, no problem. Sneaky Academy connects you with a real coach and their AI Twin — structured instruction, not generic tips.',
    items: [
      'Get paired with a coach from the Sneaky Academy network',
      'Get a one-time free analysis from a coach',
      'Build a real coaching relationship',
    ],
  },
];

const heroStats = [
  { value: '5.0', label: 'App Store rating' },
  { value: '20+', label: 'Coach & Academy partners' },
  { value: '10K+', label: 'Fellow golfers' },
  { value: '50K+', label: 'Swings analyzed' },
];

export const StudentsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'For Golfers | SneakySwing';
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>

        {/* ── Hero ── text left, stats right, brand-green accent */}
        <section className="relative overflow-hidden bg-paper pt-36 sm:pt-28 pb-16 lg:py-28">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">

              {/* Left: Copy */}
              <div className="relative z-10 max-w-xl mb-12 lg:mb-0">
                <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
                  For Golfers
                </p>
                <h1
                  className="tracking-tight text-ink leading-[1.08] mb-4 font-display font-extrabold"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >
                  Better practice<br />
                  <span className="text-brand">Lower handicap</span>
                </h1>

                <p className="text-base text-subtle mb-8 leading-relaxed max-w-[48ch]">
                  Wherever your starting point, we're going to improve your learning experience. We extend the coaching you already have, or connect you with real coaching for the first time. AI-powered feedback with real humans in the loop, any time you need it.
                </p>

                <DownloadCTA className="inline-block">
                  <img
                    src={getPath('assets/app-store-badge.svg')}
                    alt="Download on the App Store"
                    style={{ height: '48px', width: 'auto' }}
                  />
                </DownloadCTA>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                {heroStats.map(({ value, label }) => (
                  <div key={value}>
                    <p
                      className="font-display font-extrabold text-ink leading-none mb-2"
                      style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                    >
                      {value}
                    </p>
                    <p className="text-subtle text-sm leading-[1.6]">{label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── Two paths ── Light editorial cards */}
        <section className="py-16 sm:py-24 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Reveal>
              <h2
                className="font-display font-extrabold text-ink leading-[1.1] mb-10 lg:mb-12 max-w-3xl"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Wherever your starting point, we can help you improve today
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {paths.map(({ badge, title, body, items }, i) => (
                <Reveal key={badge} delay={i * 100}>
                  <div className="h-full flex flex-col rounded-2xl border border-ink/[0.08] bg-white p-8 lg:p-10 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
                    <p
                      className="font-display font-extrabold text-ink leading-[1.1] mb-3"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                    >
                      {badge}
                    </p>
                    <p className="text-green font-semibold text-sm mb-4">{title}</p>
                    <p className="text-subtle text-sm leading-[1.7] mb-6">{body}</p>
                    <div className="space-y-3 mt-auto pt-2 border-t border-ink/[0.06]">
                      {items.map((item, j) => (
                        <div key={j} className="flex gap-3 items-start pt-3 first:pt-4">
                          <span className="text-green/60 text-sm leading-none mt-[3px] flex-shrink-0 font-medium">—</span>
                          <p className="text-ink/75 text-sm leading-[1.65]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The App ── full feature breakdown */}
        <Features />

        {/* ── Just for Fun ── mirrored layout: text left, phone right */}
        <FunFeatures />

        {/* ── Why SneakySwing ── differentiation + swing record */}
        <SwingRecord />

        {/* ── CTA ── editorial strip */}
        <Reveal>
          <section className="border-t border-ink/[0.07]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 sm:py-16">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Start today</p>
                  <p
                    className="font-display font-bold text-ink leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
                  >
                    Get tour-level feedback<br className="sm:hidden" /> on your swing.
                  </p>
                </div>
                <DownloadCTA
                  align="end"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
                >
                  Try SneakySwing free
                  <span className="w-[16px] h-[16px] rounded-[3px] bg-white/20 inline-grid place-items-center text-sm leading-none ml-2">›</span>
                </DownloadCTA>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── CTA ── coach verification note */}
        <Reveal>
          <section className="border-t border-ink/[0.07]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 sm:py-16">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Selected coaches only</p>
                  <p
                    className="font-display font-bold text-ink leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
                  >
                    We're currently onboarding a limited<br className="sm:hidden" /> group of vetted coaches.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('contact')}
                  className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
                >
                  Contact us to verify your coach
                  <span className="w-[16px] h-[16px] rounded-[3px] bg-white/20 inline-grid place-items-center text-sm leading-none ml-2">›</span>
                </button>
              </div>
            </div>
          </section>
        </Reveal>

      </main>
      <Footer />
    </div>
  );
};
