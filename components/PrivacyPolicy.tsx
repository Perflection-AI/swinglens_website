import React, { useEffect } from 'react';
import { Header } from './Header';
import { EmailModal } from './EmailModal';
import { getBasePath } from '../utils/paths';

interface PrivacyPolicyProps {
  onOpenModal?: (title?: string) => void;
  isModalOpen?: boolean;
  modalTitle?: string;
  onCloseModal?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ 
  onOpenModal = () => {}, 
  isModalOpen = false, 
  modalTitle = 'Get Started',
  onCloseModal = () => {}
}) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <Header onOpenModal={onOpenModal} />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <a 
              href={getBasePath() === '/' ? '/' : getBasePath()} 
              onClick={(e) => {
                e.preventDefault();
                const base = getBasePath();
                window.history.pushState({}, '', base === '/' ? '/' : base);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-golf-600 hover:text-golf-700 text-sm font-bold inline-flex items-center gap-2"
            >
              ← Back to Home
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-soft-xl border border-ink/10 p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">PRIVACY POLICY</h1>
            <p className="text-subtle mb-8">Last updated September 18, 2025</p>

            <div className="prose prose-lg max-w-none text-ink">
              <p className="text-subtle mb-6">
                This Privacy Notice for <strong>Perflection.AI, Inc.</strong> ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
              </p>

              <ul className="list-disc pl-6 mb-6 text-subtle space-y-2">
                <li>Visit our website at <a href="https://perflection.ai" className="text-golf-600 hover:text-golf-700 font-bold" target="_blank" rel="noopener noreferrer">https://perflection.ai</a> or any website of ours that links to this Privacy Notice</li>
                <li>Use <strong>Perflection AI</strong>. A Coach-Led AI training platform that empowers coaches and recreational golfers to teach and train anytime, anywhere.</li>
                <li>Engage with us in other related ways, including any sales, marketing, or events</li>
              </ul>

              <p className="text-subtle mb-8">
                <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:contact@perflection.ai" className="text-golf-600 hover:text-golf-700 font-bold">contact@perflection.ai</a>.
              </p>

              <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">SUMMARY OF KEY POINTS</h2>
              <p className="text-subtle mb-4">
                <em>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</em>
              </p>

              <div className="space-y-4 mb-8">
                <p className="text-subtle">
                  <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a href="#personalinfo" className="text-golf-600 hover:text-golf-700 font-bold">personal information you disclose to us</a>.
                </p>

                <p className="text-subtle">
                  <strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. Learn more about <a href="#sensitiveinfo" className="text-golf-600 hover:text-golf-700 font-bold">sensitive information we process</a>.
                </p>

                <p className="text-subtle">
                  <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
                </p>

                <p className="text-subtle">
                  <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a href="#infouse" className="text-golf-600 hover:text-golf-700 font-bold">how we process your information</a>.
                </p>

                <p className="text-subtle">
                  <strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about <a href="#whoshare" className="text-golf-600 hover:text-golf-700 font-bold">when and with whom we share your personal information</a>.
                </p>

                <p className="text-subtle">
                  <strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about <a href="#infosafe" className="text-golf-600 hover:text-golf-700 font-bold">how we keep your information safe</a>.
                </p>

                <p className="text-subtle">
                  <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a href="#privacyrights" className="text-golf-600 hover:text-golf-700 font-bold">your privacy rights</a>.
                </p>

                <p className="text-subtle">
                  <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting <a href="mailto:contact@perflection.ai" className="text-golf-600 hover:text-golf-700 font-bold">contact@perflection.ai</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                </p>
              </div>

              <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">TABLE OF CONTENTS</h2>
              <ul className="list-disc pl-6 mb-8 text-subtle space-y-2">
                <li><a href="#infocollect" className="text-golf-600 hover:text-golf-700 font-bold">1. WHAT INFORMATION DO WE COLLECT?</a></li>
                <li><a href="#infouse" className="text-golf-600 hover:text-golf-700 font-bold">2. HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                <li><a href="#legalbases" className="text-golf-600 hover:text-golf-700 font-bold">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                <li><a href="#whoshare" className="text-golf-600 hover:text-golf-700 font-bold">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                <li><a href="#3pwebsites" className="text-golf-600 hover:text-golf-700 font-bold">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</a></li>
                <li><a href="#cookies" className="text-golf-600 hover:text-golf-700 font-bold">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
                <li><a href="#ai" className="text-golf-600 hover:text-golf-700 font-bold">7. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></li>
                <li><a href="#sociallogins" className="text-golf-600 hover:text-golf-700 font-bold">8. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
                <li><a href="#inforetain" className="text-golf-600 hover:text-golf-700 font-bold">9. HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                <li><a href="#infosafe" className="text-golf-600 hover:text-golf-700 font-bold">10. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                <li><a href="#privacyrights" className="text-golf-600 hover:text-golf-700 font-bold">11. WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                <li><a href="#DNT" className="text-golf-600 hover:text-golf-700 font-bold">12. CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                <li><a href="#uslaws" className="text-golf-600 hover:text-golf-700 font-bold">13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                <li><a href="#otherlaws" className="text-golf-600 hover:text-golf-700 font-bold">14. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                <li><a href="#policyupdates" className="text-golf-600 hover:text-golf-700 font-bold">15. DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                <li><a href="#contact" className="text-golf-600 hover:text-golf-700 font-bold">16. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                <li><a href="#request" className="text-golf-600 hover:text-golf-700 font-bold">17. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
              </ul>

              <section id="infocollect" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
                <h3 id="personalinfo" className="text-xl font-display font-bold text-ink mt-6 mb-3">Personal information you disclose to us</h3>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We collect personal information that you provide to us.</em>
                </p>
                <p className="text-subtle mb-4">
                  We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                </p>
                <p className="text-subtle mb-4">
                  <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
                </p>
                <ul className="list-disc pl-6 mb-4 text-subtle space-y-2">
                  <li>names</li>
                  <li>email addresses</li>
                  <li>phone numbers</li>
                  <li>mailing addresses</li>
                  <li>usernames</li>
                  <li>passwords</li>
                  <li>contact preferences</li>
                  <li>contact or authentication data</li>
                  <li>billing addresses</li>
                  <li>debit/credit card numbers</li>
                </ul>

                <h3 id="sensitiveinfo" className="text-xl font-display font-bold text-ink mt-6 mb-3">Sensitive Information.</h3>
                <p className="text-subtle mb-4">
                  When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:
                </p>
                <ul className="list-disc pl-6 mb-4 text-subtle space-y-2">
                  <li>health data</li>
                  <li>student data</li>
                  <li>video of users' physical movement including their faces</li>
                </ul>

                <p className="text-subtle mb-4">
                  <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by <strong>Stripe</strong>. You may find their privacy notice link(s) here: <a href="https://stripe.com/zh-us/privacy" className="text-golf-600 hover:text-golf-700 font-bold" target="_blank" rel="noopener noreferrer">https://stripe.com/zh-us/privacy</a>.
                </p>

                <h3 className="text-xl font-display font-bold text-ink mt-6 mb-3">Information automatically collected</h3>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em>
                </p>
                <p className="text-subtle mb-4">
                  We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.
                </p>
              </section>

              <section id="infouse" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em>
                </p>
                <p className="text-subtle mb-4">
                  <strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-subtle space-y-2">
                  <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                  <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
                  <li><strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
                  <li><strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time.</li>
                  <li><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                  <li><strong>To evaluate and improve our Services, products, marketing, and your experience.</strong> We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
                  <li><strong>To comply with our legal obligations.</strong> We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.</li>
                </ul>
              </section>

              <section id="legalbases" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em>
                </p>
                <p className="text-subtle mb-4">
                  <strong><u>If you are located in Canada, this section applies to you.</u></strong>
                </p>
                <p className="text-subtle mb-4">
                  We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can <a href="#withdrawconsent" className="text-golf-600 hover:text-golf-700 font-bold">withdraw your consent</a> at any time.
                </p>
              </section>

              <section id="whoshare" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</em>
                </p>
                <p className="text-subtle mb-4">
                  We may need to share your personal information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-4 text-subtle space-y-2">
                  <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                  <li><strong>Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</li>
                  <li><strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.</li>
                  <li><strong>Other Users.</strong> When you share personal information (for example, by posting comments, contributions, or other content to the Services) or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity.</li>
                </ul>
              </section>

              <section id="3pwebsites" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.</em>
                </p>
                <p className="text-subtle mb-4">
                  The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications.
                </p>
              </section>

              <section id="cookies" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</em>
                </p>
                <p className="text-subtle mb-4">
                  We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
                </p>
              </section>

              <section id="ai" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">7. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.</em>
                </p>
                <p className="text-subtle mb-4">
                  As part of our Services, we offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies (collectively, "AI Products"). These tools are designed to enhance your experience and provide you with innovative solutions.
                </p>
                <p className="text-subtle mb-4">
                  <strong>Use of AI Technologies</strong>
                </p>
                <p className="text-subtle mb-4">
                  We provide the AI Products through third-party service providers ("AI Service Providers"), including <strong>Google Cloud AI</strong>. As outlined in this Privacy Notice, your input, output, and personal information will be shared with and processed by these AI Service Providers to enable your use of our AI Products.
                </p>
                <p className="text-subtle mb-4">
                  <strong>Our AI Products</strong>
                </p>
                <p className="text-subtle mb-4">Our AI Products are designed for the following functions:</p>
                <ul className="list-disc pl-6 mb-4 text-subtle space-y-2">
                  <li>Video analysis</li>
                  <li>AI bots</li>
                  <li>AI insights</li>
                  <li>AI predictive analytics</li>
                  <li>AI translation</li>
                  <li>Image analysis</li>
                  <li>Machine learning models</li>
                  <li>AI applications</li>
                  <li>Natural language processing</li>
                  <li>Text analysis</li>
                </ul>
              </section>

              <section id="sociallogins" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">8. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em>
                </p>
                <p className="text-subtle mb-4">
                  Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider.
                </p>
              </section>

              <section id="inforetain" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">9. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em>
                </p>
                <p className="text-subtle mb-4">
                  We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). This includes both personal information required for the app's functionality and data collected for internal research and development (such as biometric information), for which we may obtain your separate, explicit consent.
                </p>
                <p className="text-subtle mb-4">
                  As a general rule, our retention period for all categories of personal information is tied to your account status. We will permanently destroy your personal information upon the earliest of the following events:
                </p>
                <ul className="list-disc pl-6 mb-4 text-subtle space-y-2">
                  <li>The initial purpose for collecting the information has been satisfied;</li>
                  <li>You submit a verifiable request for us to delete your information (as described in the "Your Privacy Rights" section), subject to any legal or contractual exceptions; or</li>
                  <li>A maximum of three (3) years has passed since the termination or deletion of your user account.</li>
                </ul>
              </section>

              <section id="infosafe" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">10. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</em>
                </p>
                <p className="text-subtle mb-4">
                  We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </p>
              </section>

              <section id="privacyrights" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">11. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em>
                </p>
                <p className="text-subtle mb-4">
                  In some regions (like Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making.
                </p>
                <p className="text-subtle mb-4">
                  <strong><u>Withdrawing your consent:</u></strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section <a href="#contact" className="text-golf-600 hover:text-golf-700 font-bold">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a> below.
                </p>
              </section>

              <section id="DNT" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">12. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                <p className="text-subtle mb-4">
                  Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.
                </p>
              </section>

              <section id="uslaws" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.</em>
                </p>
                <p className="text-subtle mb-4">
                  <strong>Your Rights</strong>
                </p>
                <p className="text-subtle mb-4">You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>
                <ul className="list-disc pl-6 mb-4 text-subtle space-y-2">
                  <li><strong>Right to know</strong> whether or not we are processing your personal data</li>
                  <li><strong>Right to access</strong> your personal data</li>
                  <li><strong>Right to correct</strong> inaccuracies in your personal data</li>
                  <li><strong>Right to request</strong> the deletion of your personal data</li>
                  <li><strong>Right to obtain a copy</strong> of the personal data you previously shared with us</li>
                  <li><strong>Right to non-discrimination</strong> for exercising your rights</li>
                  <li><strong>Right to opt out</strong> of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects</li>
                </ul>
                <p className="text-subtle mb-4">
                  <strong>How to Exercise Your Rights</strong>
                </p>
                <p className="text-subtle mb-4">
                  To exercise these rights, you can contact us by emailing us at <a href="mailto:contact@perflection.ai" className="text-golf-600 hover:text-golf-700 font-bold">contact@perflection.ai</a>, or by referring to the contact details at the bottom of this document.
                </p>
              </section>

              <section id="otherlaws" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">14. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                <h3 className="text-xl font-display font-bold text-ink mt-6 mb-3">Australia and New Zealand</h3>
                <p className="text-subtle mb-4">
                  We collect and process your personal information under the obligations and conditions set by Australia's Privacy Act 1988 and New Zealand's Privacy Act 2020 (Privacy Act).
                </p>
                <p className="text-subtle mb-4">
                  If you believe we are unlawfully processing your personal information, you have the right to submit a complaint about a breach of the Australian Privacy Principles to the <a href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us" className="text-golf-600 hover:text-golf-700 font-bold" target="_blank" rel="noopener noreferrer">Office of the Australian Information Commissioner</a> and a breach of New Zealand's Privacy Principles to the <a href="https://www.privacy.org.nz/your-rights/making-a-complaint/" className="text-golf-600 hover:text-golf-700 font-bold" target="_blank" rel="noopener noreferrer">Office of New Zealand Privacy Commissioner</a>.
                </p>
              </section>

              <section id="policyupdates" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">15. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                <p className="text-subtle mb-4">
                  <em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em>
                </p>
                <p className="text-subtle mb-4">
                  We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
                </p>
              </section>

              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">16. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                <p className="text-subtle mb-4">
                  If you have questions or comments about this notice, you may email us at <a href="mailto:contact@perflection.ai" className="text-golf-600 hover:text-golf-700 font-bold">contact@perflection.ai</a> or contact us by post at:
                </p>
                <p className="text-subtle mb-4">
                  <strong>Perflection.AI, Inc.</strong><br />
                  4620 Henry Street<br />
                  Pittsburgh, PA 15213<br />
                  United States
                </p>
              </section>

              <section id="request" className="mb-8">
                <h2 className="text-2xl font-display font-bold text-ink mt-8 mb-4">17. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
                <p className="text-subtle mb-4">
                  Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. To request to review, update, or delete your personal information, please visit: <a href="mailto:contact@perflection.ai" className="text-golf-600 hover:text-golf-700 font-bold">contact@perflection.ai</a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <EmailModal isOpen={isModalOpen} onClose={onCloseModal} title={modalTitle} />
    </div>
  );
};

