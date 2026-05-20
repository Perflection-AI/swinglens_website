import React, { useEffect, useRef, useState } from 'react';
import { DotOrbit } from '@paper-design/shaders-react';
import { getPath } from '../utils/paths';
import './Features.css';

const features = [
  {
    num: '01',
    title: 'AI Swing',
    titleEm: 'Analysis.',
    body: 'Place your phone on a tripod. No sensors, no straps, no markers. The app auto-records, reconstructs your full 3D body position, and breaks down tempo, hip sway, shoulder turn, and shaft path across 20+ metrics.',
    image: getPath('assets/features/ai_swing_analysis.PNG'),
  },
  {
    num: '02',
    title: 'Realtime',
    titleEm: 'Coach Feedback.',
    body: "Chat with your coach's AI Twin anytime, built on their real methodology, voice, and corrections. You get coaching between lessons, not just during them.",
    image: getPath('assets/features/coach_feedback.PNG'),
  },
  {
    num: '03',
    title: 'Cause &',
    titleEm: 'Fix.',
    body: 'The AI names the fault: over-the-top, early release, chicken wing. Then hands you the one drill that fixes it. Not a score. Not a wall of text. A diagnosis and a next step.',
    image: getPath('assets/features/cause_and_fix.PNG'),
  },
  {
    num: '04',
    title: 'Actionable',
    titleEm: 'Plan.',
    body: 'Every swing, every drill, every coach note is logged. Your AI coaching gets sharper the longer you use it, building a history that belongs to you and improves with every session.',
    image: getPath('assets/features/actionable_plan.PNG'),
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

export const Features: React.FC = () => {
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
      const idx = Math.min(features.length - 1, Math.floor(clamped * features.length));
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
    <section id="features" className="features-section bg-paper" ref={sectionRef}>

      {/* ── Desktop / tablet: scroll-driven sticky layout ── */}
      <div className="features__sticky">
        <div className="features__outer">
          <div className="features__card">
            <div className="features__shader">
              <DotOrbit style={{ width: '100%', height: '100%', display: 'block' }} {...dotOrbitProps} />
            </div>

            <div className="features__layout">
              {/* Left: phone mockup */}
              <div className="features__visual">
                <div className="phone">
                  <div className="phone__notch" />
                  <div className="phone__screen">
                    {features.map((f, i) => (
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

              {/* Right: text */}
              <div className="features__text">
                <div className="features__head">
                  <p className="features__eyebrow">The App</p>
                  <h2 className="features__display">
                    A full coaching loop,<br /><em>in your pocket.</em>
                  </h2>
                  <p className="features__meta">
                    <span>20+ metrics</span>
                    <span className="features__meta-dot" />
                    <span>0 sensors needed</span>
                    <span className="features__meta-dot" />
                    <span>Available 24/7</span>
                  </p>
                </div>

                <div className="features__track-wrap">
                  <div className="features__line">
                    <div
                      className="features__line-fill"
                      style={{ transform: `scaleY(${(active + 1) / features.length})` }}
                    />
                  </div>
                  <div className="features__cards">
                    {features.map((f, i) => (
                      <div key={f.num} className={`fcard${i === active ? ' active' : ''}`}>
                        <p className="fcard__num">{f.num}</p>
                        <p className="fcard__title">{f.title} <em>{f.titleEm}</em></p>
                        <div className="fcard__body-outer">
                          <p className="fcard__body">{f.body}</p>
                        </div>
                      </div>
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
          <DotOrbit style={{ width: '100%', height: '100%', display: 'block' }} {...dotOrbitProps} />
        </div>
        <div className="fm-inner">
          <div className="fm-head">
            <p className="features__eyebrow">The App</p>
            <h2 className="features__display">
              A full coaching loop,<br /><em>in your pocket.</em>
            </h2>
            <p className="features__meta" style={{ justifyContent: 'center' }}>
              <span>20+ metrics</span>
              <span className="features__meta-dot" />
              <span>0 sensors needed</span>
              <span className="features__meta-dot" />
              <span>Available 24/7</span>
            </p>
          </div>

          <div className="fm-grid">
            {features.map((f) => (
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
