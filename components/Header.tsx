import React, { useState, useEffect, useRef } from 'react';
import { getBasePath, getPath } from '../utils/paths';

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside tap
  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [menuOpen]);

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const navigateToSection = (sectionId: string) => {
    setMenuOpen(false);
    const currentPath = window.location.pathname;
    const base = getBasePath();
    const homePath = base === '/' ? '/' : base.replace(/\/+$/, '');
    const isHome = currentPath === '/' || currentPath === homePath || currentPath === homePath + '/';

    if (!isHome) {
      window.history.pushState({}, '', base === '/' ? '/' : base);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goToGolfTI = () => {
    setMenuOpen(false);
    const base = getBasePath();
    window.location.href = `${base}golfti`.replace(/\/+/g, '/');
  };

  const goToAbout = () => {
    setMenuOpen(false);
    const base = getBasePath();
    window.history.pushState({}, '', `${base}about`.replace(/\/+/g, '/'));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const goHome = () => {
    setMenuOpen(false);
    const base = getBasePath();
    const homePath = base === '/' ? '/' : base.replace(/\/+$/, '');
    window.history.pushState({}, '', homePath || '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const logoUrl = getPath('assets/sneakyswing.png');

  return (
    <header ref={navRef} className={`float-nav${scrolled ? ' scrolled' : ''}`} id="nav">
      {/* Logo + Brand name */}
      <a
        className="float-nav__logo-group"
        href="#top"
        aria-label="SneakySwing home"
        onClick={(e) => { e.preventDefault(); goHome(); }}
      >
        <div className="float-nav__logo">
          <img src={logoUrl} alt="SneakySwing" width="30" height="30" decoding="async" />
        </div>
        <span className="float-nav__brand-name">SneakySwing</span>
      </a>

      {/* Desktop nav links */}
      <nav className="float-nav__links" aria-label="Primary">
        <a href="/about" onClick={(e) => { e.preventDefault(); goToAbout(); }}>
          About
        </a>
        <a href="/golfti" onClick={(e) => { e.preventDefault(); goToGolfTI(); }}>
          Golf Personality Test
        </a>
      </nav>

      {/* Desktop CTA */}
      <a className="float-nav__cta" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
        Analyze swing now
      </a>

      {/* Mobile hamburger */}
      <button
        className={`float-nav__hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className="float-nav__hamburger-line" />
        <span className="float-nav__hamburger-line" />
        <span className="float-nav__hamburger-line" />
      </button>

      {/* Mobile dropdown */}
      <div className={`float-nav__mobile-menu${menuOpen ? ' open' : ''}`} role="menu">
        <button className="float-nav__mobile-link" onClick={goToAbout}>
          About
        </button>
        <button className="float-nav__mobile-link" onClick={goToGolfTI}>
          Golf Personality Test
        </button>
        <a
          className="float-nav__mobile-cta"
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Analyze swing now
        </a>
      </div>
    </header>
  );
};
