import React from 'react';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Chen",
    role: "15 Handicap",
    content: "This app told me exactly what my coach had told me, it is incredible!",
    image: "https://picsum.photos/64/64?random=4"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Scratch Golfer",
    content: "Even as an advanced player, the app's auto swing recording and analysis tools are so helpful. My coach is on the app too, so it's like having two coaches in my pocket!",
    image: "https://picsum.photos/64/64?random=5"
  },
  {
    id: 3,
    name: "David Miller",
    role: "Beginner",
    content: "I'm just getting into golf, and the doodle me and roast me rap song features are hilarious! I'm sticking with this app!",
    image: "https://picsum.photos/64/64?random=6"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-paper border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-ink mb-16">
          Loved by golfers of all skill levels
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-white p-8 rounded-xl border border-ink/10 shadow-card flex flex-col hover:-translate-y-1 transition-transform duration-300 relative"
            >
              {/* Subtle texture for card */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBoNDBNMCAyMGg0ME0wIDMwaDQwcTIwIDAgMjAtMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZjBmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] opacity-30 pointer-events-none rounded-xl"></div>
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[1,2,3,4,5].map(star => (
                   <Star key={star} className="w-4 h-4 text-gold fill-current" />
                ))}
              </div>

              <p className="text-ink text-lg leading-relaxed flex-grow mb-8 font-medium relative z-10">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-ink/5 pt-6 relative z-10">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-paper shadow-sm" />
                <div>
                  <h4 className="font-bold text-ink">{t.name}</h4>
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