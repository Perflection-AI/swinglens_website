import React from 'react';
import { Reveal } from './Reveal';

const entries = [
  {
    week: 'Week 1',
    type: 'Lesson',
    text: 'Diagnosed hip sway on backswing. Started alignment drill series with Coach Sarah.',
  },
  {
    week: 'Week 3',
    type: 'Practice',
    text: '40 reps of the hip separation drill. Tempo score climbed from 61 to 67.',
  },
  {
    week: 'Week 6',
    type: 'Progress',
    text: 'Swing score: 67 → 74. Coach note: "Transition is finally clean."',
  },
  {
    week: 'Week 10',
    type: 'Coach',
    text: '"The sway is gone. Now we focus on wrist angle at the top. Here\'s the drill."',
  },
];

const pillColor: Record<string, string> = {
  Lesson: 'bg-ink/8 text-subtle',
  Practice: 'bg-ink/8 text-subtle',
  Progress: 'bg-green/10 text-green',
  Coach: 'bg-gold/10 text-gold',
};

const trackItems = [
  {
    label: 'Training log',
    desc: 'Every session, rep count, and drill captured automatically.',
  },
  {
    label: 'Coach conversations',
    desc: 'Feedback preserved in context, alongside the exact video it references.',
  },
  {
    label: 'Progress over months',
    desc: "Not just today's score — your full trajectory, patterns and all.",
  },
  {
    label: 'A record that compounds',
    desc: 'Every session you log makes your AI coaching sharper. Your history trains the system — so it gets better the longer you stay.',
  },
];

export const SwingRecord: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-paper">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Copy */}
                <div>
                  <p className="text-green text-xs font-bold uppercase tracking-widest mb-5">
                    Why SneakySwing
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-display font-bold text-ink mb-6 leading-[1.1]">
                    Other apps give you an analysis.<br />
                    We curate a lifelong <span className="text-green">swing medical record</span> for you.
                  </h2>

                  <div className="space-y-5">
                    {trackItems.map((item) => (
                      <div key={item.label} className="flex gap-4 items-start">
                        <div className="w-5 h-5 rounded-full border border-green/40 bg-green/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green" />
                        </div>
                        <div>
                          <p className="text-ink font-semibold text-sm mb-0.5">{item.label}</p>
                          <p className="text-subtle text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Stylized swing record log */}
                <div className="glass-green rounded-2xl">
                  <div className="px-6 py-4 border-b border-green/15 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-green/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green/20" />
                    </div>
                    <p className="text-ink/40 text-xs font-semibold uppercase tracking-widest">
                      Swing Record — Alex M. · Handicap 14.2
                    </p>
                  </div>

                  <div className="divide-y divide-green/10">
                    {entries.map((entry, i) => (
                      <div key={i} className="flex gap-5 px-6 py-5">
                        <div className="flex flex-col items-center w-14 shrink-0 pt-1">
                          <p className="text-green text-xs font-bold">{entry.week}</p>
                          {i < entries.length - 1 && (
                            <div className="w-px flex-1 bg-green/20 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2.5 inline-block ${pillColor[entry.type]}`}>
                            {entry.type}
                          </span>
                          <p className="text-ink/75 text-sm leading-relaxed">{entry.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 border-t border-green/15 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                    <p className="text-ink/40 text-xs font-semibold">
                      245 sessions logged · 3 coaches · 18 months of progress
                    </p>
                  </div>
                </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};
