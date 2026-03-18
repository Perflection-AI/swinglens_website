import React, { useEffect } from 'react';
import { LegalDocumentLayout } from './LegalDocumentLayout';
import { TermsAndConditionsContent } from './legal/TermsAndConditionsContent';

interface TermsAndConditionsProps {
  variant?: 'app' | 'website';
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ variant = 'app' }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'Terms and Conditions | Perflection AI';
  }, []);

  return (
    <LegalDocumentLayout
      eyebrow="SneakySwing App Legal Page"
      title="Terms and Conditions"
      lastUpdated="March 18, 2026"
      summary="These Terms and Conditions govern the SneakySwing iOS app offered by Perflection.AI, Inc. They are written for the app only and do not include unrelated website marketplace, community, advertising, or shipping terms."
      backLink={variant === 'website' ? { href: '/', label: 'Back to Home' } : undefined}
    >
      <TermsAndConditionsContent />
    </LegalDocumentLayout>
  );
};
