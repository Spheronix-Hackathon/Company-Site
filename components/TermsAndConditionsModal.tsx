import React from 'react';
import { X } from 'lucide-react';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-violet-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-in zoom-in-95 duration-200 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-10"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h2>
          <p className="text-slate-400 text-sm">Last updated on 05-03-2026 19:46:06</p>
        </div>

        <div className="text-slate-300 text-sm leading-relaxed space-y-4">
          <h3 className="text-lg font-semibold text-white mt-4">1. Introduction</h3>
          <p>Welcome to Spheronix Technology (“Spheronix,” “we,” “us,” or “our”).</p>
          <p>These Terms & Conditions (“Terms”) govern your access to and use of the Spheronix Technology website, online platforms, forms, services, training-related resources, placement-related services, events, and other digital services made available by Spheronix.</p>
          <p>By accessing, browsing, or using our website or services, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
          <p>If you do not agree with these Terms, please do not use our website or services.</p>
          <p>These Terms should be read together with our Privacy Policy, which explains how we collect, use, store, and protect personal information.</p>

          <h3 className="text-lg font-semibold text-white mt-4">2. About Spheronix Technology</h3>
          <p>Spheronix Technology is a technology-focused organization involved in activities including technology solutions, IT training, skill development, internships, student programs, placement assistance, software and web-related services, artificial intelligence, robotics, cloud technologies, data analytics, and related technology initiatives.</p>
          <p>The availability of specific services, programs, courses, events, products, or activities may change from time to time.</p>

          <h3 className="text-lg font-semibold text-white mt-4">3. Eligibility to Use the Website</h3>
          <p>You may use our website and services only if you are legally capable of entering into an agreement under applicable law.</p>
          <p>If you are a student or participant in a Spheronix training, internship, event, hackathon, placement, or educational program, additional terms or instructions may apply to that particular program.</p>
          <p>Where a participant is a minor, participation may be subject to applicable parental, guardian, educational institution, or other authorization requirements.</p>

          <h3 className="text-lg font-semibold text-white mt-4">4. Permitted Use</h3>
          <p>You agree to use the Spheronix website and services only for lawful purposes. You may use the website to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Learn about Spheronix and its activities;</li>
            <li>Explore training and educational opportunities;</li>
            <li>Register for applicable programs, events, workshops, or competitions;</li>
            <li>Submit enquiries;</li>
            <li>Explore career and employment opportunities;</li>
            <li>Participate in authorized online activities;</li>
            <li>Access information and resources made available by Spheronix; and</li>
            <li>Communicate with Spheronix for legitimate purposes.</li>
          </ul>
          <p>You must not use the website or services for any unlawful, fraudulent, abusive, or unauthorized purpose.</p>

          <h3 className="text-lg font-semibold text-white mt-4">5. Prohibited Activities</h3>
          <p>You must not:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Attempt to gain unauthorized access to our website, systems, databases, accounts, or networks;</li>
            <li>Introduce viruses, malware, malicious code, or other harmful technologies;</li>
            <li>Interfere with the operation, security, or availability of our website or services;</li>
            <li>Use automated systems to scrape, crawl, copy, or extract website information without our prior written permission;</li>
            <li>Attempt to bypass or disable security mechanisms;</li>
            <li>Impersonate Spheronix, its employees, representatives, students, customers, or other users;</li>
            <li>Submit false, misleading, fraudulent, or unauthorized information;</li>
            <li>Use another person's account or credentials without authorization;</li>
            <li>Upload or transmit unlawful, defamatory, abusive, threatening, or infringing material;</li>
            <li>Use the website to distribute spam or unsolicited communications;</li>
            <li>Copy, reproduce, modify, or commercially exploit website content without authorization; or</li>
            <li>Engage in any activity that may damage Spheronix, its users, systems, reputation, or business operations.</li>
          </ul>
          <p>Spheronix reserves the right to restrict or terminate access where it reasonably believes that these Terms have been violated.</p>

          <h3 className="text-lg font-semibold text-white mt-4">6. Student, Training and Placement Programs</h3>
          <p>Spheronix may provide training, internship, skill-development, placement assistance, workshops, hackathons, competitions, and other educational or professional-development programs.</p>
          <p>Participation in such programs may be subject to additional program-specific requirements.</p>
          <p>Registration or participation in a training or placement program does not automatically guarantee:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Employment;</li>
            <li>Internship selection;</li>
            <li>Placement;</li>
            <li>A particular salary or compensation;</li>
            <li>Selection by a third-party employer;</li>
            <li>Certification; or</li>
            <li>Any specific career outcome.</li>
          </ul>
          <p>Where placement assistance is provided, Spheronix may facilitate communication between eligible candidates and prospective employers. Final recruitment and employment decisions are generally made by the relevant employer.</p>
          <p>Students and participants are responsible for providing accurate information and meeting the requirements of the relevant program.</p>

          <h3 className="text-lg font-semibold text-white mt-4">7. Registration and User Information</h3>
          <p>Certain services may require you to submit registration or account information.</p>
          <p>You agree that information submitted by you will be accurate, complete, and current.</p>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Providing accurate information;</li>
            <li>Updating information when necessary;</li>
            <li>Maintaining the confidentiality of account credentials, where applicable; and</li>
            <li>Notifying Spheronix of unauthorized use of your account or credentials.</li>
          </ul>
          <p>Spheronix may suspend or restrict an account where information appears to be fraudulent, misleading, unauthorized, or in violation of these Terms.</p>
          <p>Our collection and use of personal information is governed by our Privacy Policy.</p>

          <h3 className="text-lg font-semibold text-white mt-4">8. Intellectual Property</h3>
          <p>Unless otherwise stated, the content available on the Spheronix website and platforms, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Company names;</li>
            <li>Logos;</li>
            <li>Trademarks;</li>
            <li>Text;</li>
            <li>Graphics;</li>
            <li>Images;</li>
            <li>Videos;</li>
            <li>Software;</li>
            <li>Website design;</li>
            <li>Training materials;</li>
            <li>Documentation;</li>
            <li>Course content;</li>
            <li>Presentations;</li>
            <li>Reports; and</li>
            <li>Other materials</li>
          </ul>
          <p>is owned by or licensed to Spheronix Technology and may be protected by applicable intellectual-property laws.</p>
          <p>You may view and use website content for legitimate personal or business information purposes, subject to these Terms.</p>
          <p>You must not reproduce, distribute, modify, publish, sell, license, transmit, or commercially exploit Spheronix content without prior written authorization, unless permitted by applicable law.</p>

          <h3 className="text-lg font-semibold text-white mt-4">9. Student and User Submissions</h3>
          <p>Where the website or a Spheronix program allows you to submit information, documents, projects, resumes, applications, feedback, ideas, or other materials, you are responsible for ensuring that you have the right to submit such material.</p>
          <p>You must not submit material that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Belongs to another person without authorization;</li>
            <li>Violates intellectual-property rights;</li>
            <li>Contains unlawful or malicious content;</li>
            <li>Contains confidential information that you are not authorized to disclose; or</li>
            <li>Violates applicable laws or third-party rights.</li>
          </ul>
          <p>Personal information submitted to Spheronix will be handled in accordance with our Privacy Policy.</p>

          <h3 className="text-lg font-semibold text-white mt-4">10. Training and Educational Content</h3>
          <p>Spheronix may provide educational, technical, training, or informational content through its website, programs, platforms, or communications.</p>
          <p>Such content is intended for educational and informational purposes.</p>
          <p>Although we seek to provide useful and accurate information, Spheronix does not guarantee that all educational or technical content will always be complete, current, error-free, or suitable for every individual or purpose.</p>
          <p>Technology, software, programming languages, frameworks, tools, and industry requirements may change over time.</p>

          <h3 className="text-lg font-semibold text-white mt-4">11. Third-Party Services and Links</h3>
          <p>Our website or services may contain links to third-party websites, applications, platforms, payment providers, educational institutions, employers, recruitment platforms, or other external services.</p>
          <p>Third-party services operate independently and may have their own:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Terms and conditions;</li>
            <li>Privacy policies;</li>
            <li>Security practices; and</li>
            <li>User requirements.</li>
          </ul>
          <p>Spheronix does not control third-party websites or services and is not responsible for their content, availability, security, privacy practices, or policies.</p>
          <p>You should review the applicable terms and privacy policies before using third-party services.</p>

          <h3 className="text-lg font-semibold text-white mt-4">12. Payments and Fees</h3>
          <p>Certain Spheronix programs, training courses, events, services, or activities may require payment.</p>
          <p>Where applicable, fees, payment terms, cancellation terms, refund policies, and other applicable conditions will be communicated through the relevant service, registration page, invoice, agreement, or other applicable documentation.</p>
          <p>You agree to provide accurate payment and billing information where required.</p>
          <p>Payments may be processed through authorized third-party payment providers. Spheronix may not directly process or store all payment-card information.</p>

          <h3 className="text-lg font-semibold text-white mt-4">13. Website Availability</h3>
          <p>We aim to keep our website and online platforms available and functional. However, we do not guarantee uninterrupted or error-free availability.</p>
          <p>The website may occasionally be unavailable because of:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Maintenance;</li>
            <li>Updates;</li>
            <li>Technical issues;</li>
            <li>Security incidents;</li>
            <li>Network problems;</li>
            <li>Third-party service interruptions;</li>
            <li>Force majeure events; or</li>
            <li>Other circumstances beyond our reasonable control.</li>
          </ul>
          <p>Spheronix may modify, suspend, restrict, or discontinue any part of the website or services when reasonably necessary.</p>

          <h3 className="text-lg font-semibold text-white mt-4">14. Accuracy of Information</h3>
          <p>We make reasonable efforts to provide useful and accurate information on our website.</p>
          <p>However, information may change over time, and we do not guarantee that all website content will always be:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Complete;</li>
            <li>Accurate;</li>
            <li>Current;</li>
            <li>Error-free; or</li>
            <li>Available at all times.</li>
          </ul>
          <p>Users should verify important information directly with Spheronix before relying on it for significant decisions.</p>

          <h3 className="text-lg font-semibold text-white mt-4">15. Disclaimer</h3>
          <p>To the maximum extent permitted by applicable law, the website and its content are provided on an “as available” and “as is” basis.</p>
          <p>Spheronix does not guarantee that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The website will always be available;</li>
            <li>The website will operate without errors;</li>
            <li>All information will always be accurate or complete;</li>
            <li>The website will be free from viruses or other harmful components; or</li>
            <li>Any training, placement, employment, business, or other outcome will be achieved through use of the website or services.</li>
          </ul>
          <p>Nothing in these Terms excludes or limits any right, protection, or remedy that cannot lawfully be excluded or limited under applicable law.</p>

          <h3 className="text-lg font-semibold text-white mt-4">16. Limitation of Liability</h3>
          <p>To the maximum extent permitted by applicable law, Spheronix Technology and its directors, employees, representatives, affiliates, service providers, and authorized partners will not be liable for indirect, incidental, consequential, special, or exemplary losses arising from or relating to your use of the website or services.</p>
          <p>This may include, where legally permitted, loss of data, business interruption, loss of profits, loss of opportunities, or other consequential losses.</p>
          <p>Nothing in these Terms is intended to exclude liability that cannot legally be excluded under applicable law.</p>

          <h3 className="text-lg font-semibold text-white mt-4">17. Indemnification</h3>
          <p>To the extent permitted by applicable law, you agree to be responsible for losses, claims, liabilities, damages, costs, or expenses arising from your:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Violation of these Terms;</li>
            <li>Unlawful use of the website;</li>
            <li>Misuse of Spheronix services;</li>
            <li>Violation of another person's rights;</li>
            <li>Unauthorized submission or use of content; or</li>
            <li>Fraudulent or intentionally wrongful conduct.</li>
          </ul>
          <p>This provision applies only to the extent permitted by applicable law.</p>

          <h3 className="text-lg font-semibold text-white mt-4">18. Privacy</h3>
          <p>Your use of the Spheronix website and services may involve the collection and processing of personal information.</p>
          <p>Our collection, use, storage, sharing, and protection of personal information are described in our Privacy Policy.</p>
          <p>Where applicable, separate privacy notices or consent requirements may apply to particular activities, including student programs, placement activities, employment, events, or other services.</p>

          <h3 className="text-lg font-semibold text-white mt-4">19. Confidentiality</h3>
          <p>Certain information provided through Spheronix services may be confidential.</p>
          <p>Users must not disclose confidential information belonging to Spheronix or another party where they are under an obligation to maintain confidentiality.</p>
          <p>This provision does not restrict disclosures that are required by law or otherwise legally protected.</p>

          <h3 className="text-lg font-semibold text-white mt-4">20. Suspension or Termination</h3>
          <p>Spheronix may suspend, restrict, or terminate your access to the website or particular services if:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You violate these Terms;</li>
            <li>You provide false or misleading information;</li>
            <li>Your activity creates a security or operational risk;</li>
            <li>Your activity may harm Spheronix or another user;</li>
            <li>Your use is unlawful; or</li>
            <li>Suspension is reasonably necessary for security, maintenance, or legal reasons.</li>
          </ul>
          <p>Termination or suspension will not affect rights or obligations that arose before the termination or that are intended to continue afterward.</p>

          <h3 className="text-lg font-semibold text-white mt-4">21. Changes to These Terms</h3>
          <p>Spheronix may modify these Terms from time to time to reflect:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Changes in our business;</li>
            <li>Changes to our website or services;</li>
            <li>Changes in technology;</li>
            <li>Changes in applicable laws;</li>
            <li>Security requirements; or</li>
            <li>Improvements to our services.</li>
          </ul>
          <p>Updated Terms will be published on the website with a revised “Last Updated” date.</p>
          <p>Your continued use of the website after updated Terms are published may constitute acceptance of the revised Terms to the extent permitted by applicable law.</p>

          <h3 className="text-lg font-semibold text-white mt-4">22. Governing Law and Jurisdiction</h3>
          <p>These Terms shall be governed by and interpreted in accordance with the laws of India, subject to applicable law.</p>
          <p>Any dispute arising from or relating to these Terms or your use of the website shall be subject to the jurisdiction of the competent courts having jurisdiction over Spheronix Technology's applicable registered or principal office, subject to applicable law.</p>
          <p>The exact jurisdiction should be confirmed by Spheronix's legal counsel based on the company's registered office and applicable corporate records before publication.</p>

          <h3 className="text-lg font-semibold text-white mt-4">23. Severability</h3>
          <p>If any provision of these Terms is determined to be invalid, unlawful, or unenforceable by a competent authority, that provision shall be interpreted or modified to the extent necessary to make it enforceable, where legally possible.</p>
          <p>The remaining provisions will continue to remain in effect.</p>

          <h3 className="text-lg font-semibold text-white mt-4">24. No Waiver</h3>
          <p>Failure by Spheronix to enforce any provision of these Terms does not constitute a waiver of our right to enforce that provision or any other provision in the future.</p>

          <h3 className="text-lg font-semibold text-white mt-4">25. Entire Agreement</h3>
          <p>These Terms, together with our Privacy Policy and any additional terms specifically applicable to particular services or programs, constitute the terms governing your use of the relevant Spheronix website or services, unless a separate written agreement applies.</p>
          <p>Where a separate agreement conflicts with these Terms, the specific written agreement may govern the relevant service or relationship to the extent provided in that agreement.</p>

          <h3 className="text-lg font-semibold text-white mt-4">26. Contact Us</h3>
          <p>If you have questions regarding these Terms & Conditions, please contact us.</p>
          <p className="mt-2">
            Spheronix Technology<br />
            5th Floor, No. 8 & 9,<br />
            Shantipura Main Road, Phase II,<br />
            Electronic City, Konappana Agrahara,<br />
            Karnataka – 560100, India.<br />
            Email: dhanushsunny00@gmail.com<br />
            Privacy Contact: support@spheronixtechnology.in<br />
            Website: spheronixtechnology.in
          </p>

          <h3 className="text-lg font-semibold text-white mt-4">27. Acceptance</h3>
          <p>By accessing or using the Spheronix Technology website or applicable services, you acknowledge that you have read and understood these Terms & Conditions and agree to comply with them.</p>
          <p>If you do not agree with these Terms, you should discontinue use of the website and relevant services.</p>
          <p className="mt-4 text-center">© Spheronix Technology. All rights reserved.</p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="bg-violet-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-violet-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;