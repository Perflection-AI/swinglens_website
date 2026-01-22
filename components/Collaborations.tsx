import React from 'react';
import { getPath } from '../utils/paths';

export const Collaborations: React.FC = () => {
  const allCollaborations = [
    {
      name: 'Carnegie Mellon University',
      logo: getPath('assets/collab_logos/cmu_logo.png'),
      alt: 'Carnegie Mellon University'
    },
    {
      name: 'University of Illinois',
      logo: getPath('assets/collab_logos/uiuc logo.svg'),
      alt: 'University of Illinois'
    },
    {
      name: 'Project Olympus',
      logo: getPath('assets/collab_logos/olympus_logo.png'),
      alt: 'Project Olympus'
    },
    {
      name: 'PGA',
      logo: getPath('assets/collab_logos/pga_logo.png'),
      alt: 'PGA'
    },
    {
      name: 'First Tee',
      logo: getPath('assets/collab_logos/first_tee_logo.png'),
      alt: 'First Tee'
    }
  ];

  const renderLogoRow = (collaborations: typeof allCollaborations) => (
    <div className="flex flex-col md:flex-row items-center justify-center">
      {collaborations.map((collab, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center justify-center w-40 md:w-44 lg:w-48">
            <img 
              src={collab.logo} 
              alt={collab.alt}
              className="h-20 md:h-24 lg:h-28 w-auto object-contain max-w-full"
            />
          </div>
          {index < collaborations.length - 1 && (
            <div className="hidden md:block w-px h-20 bg-ink/10 mx-4 lg:mx-6"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section id="collaborations" className="py-24 bg-golf-50 relative border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-xs font-bold text-golf-500 mb-3 uppercase tracking-widest font-mono">Partnerships</h3>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-6">
            COLLABORATIONS
          </h2>
          <p className="text-subtle text-lg leading-relaxed">
            We extend our deepest gratitude to the brilliant minds and dedicated partners who work their hardest to make Perflection AI a reality.
          </p>
        </div>

        <div>
          {renderLogoRow(allCollaborations)}
        </div>
      </div>
    </section>
  );
};