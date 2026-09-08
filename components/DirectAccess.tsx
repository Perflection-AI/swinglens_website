import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from './Reveal';

const env = import.meta.env as Record<string, string | undefined>;

type DirectAccessTier = {
  id: string;
  name: string;
  price: string;
  duration: string;
  fit: string;
  value: string;
  paymentUrl: string | undefined;
  featured?: boolean;
};

const getPaymentUrl = (key: string) => {
  const url = env[key]?.trim();
  return url || undefined;
};

// Payment Links are public checkout URLs, but Vite env vars are still the
// source of truth so stale checkout links are not duplicated in source.
const directAccessTiers: DirectAccessTier[] = [
  {
    id: 'quick-question',
    name: 'Quick Question',
    price: '$5',
    duration: 'Async reply',
    fit: 'For one focused question',
    value: 'Send a question about SneakySwing, AI coaching, golf improvement, or the team story.',
    paymentUrl: getPaymentUrl('VITE_STRIPE_DIRECT_QUICK_QUESTION_URL'),
  },
  {
    id: 'team-coffee',
    name: 'Team Coffee',
    price: '$20',
    duration: '20-minute call',
    fit: 'For users and coaches',
    value: 'Talk through the product, a golf-improvement question, or how coaching workflows could use SneakySwing.',
    paymentUrl: getPaymentUrl('VITE_STRIPE_DIRECT_TEAM_COFFEE_URL'),
    featured: true,
  },
  {
    id: 'strategy-room',
    name: 'Strategy Room',
    price: '$50',
    duration: '60-minute session',
    fit: 'For deeper business context',
    value: 'Use the time for coach fit, partnerships, sports-tech strategy, GTM feedback, or academy planning.',
    paymentUrl: getPaymentUrl('VITE_STRIPE_DIRECT_STRATEGY_URL'),
  },
];

export const DirectAccessSection: React.FC = () => {
  return (
    <section id="direct-access" className="py-6 sm:py-8 bg-paper border-t border-ink/[0.07]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
            <div>
              <p className="text-green text-[10px] font-bold uppercase tracking-[0.18em] mb-2">Direct access</p>
              <h2
                className="font-display font-extrabold text-ink leading-[1.08]"
                style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)' }}
              >
                Need a direct answer?
              </h2>
            </div>
            <p className="text-subtle text-sm leading-[1.6] max-w-[48ch]">
              The form above is for waitlists, coach verification, and general inbound. Pick one of these when you want a direct reply or team time.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-3">
          {directAccessTiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 60}>
              <article
                className={`h-full flex flex-col rounded-2xl border p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg ${
                  tier.featured
                    ? 'border-green/20 bg-green-light/45'
                    : 'border-ink/[0.08] bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-ink text-base leading-tight mb-1">{tier.name}</h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle">
                      <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
                      {tier.duration}
                    </div>
                  </div>
                  <p className="font-display font-extrabold text-ink text-2xl leading-none">{tier.price}</p>
                </div>

                <p className="text-green text-xs font-bold leading-tight mb-2">{tier.fit}</p>
                <p className="text-subtle text-sm leading-[1.55] mb-4">{tier.value}</p>

                {tier.paymentUrl ? (
                  <a
                    href={tier.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-green text-white shadow-card transition-all duration-200 hover:brightness-110"
                  >
                    Continue to checkout
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="mt-auto inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold bg-ink/[0.06] text-subtle"
                  >
                    Checkout unavailable
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
