import React, { useEffect } from 'react';
import { VisibleDotOrbit } from './VisibleDotOrbit';
import { Header } from './Header';
import { Footer } from './Footer';
import { Reveal } from './Reveal';
import { getBasePath } from '../utils/paths';

const navigateTo = (path: string) => {
  const base = getBasePath();
  const url = `${base}${path}`.replace(/\/+/g, '/');
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
};


const dotOrbitProps = {
  colors: ['#3d6b40'] as [string],
  colorBack: '#2d4a2a',
  stepsPerColor: 2,
  size: 0.18,
  sizeRange: 0,
  spreading: 0.35,
  speed: 1.5,
  scale: 0.55,
};

const steps = [
  {
    n: '01',
    title: 'Sign up free',
    body: 'No upfront cost. Set your own pricing. We take a rev-share cut only when you earn.',
  },
  {
    n: '02',
    title: 'AI handles intake',
    body: 'Every swing is pre-analyzed before you touch it — 3D biomechanics, fault detection, draft notes done.',
  },
  {
    n: '03',
    title: 'Your Twin teaches 24/7',
    body: "You annotate once. Your AI Twin answers students in your voice and methodology, even while you sleep.",
  },
];

const heroStats = [
  { stat: '11', label: 'coaches signed priced LOIs before seeing a single user metric' },
  { stat: '2', label: 'PGA pros working with us unpaid for months' },
  { stat: '$0', label: 'upfront — we earn when you earn' },
];

export const CoachesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'For Coaches | SneakySwing';
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>

        {/* ── Hero ── Light / paper */}
        <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
              For Coaches
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:gap-16 xl:gap-24">
              <div className="lg:flex-[5] mb-10 lg:mb-0">
                <h1
                  className="font-display font-extrabold text-ink leading-[1.06] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)' }}
                >
                  Your mastery is the most valuable thing you have.{' '}
                  <span className="text-ink/35">We turn it into an asset.</span>
                </h1>
                <p className="text-subtle text-sm sm:text-base leading-[1.7] max-w-[50ch]">
                  Before us, your expertise is capped at 50 students each week. After us, it compounds — always-on for hundreds, owned by you, getting smarter every session.
                </p>
              </div>
              <div className="lg:flex-[3] flex flex-row lg:flex-col gap-6 lg:gap-7">
                {heroStats.map(({ stat, label }) => (
                  <div key={stat} className="flex-1 lg:flex-auto">
                    <p
                      className="font-display font-extrabold text-ink leading-none mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
                    >
                      {stat}
                    </p>
                    <p className="text-subtle text-xs leading-[1.6]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── Dark DotOrbit */}
        <section className="py-6 sm:py-8 bg-paper">
          <div className="mx-auto px-3 sm:px-4 max-w-[1400px]">
            <Reveal>
              <div className="relative rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <VisibleDotOrbit style={{ width: '100%', height: '100%', display: 'block' }} {...dotOrbitProps} />
                </div>
                <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
                  <p className="text-green-light/70 text-[10px] font-bold uppercase tracking-[0.22em] mb-12">
                    How it works
                  </p>
                  <div className="grid sm:grid-cols-3 gap-10 lg:gap-14">
                    {steps.map(({ n, title, body }, i) => (
                      <div key={n} className="flex flex-col" style={{ animationDelay: `${i * 80}ms` }}>
                        <p className="font-display font-extrabold text-white/25 leading-none mb-5 tracking-tighter" style={{ fontSize: '2.5rem' }}>{n}</p>
                        <p className="font-display font-bold text-white text-lg leading-tight mb-3">{title}</p>
                        <p className="text-white/70 text-sm leading-[1.7]">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── editorial strip */}
        <Reveal>
          <section className="border-t border-ink/[0.07]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 sm:py-16">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Join as a coach</p>
                  <p
                    className="font-display font-bold text-ink leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
                  >
                    The future of coaching is<br className="sm:hidden" /> asset-based, not time-based.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('coaches/apply')}
                  className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
                >
                  Join as a coach
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
