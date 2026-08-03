import React from 'react';
import { getPath } from '../utils/paths';

const DISCORD_URL = 'https://discord.gg/9mEKxpWuDR';

export const CommunitySection: React.FC = () => {
  const discordImageUrl = getPath('assets/discord_community.png');

  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">

          {/* Left: Copy */}
          <div className="relative z-10 order-1 pb-10 lg:pb-0 max-w-xl">
            <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
              Rooted in Community
            </p>
            <h2
              className="tracking-tight text-ink leading-[1.08] mb-4 font-display font-extrabold"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              More about <span className="text-brand">our Discord community.</span>
            </h2>
            <p className="text-base text-subtle mb-8 leading-relaxed max-w-[48ch]">
              This is where your passion for the game is matched by hundreds of fellow golfers and coaches. Receive feedback 24/7 and get alerted of the latest SneakySwing updates!
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
            >
              Join the Discord
              <svg className="ml-2 w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Right: Discord screenshot */}
          <div className="relative order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-xl bg-green-dark" style={{ aspectRatio: '16/9' }}>
              <img
                src={discordImageUrl}
                alt="Sneaky Academy Discord community"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/10 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
