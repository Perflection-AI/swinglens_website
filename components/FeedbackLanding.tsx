import React, { useEffect, useState } from 'react';
import { StoreLink } from './StoreLink';
import { fetchShared, linkEnv, PublicFeedback } from '../utils/shareApi';

// Feedback share landing — /f/{token} (0905 "Feedback Web Share Landing").
//
// A coach shares a feedback link (Instagram bio/DM, email, iMessage). The student
// opens it here, reads the coach's note, and is funneled into the app:
//  - installed → the "Open in SneakySwing" button fires the Universal Link
//    (path is registered in apple-app-site-association as /f/*, mirroring /invite/*)
//  - not installed → App Store badge.
//
// Data comes from the backend public endpoint GET {api}/api/public/feedback/{token}.
// The token is an unguessable 32-hex credential minted per feedback; the endpoint is
// unauthenticated by design. Since 0920 it returns a still, a title and the first ten
// characters of the coach's note — never a playback URL. Anyone holding the link holds the
// content, so the clip itself stays behind the app's authenticated read.
// Any failure (bad token, revoked, deleted feedback) is a single generic "not found"
// state — the backend deliberately does not distinguish reasons.
//
// Local/dev override: append ?api=http://192.168.1.107:7891 to hit a local backend.

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

type LoadState =
  | { phase: 'loading' }
  | { phase: 'ready'; feedback: PublicFeedback }
  | { phase: 'notFound' };

const extractToken = (): string | null => {
  const match = window.location.pathname.match(/\/f\/([A-Za-z0-9]{8,64})/);
  return match ? match[1] : null;
};

const isIOS = (): boolean =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  // iPadOS 13+ reports itself as a Mac; the touch points give it away.
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

/** Where "Open in SneakySwing" should point. See the comment at the button. */
const openInAppHref = (): string => {
  const token = extractToken();
  if (!isIOS() || !token) return window.location.href;
  // Carry the environment across into the app. Without it the app would look this token up on
  // whatever backend it happens to be pointed at, and a test link opened by a prod build would
  // read as "feedback not found" instead of "this is a test link".
  const env = linkEnv();
  const suffix = env === 'prod' ? '' : `?env=${encodeURIComponent(env)}`;
  return `swinglens://f/${token}${suffix}`;
};

export const FeedbackLanding: React.FC = () => {
  const [state, setState] = useState<LoadState>({ phase: 'loading' });

  useEffect(() => {
    const token = extractToken();
    if (!token) {
      setState({ phase: 'notFound' });
      return;
    }
    fetchShared(token).then((feedback) =>
      setState(feedback ? { phase: 'ready', feedback } : { phase: 'notFound' })
    );
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center px-6 py-12"
      style={{ background: 'linear-gradient(160deg,#F8FAF5 0%,#E8F3D8 100%)' }}
    >
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        <img
          src="/assets/sneakyswing.png"
          alt="SneakySwing"
          className="w-14 h-14 rounded-2xl mb-3"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
        <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase mb-3">
          {state.phase === 'ready' && state.feedback.videoId ? 'Coach Video' : 'Coach Feedback'} · SneakySwing
        </p>

        {/* A non-prod link renders identically to a real one, which is how a test link ends up
            being sent to a real student. Say so, once, above the fold. */}
        {linkEnv() !== 'prod' && (
          <p className="mb-6 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-100 text-amber-800">
            {linkEnv() === 'test' ? 'Test environment' : 'Non-production link'}
          </p>
        )}

        <div className="mb-5" />

        {state.phase === 'loading' && (
          <p className="text-gray-500 animate-pulse">Loading your coach's feedback…</p>
        )}

        {state.phase === 'notFound' && (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">This link isn't available</h1>
            <p className="text-gray-500 mb-10">
              The feedback may have been removed, or the link is incorrect.
              Ask your coach to share it again.
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
          </div>
        )}

        {state.phase === 'ready' && (
          <div className="w-full flex flex-col items-center">
            {/* A still, never a player: the clip is what the app is for. */}
            {state.feedback.thumbnailUrl && (
              <img
                src={state.feedback.thumbnailUrl}
                alt="Swing"
                className="w-full max-w-sm rounded-3xl shadow-lg mb-8 object-cover"
                style={{ maxHeight: '420px' }}
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
              />
            )}

            {state.feedback.status === 'processing' ? (
              <p className="text-gray-500 mb-8">
                Your coach's feedback is still being prepared. Check back in a minute.
              </p>
            ) : (
              <>
                {state.feedback.title && (
                  <h1 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
                    ⛳️ {state.feedback.title}
                  </h1>
                )}
                {state.feedback.note4student && (
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-2 text-left w-full">
                    {state.feedback.note4student}
                  </p>
                )}
                <p className="text-sm text-gray-500 mb-6 text-left w-full">
                  Open the app to read the rest and watch the clip.
                </p>
              </>
            )}

            <p className="text-sm text-gray-400 mb-12">
              {state.feedback.coachName ? `— Coach ${state.feedback.coachName}` : '— Your coach'}
              {state.feedback.createdAt
                ? ` · ${new Date(state.feedback.createdAt).toLocaleDateString()}`
                : ''}
            </p>

            {state.feedback.coachInviteCode && (
              <p className="text-sm text-gray-700 mb-6">
                After installing, enter invite code <strong>{state.feedback.coachInviteCode}</strong> on the Coach page to connect.
              </p>
            )}
            <div className="flex flex-col items-center gap-4">
              {/* On iOS the custom scheme is what actually opens the app: a Universal Link
                  does NOT fire when it points at the page the user is already on, so the old
                  same-URL <a> just reloaded. Everywhere else (desktop, Android) there is no app
                  to open, so keep the https URL — and keep the query string with it, otherwise
                  a non-prod ?api= override is dropped and the reload asks prod for a token
                  that only exists on test. */}
              <a
                href={openInAppHref()}
                className="px-8 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md"
              >
                Open in SneakySwing
              </a>
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
              <p className="text-xs text-gray-400 max-w-xs">
                {state.feedback.videoId
                  ? 'Play this video, and everything else from your coach, inside the app.'
                  : "Watch the full video feedback with your coach's voice-over inside the app."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
