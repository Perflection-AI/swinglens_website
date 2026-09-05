import React, { useState, useEffect } from 'react';
import { PromoBanner } from './components/PromoBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AppSection } from './components/AppSection';
import { CommunitySection } from './components/CommunitySection';
import { Testimonials } from './components/Testimonials';
import { Collaborations } from './components/Collaborations';
import { GolfTIPage } from './components/GolfTIPage';
import { About } from './components/About';
import { CoachesPage } from './components/CoachesPage';
import { StudentsPage } from './components/StudentsPage';
import { ContactPage } from './components/ContactPage';
import { LeaderboardPage } from './components/LeaderboardPage';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { InviteLanding } from './components/InviteLanding';
import { FeedbackLanding } from './components/FeedbackLanding';
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
  const aboutPaths = ['/about', getPath('about')];
  const coachesPaths = ['/coaches', getPath('coaches')];
  const studentsPaths = ['/students', getPath('students')];
  const contactPaths = ['/contact', getPath('contact')];
  const leaderboardPaths = ['/leaderboard', getPath('leaderboard')];

  const isGolftiPage = golftiPaths.includes(currentPath);
  const isAboutPage = aboutPaths.includes(currentPath);
  const isCoachesPage = coachesPaths.includes(currentPath);
  const isStudentsPage = studentsPaths.includes(currentPath);
  const isContactPage = contactPaths.includes(currentPath);
  const isLeaderboardPage = leaderboardPaths.includes(currentPath);
  // Invite Universal Link landing — identical for everyone, no per-code logic.
  const isInvitePage = currentPath === '/invite' || currentPath.startsWith('/invite/');
  // Feedback share landing (0905) — /f/{token}, same Universal-Link pattern as /invite.
  const isFeedbackSharePage = currentPath === '/f' || currentPath.startsWith('/f/');

  const isPrivacyPage = appPrivacyPaths.includes(currentPath);
  const isTermsPage = appTermsPaths.includes(currentPath);
  const isWebsitePrivacyPage = websitePrivacyPaths.includes(currentPath);
  const isWebsiteTermsPage = websiteTermsPaths.includes(currentPath);

  let pageContent: React.ReactNode;

  if (isGolftiPage) {
    pageContent = <GolfTIPage />;
  } else if (isAboutPage) {
    pageContent = <About />;
  } else if (isCoachesPage) {
    pageContent = <CoachesPage />;
  } else if (isStudentsPage) {
    pageContent = <StudentsPage />;
  } else if (isContactPage) {
    pageContent = <ContactPage />;
  } else if (isLeaderboardPage) {
    pageContent = <LeaderboardPage />;
  } else if (isInvitePage) {
    pageContent = <InviteLanding />;
  } else if (isFeedbackSharePage) {
    pageContent = <FeedbackLanding />;
  } else if (isPrivacyPage) {
    pageContent = <PrivacyPolicy />;
  } else if (isTermsPage) {
    pageContent = <TermsAndConditions />;
  } else if (isWebsitePrivacyPage) {
    pageContent = (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-24">
          <PrivacyPolicy variant="website" />
        </main>
        <Footer />
      </div>
    );
  } else if (isWebsiteTermsPage) {
    pageContent = (
      <div className="min-h-screen bg-paper">
        <Header />
        <main className="pt-24">
          <TermsAndConditions variant="website" />
        </main>
        <Footer />
      </div>
    );
  } else {
    pageContent = (
      <div className="min-h-screen bg-paper">
        <Header />
        <main>
          <Hero />
          <AppSection />
          <CommunitySection />
          <Testimonials />
          <Collaborations />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <PromoBanner />
      {pageContent}
    </>
  );
};

export default App;
