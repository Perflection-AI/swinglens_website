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
    scoreBefore: 67,
    scoreAfter: 74,
    coachNote: 'Transition is finally clean.',
  },
  {
    week: 'Week 10',
    type: 'Coach',
    text: '"The sway is gone. Now we focus on wrist angle at the top. Here\'s the drill."',
  },
] as const;

const pillColor: Record<string, string> = {
  Lesson:   'bg-ink/8 text-subtle',
  Practice: 'bg-ink/8 text-subtle',
  Progress: 'bg-green/10 text-green',
  Coach:    'bg-gold/10 text-gold',
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
    desc: "Not just today's score. Your full trajectory, patterns and all.",
  },
  {
    label: 'A record that compounds',
    desc: 'Every session you log makes your AI coaching sharper. Your history trains the system, so it gets better the longer you stay.',
    climax: true,
  },
];

const footerStats = [
  { value: '245', label: 'sessions' },
  { value: '3', label: 'coaches' },
  { value: '18 mo', label: 'tracked' },
];

export const SwingRecord: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-paper">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Reveal>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Copy */}
            <div>
              <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-5">
                Why SneakySwing
              </p>
              <h2
                className="font-display font-extrabold text-ink leading-[1.08]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
              >
                Other apps give you an analysis.<br />
                We curate a lifelong <span className="text-green">swing medical record</span> for you.
              </h2>

              {/* Separator — visual breath between headline and list */}
              <div className="mt-8 pt-8 border-t border-ink/[0.07] space-y-6">
                {trackItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={`grid gap-3 items-start${item.climax ? ' mt-8' : ''}`}
                    style={{ gridTemplateColumns: '2.25rem 1fr' }}
                  >
                    <span className={`text-[11px] font-bold tabular-nums pt-0.5 leading-snug select-none${item.climax ? ' text-green' : ' text-green/50'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className={`font-semibold text-sm mb-0.5${item.climax ? ' text-ink' : ' text-ink/80'}`}>{item.label}</p>
                      <p className="text-subtle text-sm leading-relaxed max-w-[52ch]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Swing record log */}
            <div className="glass-green rounded-2xl">

              {/* Card header */}
              <div className="px-6 py-4 border-b border-green/15 flex items-center justify-between">
                <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em]">
                  Swing Record
                </p>
                <div className="flex items-center gap-2.5">
                  <p className="text-ink/40 text-[10px] font-semibold tracking-wide">
                    Alex M. · Handicap 14.2
                  </p>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-green/60 bg-green/10 px-1.5 py-0.5 rounded-full">
                    10 wk
                  </span>
                </div>
              </div>

              {/* Entries */}
              <div className="divide-y divide-green/10">
                {entries.map((entry, i) => (
                  <div key={i} className="flex gap-5 px-6 py-5">
                    <div className="flex flex-col items-center w-14 shrink-0 pt-1">
                      <p className="text-green text-xs font-bold whitespace-nowrap">{entry.week}</p>
                      {i < entries.length - 1 && (
                        <div className="w-px flex-1 bg-green/20 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2.5 inline-block ${pillColor[entry.type]}`}>
                        {entry.type}
                      </span>

                      {/* Progress entry gets special milestone treatment */}
                      {'scoreBefore' in entry ? (
                        <div>
                          <div className="flex items-baseline gap-2.5 mb-1.5">
                            <span className="text-green font-bold text-base tabular-nums leading-none">
                              {entry.scoreBefore} → {entry.scoreAfter}
                            </span>
                            <span className="text-green/70 text-[10px] font-bold uppercase tracking-wide">
                              +{entry.scoreAfter - entry.scoreBefore} pts
                            </span>
                          </div>
                          <p className="text-ink/50 text-xs leading-relaxed italic">
                            "{entry.coachNote}"
                          </p>
                        </div>
                      ) : (
                        <p className="text-ink/75 text-sm leading-[1.6]">{entry.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer stats — discrete, scannable */}
              <div className="px-6 py-4 border-t border-green/15 flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse flex-shrink-0" />
                  <span className="text-ink/40 text-xs font-semibold">{footerStats[0].value} {footerStats[0].label}</span>
                </div>
                {footerStats.slice(1).map((stat) => (
                  <React.Fragment key={stat.label}>
                    <span className="text-green/25 text-xs select-none">·</span>
                    <span className="text-ink/40 text-xs font-semibold">{stat.value} {stat.label}</span>
                  </React.Fragment>
                ))}
              </div>

            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};
