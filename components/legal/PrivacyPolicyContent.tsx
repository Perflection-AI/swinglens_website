import React from 'react';

export const PrivacyPolicyContent: React.FC = () => {
  return (
    <>
      <section id="scope" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">1. Scope and Contact</h2>
        <p className="text-subtle">
          Perflection.AI, Inc. ("we," "us," or "our") provides the SneakySwing mobile app (the
          "App"). This policy explains how we collect, use, disclose, and protect information when
          you create an account, record or upload golf swing videos, receive motion or AI analysis,
          share reports with a coach, purchase digital entitlements in the App, or contact support.
        </p>
        <p className="text-subtle">
          Questions or privacy requests can be sent to{' '}
          <a
            href="mailto:contact@perflection.ai"
            className="font-bold text-golf-600 hover:text-golf-700"
          >
            contact@perflection.ai
          </a>
          .
        </p>
      </section>

      <section id="collect" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">2. Information We Collect</h2>
        <p className="text-subtle">
          The information we collect depends on how you use the App. We only ask for information
          that helps us run the App and the swing-analysis services inside it.
        </p>

        <h3 className="text-xl font-display font-bold text-ink">Account and identity data</h3>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>Email address, password, and display name if you sign up with email.</li>
          <li>
            Limited account details from Apple Sign In or Google Sign-In, such as your name, email
            address, and authentication token.
          </li>
          <li>Optional profile information you choose to add, such as an avatar or coach bio.</li>
        </ul>

        <h3 className="mt-6 text-xl font-display font-bold text-ink">Swing and coaching data</h3>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>Golf swing videos, thumbnails, key frames, and related uploads.</li>
          <li>
            Pose, motion, timing, and report data generated from those videos, including AI
            analysis results and coaching annotations.
          </li>
          <li>
            Content you intentionally share with a coach, such as reports, feedback history, and
            related media.
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-display font-bold text-ink">
          Purchase and entitlement data
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>
            Subscription status, credit balance, product identifiers, transaction identifiers, and
            restore status for digital purchases made through Apple In-App Purchase.
          </li>
          <li>
            We do not collect, receive, or store your full payment card number or security code.
            Apple processes billing for in-app purchases.
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-display font-bold text-ink">
          Device, diagnostics, and support data
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>
            Device model, operating system version, app version, device identifiers, IP address,
            language, and network metadata sent to our backend to operate and secure the App.
          </li>
          <li>Push notification token so we can deliver service notifications.</li>
          <li>
            Product analytics, crash reports, and support communications that help us debug and
            improve the App.
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-display font-bold text-ink">Sensitive content</h3>
        <p className="text-subtle">
          Swing videos may contain your face, body movement, voice, and performance patterns.
          Motion and pose data derived from those videos may also be sensitive in some
          jurisdictions. We use this data to provide the App&apos;s analysis and coaching features, not
          for advertising.
        </p>
      </section>

      <section id="use" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">3. How We Use Information</h2>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>To create and authenticate your account.</li>
          <li>To store, sync, and display your videos, reports, and coach-sharing activity.</li>
          <li>To generate motion metrics and AI-powered swing analysis.</li>
          <li>To process and restore Apple In-App Purchases and keep your entitlement status in sync.</li>
          <li>To send service-related push notifications and respond to support requests.</li>
          <li>To detect fraud, protect the App, and troubleshoot crashes or performance issues.</li>
          <li>To understand product usage and improve App quality and user experience.</li>
          <li>To comply with legal obligations and enforce our terms.</li>
        </ul>
      </section>

      <section id="share" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">4. When We Share Information</h2>
        <p className="text-subtle">
          We share information only when needed to run the App, when you direct us to share it, or
          when the law requires it.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>
            <strong>Apple:</strong> for Sign in with Apple, App Store purchase processing, and
            Apple push notification services.
          </li>
          <li>
            <strong>Google:</strong> for Google Sign-In and, where used in our analysis pipeline,
            Google Gemini or related Google Cloud AI services.
          </li>
          <li>
            <strong>Firebase:</strong> for mobile infrastructure such as push messaging and app
            support services.
          </li>
          <li>
            <strong>AWS and our backend providers:</strong> for secure storage, compute, report
            generation, and delivery of App features.
          </li>
          <li>
            <strong>PostHog:</strong> for product analytics about App usage. We use PostHog to
            understand feature usage and quality, not for targeted advertising.
          </li>
          <li>
            <strong>Coaches you choose to work with:</strong> when you explicitly share reports or
            related content inside the App.
          </li>
          <li>
            <strong>Legal and safety reasons:</strong> if required by law, court order, or to
            protect users, the App, or our company.
          </li>
        </ul>
        <p className="text-subtle">
          We do not sell personal information to data brokers. We do not share App data with data
          brokers. We do not link data collected from the App with third-party data for
          cross-app, cross-site, or advertising purposes.
        </p>
      </section>

      <section id="cookies" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">
          5. Cookies and Tracking Technologies
        </h2>
        <p className="text-subtle">
          The Privacy Policy and Terms pages linked from the App are intended to be static legal
          pages. When these legal pages are opened from the App, we do not use cookies, pixels,
          Google Tag, or similar technologies on those pages for tracking purposes.
        </p>
        <p className="text-subtle">
          The App itself may use SDK-based diagnostics and product analytics to understand crashes,
          feature usage, and service quality. Those tools are used to operate and improve the App,
          not to serve targeted advertising and not to combine your App activity with third-party
          advertising profiles.
        </p>
      </section>

      <section id="ai" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">6. AI Processing</h2>
        <p className="text-subtle">
          SneakySwing includes AI-assisted analysis features. To provide those features, we may send
          the video, report context, motion data, and prompts required for the analysis workflow to
          our backend and to our AI service providers. We use this processing to generate swing
          feedback, summaries, and related App features, not for advertising.
        </p>
      </section>

      <section id="retention" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">
          7. Retention and Account Deletion
        </h2>
        <p className="text-subtle">
          We keep information for as long as your account is active or as needed to provide the
          App, maintain entitlement records, resolve disputes, enforce agreements, and comply with
          legal obligations. If you request account deletion, we will delete or de-identify your
          information within a reasonable period, except where retention is legally required or
          necessary for security, fraud prevention, or financial recordkeeping.
        </p>
      </section>

      <section id="choices" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">8. Your Choices and Rights</h2>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>You can update certain profile details from within the App.</li>
          <li>You can turn push notifications off in your iPhone or iPad settings.</li>
          <li>
            You can manage or cancel subscriptions through the App Store and use the App&apos;s restore
            purchases flow when available.
          </li>
          <li>
            You can request access, correction, or deletion by contacting{' '}
            <a
              href="mailto:contact@perflection.ai"
              className="font-bold text-golf-600 hover:text-golf-700"
            >
              contact@perflection.ai
            </a>
            .
          </li>
        </ul>
      </section>

      <section id="security" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">
          9. Security and International Processing
        </h2>
        <p className="text-subtle">
          We use reasonable administrative, technical, and organizational safeguards designed to
          protect personal information. No method of transmission or storage is completely secure,
          so we cannot guarantee absolute security. Depending on where you use the App, your data
          may be processed in the United States and other countries where our providers operate.
        </p>
      </section>

      <section id="children" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">10. Children&apos;s Privacy</h2>
        <p className="text-subtle">
          The App is not intended for children under 13. If you believe a child under 13 has
          provided personal information through the App, contact us and we will take appropriate
          steps to investigate and remove the data where required.
        </p>
      </section>

      <section id="changes">
        <h2 className="text-2xl font-display font-bold text-ink">11. Changes to This Policy</h2>
        <p className="text-subtle">
          We may update this Privacy Policy from time to time. If we make material changes, we will
          update the date above and may provide additional notice inside the App when appropriate.
        </p>
      </section>
    </>
  );
};
