import React, { useEffect, useState } from 'react';
import { envQuery, fetchShared, linkEnv, PublicFeedback } from '../utils/shareApi';

/** An email preview never redeems a login token or accepts a coaching relationship. */

/** One shared item, resolved from its own read-only token. */
type Card = { token: string; item: PublicFeedback };

/**
 * The invitation's content preview.
 *
 * The invitation URL carries a dot-joined list of share tokens — the same `/f/{token}` links a
 * coach hands out by hand, so this page shows exactly what that page shows: a still, a title and
 * the first ten characters of the note. Never a playback URL: the invite token in the same URL is
 * a credential, this list deliberately is not, and the clip stays behind the app.
 */
const previewTokens = (): string[] =>
  (new URLSearchParams(window.location.search).get('preview') ?? '')
    .split('.')
    .filter((token) => /^[a-f0-9]{32}$/i.test(token))
    .slice(0, 8);

const PreviewCard: React.FC<Card> = ({ token, item }) => (
  <a
    href={`/f/${token}${envQuery()}`}
    className="block rounded-2xl overflow-hidden bg-white shadow-md text-left"
  >
    {item.thumbnailUrl ? (
      <img
        src={item.thumbnailUrl}
        alt=""
        className="w-full object-cover"
        style={{ aspectRatio: '4 / 3' }}
        onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
      />
    ) : (
      <div className="w-full bg-emerald-50" style={{ aspectRatio: '4 / 3' }} />
    )}
    <div className="p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {item.videoId ? 'Video' : 'Feedback'}
      </p>
      <p className="font-semibold text-gray-900 leading-snug">
        {item.title ?? (item.videoId ? 'A video from your coach' : 'Your coach recorded feedback')}
      </p>
      {item.note4student && <p className="text-sm text-gray-500">{item.note4student}</p>}
    </div>
  </a>
);

export const StudentInviteLanding: React.FC = () => {
  const id = window.location.pathname.split('/').filter(Boolean)[1] ?? '';
  const params = new URLSearchParams(window.location.search);
  const revision = params.get('revision') ?? '';
  const token = params.get('token');
  // Display only: the name comes from the email link, never used for identity.
  const coach = params.get('coach')?.trim().slice(0, 60);
  const valid = /^[1-9][0-9]*$/.test(id) && /^[1-9][0-9]*$/.test(revision)
    && (token === null || /^[a-f0-9]{32}$/i.test(token));
  const query = new URLSearchParams({ revision });
  if (token) query.set('token', token);
  const appLink = `swinglens://student-invite/${id}?${query}`;

  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    const tokens = previewTokens();
    if (!tokens.length) return;
    // A card that cannot be resolved (revoked, deleted, offline) is simply left out.
    Promise.all(tokens.map((t) => fetchShared(t).then((item) => (item ? { token: t, item } : null))))
      .then((resolved) => setCards(resolved.filter((card): card is Card => card !== null)));
  }, []);

  return <main className="min-h-screen bg-paper flex items-center justify-center p-6">
    <section className="max-w-md text-center space-y-6">
      <h1 className="text-3xl font-bold">{coach ? `Coach ${coach} invited you` : 'Your coach invitation'}</h1>
      {/* A non-prod link looks exactly like a real one — say so before anything else. */}
      {linkEnv() !== 'prod' && <p className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-100 text-amber-800">
        {linkEnv() === 'test' ? 'Test environment' : 'Non-production link'}
      </p>}
      <p>{valid ? 'Open the app, then choose whether to accept or decline your coach’s invitation.' : 'This invitation link is incomplete. Sign in to the app and open Coach invitations.'}</p>
      {cards.length > 0 && <div className="space-y-4">
        <p className="text-sm text-gray-500">{coach ? `Coach ${coach} has` : 'Your coach has'} already put {cards.length === 1 ? 'this' : `these ${cards.length}`} aside for you:</p>
        <div className="grid grid-cols-2 gap-3">{cards.map((card) => <PreviewCard key={card.token} {...card} />)}</div>
        <p className="text-sm text-gray-500">Accept in the app to watch them.</p>
      </div>}
      {valid && <a className="block rounded-xl bg-emerald-700 p-4 text-white" href={appLink}>Review in the app</a>}
      <p>Signing in does not accept the invitation. You can also sign in normally or register with the invited email, then open Coach invitations.</p>
      <a className="block underline" href="https://apps.apple.com/app/id6754829630" referrerPolicy="no-referrer">Download on the App Store</a>
    </section>
  </main>;
};
