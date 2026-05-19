import React, { useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { DotOrbit } from '@paper-design/shaders-react';
import { getBasePath } from '../utils/paths';

export const GolfTISection: React.FC = () => {
  const goToGolfTI = useCallback(() => {
    const base = getBasePath();
    const golftiPath = `${base}golfti`.replace(/\/+/g, '/');
    window.location.href = golftiPath;
  }, []);

  return (
    <section className="py-20 md:py-24 bg-paper relative overflow-hidden border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-green-light shadow-soft-lg p-8 md:p-12 lg:p-16 overflow-hidden">

          {/* DotOrbit shader — right side of the CTA card */}
          <div className="absolute top-0 right-0 w-[45%] h-full rounded-l-2xl overflow-hidden pointer-events-none" style={{ opacity: 0.22 }}>
            <DotOrbit
              width="100%"
              height="100%"
              colors={["#719241"]}
              colorBack="#F8FAF5"
              stepsPerColor={2}
              size={0.40}
              sizeRange={0}
              spreading={0.28}
              speed={1.5}
              scale={0.38}
              fit="cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-light border border-green-light shadow-sm text-ink text-xs font-bold uppercase tracking-wide mb-5 font-mono">
              <Sparkles className="w-3 h-3 text-green fill-current" />
              <span>GolfTI Personality Test</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4 leading-tight">
              What's your <span className="text-green">GolfTI</span>?
            </h2>
            <p className="text-subtle text-lg leading-relaxed mb-8">
              Upload a swing video and our AI will reveal your true golf personality. Like MBTI, but for the fairway.
            </p>
            <button
              onClick={goToGolfTI}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
            >
              Discover your GolfTI
              <span className="w-[18px] h-[18px] rounded-[4px] bg-white/20 inline-grid place-items-center text-sm leading-none ml-2">›</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
