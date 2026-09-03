import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Terms and Conditions</h1>
      <div className="space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">1. Agreement to Terms</h2>
        <p>By accessing our website and using our services, you agree to be bound by these Terms and Conditions and our Privacy Policy.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">2. Intellectual Property Rights</h2>
        <p>Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">3. User Responsibilities</h2>
        <p>You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">4. Limitations of Liability</h2>
        <p>Spheronix Technology will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">5. Changes to Terms</h2>
        <p>We reserve the right to revise these terms and conditions at any time. By using this website you are expected to review these terms and conditions on a regular basis.</p>
      </div>
    </div>
  );
};

export default Terms;
