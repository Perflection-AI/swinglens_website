import React, { useCallback } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getBasePath } from '../utils/paths';

export const GolfTISection: React.FC = () => {
  const goToGolfTI = useCallback(() => {
    const base = getBasePath();
    const golftiPath = `${base}golfti`.replace(/\/+/g, '/');
    window.location.href = golftiPath;
  }, []);

  return (
    <section className="py-20 md:py-24 bg-golf-50 relative overflow-hidden border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-golf-200 shadow-soft-lg p-8 md:p-12 lg:p-16">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-golf-100/40 rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-golf-200/20 rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-golf-100 border border-golf-200 shadow-sm text-golf-700 text-xs font-bold uppercase tracking-wide mb-5 font-mono">
              <Sparkles className="w-3 h-3 text-golf-500 fill-current" />
              <span>GolfTI Personality Test</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4 leading-tight">
              What's your <span className="text-gradient">GolfTI</span>?
            </h2>
            <p className="text-subtle text-lg leading-relaxed mb-8">
              Upload a swing video and our AI will reveal your true golf personality. Like MBTI, but for the fairway.
            </p>
            <button
              onClick={goToGolfTI}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-golf-600 rounded-xl shadow-card hover:bg-golf-500 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200 border border-golf-500"
            >
              Discover your GolfTI
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
