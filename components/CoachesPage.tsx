import React, { useEffect } from 'react';
import { PenLine, Camera, Users, Globe } from 'lucide-react';
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

const benefits = [
  {
    title: 'More students, same you',
    body: 'Extend your coaching to more golfers than your calendar alone could ever fit.',
  },
  {
    title: 'Every session builds on the last',
    body: 'Your AI Twin keeps every student on-track between lessons, with your methodology intact.',
  },
  {
    title: "Income that isn't capped by your calendar",
    body: 'A new revenue stream that grows with your student base, not just your booked hours.',
  },
];

const coachFeatures = [
  {
    icon: PenLine,
    title: 'Augment in-person lessons',
    body: "Annotate your students' swings and store lesson notes — hands-free.",
  },
  {
    icon: Camera,
    title: 'Guide students after lessons',
    body: "Turn your students' phone camera into your eyes. Automated check-ins, your drills recommended, AI analysis in your style.",
  },
  {
    icon: Users,
    title: 'Build long-term relationships',
    body: 'Your teaching assistant learns how you teach and how each student learns — improving over time, strengthening the relationship, and reducing churn.',
  },
  {
    icon: Globe,
    title: 'Scale your expertise',
    body: 'Your virtual brain becomes a digital asset you own — available to any golfer around the world, lifting profitability without losing the human touch.',
  },
];

const heroStats = [
  { stat: '5.0', label: 'App Store rating' },
  { stat: '20+', label: 'Coach & Academy partners' },
  { stat: '$10-50k', label: 'Extra income / year for you' },
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

        {/* ── Hero ── text left, stats right, brand-green accent */}
        <section className="relative overflow-hidden bg-paper pt-28 pb-16 lg:py-28">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">

              {/* Left: Copy */}
              <div className="relative z-10 max-w-xl mb-12 lg:mb-0">
                <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
                  For Coaches
                </p>
                <h1
                  className="tracking-tight text-ink leading-[1.08] mb-4 font-display font-extrabold"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >
                  Be there,<br />
                  <span className="text-brand">even when you're not.</span>
                </h1>

                <p className="text-base text-subtle mb-4 leading-relaxed max-w-[48ch]">
                  Your personally trained virtual teaching assistant extends your coaching beyond the lesson tee. We simplify your business, keep you closer to your athletes, and turn your expertise into more revenue.
                </p>

                <p className="text-base text-subtle mb-4 leading-relaxed max-w-[48ch]">
                  We're currently onboarding a limited group of vetted coaches.
                </p>

                <button
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
                >
                  Contact us to get verified
                  <svg className="ml-2 w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                {heroStats.map(({ stat, label }) => (
                  <div key={stat}>
                    <p
                      className="font-display font-extrabold text-ink leading-none mb-2"
                      style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                    >
                      {stat}
                    </p>
                    <p className="text-subtle text-sm leading-[1.6]">{label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── Our approach ── Light editorial cards */}
        <section className="py-16 sm:py-24 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Reveal>
              <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-4">
                Our approach
              </p>
              <h2
                className="font-display font-extrabold text-ink leading-[1.1] mb-4 max-w-3xl"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Technology should make coaching better, not replace it.
              </h2>
              <p className="text-subtle text-sm sm:text-base leading-[1.7] max-w-2xl mb-10 lg:mb-12">
                Your revenue today is capped by the hours you can personally coach. Sneaky Academy turns your methodology into something that reaches further — more students, more consistency, more income — without losing what makes your coaching yours.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
              {benefits.map(({ title, body }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <div className="h-full flex flex-col rounded-2xl border border-ink/[0.08] bg-white p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
                    <p className="font-display font-bold text-ink text-lg leading-tight mb-3">{title}</p>
                    <p className="text-subtle text-sm leading-[1.7]">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Command your teaching assistant ── Light editorial cards */}
        <section className="py-16 sm:py-24 bg-paper border-t border-ink/[0.07]">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Reveal>
              <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-4">
                The App
              </p>
              <h2
                className="font-display font-extrabold text-ink leading-[1.1] mb-4 max-w-3xl"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Command your teaching assistant<br />to guide your students.
              </h2>
              <p className="text-subtle text-sm sm:text-base leading-[1.7] max-w-2xl mb-10 lg:mb-12">
                It has your teaching style, fits how each student learns, and works 24/7.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {coachFeatures.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <div className="h-full flex flex-col rounded-2xl border border-ink/[0.08] bg-white p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
                    <div className="w-11 h-11 rounded-xl bg-green-light flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-green" strokeWidth={1.75} />
                    </div>
                    <p className="font-display font-bold text-ink text-lg leading-tight mb-3">{title}</p>
                    <p className="text-subtle text-sm leading-[1.7]">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

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
                  Contact us to get verified
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
