import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getBasePath, getPath } from '../utils/paths';

interface HeaderProps {
  onOpenModal: (title?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if we're on a different page
  const isOnOtherPage = () => {
    const currentPath = window.location.pathname;
    const base = getBasePath();
    return currentPath === '/privacy' || 
           currentPath === getPath('privacy') ||
           currentPath.endsWith('/privacy') ||
           currentPath === '/terms' || 
           currentPath === getPath('terms') ||
           currentPath.endsWith('/terms');
  };

  // Helper function to navigate to homepage section
  const navigateToSection = (sectionId: string) => {
    const base = getBasePath();
    if (isOnOtherPage()) {
      // Navigate to homepage first
      window.history.pushState({}, '', base === '/' ? '/' : base);
      window.dispatchEvent(new PopStateEvent('popstate'));
      // Wait for page change, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    } else {
      // Already on homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Logo path using getPath for production compatibility
  const logoUrl = getPath('assets/perflection_logo.png');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-paper/90 backdrop-blur-md border-b border-ink/10 py-3' // Changed to grey border
          : 'bg-paper/60 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => {
            const base = getBasePath();
            if (isOnOtherPage()) {
              // Navigate to homepage first
              window.history.pushState({}, '', base === '/' ? '/' : base);
              window.dispatchEvent(new PopStateEvent('popstate'));
              // Small delay to ensure page change, then scroll
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            } else {
              // Just scroll to top on homepage
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img 
            src={logoUrl} 
            alt="Perflection AI Logo" 
            className="w-[62px] h-[62px] group-hover:scale-105 transition-transform rounded-xl"
          />
          <span className="text-xl font-display font-bold tracking-tight text-ink">
            Perflection AI
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {['Features', 'Solutions', 'Testimonials'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                navigateToSection(item.toLowerCase());
              }}
              className="text-subtle font-medium text-sm px-4 py-2 rounded-full hover:bg-golf-100 hover:text-golf-700 transition-all"
            >
              {item}
            </a>
          ))}
          <div className="w-4"></div>
          {/* Button: Added shadow-glow and hover effects */}
          <button 
            onClick={() => onOpenModal('Join Waitlist')}
            className="bg-golf-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-glow hover:shadow-lg hover:shadow-golf-500/40 hover:bg-golf-500 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Join Waitlist
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-ink p-2 rounded-lg hover:bg-golf-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-paper border-b border-ink/10 p-4 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2">
          {['Features', 'Solutions', 'Testimonials'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                navigateToSection(item.toLowerCase());
              }}
              className="text-ink font-medium p-3 rounded-lg hover:bg-golf-100 transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="h-px bg-ink/10 my-2"></div>
          <button 
            onClick={() => {
              onOpenModal('Join Waitlist');
              setIsMobileMenuOpen(false);
            }}
            className="bg-golf-600 text-white px-4 py-3 rounded-xl font-bold w-full shadow-glow"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </header>
  );
};