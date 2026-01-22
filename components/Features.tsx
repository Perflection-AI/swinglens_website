import React from 'react';
import { Camera, Brain, Trophy, Smartphone, TrendingUp, Users } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "AI Swing Analysis",
    description: "Instant feedback on 20+ key metrics using advanced computer vision models.",
    icon: <Camera className="w-5 h-5" />,
  },
  {
    title: "Personalized Drills",
    description: "Custom practice plans tailored specifically to your unique swing faults.",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    title: "Smart Strategy",
    description: "Data-driven course management advice based on your dispersion patterns.",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    title: "Progress Tracking",
    description: "Visualize improvement with beautiful, interactive charts and trend lines.",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "Virtual Competitions",
    description: "Challenge friends and the global community in virtual driving range games.",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    title: "Pro Comparisons",
    description: "Overlay your swing with top tour pros to identify key differences.",
    icon: <Users className="w-5 h-5" />,
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-golf-50 relative border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h3 className="text-xs font-bold text-golf-500 mb-3 uppercase tracking-widest font-mono">Features 2.0</h3>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-6">
            Everything you need to break 80
          </h2>
          <p className="text-subtle text-lg leading-relaxed">
            We've combined cutting-edge Gemini AI with biomechanics to create the most comprehensive coaching experience on mobile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 bg-white rounded-2xl border border-ink/5 shadow-card hover:border-golf-300 hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              {/* Fresh green stripe */}
              <div className="absolute top-0 left-0 w-full h-1 bg-golf-100 opacity-0 group-hover:opacity-100 group-hover:bg-golf-300 transition-all"></div>
              
              {/* Lighter Icon Background: bg-golf-100 */}
              <div className="w-12 h-12 rounded-xl bg-golf-100 border border-golf-200 shadow-sm flex items-center justify-center text-golf-700 mb-6 group-hover:bg-golf-500 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              
              <h4 className="text-xl font-bold text-ink mb-3">{feature.title}</h4>
              <p className="text-subtle leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};