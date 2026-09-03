import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">1. Introduction</h2>
        <p>Welcome to Spheronix Technology. We respect your privacy and are committed to protecting your personal data.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">2. Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you when you use our services or visit our website.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide our services, manage our relationship with you, and improve our offerings.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">5. Contact Us</h2>
        <p>If you have any questions about this privacy policy or our privacy practices, please contact us.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
