import React from 'react';

export const TermsAndConditionsContent: React.FC = () => {
  return (
    <>
      <section id="agreement" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">1. Agreement to These Terms</h2>
        <p className="text-subtle">
          These Terms and Conditions form a binding agreement between you and Perflection.AI, Inc.
          ("we," "us," or "our") regarding your access to and use of the SneakySwing mobile app
          and related app services (the "App"). By using the App, you agree to these terms. If you
          do not agree, do not use the App.
        </p>
        <p className="text-subtle">
          The App is intended for users who are at least 13 years old. If you are under the age of
          majority where you live, you may use the App only with permission and supervision from a
          parent or guardian.
        </p>
      </section>

      <section id="accounts" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">2. Accounts and Acceptable Use</h2>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>You must provide accurate registration information and keep it up to date.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>
            You may not use the App to violate the law, interfere with other users, reverse
            engineer protected portions of the service, or attempt unauthorized access to our
            systems.
          </li>
          <li>
            You may not upload content that you do not have the right to use, or content that is
            unlawful, abusive, infringing, or harmful.
          </li>
        </ul>
      </section>

      <section id="services" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">3. App Features and AI Analysis</h2>
        <p className="text-subtle">
          SneakySwing helps users record or upload golf swing videos, generate motion and pose
          analysis, receive AI-assisted swing feedback, and share reports with coaches.
        </p>
        <p className="text-subtle">
          AI-generated feedback is informational only. It is not medical advice, injury-prevention
          advice, or a guarantee of athletic results. You are responsible for your training
          decisions, physical condition, and how you act on the App&apos;s feedback.
        </p>
      </section>

      <section id="content" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">4. Your Content and Coach Sharing</h2>
        <p className="text-subtle">
          You retain ownership of the videos, annotations, and other content you submit to the App,
          subject to any rights needed for us to operate the service. By using the App, you grant
          us a limited license to host, store, process, analyze, transmit, and display your content
          as necessary to provide the App.
        </p>
        <p className="text-subtle">
          If you choose to share a report or related media with a coach through the App, you direct
          us to make that content available to the selected coach. You are responsible for ensuring
          that you have the right to share the content and that the coach relationship is authorized
          by you.
        </p>
      </section>

      <section id="purchases" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">
          5. Digital Purchases, Subscriptions, and Credits
        </h2>
        <p className="text-subtle">
          The App may offer digital memberships and consumable analysis-credit packages to eligible
          student users through Apple In-App Purchase. Coach accounts do not currently purchase
          separate in-app digital products.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>
            For memberships and credits bought through Apple In-App Purchase, payment, billing,
            refunds, and subscription management are handled by Apple under the App Store terms and
            your Apple account settings.
          </li>
          <li>
            Subscriptions renew automatically unless canceled through your App Store subscription
            settings before renewal.
          </li>
          <li>
            Consumable credits are digital entitlements that may be used for eligible App features,
            such as AI swing analysis, and may decrease when those features are completed.
          </li>
          <li>
            Prices may vary by storefront, taxes, and Apple pricing rules. Restore Purchases is
            available for eligible purchases where supported by Apple.
          </li>
          <li>
            The App does not bundle physical goods, shipped products, or in-person services with
            its digital memberships or credit purchases.
          </li>
          <li>Credits have no cash value except where required by law.</li>
        </ul>
      </section>

      <section id="coach-reviews" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">6. Paid Coach Reviews</h2>
        <p className="text-subtle">
          Coaches on SneakySwing are independent golf instructors, not employees or agents of
          Perflection.AI, Inc. A coach may review your videos for free or set a price per review.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-subtle">
          <li>
            When you pay for a review, you are buying it from that coach, and the coach is
            responsible for the instruction they provide.
          </li>
          <li>
            Payments for coach reviews are processed by Stripe and go to the coach&apos;s own Stripe
            account. Perflection.AI, Inc. keeps a platform fee from each paid review. The fee comes
            out of the coach&apos;s earnings and does not change the price you pay.
          </li>
          <li>
            Paying a coach does not buy or unlock App memberships, credits, or other digital products
            sold through Apple In-App Purchase.
          </li>
          <li>
            Coaches who accept payments must complete Stripe&apos;s identity verification, agree to
            Stripe&apos;s Connected Account Agreement, and are responsible for any taxes on their
            earnings.
          </li>
          <li>
            If a paid review is not delivered, or you have a problem with one, contact{' '}
            <a
              href="mailto:operation@perflection.ai"
              className="font-bold text-green hover:text-ink"
            >
              operation@perflection.ai
            </a>
            . We will look into it and may issue a refund where appropriate.
          </li>
        </ul>
      </section>

      <section id="license" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">7. App License and Intellectual Property</h2>
        <p className="text-subtle">
          Subject to these terms, we grant you a limited, revocable, non-exclusive,
          non-transferable license to use the App on Apple-branded devices that you own or control,
          in accordance with the App Store Usage Rules.
        </p>
        <p className="text-subtle">
          The App, including its software, reports, visual design, text, graphics, and trademarks,
          is owned by us or our licensors and is protected by law. Except for the limited right to
          use the App under these terms, we reserve all rights.
        </p>
        <p className="text-subtle">
          Apple is not responsible for the App or its content, but Apple and its subsidiaries are
          third-party beneficiaries of these terms as they relate to your use of the iOS app.
        </p>
      </section>

      <section id="termination" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">8. Suspension and Termination</h2>
        <p className="text-subtle">
          We may suspend or terminate access to the App if we reasonably believe you have violated
          these terms, used the App in a harmful or unlawful way, or created risk for other users,
          our systems, or our business. You may stop using the App at any time.
        </p>
      </section>

      <section id="disclaimer" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">9. Disclaimer of Warranties</h2>
        <p className="text-subtle">
          To the fullest extent permitted by law, the App is provided "as is" and "as available."
          We do not guarantee uninterrupted availability, error-free operation, or that the App&apos;s
          output will meet every expectation, coaching preference, or performance goal.
        </p>
      </section>

      <section id="liability" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">10. Limitation of Liability</h2>
        <p className="text-subtle">
          To the fullest extent permitted by law, Perflection.AI, Inc. and its affiliates,
          officers, employees, licensors, and service providers will not be liable for indirect,
          incidental, special, consequential, exemplary, or punitive damages, or for loss of data,
          revenue, profits, or goodwill arising from or related to the App. Where the law does not
          allow a full limitation, our liability will be limited to the maximum extent permitted by
          law.
        </p>
      </section>

      <section id="law" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">11. Governing Law</h2>
        <p className="text-subtle">
          These terms are governed by the laws of the State of Delaware, without regard to conflict
          of law principles, except where mandatory law in your jurisdiction requires otherwise.
        </p>
      </section>

      <section id="changes" className="mb-8">
        <h2 className="text-2xl font-display font-bold text-ink">12. Changes to the App or Terms</h2>
        <p className="text-subtle">
          We may update the App and these terms from time to time. If we make material changes, we
          will post the updated terms and revise the "Last updated" date above.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-display font-bold text-ink">13. Contact</h2>
        <p className="text-subtle">
          Questions about these terms can be sent to{' '}
          <a
            href="mailto:operation@perflection.ai"
            className="font-bold text-green hover:text-ink"
          >
            operation@perflection.ai
          </a>
          .
        </p>
      </section>
    </>
  );
};
