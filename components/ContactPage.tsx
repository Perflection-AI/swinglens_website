import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Loader2, CheckCircle } from 'lucide-react';
import { VisibleDotOrbit } from './VisibleDotOrbit';
import { Header } from './Header';
import { Footer } from './Footer';

const SERVICE_ID = 'service_c592vbk';
const TEMPLATE_ID = 'template_sk1mr28'; // "Contact Us - Website" / "New contact request"
const PUBLIC_KEY = 'OgBxaFwDtbJUZI0X8';

const REASONS = [
  { value: 'android', label: 'Get on the waitlist for Android' },
  { value: 'coach', label: 'Getting verified and join as a coach' },
  { value: 'other', label: 'Other' },
] as const;

type Reason = typeof REASONS[number]['value'] | '';
type Status = 'idle' | 'sending' | 'success' | 'error';

export const ContactPage: React.FC = () => {
  const [reason, setReason] = useState<Reason>('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'Contact | Sneaky Academy';
  }, []);

  const reasonLabel = REASONS.find((r) => r.value === reason)?.label ?? '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !email || !email.includes('@')) return;

    setStatus('sending');

    try {
      emailjs.init(PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        reason: reasonLabel,
        email,
        message: message || '(no additional message)',
        reply_to: email,
      });
      setStatus('success');
      setReason('');
      setMessage('');
      setEmail('');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>

        {/* ── Hero card ── DotOrbit */}
        <section className="pt-32 sm:pt-28 pb-20 sm:pb-28 bg-paper">
          <div className="mx-auto px-3 sm:px-4 max-w-[860px]">
            <div className="relative rounded-[2rem] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <VisibleDotOrbit
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  colors={['#3d6b40']}
                  colorBack="#2d4a2a"
                  stepsPerColor={2}
                  size={0.18}
                  sizeRange={0}
                  spreading={0.35}
                  speed={1.5}
                  scale={0.55}
                />
              </div>
              <div className="relative z-10 px-8 sm:px-12 py-14 sm:py-20 text-center">
                <p className="text-green-light/70 text-[10px] font-bold uppercase tracking-[0.25em] mb-5">
                  Contact
                </p>
                <h1
                  className="font-display font-extrabold text-white leading-[1.06] mb-5"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
                >
                  Let's talk.
                </h1>
                <p className="text-white/70 text-sm sm:text-base leading-[1.75] max-w-[46ch] mx-auto mb-10">
                  Golfer or coach, we want to hear from you — especially coaches curious about running a free pilot, and golfers on Android waiting for us to get there.
                </p>

                {status === 'success' ? (
                  <div className="max-w-sm mx-auto">
                    <div className="w-14 h-14 bg-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-green" />
                    </div>
                    <p className="text-white font-display font-bold text-lg mb-1">You're on the list.</p>
                    <p className="text-white/60 text-sm">We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="max-w-sm mx-auto text-left">
                    <label htmlFor="reason" className="block text-white/50 text-xs font-medium mb-1.5">
                      What can we help with?
                    </label>
                    <select
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value as Reason)}
                      required
                      disabled={status === 'sending'}
                      className="w-full px-4 py-3 mb-4 text-sm rounded-lg bg-white/10 border border-white/15 text-white outline-none focus:border-green-light/50 transition-colors duration-200 disabled:opacity-50"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" disabled className="text-ink">Select a reason</option>
                      {REASONS.map(({ value, label }) => (
                        <option key={value} value={value} className="text-ink">{label}</option>
                      ))}
                    </select>

                    {reason === 'other' && (
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us a bit more..."
                        rows={3}
                        disabled={status === 'sending'}
                        className="w-full px-4 py-3 mb-4 text-sm rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-green-light/50 transition-colors duration-200 disabled:opacity-50 resize-none"
                      />
                    )}

                    <label htmlFor="email" className="block text-white/50 text-xs font-medium mb-1.5">
                      Your email
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        required
                        disabled={status === 'sending'}
                        className="flex-1 min-w-0 px-4 py-3 text-sm rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-green-light/50 transition-colors duration-200 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={status === 'sending' || !email || !reason}
                        className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
                      >
                        {status === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get in touch'}
                      </button>
                    </div>
                    {status === 'error' && (
                      <p className="text-red-300 text-xs mt-3">
                        Something went wrong. Try again, or email us directly at operation@perflection.ai.
                      </p>
                    )}
                    <p className="text-white/40 text-xs mt-4 text-center">
                      Rather send your own email? Reach us at{' '}
                      <a href="mailto:operation@perflection.ai" className="text-white/60 hover:text-white underline">
                        operation@perflection.ai
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
