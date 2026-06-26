import React, { useEffect } from 'react';
import { VisibleDotOrbit } from './VisibleDotOrbit';
import { getPath } from '../utils/paths';
import { Reveal } from './Reveal';
import { Header } from './Header';
import { Footer } from './Footer';

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

const team = [
  {
    name: 'Gary Liu',
    role: 'Co-founder',
    title: 'CEO · CFO',
    image: getPath('assets/team/gary.png'),
  },
  {
    name: 'Zack Li',
    role: 'Co-founder',
    title: 'CTO · COO',
    image: getPath('assets/team/zack.png'),
  },
  {
    name: 'Franklin Xu',
    role: 'Founding Engineer',
    title: 'AI · AR/VR · CMU HCI',
    image: getPath('assets/team/franklin.png'),
  },
  {
    name: 'Bo Xie',
    role: 'Growth',
    title: 'Golf Athlete',
    image: getPath('assets/team/bo.png'),
  },
  {
    name: 'James Pond',
    role: 'Advisor',
    title: 'PGM Head Pro · PhD',
    image: getPath('assets/team/james.png'),
  },
  {
    name: 'Benny Zhang',
    role: 'Coach',
    title: 'Golf Academy Founder · Influencer',
    image: getPath('assets/team/benny.png'),
  },
];

