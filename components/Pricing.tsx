import React from 'react';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-paper border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-subtle">Start for free, upgrade when you're ready to master the game.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {/* Free Tier */}
          <div className="bg-white p-8 rounded-2xl border border-ink/10 shadow-card relative">
            <h3 className="text-xl font-bold font-display text-ink mb-2">Caddy</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold font-mono text-ink tracking-tight">$0</span>
              <span className="text-subtle font-mono text-sm">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-subtle text-sm font-medium"><Check className="w-5 h-5 text-golf-400 flex-shrink-0" /> Basic Swing Analysis</li>
              <li className="flex items-center gap-3 text-subtle text-sm font-medium"><Check className="w-5 h-5 text-golf-400 flex-shrink-0" /> 3 AI Tips per day</li>
              <li className="flex items-center gap-3 text-subtle text-sm font-medium"><Check className="w-5 h-5 text-golf-400 flex-shrink-0" /> Score Tracking</li>
            </ul>
            <button className="w-full py-3 px-4 rounded-xl border border-ink/10 text-ink font-semibold hover:bg-golf-50 transition-colors">Get Started</button>
          </div>

          {/* Pro Tier - Highlighted with Lighter Green */}
          <div className="bg-white p-8 rounded-2xl border-2 border-golf-300 shadow-soft-xl relative transform scale-105 z-10">
            {/* Removed shadow-lit here */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ink text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/20 font-mono tracking-widest uppercase">
              Most Popular
            </div>
            <h3 className="text-xl font-bold font-display text-ink mb-2">Tour Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold font-mono text-ink tracking-tight">$19</span>
              <span className="text-subtle font-mono text-sm">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              {/* Lighter Green Checks: bg-golf-100 */}
              <li className="flex items-center gap-3 text-ink text-sm font-bold"><div className="bg-golf-100 p-0.5 rounded-full"><Check className="w-4 h-4 text-golf-600" /></div> Unlimited AI Analysis</li>
              <li className="flex items-center gap-3 text-ink text-sm font-bold"><div className="bg-golf-100 p-0.5 rounded-full"><Check className="w-4 h-4 text-golf-600" /></div> Video Comparison</li>
              <li className="flex items-center gap-3 text-ink text-sm font-bold"><div className="bg-golf-100 p-0.5 rounded-full"><Check className="w-4 h-4 text-golf-600" /></div> Custom Drill Plans</li>
              <li className="flex items-center gap-3 text-ink text-sm font-bold"><div className="bg-golf-100 p-0.5 rounded-full"><Check className="w-4 h-4 text-golf-600" /></div> Priority Support</li>
            </ul>
            <button className="w-full py-3 px-4 rounded-xl bg-golf-500 text-white font-semibold hover:bg-golf-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">Start 7-Day Free Trial</button>
          </div>

          {/* Team Tier */}
          <div className="bg-white p-8 rounded-2xl border border-ink/10 shadow-card relative">
            <h3 className="text-xl font-bold font-display text-ink mb-2">Coach</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold font-mono text-ink tracking-tight">$99</span>
              <span className="text-subtle font-mono text-sm">/mo</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-subtle text-sm font-medium"><Check className="w-5 h-5 text-golf-400 flex-shrink-0" /> Manage 20+ Students</li>
              <li className="flex items-center gap-3 text-subtle text-sm font-medium"><Check className="w-5 h-5 text-golf-400 flex-shrink-0" /> White-label Reports</li>
              <li className="flex items-center gap-3 text-subtle text-sm font-medium"><Check className="w-5 h-5 text-golf-400 flex-shrink-0" /> Team Analytics</li>
            </ul>
            <button className="w-full py-3 px-4 rounded-xl border border-ink/10 text-ink font-semibold hover:bg-golf-50 transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};