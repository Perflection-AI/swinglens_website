import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DotOrbit } from '@paper-design/shaders-react';
import { Reveal } from './Reveal';

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

const glassGold: React.CSSProperties = {
  background: 'rgba(168, 141, 55, 0.11)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(168, 141, 55, 0.28)',
  boxShadow: 'inset 0 1px 0 rgba(255, 220, 120, 0.15), inset 0 0 40px 10px rgba(168, 141, 55, 0.05)',
};

const glassGreen: React.CSSProperties = {
  background: 'rgba(113, 146, 65, 0.13)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(184, 217, 130, 0.22)',
  boxShadow: 'inset 0 1px 0 rgba(232, 243, 216, 0.15), inset 0 0 40px 10px rgba(113, 146, 65, 0.05)',
};

const coachCapabilities = [
  { n: '01', text: 'Auto-detect swing faults at intake: sway, early extension, over-the-top' },
  { n: '02', text: 'Instant skeletal & angular biomechanics, no sensors required' },
  { n: '03', text: 'AI-drafted lesson notes and drill plans, ready to send' },
];

const studentOutcomes = [
  'Know exactly what to work on after every session, not just what went wrong',
  'Track real progress over weeks, not just today\'s score',
  'Practice drills built around your coach\'s actual plan',
];

export const CoachesSection: React.FC = () => {
  return (
    <section id="solutions" className="py-6 sm:py-8 bg-paper">
      <div className="mx-auto px-3 sm:px-4 max-w-[1400px]">
        <Reveal>
          <div className="relative rounded-[2rem] overflow-hidden">

            <div className="absolute inset-0 z-0">
              <DotOrbit
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

            <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-10 sm:py-14">

              {/* Left-aligned section intro */}
              <div className="mb-9 lg:mb-11 max-w-xl">
                <p className="text-green-light/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                  Who it's built for
                </p>
                <h2
                  className="font-display font-extrabold text-white leading-[1.06]"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
                >
                  One platform.<br />Two very different jobs.
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">

                {/* ── COACHES CARD — numbered, systematic, professional ── */}
                <div
                  className="rounded-[1.75rem] p-8 lg:p-10 flex flex-col transition-all duration-300 hover:brightness-[1.08]"
                  style={glassGold}
                >
                  <div className="mb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/12 text-gold text-[10px] font-bold uppercase tracking-[0.2em] border border-gold/20">
                      For Coaches
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold text-white leading-[1.1] mb-3"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)' }}
                  >
                    Save the analysis.<br />Focus on coaching.
                  </h3>
                  <p className="text-white/50 text-sm leading-[1.7] mb-7 max-w-[42ch]">
                    Your AI handles the first pass on every swing. You walk in with the data already done.
                  </p>

                  {/* Numbered capability list */}
                  <div className="space-y-5 flex-grow mb-7">
                    {coachCapabilities.map(({ n, text }) => (
                      <div key={n} className="flex gap-4 items-start">
                        <span className="font-display font-extrabold text-gold/40 text-xs tracking-widest mt-0.5 w-5 flex-shrink-0">
                          {n}
                        </span>
                        <p className="text-white/75 text-sm leading-[1.65]">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(168,141,55,0.15)', paddingTop: '1.5rem' }}>
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-white text-sm font-semibold hover:brightness-110 transition-all duration-200"
                      style={{ boxShadow: '0 1px 2px rgba(168,141,55,0.25), 0 2px 8px rgba(168,141,55,0.18)' }}
                    >
                      Join as a coach <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* ── STUDENTS CARD — em-dash outcomes, open, personal ── */}
                <div
                  className="rounded-[1.75rem] p-8 lg:p-10 flex flex-col transition-all duration-300 hover:brightness-[1.08]"
                  style={glassGreen}
                >
                  <div className="mb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-green-light text-[10px] font-bold uppercase tracking-[0.2em] border border-green-light/18"
                      style={{ background: 'rgba(232,243,216,0.08)' }}>
                      For Students
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold text-white leading-[1.1] mb-3"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)' }}
                  >
                    Your game, improving<br />between sessions.
                  </h3>
                  <p className="text-white/50 text-sm leading-[1.7] mb-7 max-w-[42ch]">
                    The gap between lessons is where progress is lost. SneakySwing keeps you on track.
                  </p>

                  {/* Em-dash outcome list */}
                  <div className="space-y-6 flex-grow mb-7">
                    {studentOutcomes.map((text, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="text-green-light/50 text-sm leading-none mt-[3px] flex-shrink-0 font-medium">—</span>
                        <p className="text-white/75 text-sm leading-[1.7]">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(184,217,130,0.14)', paddingTop: '1.5rem' }}>
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green text-white text-sm font-semibold hover:brightness-110 transition-all duration-200"
                      style={{ boxShadow: '0 1px 2px rgba(113,146,65,0.25), 0 2px 8px rgba(113,146,65,0.18)' }}
                    >
                      Start for free <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
