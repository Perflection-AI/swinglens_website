import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { VisibleDotOrbit } from './VisibleDotOrbit';
import { Header } from './Header';
import { Footer } from './Footer';

const SERVICE_ID = 'service_3y7cn3d';
const PUBLIC_KEY = 'OgBxaFwDtbJUZI0X8';
const COACH_TEMPLATE_ID = 'template_klipzj1';

const fields = [
  {
    id: 'name',
    num: '01',
    label: 'What name should we use on your coach profile, and what academy or business do you coach under (if any)?',
    placeholder: 'e.g. John Smith · Pinehurst Golf Academy',
  },
  {
    id: 'link',
    num: '02',
    label: 'Please share one link that shows you actively coach.',
    placeholder: 'https://instagram.com/yourhandle  or  your website URL',
  },
  {
    id: 'location',
    num: '03',
    label: 'What city and state are you based in, and where do you typically coach (facility name or "multiple locations")?',
    placeholder: 'e.g. Austin, TX · Barton Creek Country Club',
  },
  {
    id: 'credentials',
    num: '04',
    label: 'Do you hold any credentials (PGA, LPGA, USGTF, TPI, etc.)? If yes, please list the credential and add a link or membership number if you have it.',
    placeholder: 'e.g. PGA Member #12345 · TPI Level 2  — or type "None"',
  },
];

type Values = { name: string; link: string; location: string; credentials: string };
type Status = 'idle' | 'sending' | 'success' | 'error';

export const CoachApplyPage: React.FC = () => {
  const [values, setValues] = useState<Values>({ name: '', link: '', location: '', credentials: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'Join as a Coach | SneakySwing';
  }, []);

  const allFilled = Object.values(values).every(v => v.trim().length > 0);

  const handleChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      emailjs.init(PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, COACH_TEMPLATE_ID, {
        coach_name: values.name,
        coaching_link: values.link,
        location: values.location,
        credentials: values.credentials,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>

        {/* ── Header card ── DotOrbit */}
        <section className="py-6 sm:py-8 bg-paper">
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
              <div className="relative z-10 px-8 sm:px-12 py-12 sm:py-16">
                <p className="text-green-light/70 text-[10px] font-bold uppercase tracking-[0.25em] mb-5">
                  Join as a Coach
                </p>
                <h1
                  className="font-display font-extrabold text-white leading-[1.06] mb-4"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
                >
                  Verify your coaching profile.
                </h1>
                <p className="text-white/65 text-sm leading-[1.75] max-w-[52ch]">
                  Answer four quick questions. We'll review your application and activate your coach account within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Form ── */}
        <section className="pb-20 sm:pb-28">
          <div className="mx-auto px-4 sm:px-6 max-w-[860px]">

            {status === 'success' ? (
              <div className="rounded-[1.5rem] border border-green/25 bg-green-light/30 px-8 sm:px-12 py-14 text-center">
                <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Application sent</p>
                <p
                  className="font-display font-bold text-ink leading-tight mb-3"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                >
                  We'll be in touch within 24 hours.
                </p>
                <p className="text-subtle text-sm leading-[1.7] max-w-[42ch] mx-auto">
                  Your verification was sent to support@perflection.ai. Check your email for next steps once we review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                {fields.map(({ id, num, label, placeholder }) => (
                  <div
                    key={id}
                    className="rounded-2xl border border-ink/[0.09] bg-white/60 px-7 sm:px-9 py-7 transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_rgba(113,146,65,0.25)]"
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className="font-display font-extrabold text-ink/20 leading-none flex-shrink-0 mt-0.5"
                        style={{ fontSize: '1.75rem' }}
                      >
                        {num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={id}
                          className="block text-ink text-sm font-medium leading-[1.6] mb-3"
                        >
                          {label}
                        </label>
                        <input
                          id={id}
                          type="text"
                          value={values[id as keyof Values]}
                          onChange={e => handleChange(id, e.target.value)}
                          placeholder={placeholder}
                          required
                          disabled={status === 'sending'}
                          className="w-full text-sm text-ink placeholder:text-ink/30 bg-transparent border-b border-ink/[0.12] pb-1.5 outline-none focus:border-green transition-colors duration-200 disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {status === 'error' && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-5 py-4">
                    Something went wrong. Please try again or email us directly at support@perflection.ai.
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    type="submit"
                    disabled={!allFilled || status === 'sending'}
                    className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
                  >
                    {status === 'sending' ? 'Sending…' : 'Submit application'}
                    {status !== 'sending' && (
                      <span className="w-[16px] h-[16px] rounded-[3px] bg-white/20 inline-grid place-items-center text-sm leading-none">›</span>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
