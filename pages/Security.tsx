import React from 'react';

const Security: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-slate-300">
      <h1 className="text-4xl font-bold text-white mb-8">Security Overview</h1>
      <div className="space-y-6">
        <p>At Spheronix Technology, the security of our systems and your data is our top priority.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">Infrastructure Security</h2>
        <p>Our infrastructure is hosted on industry-leading cloud providers with robust physical and network security controls.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">Data Protection</h2>
        <p>All data is encrypted at rest and in transit using industry-standard encryption protocols.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">Access Control</h2>
        <p>We implement strict access controls and principle of least privilege across our organization.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">Vulnerability Management</h2>
        <p>We regularly conduct security assessments and vulnerability scans to identify and address potential security risks.</p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">Reporting Security Issues</h2>
        <p>If you believe you have discovered a security vulnerability in our systems, please contact our security team immediately.</p>
      </div>
    </div>
  );
};

export default Security;
