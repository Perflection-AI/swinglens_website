import React from 'react';
import { StoreLink } from './StoreLink';

// Invite landing — reached ONLY by users without the app installed.
// (Installed users are intercepted by iOS Universal Link and never hit this page.)
//
// Design choice: identical for everyone. No per-code content, no header sniffing,
// no backend call. The <code> in the URL exists only so iOS can match the Universal
// Link path; on the web we ignore it and just show a download page.
// Validation of the code happens later, in-app, via the existing bindByFixedCode API.
//
// See docs/Franklin_doc/0726_Invite_Sharing.html §C (Website track).

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

export const InviteLanding: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(160deg,#F8FAF5 0%,#E8F3D8 100%)' }}
    >
      <img
        src="/assets/sneakyswing.png"
        alt="SneakySwing"
        className="w-20 h-20 rounded-2xl mb-6 shadow-soft-lg"
        style={{ objectFit: 'contain' }}
      />

      <h1
        className="font-bold tracking-tight mb-3"
        style={{ fontSize: '28px', color: '#111A05' }}
      >
        You&apos;ve been invited to SneakySwing
      </h1>

      <p className="max-w-md mb-8" style={{ fontSize: '15px', color: '#4E4E4E', lineHeight: 1.6 }}>
        Your coach is waiting. Download the app, open this link again from your phone camera,
        and you&apos;ll be paired up in one tap.
      </p>

      <StoreLink
        href={APP_STORE_URL}
        className="inline-flex items-center gap-2 font-semibold text-white rounded-xl transition hover:brightness-110"
        style={{
          background: '#719241',
          padding: '14px 28px',
          fontSize: '15px',
          letterSpacing: '.02em',
          boxShadow: '0 8px 24px -8px rgba(113,146,65,0.6)',
        }}
      >
        Download on the App Store
      </StoreLink>

      <p className="mt-10" style={{ fontSize: '12px', color: '#828282' }}>
        Already installed? Open it from your home screen.
      </p>
    </div>
  );
};
