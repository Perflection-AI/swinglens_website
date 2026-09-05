import React, { useEffect, useState } from 'react';
import { StoreLink } from './StoreLink';

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
// unauthenticated by design and returns the coach's text plus short-lived presigned
// URLs for the feedback clip. The clip is two files — screen_recording.mp4 has NO audio
// track, the coach's voice lives in audio.m4a — so playback drives a muted <video> and a
// hidden <audio> in lockstep (the browser-side twin of the app's FeedbackPlaybackComposer).
// Any failure (bad token, revoked, deleted feedback) is a single generic "not found"
// state — the backend deliberately does not distinguish reasons.
//
// Local/dev override: append ?api=http://192.168.1.107:7891 to hit a local backend.

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';
const DEFAULT_API_BASE = 'https://api.perflection.site';

interface PublicFeedback {
  title: string | null;
  note4student: string | null;
  status: string | null;
  coachName: string | null;
  createdAt: number | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
}

/**
 * Plays the feedback clip: a muted <video> (no audio track of its own) kept in lockstep
 * with a hidden <audio> carrying the coach's voice.
 *
 * The video element owns the UI — its native controls drive play/pause, seeking and
 * volume, and the audio element only follows. Drift beyond DRIFT_TOLERANCE is corrected
 * on timeupdate; smaller gaps are left alone so we never stutter the audio.
 */
const DRIFT_TOLERANCE = 0.25; // seconds

const FeedbackClipPlayer: React.FC<{
  videoUrl: string;
  audioUrl: string | null;
  poster: string | null;
}> = ({ videoUrl, audioUrl, poster }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const syncTime = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;
    if (Math.abs(audio.currentTime - video.currentTime) > DRIFT_TOLERANCE) {
      audio.currentTime = video.currentTime;
    }
  };

  return (
    <div className="w-full max-w-sm mb-8">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster ?? undefined}
        controls
        playsInline
        muted
        preload="metadata"
        className="w-full rounded-3xl shadow-lg bg-black"
        style={{ maxHeight: '520px' }}
        onPlay={() => {
          syncTime();
          // Autoplay policies can still reject this; the video keeps playing silently
          // rather than the whole player dying on an unhandled rejection.
          audioRef.current?.play().catch(() => undefined);
        }}
        onPause={() => audioRef.current?.pause()}
        onSeeked={syncTime}
        onTimeUpdate={syncTime}
        onRateChange={() => {
          const video = videoRef.current;
          if (video && audioRef.current) audioRef.current.playbackRate = video.playbackRate;
        }}
        onVolumeChange={() => {
          // The video carries no sound, so its volume slider has to steer the audio track.
          const video = videoRef.current;
          if (video && audioRef.current) audioRef.current.volume = video.muted ? 0 : video.volume;
        }}
      />
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
    </div>
  );
};

type LoadState =
  | { phase: 'loading' }
  | { phase: 'ready'; feedback: PublicFeedback }
  | { phase: 'notFound' };

const extractToken = (): string | null => {
  const match = window.location.pathname.match(/\/f\/([A-Za-z0-9]{8,64})/);
  return match ? match[1] : null;
};

const apiBase = (): string => {
  const override = new URLSearchParams(window.location.search).get('api');
  return (override || DEFAULT_API_BASE).replace(/\/+$/, '');
};

export const FeedbackLanding: React.FC = () => {
  const [state, setState] = useState<LoadState>({ phase: 'loading' });

  useEffect(() => {
    const token = extractToken();
    if (!token) {
      setState({ phase: 'notFound' });
      return;
    }
    fetch(`${apiBase()}/api/public/feedback/${token}`)
      .then((res) => res.json())
      .then((body) => {
        if (body && body.code === 200 && body.data) {
          setState({ phase: 'ready', feedback: body.data as PublicFeedback });
        } else {
          setState({ phase: 'notFound' });
        }
      })
      .catch(() => setState({ phase: 'notFound' }));
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
        <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase mb-8">
          Coach Feedback · SneakySwing
        </p>

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
            {state.feedback.videoUrl ? (
              <FeedbackClipPlayer
                videoUrl={state.feedback.videoUrl}
                audioUrl={state.feedback.audioUrl}
                poster={state.feedback.thumbnailUrl}
              />
            ) : (
              state.feedback.thumbnailUrl && (
                <img
                  src={state.feedback.thumbnailUrl}
                  alt="Swing"
                  className="w-full max-w-sm rounded-3xl shadow-lg mb-8 object-cover"
                  style={{ maxHeight: '420px' }}
                  onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                />
              )
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
                  <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line mb-6 text-left w-full">
                    {state.feedback.note4student}
                  </p>
                )}
              </>
            )}

            <p className="text-sm text-gray-400 mb-12">
              {state.feedback.coachName ? `— Coach ${state.feedback.coachName}` : '— Your coach'}
              {state.feedback.createdAt
                ? ` · ${new Date(state.feedback.createdAt).toLocaleDateString()}`
                : ''}
            </p>

            <div className="flex flex-col items-center gap-4">
              {/* Universal Link: same URL — if the app is installed iOS opens it natively.
                  As an in-page button it re-navigates, which re-triggers the UL check. */}
              <a
                href={window.location.href.split('?')[0]}
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
                Watch the full video feedback with your coach's voice-over inside the app.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
