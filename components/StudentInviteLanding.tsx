import React from 'react';

/** An email preview never redeems a login token or accepts a coaching relationship. */
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
  return <main className="min-h-screen bg-paper flex items-center justify-center p-6">
    <section className="max-w-md text-center space-y-6">
      <h1 className="text-3xl font-bold">{coach ? `Coach ${coach} invited you` : 'Your coach invitation'}</h1>
      <p>{valid ? 'Open the app, then choose whether to accept or decline your coach’s invitation.' : 'This invitation link is incomplete. Sign in to the app and open Coach invitations.'}</p>
      {valid && <a className="block rounded-xl bg-emerald-700 p-4 text-white" href={appLink}>Review in the app</a>}
      <p>Signing in does not accept the invitation. You can also sign in normally or register with the invited email, then open Coach invitations.</p>
      <a className="block underline" href="https://apps.apple.com/app/id6754829630" referrerPolicy="no-referrer">Download on the App Store</a>
    </section>
  </main>;
};
