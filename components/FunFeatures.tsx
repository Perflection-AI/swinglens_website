import React, { useEffect, useRef, useState } from 'react';
import { VisibleDotOrbit } from './VisibleDotOrbit';
import { getPath } from '../utils/paths';
import './Features.css';

const funFeatures = [
  {
    num: '01',
    title: 'Visualize',
    titleEm: 'Strengths & Weaknesses.',
    body: 'See a full visual breakdown of your swing mechanics — but brutally honest.',
    image: getPath('assets/features/visualize_strength.jpg'),
  },
  {
    num: '02',
    title: 'Chat with',
    titleEm: 'Sneakie.',
    body: "Sneaky Academy's resident golf AI. Ask it anything — swing tips, rules questions, or just to talk golf.",
    image: getPath('assets/features/chat_with_sneakie.jpg'),
  },
  {
    num: '03',
    title: 'Get',
    titleEm: 'Roasted.',
    body: 'Not feeling serious? Submit your swing and get roasted, no mercy. Golf humor, Sneaky Academy style.',
    image: getPath('assets/features/get_roasted.jpg'),
  },
  {
    num: '04',
    title: 'Get Golf',
    titleEm: 'MBTI.',
    body: 'Take the Golf Personality Test and find out exactly what kind of golfer you are.',
    image: getPath('assets/features/golf_mbti.jpg'),
    cta: { label: 'Get yours today', href: getPath('golfti') },
  },
];

const dotOrbitProps = {
  colors: ['#3d6b40'] as [string],
  colorBack: '#2d4a2a',
  stepsPerColor: 2,
  size: 0.18,
  sizeRange: 0,
  spreading: 0.35,
  speed: 1.5,
  scale: 0.55,
};

export const FunFeatures: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let rafId: number;

    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionHeight = el.offsetHeight;
      const viewH = window.innerHeight;
      const scrolled = -rect.top / (sectionHeight - viewH);
      const clamped = Math.max(0, Math.min(1, scrolled));
      const idx = Math.min(funFeatures.length - 1, Math.floor(clamped * funFeatures.length));
      setActive(idx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(compute);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    compute();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="fun-features" className="features-section bg-paper" ref={sectionRef}>

      {/* ── Desktop / tablet: scroll-driven sticky layout, mirrored (text left, phone right) ── */}
      <div className="features__sticky">
        <div className="features__outer">
          <div className="features__card">
            <div className="features__shader">
              <VisibleDotOrbit style={{ width: '100%', height: '100%', display: 'block' }} {...dotOrbitProps} />
            </div>

            <div className="features__layout">
              {/* Left: text */}
              <div className="features__text ml-6 lg:ml-10">
                <div className="features__head">
                  <p className="features__eyebrow">Just for Fun</p>
                  <h2 className="features__display">
                    A few reasons<br /><em>people love our app.</em>
                  </h2>
                  <p className="features__meta">
                    <span>Golf humor</span>
                    <span className="features__meta-dot" />
                    <span>AI chat</span>
                    <span className="features__meta-dot" />
                    <span>Personality test</span>
                  </p>
                </div>

                <div className="features__track-wrap">
                  <div className="features__line">
                    <div
                      className="features__line-fill"
                      style={{ transform: `scaleY(${(active + 1) / funFeatures.length})` }}
                    />
                  </div>
                  <div className="features__cards">
                    {funFeatures.map((f, i) => (
                      <div key={f.num} className={`fcard${i === active ? ' active' : ''}`}>
                        <p className="fcard__num">{f.num}</p>
                        <p className="fcard__title">{f.title} <em>{f.titleEm}</em></p>
                        <div className="fcard__body-outer">
                          <p className="fcard__body">{f.body}</p>
                          {f.cta && (
                            <a
                              href={f.cta.href}
                              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-light/10 text-green-light text-xs font-semibold border border-green-light/25 hover:bg-green-light/20 transition-colors duration-200"
                            >
                              {f.cta.label}
                              <span className="text-[10px]">→</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: phone mockup */}
              <div className="features__visual">
                <div className="phone">
                  <div className="phone__notch" />
                  <div className="phone__screen">
                    {funFeatures.map((f, i) => (
                      <img
                        key={f.num}
                        src={f.image}
                        alt={`${f.title} ${f.titleEm}`}
                        className={`phone__img${i === active ? ' active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: photo-editorial 2×2 grid ── */}
      <div className="fm-wrap">
        <div className="fm-shader">
          <VisibleDotOrbit style={{ width: '100%', height: '100%', display: 'block' }} {...dotOrbitProps} />
        </div>
        <div className="fm-inner">
          <div className="fm-head">
            <p className="features__eyebrow">Just for Fun</p>
            <h2 className="features__display">
              A few reasons<br /><em>to open the app.</em>
            </h2>
            <p className="features__meta" style={{ justifyContent: 'center' }}>
              <span>Golf humor</span>
              <span className="features__meta-dot" />
              <span>AI chat</span>
              <span className="features__meta-dot" />
              <span>Personality test</span>
            </p>
          </div>

          <div className="fm-grid">
            {funFeatures.map((f) => (
              <div key={f.num} className="fm-card">
                <img src={f.image} alt={`${f.title} ${f.titleEm}`} className="fm-card__img" />
                <div className="fm-card__overlay" />
                <div className="fm-card__text">
                  <p className="fm-card__num">{f.num}</p>
                  <p className="fm-card__title">{f.title} <em>{f.titleEm}</em></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
