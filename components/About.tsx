import React, { useEffect } from 'react';
import { VisibleDotOrbit } from './VisibleDotOrbit';
import { getPath } from '../utils/paths';
import { Reveal } from './Reveal';
import { Header } from './Header';
import { Footer } from './Footer';

const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const INSTAGRAM_POST_URL = 'https://www.instagram.com/p/DZAob9ZRIXL/';
const TIKTOK_VIDEO_URL = 'https://www.tiktok.com/@trysneakyswing/video/7667424688313847054';
const TIKTOK_VIDEO_ID = '7667424688313847054';
const LINKEDIN_ACTIVITY_URN = 'urn:li:activity:7479761182640263168';

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

  // Load Instagram's and TikTok's official embed scripts so the
  // .instagram-media / .tiktok-embed blockquotes below render as real posts.
  useEffect(() => {
    const win = window as any;

    if (win.instgrm?.Embeds) {
      win.instgrm.Embeds.process();
    } else if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    if (!document.getElementById('tiktok-embed-script')) {
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
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
                        Grab 20 minutes<br />with the founding team.
                      </h2>
                      <p className="text-white/70 text-sm leading-[1.7] max-w-[44ch]">
                        Curious about the product, the research, or the vision? 20 minutes with a founder. No deck, no pitch.
                      </p>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex-shrink-0">
                      <a
                        href="https://calendar.app.google/1A7rzrUC7EMm335t9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex flex-col items-center gap-3 px-10 py-8 rounded-2xl border border-white/[0.10] hover:border-green-light/25 transition-all duration-300"
                        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                      >
                        <span className="text-white/60 text-xs tracking-wide">20 min · virtual · free</span>
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

        {/* ── Socials ── follow along */}
        <section className="border-t border-ink/[0.07] py-16 sm:py-24 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <Reveal>
              <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-3">Follow along</p>
              <h2
                className="font-display font-extrabold text-ink leading-[1.1] mb-10 lg:mb-12 max-w-2xl"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Golfers, coaches, and everything in between.
              </h2>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              <Reveal>
                <div
                  className="rounded-2xl border border-ink/[0.08] bg-white shadow-soft overflow-y-auto overflow-x-hidden flex justify-center"
                  style={{ height: '620px' }}
                >
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={INSTAGRAM_POST_URL}
                    data-instgrm-version="14"
                    style={{ width: '100%', maxWidth: '400px', margin: 0 }}
                  />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div
                  className="rounded-2xl border border-ink/[0.08] bg-white shadow-soft overflow-y-auto overflow-x-hidden flex justify-center"
                  style={{ height: '620px' }}
                >
                  <blockquote
                    className="tiktok-embed"
                    cite={TIKTOK_VIDEO_URL}
                    data-video-id={TIKTOK_VIDEO_ID}
                    style={{ maxWidth: '400px', minWidth: '325px', width: '100%', margin: 0 }}
                  >
                    <section />
                  </blockquote>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div
                  className="rounded-2xl border border-ink/[0.08] bg-white shadow-soft overflow-y-auto overflow-x-hidden flex justify-center"
                  style={{ height: '620px' }}
                >
                  <iframe
                    src={`https://www.linkedin.com/embed/feed/update/${LINKEDIN_ACTIVITY_URN}`}
                    height="600"
                    width="100%"
                    style={{ maxWidth: '504px', border: 'none', flexShrink: 0 }}
                    allowFullScreen
                    title="Sneaky Academy on LinkedIn"
                  />
                </div>
              </Reveal>
            </div>

            {/* Discord — no official embed without server admin access, so a simple link card */}
            <Reveal delay={300}>
              <a
                href="https://discord.gg/9mEKxpWuDR"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-ink/[0.08] bg-white p-6 sm:p-7 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 mt-8"
              >
                <div className="w-12 h-12 rounded-xl bg-green-light flex items-center justify-center flex-shrink-0">
                  <DiscordIcon className="w-5 h-5 text-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-bold text-ink text-base">Discord</p>
                    <span className="text-subtle text-xs">· Join the community</span>
                  </div>
                  <p className="text-subtle text-sm leading-[1.6]">Golfers and coaches trading swings, drills, and progress.</p>
                </div>
                <span className="text-ink/20 group-hover:text-green flex-shrink-0 transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