const productTeam = [
  {
    name: 'Alice Li',
    role: 'Founding Designer',
    title: 'Product & Ops',
    image: getPath('assets/team/alice.png'),
  },
  {
    name: 'Jolie Chen',
    role: 'Founding Designer',
    title: 'User Researcher',
    image: getPath('assets/team/jolie.png'),
  },
  {
    name: 'Amanda Liu',
    role: 'Founding Designer',
    title: 'Fullstack · Student App',
    image: getPath('assets/team/amanda.png'),
  },
  {
    name: 'Vanessa Chang',
    role: 'Founding Designer',
    title: 'Fullstack · Coach App',
    image: getPath('assets/team/vanessa.png'),
  },
];

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'About | SneakySwing';
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>

        {/* ── Mission ── DotOrbit, asymmetric 2-col */}
        <section className="py-6 sm:py-8 bg-paper">
          <div className="mx-auto px-3 sm:px-4 max-w-[1400px]">
            <div className="relative rounded-[2rem] overflow-hidden">

              <div className="absolute inset-0 z-0">
                <VisibleDotOrbit
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  colors={['#3d6b40']}
                  colorBack="#2d4a2a"
                  stepsPerColor={2}
                  size={0.18}
                  sizeRange={0}
                  spreading={0.35}
                  speed={1.5}
                  scale={0.55}
                />
              </div>

              <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-14 lg:py-20">
                <p className="text-green-light/70 text-[10px] font-bold uppercase tracking-[0.25em] mb-8 sm:mb-10">
                  Our Mission
                </p>
                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">

                  {/* Left: headline */}
                  <div className="lg:flex-[5] mb-8 lg:mb-0">
                    <h1
                      className="font-display font-extrabold text-white leading-[1.06] tracking-tight"
                      style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)' }}
                    >
                      Elite coaching has always been scarce by physics.
                    </h1>
                  </div>

                  {/* Right: body copy */}
                  <div className="lg:flex-[4] space-y-5">
                    <p className="text-white/70 text-sm sm:text-base leading-[1.7]">
                      One coach, one student, one hour. We think that constraint is finally solvable.
                    </p>
                    <p className="text-white/70 text-sm sm:text-base leading-[1.7]">
                      Perflection turns the world's best sport coaches into digital assets — AI agent twins that carry their methodology, their voice, and their judgment to anyone with a smartphone.
                    </p>
                    <p className="text-white font-medium text-sm sm:text-base leading-[1.7]">
                      World-class instruction should not be a privilege of access.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Team ── staggered brick grid with ordinal numbers */}
        <section className="pt-24 pb-20 sm:pt-28 sm:pb-24 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-14 sm:mb-16">
                <div>
                  <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-3">The team</p>
                  <h2
                    className="font-display font-extrabold text-ink leading-[1.06]"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 3rem)' }}
                  >
                    Built by people<br />who play the game.
                  </h2>
                </div>
                <p className="text-subtle text-sm leading-relaxed max-w-[240px] sm:text-right">
                  Coaches, athletes, and builders. Obsessed with making great instruction accessible.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 70}>
                  <div className="group flex flex-col">

                    {/* Photo */}
                    <div className="relative rounded-2xl overflow-hidden mb-4 bg-green-light" style={{ aspectRatio: '4/5' }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/[0.04] to-transparent" />
                      <span
                        className="absolute bottom-2 right-3 font-display font-extrabold leading-none text-white/[0.20] pointer-events-none select-none"
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Text */}
                    <p className="text-green text-[9px] font-bold uppercase tracking-[0.22em] mb-1.5">{member.role}</p>
                    <p className="text-ink font-display font-bold text-lg leading-tight mb-1">{member.name}</p>
                    <p className="text-subtle text-xs">{member.title}</p>

                  </div>
                </Reveal>
              ))}
            </div>

            {/* Founding Product Team */}
            <Reveal>
              <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mt-14 mb-8">Founding Product Team</p>
            </Reveal>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {productTeam.map((member, i) => (
                <Reveal key={member.name} delay={i * 70}>
                  <div className="group flex flex-col">

                    {/* Photo */}
                    <div className="relative rounded-2xl overflow-hidden mb-4 bg-green-light" style={{ aspectRatio: '4/5' }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/[0.04] to-transparent" />
                      <span
                        className="absolute bottom-2 right-3 font-display font-extrabold leading-none text-white/[0.20] pointer-events-none select-none"
                        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Text */}
                    <p className="text-green text-[9px] font-bold uppercase tracking-[0.22em] mb-1.5">{member.role}</p>
                    <p className="text-ink font-display font-bold text-lg leading-tight mb-1">{member.name}</p>
                    <p className="text-subtle text-xs">{member.title}</p>

                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ── Coffee Chat ── Dark DotOrbit card */}
        <section className="py-6 sm:py-8 bg-paper">
          <div className="mx-auto px-3 sm:px-4 max-w-[1400px]">
            <Reveal>
              <div className="relative rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <VisibleDotOrbit
                    style={{ width: '100%', height: '100%', display: 'block' }}
                    colors={['#3d6b40']}
                    colorBack="#2d4a2a"
                    stepsPerColor={2}
                    size={0.18}
                    sizeRange={0}
                    spreading={0.35}
                    speed={1.5}
                    scale={0.55}
                  />
                </div>
                <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-12 lg:py-16">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">

                    {/* Left: text */}
                    <div>
                      <p className="text-green-light/70 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Talk to us</p>
                      <h2
                        className="font-display font-extrabold text-white leading-[1.06] mb-4"
                        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.25rem)' }}
                      >
                        Book a virtual coffee<br />with the founding team.
                      </h2>
                      <p className="text-white/70 text-sm leading-[1.7] max-w-[44ch] mb-2">
                        Curious about the product, the research, or the vision? 30 minutes with a founder. No deck, no pitch.
                      </p>
                      <p className="text-white/55 text-xs leading-[1.6] max-w-[44ch]">
                        After payment, email <span className="text-white/75">contact@perflection.ai</span> with your confirmation and who you'd like to chat with.
                      </p>
                    </div>

                    {/* Right: price + CTA */}
                    <div className="flex-shrink-0">
                      <a
                        href="https://buy.stripe.com/3cIbJ2g7k6cs5Xaajm3VC03"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex flex-col items-center gap-3 px-10 py-8 rounded-2xl border border-white/[0.10] hover:border-green-light/25 transition-all duration-300"
                        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                      >
                        <span className="font-display font-extrabold text-white leading-none" style={{ fontSize: '3rem' }}>$20</span>
                        <span className="text-white/60 text-xs tracking-wide">30 min · virtual</span>
                        <span className="mt-1 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-green text-white text-sm font-semibold group-hover:brightness-110 transition-all duration-200">
                          Book now
                          <span className="w-[14px] h-[14px] rounded-[3px] bg-white/20 inline-grid place-items-center text-xs leading-none">›</span>
                        </span>
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── horizontal editorial strip */}
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
