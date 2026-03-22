import React from 'react';
import { getPath } from '../utils/paths';

type Collab = {
  name: string;
  logo: string;
  alt: string;
};

const allCollaborations: Collab[] = [
  {
    name: 'Carnegie Mellon University',
    logo: getPath('assets/collab_logos/cmu_logo.png'),
    alt: 'Carnegie Mellon University',
  },
  {
    name: 'University of Illinois',
    logo: getPath('assets/collab_logos/uiuc logo.svg'),
    alt: 'University of Illinois',
  },
  {
    name: 'Project Olympus',
    logo: getPath('assets/collab_logos/olympus_logo.png'),
    alt: 'Project Olympus',
  },
  {
    name: 'PGA',
    logo: getPath('assets/collab_logos/pga_logo.png'),
    alt: 'PGA',
  },
  {
    name: 'First Tee',
    logo: getPath('assets/collab_logos/first_tee_logo.png'),
    alt: 'First Tee',
  },
];

function LogoCard({ collab }: { collab: Collab }) {
  return (
    <div className="flex h-[7.25rem] sm:h-32 items-center justify-center rounded-2xl bg-white/90 border border-golf-200/60 p-4 sm:p-5 shadow-sm">
      <img
        src={collab.logo}
        alt={collab.alt}
        className="max-h-[4.25rem] sm:max-h-[4.75rem] w-full max-w-[200px] sm:max-w-[220px] object-contain object-center"
      />
    </div>
  );
}

export const Collaborations: React.FC = () => {
  const isLastOdd =
    allCollaborations.length % 2 === 1;

  return (
    <section id="collaborations" className="py-16 sm:py-24 bg-golf-50 relative border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h3 className="text-xs font-bold text-golf-500 mb-3 uppercase tracking-widest font-mono">
            Partnerships
          </h3>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4 sm:mb-6">
            COLLABORATIONS
          </h2>
          <p className="text-subtle text-base sm:text-lg leading-relaxed px-1">
            We extend our deepest gratitude to the brilliant minds and dedicated partners who work
            their hardest to make Perflection AI a reality.
          </p>
        </div>

        {/* Mobile / small screens: 2-column grid, uniform cards; last logo centered when count is odd */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:hidden w-full max-w-md mx-auto">
          {allCollaborations.map((collab, index) => {
            const lastOddCell =
              isLastOdd && index === allCollaborations.length - 1;
            return (
              <div
                key={collab.name}
                className={
                  lastOddCell
                    ? 'col-span-2 flex justify-center px-2 sm:px-4'
                    : 'min-w-0'
                }
              >
                <div className={lastOddCell ? 'w-full max-w-[17rem] sm:max-w-xs' : 'w-full min-w-0'}>
                  <LogoCard collab={collab} />
                </div>
              </div>
            );
          })}
        </div>

        {/* md+: horizontal row with dividers (wraps on narrow tablets if needed) */}
        <div className="hidden md:flex flex-row flex-wrap items-center justify-center gap-y-10 gap-x-1 lg:gap-x-0">
          {allCollaborations.map((collab, index) => (
            <React.Fragment key={collab.name}>
              <div className="flex items-center justify-center w-40 md:w-44 lg:w-48 px-2">
                <img
                  src={collab.logo}
                  alt={collab.alt}
                  className="h-20 md:h-24 lg:h-28 w-auto object-contain max-w-full"
                />
              </div>
              {index < allCollaborations.length - 1 && (
                <div className="hidden lg:block w-px h-20 bg-ink/10 mx-4 xl:mx-6 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
