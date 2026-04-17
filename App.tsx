import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CoachesSection } from './components/CoachesSection';
import { Testimonials } from './components/Testimonials';
import { Collaborations } from './components/Collaborations';
import { GolfTIPage } from './components/GolfTIPage';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { getPath } from './utils/paths';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for popstate events (back/forward button)
    window.addEventListener('popstate', handleLocationChange);
    
    // Check pathname on mount
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const appPrivacyPaths = ['/privacy', getPath('privacy')];
  const appTermsPaths = ['/terms', getPath('terms')];
  const websitePrivacyPaths = ['/legal/privacy', getPath('legal/privacy')];
  const websiteTermsPaths = ['/legal/terms', getPath('legal/terms')];
  const golftiPaths = ['/golfti', getPath('golfti')];

  const isGolftiPage = golftiPaths.includes(currentPath);

  if (isGolftiPage) {
    return <GolfTIPage />;
  }

  const isPrivacyPage = appPrivacyPaths.includes(currentPath);
  const isTermsPage = appTermsPaths.includes(currentPath);
  const isWebsitePrivacyPage = websitePrivacyPaths.includes(currentPath);
  const isWebsiteTermsPage = websiteTermsPaths.includes(currentPath);

  if (isPrivacyPage) {
    return <PrivacyPolicy />;
  }

  if (isTermsPage) {
    return <TermsAndConditions />;
  }

  if (isWebsitePrivacyPage) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-24">
          <PrivacyPolicy variant="website" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isWebsiteTermsPage) {
    return (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-24">
          <TermsAndConditions variant="website" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Hero />
        <Features />
        <CoachesSection />
        <Testimonials />
        <Collaborations />
      </main>
      <Footer />
    </div>
  );
};

export default App;
