import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
        className={small ? 'w-3 h-3 text-gold fill-current' : 'w-4 h-4 text-gold fill-current'}
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

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(3); // lg
      else if (window.innerWidth >= 768) setItemsToShow(2); // md
      else setItemsToShow(1); // sm
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
    const timer = setInterval(() => {
      nextTestimonial();
    }, 3000); 
    return () => clearInterval(timer);
  }, [maxIndex, isPaused, reviews.length]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-24 bg-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-3 w-16 rounded-full bg-ink/8 animate-pulse mb-4" />
            <div className="h-9 w-64 rounded-lg bg-ink/8 animate-pulse" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            <div className="bg-white rounded-2xl border border-ink/10 h-72 min-w-[300px] flex-1 animate-pulse" />
            <div className="bg-white rounded-2xl border border-ink/10 h-72 min-w-[300px] flex-1 animate-pulse hidden md:block" />
            <div className="bg-white rounded-2xl border border-ink/10 h-72 min-w-[300px] flex-1 animate-pulse hidden lg:block" />
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  const cardWidthPercent = 100 / itemsToShow;

  return (
    <section id="testimonials" className="py-24 bg-paper relative overflow-hidden">
      <Reveal className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12 max-w-7xl mx-auto">
          <div>
            <p className="text-xs font-bold text-green mb-3 uppercase tracking-widest font-mono">
              Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">
              Loved by golfers &amp; coaches
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0 pb-1">
            <StarRow small />
            <span className="text-subtle text-sm font-medium">App Store</span>
          </div>
        </div>

        <div 
          className="relative w-full mx-auto group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setIsPaused(!isPaused)}
        >
          {/* Mobile Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevTestimonial(); }}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-ink hover:text-green focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextTestimonial(); }}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-ink hover:text-green focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden px-1 md:px-2">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * cardWidthPercent}%)` }}
            >
              {reviews.map((t, i) => (
                <div 
                  key={`${t.id}-${i}`} 
                  className="flex-shrink-0 px-2 lg:px-4 flex"
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <div className="glass-green p-6 md:p-8 rounded-2xl flex flex-col h-full w-full transition-all duration-300">
                    <StarRow />

                    <h3 className="font-bold text-ink text-base mt-5 mb-4 leading-snug line-clamp-2">
                      {t.title}
                    </h3>

                    <p className="text-ink text-sm md:text-base leading-relaxed flex-grow mb-8 font-medium line-clamp-5">
                      &ldquo;{t.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-6 border-t border-green/10 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-white/70 text-green flex items-center justify-center text-sm font-bold shrink-0">
                        {initialsFromName(t.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-ink text-sm truncate">{t.name}</p>
                        <p className="text-green/70 text-xs font-medium">{t.role}</p>
                      </div>
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
