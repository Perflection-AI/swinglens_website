import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CoachesSection } from './components/CoachesSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { EmailModal } from './components/EmailModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Get Started');
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

  // Check if we're on the privacy policy page
  const isPrivacyPage = currentPath === '/privacy' || 
                        currentPath === '/swinglens_website/privacy' || 
                        currentPath.endsWith('/privacy');

  // Check if we're on the terms page
  const isTermsPage = currentPath === '/terms' || 
                      currentPath === '/swinglens_website/terms' || 
                      currentPath.endsWith('/terms');

  if (isPrivacyPage) {
    return <PrivacyPolicy />;
  }

  if (isTermsPage) {
    return <TermsAndConditions />;
  }

  return (
    <div className="min-h-screen bg-paper">
      <Header onOpenModal={openModal} />
      <main>
        <Hero onOpenModal={openModal} />
        <Features />
        <CoachesSection onOpenModal={openModal} />
        <Testimonials />
      </main>
      <Footer />
      <EmailModal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} />
    </div>
  );
};

export default App;