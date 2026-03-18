import React, { useEffect } from 'react';
import { LegalDocumentLayout } from './LegalDocumentLayout';
import { PrivacyPolicyContent } from './legal/PrivacyPolicyContent';

interface PrivacyPolicyProps {
  variant?: 'app' | 'website';
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ variant = 'app' }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = 'Privacy Policy | Perflection AI';
  }, []);

  return (
    <LegalDocumentLayout
      eyebrow="SneakySwing App Legal Page"
      title="Privacy Policy"
      lastUpdated="March 18, 2026"
      summary="This Privacy Policy applies to the SneakySwing iOS app offered by Perflection.AI, Inc. and to the in-app Privacy Policy page opened from the app. It does not describe unrelated marketing-site features, ad tech, or payment methods that are not used by the app."
      backLink={variant === 'website' ? { href: '/', label: 'Back to Home' } : undefined}
    >
      <PrivacyPolicyContent />
    </LegalDocumentLayout>
  );
};
