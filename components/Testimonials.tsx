import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';
import { Reveal } from './Reveal';

const FALLBACK_REVIEWS: Testimonial[] = [
  {
    id: 1,
    title: 'Revolutionary',
    name: 'zbonmnobwo',
    role: 'App Store',
    content:
      'I have been one of the early beta testers for this app and have been using it for a while. This is unlike all other AI golf apps that just give you a score or feedback, because I actually contact my coach on this platform. It is more than an app, this is the infrastructure for golf coaching of the future, and I highly recommend golfers and coaches learn about what this team is doing!',
  },
  {
    id: 2,
    title: 'Recommend this for golf lovers!',
    name: 'JiayiJennie',
    role: 'App Store',
    content:
      'The feedback is finally clear and not a wall of text, and it actually tells me what to do next, not just what I did wrong.',
  },
  {
    id: 3,
    title: 'Great coach app',
    name: 'Momo0335',
    role: 'App Store',
    content:
      'Really impressed by how clearly it breaks down the swing. Feels much more personalized than generic golf tips. Super helpful.',
  },
  {
    id: 4,
    title: 'Game changer for my practice season!',
    name: 'Mr.None_Z',
    role: 'App Store',
    content: 'SneakySwing has completely transformed the way I practice. Instead of just guessing what I’m doing wrong at the driving range, the AI gives me immediate, frame-by-frame breakdowns of my body mechanics and swing positions.',
  }
];

function initialsFromName(name: string): string {
  const alnum = name.replace(/[^a-zA-Z0-9]/g, '');
  if (alnum.length >= 2) return alnum.slice(0, 2).toUpperCase();
  if (alnum.length === 1) return alnum.toUpperCase();
  return '?';
}

const StarRow: React.FC<{ small?: boolean }> = ({ small }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={small ? 'w-3 h-3 text-gold fill-current' : 'w-3.5 h-3.5 text-gold fill-current'}
      />
    ))}
  </div>
);

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(3);
      else if (window.innerWidth >= 768) setItemsToShow(2);
      else setItemsToShow(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          'https://itunes.apple.com/us/rss/customerreviews/id=6754829630/sortBy=mostRecent/json'
        );
        const data = await response.json();
        const entries = data?.feed?.entry ?? [];
        const parsed = entries
          .filter((e: any) => e.author && e['im:rating'] && parseInt(e['im:rating'].label, 10) >= 4)
          .map((e: any) => ({
            id: e.id.label,
            title: e.title.label,
            name: e.author.name.label,
            role: 'App Store',
            content: e.content.label,
          }));
        setReviews(parsed.length >= 3 ? parsed : FALLBACK_REVIEWS);
      } catch {
        setReviews(FALLBACK_REVIEWS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsToShow);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  useEffect(() => {
    if (reviews.length === 0 || isPaused) return;
    const timer = setInterval(() => { nextTestimonial(); }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex, isPaused, reviews.length]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-24 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-2.5 w-16 rounded-full bg-ink/8 animate-pulse mb-4" />
            <div className="h-8 w-64 rounded bg-ink/8 animate-pulse" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-ink/[0.07] rounded-2xl h-64 flex-1 animate-pulse hidden lg:first:block lg:block" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  const cardWidthPercent = 100 / itemsToShow;

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-paper">
      <Reveal className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12 max-w-7xl mx-auto">
          <div>
            <p className="text-green text-[10px] font-bold uppercase tracking-[0.22em] mb-3">
              Reviews
            </p>
            <h2
              className="font-display font-extrabold text-ink leading-[1.06]"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
            >
              Loved by golfers &amp; coaches
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <StarRow small />
            <span className="text-subtle text-sm font-medium">App Store</span>
          </div>
        </div>

        <div
          className="relative w-full mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation dots */}
          <div className="flex items-center gap-1.5 justify-end mb-5">
            <button
              onClick={prevTestimonial}
              className="w-7 h-7 rounded-full border border-ink/15 flex items-center justify-center text-subtle hover:text-ink hover:border-ink/30 transition-all duration-150"
              aria-label="Previous"
            >
              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                <path d="M7.5 2 3.5 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="w-7 h-7 rounded-full border border-ink/15 flex items-center justify-center text-subtle hover:text-ink hover:border-ink/30 transition-all duration-150"
              aria-label="Next"
            >
              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                <path d="M4.5 2 8.5 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidthPercent}%)` }}
            >
              {reviews.map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="flex-shrink-0 px-2 lg:px-3 flex"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <div className="glass-green rounded-2xl p-6 md:p-8 flex flex-col h-full w-full">
                    <StarRow />

                    <h3 className="font-bold text-ink text-base mt-5 mb-3 leading-snug line-clamp-2">
                      {t.title}
                    </h3>

                    <p className="text-subtle text-sm leading-relaxed flex-grow mb-6 line-clamp-5">
                      {t.content}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-ink/[0.06] mt-auto">
                      <div className="min-w-0">
                        <p className="font-semibold text-ink text-sm truncate">{t.name}</p>
                        <p className="text-subtle/70 text-xs mt-0.5">{t.role}</p>
                      </div>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-ink/20 flex-shrink-0 ml-3">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
