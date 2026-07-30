import React, { useEffect, useState } from 'react';

// Invite landing — reached ONLY by users without the app installed.
// (Installed users are intercepted by iOS Universal Link and never hit this page.)
//
// Design choice: identical for everyone. No per-code content, no header sniffing,
// no backend call. The <code> in the URL exists only so iOS can match the Universal
// Link path; on the web we ignore it and just show a download page.
// Validation of the code happens later, in-app, via the existing bindByFixedCode API.
//
// EXCEPTION: when the link is opened inside an in-app/social webview (WeChat,
// Instagram, Facebook, Line, QQ, ...), the host app suppresses Universal Links, so
// the user lands here and nothing happens. We can't break out of the webview from
// JS, so we surface a hint pointing at the host app's own top-right menu — the only
// reliable escape ("Open in Browser"). Desktop is never affected, so the hint is
// mobile in-app-browser only.
//
// See docs/Franklin_doc/0726_Invite_Sharing.html §C (Website track).

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

// User-agent signatures of in-app / social webviews that swallow Universal Links.
const IN_APP_BROWSER_RE =
  /MicroMessenger|FBAN|FBAV|Instagram|Line\/|QQ\/|QZone|WeiBo|Snapchat|linkedinapp|Twitter|Telegram|; wv\)/i;

export const InviteLanding: React.FC = () => {
  const [showInAppHint, setShowInAppHint] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    // Mobile-only by construction: these UAs are all phones/tablets in embedded webviews.
    setShowInAppHint(IN_APP_BROWSER_RE.test(navigator.userAgent));
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(160deg,#F8FAF5 0%,#E8F3D8 100%)' }}
    >
      {/* Fallback hint for in-app webviews where the Universal Link didn't fire.
          Points the user at the host app's top-right menu → "Open in Browser". */}
      {showInAppHint && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            top: '12px',
            right: '12px',
            maxWidth: '220px',
            zIndex: 50,
          }}
        >
          <div
            className="flex flex-col items-end"
            style={{ textAlign: 'right' }}
          >
            {/* Arrow pointing up-and-to-the-right, toward the host app's ⋯ menu button. */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#719241"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ marginBottom: '2px' }}
            >
              <path d="M7 17 L17 7" />
              <path d="M9 7 L17 7 L17 15" />
            </svg>
            <div
              className="rounded-xl"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(113,146,65,0.35)',
                boxShadow: '0 8px 24px -8px rgba(17,26,5,0.18)',
                padding: '10px 12px',
              }}
            >
              <div
                style={{ fontSize: '13px', fontWeight: 700, color: '#111A05', lineHeight: 1.25 }}
              >
                App didn&apos;t open?
              </div>
              <div style={{ fontSize: '12px', color: '#4E4E4E', lineHeight: 1.45, marginTop: '2px' }}>
                Tap <span style={{ fontWeight: 700 }}>⋯</span> at the top right, then{' '}
                <span style={{ fontWeight: 700 }}>&ldquo;Open in Browser&rdquo;</span>.
              </div>
            </div>
          </div>
        </div>
      )}

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

      <a
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
      </a>

      <p className="mt-10" style={{ fontSize: '12px', color: '#828282' }}>
        Already installed? Open it from your home screen.
      </p>
    </div>
  );
};
