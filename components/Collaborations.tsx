import React, { useEffect, useRef, useState } from 'react';
import { getPath } from '../utils/paths';
import { DotOrbit } from '@paper-design/shaders-react';

type Collab = { name: string; logo: string; alt: string };

const allCollaborations: Collab[] = [
  { name: 'Carnegie Mellon University', logo: getPath('assets/collab_logos/cmu_logo.png'),        alt: 'Carnegie Mellon University' },
  { name: 'University of Illinois',     logo: getPath('assets/collab_logos/uiuc logo.svg'),       alt: 'University of Illinois'     },
  { name: 'Project Olympus',            logo: getPath('assets/collab_logos/olympus_logo.png'),    alt: 'Project Olympus'            },
  { name: 'PGA',                        logo: getPath('assets/collab_logos/pga_logo.png'),        alt: 'PGA'                        },
  { name: 'First Tee',                  logo: getPath('assets/collab_logos/first_tee_logo.png'),  alt: 'First Tee'                  },
];

const ENTRY_DELAYS = ['0.1s', '0.2s', '0.3s', '0.4s', '0.5s'];

export const Collaborations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.unobserve(el); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cardClass = `collab-card${animated ? ' is-animated' : ''}`;

  return (
    <section id="collaborations" className="py-6 sm:py-8 bg-paper">
      <div className="mx-auto px-3 sm:px-4 max-w-[1400px]" ref={sectionRef}>
        <div className="relative rounded-[2rem] overflow-hidden">

          {/* DotOrbit background */}
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

          {/* Content — 2-column on lg+, stacked on mobile */}
          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

              {/* Left: heading text */}
              <div className="lg:flex-shrink-0 lg:w-72 xl:w-80">
                <h3 className="text-xs font-bold text-green-light/60 mb-3 uppercase tracking-widest font-mono">
                  Partnerships
                </h3>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-[1.1]">
                  Loved by golfers<br />&amp; coaches.
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Backed by some of the most respected institutions in golf and sport.
                </p>
              </div>

              {/* Right: logo grid — wraps naturally */}
              <div className="flex-1">
                {/* Mobile: 2-col grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden w-full max-w-sm mx-auto">
                  {allCollaborations.map((collab, i) => {
                    const isLastOdd = allCollaborations.length % 2 === 1 && i === allCollaborations.length - 1;
                    return (
                      <div key={collab.name} className={isLastOdd ? 'col-span-2 flex justify-center' : ''}>
                        <div className={isLastOdd ? 'w-full max-w-[17rem]' : 'w-full'}>
                          <div
                            className={`${cardClass} flex h-28 items-center justify-center rounded-2xl bg-white/90 border border-white/20 p-4`}
                            style={animated ? { animationDelay: ENTRY_DELAYS[i] } : undefined}
                          >
                            <img src={collab.logo} alt={collab.alt} className="max-h-16 w-full max-w-[160px] object-contain object-center" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* md+: single row, no wrap */}
                <div className="hidden md:flex flex-row flex-nowrap items-center justify-start gap-3 lg:gap-4">
                  {allCollaborations.map((collab, i) => (
                    <div
                      key={collab.name}
                      className={`${cardClass} flex h-20 flex-1 min-w-0 items-center justify-center rounded-xl bg-white/90 border border-white/20 p-3`}
                      style={animated ? { animationDelay: ENTRY_DELAYS[i] } : undefined}
                    >
                      <img src={collab.logo} alt={collab.alt} className="max-h-12 w-full object-contain object-center" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
