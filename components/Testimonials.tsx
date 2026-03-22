import React from 'react';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';

/** Curated App Store reviews — SneakySwing - Golf Copilot (US) */
const testimonials: Testimonial[] = [
  {
    id: 1,
    title: 'Revolutionary',
    name: 'zbonmnobwo',
    role: 'App Store',
    content:
      'I have been one of the early beta testers for this app and have been using it for a while. This is unlike all other AI golf apps that just give you a score or feedback, because I actually contact my coach on this platform. It is more than an app, this is the infrastructure for golf coaching of the future, and I highly recommend golfers and coaches learn about what this team is doing!',
  },
  {
    id: 2,
    title: 'Recommend this for golf lovers!',
    name: 'JiayiJennie',
    role: 'App Store',
    content:
      'The feedback is finally clear and not a wall of text, and it actually tells me what to do next, not just what I did wrong.',
  },
  {
    id: 3,
    title: 'Great coach app',
    name: 'Momo0335',
    role: 'App Store',
    content:
      'Really impressed by how clearly it breaks down the swing. Feels much more personalized than generic golf tips. Super helpful.',
  },
];

function initialsFromName(name: string): string {
  const alnum = name.replace(/[^a-zA-Z0-9]/g, '');
  if (alnum.length >= 2) return alnum.slice(0, 2).toUpperCase();
  if (alnum.length === 1) return alnum.toUpperCase();
  return '?';
}

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-golf-50 border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4">
            Loved by golfers &amp; coaches
          </h2>
          <p className="text-subtle text-lg">
            Real reviews from the App Store
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-xl border border-ink/10 shadow-card flex flex-col hover:-translate-y-1 transition-transform duration-300 relative"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMCAyMGg0ME0wIDMwaDQwcTIwIDAgMjAtMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-30 pointer-events-none rounded-xl"></div>

              <div className="flex gap-1 mb-4 relative z-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-gold fill-current" />
                ))}
              </div>

              {t.title && (
                <h3 className="font-bold text-ink text-base mb-3 relative z-10 leading-snug">
                  {t.title}
                </h3>
              )}

              <p className="text-ink text-base leading-relaxed flex-grow mb-8 font-medium relative z-10">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-4 border-t border-ink/5 pt-6 relative z-10 mt-auto">
                {t.image ? (
                  <img
                    src={t.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-paper shadow-sm shrink-0"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full bg-golf-100 text-golf-700 flex items-center justify-center text-sm font-bold font-mono ring-2 ring-paper shadow-sm shrink-0"
                    aria-hidden
                  >
                    {initialsFromName(t.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-bold text-ink truncate">{t.name}</h4>
                  <p className="text-subtle text-sm font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
