import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Reveal } from './Reveal';

const env = import.meta.env as Record<string, string | undefined>;

// Stripe Payment Links are public checkout URLs. Keep them here so the
// contact page works even when deploy-time env vars are not configured.
const STRIPE_PAYMENT_LINKS = {
  quickQuestion: 'https://buy.stripe.com/9B628saN09oE1GU6363VC04',
  teamCoffee: 'https://buy.stripe.com/00wbJ2dZcasI5XaezC3VC05',
  strategyRoom: 'https://buy.stripe.com/cNieVeaN0gR6fxKdvy3VC06',
};

type ChatTier = {
  id: string;
  name: string;
  price: string;
  duration: string;
  fit: string;
  value: string;
  paymentUrl?: string;
  featured?: boolean;
};

const chatTiers: ChatTier[] = [
  {
    id: 'quick-question',
    name: 'Quick Question',
    price: '$5',
    duration: 'Async reply',
    fit: 'For one focused question',
    value: 'Send a question about SneakySwing, AI coaching, golf improvement, or the team story.',
    paymentUrl: env.VITE_STRIPE_DIRECT_QUICK_QUESTION_URL || STRIPE_PAYMENT_LINKS.quickQuestion,
  },
  {
    id: 'product-coffee',
    name: 'Team Coffee',
    price: '$20',
    duration: '20-minute call',
    fit: 'For users and coaches',
    value: 'Talk through the product, a golf-improvement question, or how coaching workflows could use SneakySwing.',
    paymentUrl: env.VITE_STRIPE_DIRECT_TEAM_COFFEE_URL || STRIPE_PAYMENT_LINKS.teamCoffee,
    featured: true,
  },
  {
    id: 'strategy-room',
    name: 'Strategy Room',
    price: '$50',
    duration: '60-minute session',
    fit: 'For deeper business context',
    value: 'Use the time for coach fit, partnerships, sports-tech strategy, GTM feedback, or academy planning.',
    paymentUrl: env.VITE_STRIPE_DIRECT_STRATEGY_URL || STRIPE_PAYMENT_LINKS.strategyRoom,
  },
];

const fallbackHref = (tier: ChatTier) => {
  const subject = encodeURIComponent(`Direct access request: ${tier.name}`);
  const body = encodeURIComponent(
    `Hi Sneaky Academy team,\n\nI want to book the ${tier.name} (${tier.price}) option. Please send me the payment link and scheduling details.\n\nMy preferred times are:\n`
  );
  return `mailto:operation@perflection.ai?subject=${subject}&body=${body}`;
};

const getTierHref = (tier: ChatTier) => tier.paymentUrl || fallbackHref(tier);

const getCtaLabel = (tier: ChatTier) => {
  if (tier.id === 'quick-question') return 'Send question';
  if (tier.id === 'strategy-room') return 'Book 60 min';
  return 'Book 20 min';
};

interface DirectAccessSectionProps {
  compact?: boolean;
  context?: 'contact' | 'standalone';
}

export const DirectAccessSection: React.FC<DirectAccessSectionProps> = ({
  compact = false,
  context = 'standalone',
}) => {
  const intro =
    context === 'contact'
      ? 'The form above is for waitlists, coach verification, and general inbound. Pick one of these when you want a direct reply or scheduled time.'
      : 'Pick one option when you want a direct reply or scheduled time with the Sneaky Academy team.';

  return (
    <section id="direct-access" className={`${compact ? 'py-6 sm:py-8' : 'py-12 sm:py-14'} bg-paper border-t border-ink/[0.07]`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
            <div>
              <p className="text-green text-[10px] font-bold uppercase tracking-[0.18em] mb-2">Direct access</p>
              <h2
                className="font-display font-extrabold text-ink leading-[1.08]"
                style={{ fontSize: compact ? 'clamp(1.25rem, 1.8vw, 1.6rem)' : 'clamp(1.4rem, 2.2vw, 2rem)' }}
              >
                Need a direct answer?
              </h2>
            </div>
            <p className="text-subtle text-sm leading-[1.6] max-w-[48ch]">{intro}</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-3">
          {chatTiers.map((tier, index) => {
            const hasPaymentLink = Boolean(tier.paymentUrl);

            return (
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

                  <a
                    href={getTierHref(tier)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      hasPaymentLink
                        ? 'bg-green text-white shadow-card hover:brightness-110'
                        : 'bg-white text-green border border-green/25 hover:border-green/40'
                    }`}
                  >
                    {hasPaymentLink ? getCtaLabel(tier) : 'Request link'}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
