import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Reveal } from './Reveal';
import { DownloadCTA } from './DownloadCTA';

const celebLeaders = [
  { rank: 1, name: 'Sean Walsh', tag: 'pro/celeb', mbti: 'VOID', score: 93 },
  { rank: 2, name: 'Bryson DeChambeau', tag: 'pro', mbti: 'VOID', score: 92 },
  { rank: 3, name: 'Sam Burns', tag: 'pro', mbti: 'VOID', score: 90 },
  { rank: 3, name: 'Grant Horvat', tag: 'celeb', mbti: 'RIZZ', score: 90 },
  { rank: 5, name: 'Jennie K-pop', tag: 'celeb', mbti: 'VOID', score: 86 },
  { rank: 6, name: 'Micah Morris', tag: 'celeb', mbti: 'VOID', score: 86 },
  { rank: 7, name: 'Garrett Clark', tag: 'celeb', mbti: 'VOID', score: 84 },
  { rank: 8, name: 'Roger Federer', tag: 'celeb', mbti: 'VOID', score: 84 },
  { rank: 9, name: 'Matt Scharff', tag: 'celeb', mbti: 'FERL', score: 82 },
  { rank: 10, name: 'Lebron James', tag: 'celeb', mbti: 'BRUH', score: 75 },
  { rank: 11, name: 'Phil Mickelson', tag: 'pro', mbti: 'FLAIR', score: 74 },
  { rank: 12, name: 'Tom Holland', tag: 'celeb', mbti: 'RIZZ', score: 74 },
  { rank: 13, name: 'Kevin Hart', tag: 'celeb', mbti: 'RIZZ', score: 68 },
  { rank: 14, name: 'Bubbie Golf', tag: 'celeb', mbti: 'BRUH', score: 68 },
  { rank: 15, name: 'Steve Castaneda', tag: 'celeb', mbti: 'BRUH', score: 68 },
  { rank: 16, name: 'Erling Haaland', tag: 'celeb', mbti: 'BOZO', score: 48 },
];

const goodGoodLeaders = [
  { rank: 1, name: 'Sean Walsh', tag: 'celeb', mbti: 'RIZZ', score: 93 },
  { rank: 2, name: 'Grant Horvat', tag: 'celeb', mbti: 'RIZZ', score: 90 },
  { rank: 3, name: 'Bubbie Golf', mbti: 'BRUH', score: '68' },
  { rank: 3, name: 'Steve Castaneda', mbti: 'BRUH', score: '68' },
];

const medalColor: Record<number, string> = {
  1: '#C4A84A',
  2: '#A8A8A8',
  3: '#B08D57',
};

export const LeaderboardPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'Leaderboard | Sneaky Academy';
  }, []);

  const activeLeaders = celebLeaders;

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="pt-36 sm:pt-28 pb-4 sm:pb-6 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-5">
              Leaderboard
            </p>
            <h1
              className="font-display font-extrabold text-ink leading-[1.06] mb-5"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Ranking every golfer in the world
            </h1>
          </div>
        </section>

        {/* ── Leaderboard list ── */}
        <section className="pb-16 sm:pb-24 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <Reveal>
              <div className="rounded-2xl border border-ink/[0.08] bg-white shadow-soft overflow-hidden">
                {activeLeaders.map(({ rank, name, tag, mbti, score }, i) => (
                  <div
                    key={rank}
                    className={`flex items-center gap-4 px-5 sm:px-7 py-4 ${i !== activeLeaders.length - 1 ? 'border-b border-ink/[0.06]' : ''}`}
                  >
                    <div className="w-8 flex-shrink-0 flex items-center justify-center">
                      {rank <= 3 ? (
                        <Trophy className="w-5 h-5" style={{ color: medalColor[rank] }} fill={medalColor[rank]} />
                      ) : (
                        <span className="text-subtle text-sm font-bold tabular-nums">{rank}</span>
                      )}
                    </div>

                    <div className="w-9 h-9 rounded-full bg-green-light flex items-center justify-center text-[11px] font-bold text-green flex-shrink-0">
                      {name.split(' ').map((p) => p[0]).join('')}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-display font-bold text-ink text-sm leading-tight">{name}</p>
                        {tag && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-gold bg-gold/10 px-1.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        )}
                      </div>
                      <p className="text-subtle text-xs mt-0.5">Golf-MBTI: {mbti}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-extrabold text-ink text-lg leading-none tabular-nums">{score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Good Good Leaderboard ── */}
        <section className="pb-16 sm:pb-24 bg-paper">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <p className="text-green text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-center">
              Good Good Leaderboard
            </p>
            <Reveal>
              <div className="rounded-2xl border border-ink/[0.08] bg-white shadow-soft overflow-hidden">
                {goodGoodLeaders.map(({ rank, name, mbti, score }, i) => (
                  <div
                    key={rank}
                    className={`flex items-center gap-4 px-5 sm:px-7 py-4 ${i !== goodGoodLeaders.length - 1 ? 'border-b border-ink/[0.06]' : ''}`}
                  >
                    <div className="w-8 flex-shrink-0 flex items-center justify-center">
                      <span className="text-subtle text-sm font-bold tabular-nums">{rank}</span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-green-light flex items-center justify-center text-[11px] font-bold text-green flex-shrink-0">
                      {name.split(' ').map((p) => p[0]).join('')}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-ink text-sm leading-tight">{name}</p>
                      <p className="text-subtle text-xs mt-0.5">Golf-MBTI: {mbti}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-display font-extrabold text-ink text-lg leading-none tabular-nums">{score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <Reveal>
          <section className="border-t border-ink/[0.07]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-14 sm:py-16">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-2">Get on the board</p>
                  <p
                    className="font-display font-bold text-ink leading-tight"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
                  >
                    Analyze a swing, earn your Swing Score.
                  </p>
                </div>
                <DownloadCTA
                  align="end"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green rounded-lg shadow-card hover:brightness-110 transition-all duration-200"
                >
                  Try SneakySwing free
                  <span className="w-[16px] h-[16px] rounded-[3px] bg-white/20 inline-grid place-items-center text-sm leading-none ml-2">›</span>
                </DownloadCTA>
              </div>
            </div>
          </section>
        </Reveal>

      </main>
      <Footer />
    </div>
  );
};
