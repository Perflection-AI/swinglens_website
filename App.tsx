import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CoachesSection } from './components/CoachesSection';
import { Testimonials } from './components/Testimonials';
import { Collaborations } from './components/Collaborations';
import { Footer } from './components/Footer';
import { EmailModal } from './components/EmailModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { getBasePath, getPath } from './utils/paths';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Join Waitlist');
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

  const openModal = (title: string = 'Get Started') => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const appPrivacyPaths = ['/privacy', getPath('privacy')];
  const appTermsPaths = ['/terms', getPath('terms')];
  const websitePrivacyPaths = ['/legal/privacy', getPath('legal/privacy')];
  const websiteTermsPaths = ['/legal/terms', getPath('legal/terms')];

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
        <Header onOpenModal={openModal} />
        <main className="pt-24">
          <PrivacyPolicy variant="website" />
        </main>
        <Footer />
        <EmailModal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} />
      </div>
    );
  }

  if (isWebsiteTermsPage) {
    return (
      <div className="min-h-screen bg-paper">
        <Header onOpenModal={openModal} />
        <main className="pt-24">
          <TermsAndConditions variant="website" />
        </main>
        <Footer />
        <EmailModal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <Features />
        <CoachesSection onOpenModal={openModal} />
        <Testimonials />
        <Collaborations />
      </main>
      <Footer />
      <EmailModal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} />
    </div>
  );
};

export default App;
