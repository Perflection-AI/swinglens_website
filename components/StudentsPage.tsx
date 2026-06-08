import React, { useEffect } from 'react';
import { DotOrbit } from '@paper-design/shaders-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Reveal } from './Reveal';

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

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
    title: 'Record your swing',
    body: 'Phone on a tripod. No sensors, no markers. The app auto-detects and records the moment you start.',
  },
  {
    n: '02',
    title: 'AI analyzes 20+ metrics',
    body: '3D body reconstruction, club path, tempo, shoulder turn — all flagged and explained in seconds.',
  },
  {
    n: '03',
    title: 'Your coach replies 24/7',
    body: "Chat with your coach's AI Twin anytime, built on their real methodology and voice — not a generic model.",
  },
];

const heroStats = [
  { value: '5.0', label: 'App Store rating' },
  { value: '32%', label: 'Week-1 retention' },
  { value: '600+', label: 'users, zero marketing' },
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

        {/* ── Hero ── Light / paper */}
        <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
              For Golfers
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:gap-16 xl:gap-24">
              <div className="lg:flex-[5] mb-10 lg:mb-0">
                <h1
                  className="font-display font-extrabold text-ink leading-[1.06] tracking-tight mb-5"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)' }}
                >
                  A golf coach in your pocket.{' '}
                  <span className="text-ink/35">Always-on. Always improving.</span>
                </h1>
                <p className="text-subtle text-sm sm:text-base leading-[1.7] max-w-[50ch]">
                  The gap between lessons is where progress is lost. SneakySwing gives you real coaching methodology and instant swing analysis — any time, in your coach's voice.
                </p>
              </div>
              <div className="lg:flex-[3] flex flex-row lg:flex-col gap-6 lg:gap-7">
                {heroStats.map(({ value, label }) => (
                  <div key={value} className="flex-1 lg:flex-auto">
                    <p
                      className="font-display font-extrabold text-ink leading-none mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
                    >
                      {value}
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
                  <DotOrbit style={{ width: '100%', height: '100%', display: 'block' }} {...dotOrbitProps} />
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
                  <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Start today</p>
                  <p
                    className="font-display font-bold text-ink leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
                  >
                    Get tour-level feedback<br className="sm:hidden" /> on your swing.
                  </p>
                </div>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
                >
                  Try SneakySwing free
                  <span className="w-[16px] h-[16px] rounded-[3px] bg-white/20 inline-grid place-items-center text-sm leading-none ml-2">›</span>
                </a>
              </div>
            </div>
          </section>
        </Reveal>

      </main>
      <Footer />
    </div>
  );
};
