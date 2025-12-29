import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CoachesSection } from './components/CoachesSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { EmailModal } from './components/EmailModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Get Started');

  const openModal = (title: string = 'Get Started') => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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