import React, { useEffect } from 'react';

/** Never exchanges or consumes the token in the browser: the installed app owns login. */
export const CoachLoginLanding: React.FC = () => {
  const token = window.location.pathname.split('/').filter(Boolean)[1] ?? '';
  const valid = /^[a-f0-9]{32}$/i.test(token);
  const appLink = `swinglens://login/${encodeURIComponent(token)}${window.location.search}`;
  useEffect(() => {
    if (valid && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
      window.location.href = appLink;
    }
  }, [valid, appLink]);
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-6">
      <section className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold">Your coach account</h1>
        <p>{valid ? 'Open the app to sign in with your one-use login link.' : 'This login link is incomplete. Use the full link from your account email.'}</p>
        {valid && <a className="block rounded-xl bg-emerald-700 p-4 text-white" href={appLink}>Open SneakySwing</a>}
        <a className="block underline" href="https://apps.apple.com/app/id6754829630">Download on the App Store</a>
        <p>After installing, sign in as a coach with your email and the initial password in your account email. You can also return to that email and open the login link again.</p>
      </section>
    </main>
  );
};
