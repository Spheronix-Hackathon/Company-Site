import React from 'react';
import { ShieldCheck, BadgeCheck } from 'lucide-react';

// Import local certificate images
import iso9001 from '../../../assets/certificates/ISO 9001.png';
import startupIndia from '../../../assets/certificates/Startup India.jpg';
import nsdcPartner from '../../../assets/certificates/NSDC Partner.png';
import iso29990 from '../../../assets/certificates/ISO 29990.png';

const certificates = [
  { name: 'ISO 9001', image: iso9001, status: 'Certified' },
  { name: 'Startup India', image: startupIndia, status: 'Recognized' },
  { name: 'NSDC Partner', image: nsdcPartner, status: 'Partner' },
  { name: 'ISO 29990', image: iso29990, status: 'Certified' }
];

const Certifications: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="md:w-5/12">
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
              Recognized by <br />
              <span className="text-gradient">International Bodies & Govt.</span>
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Our curriculum and training methodologies are audited and certified for quality and student outcomes. We maintain global standards in tech education.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-bold text-white">ISO 9001:2015 Certified</h4>
                  <p className="text-sm text-slate-400">Quality Management Systems</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BadgeCheck className="w-6 h-6 text-violet-500 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Startup India Recognized</h4>
                  <p className="text-sm text-slate-400">Department for Promotion of Industry and Internal Trade</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-7/12 grid grid-cols-2 gap-6">
            {certificates.map((cert, i) => (
              <div key={i} className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-fuchsia-500/30 transition-colors group">
                <div className="h-40 w-full mb-4 bg-slate-900/50 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                        src={cert.image} 
                        alt={cert.name} 
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <span className="font-bold text-slate-200">{cert.name}</span>
                <span className="text-xs text-slate-500 mt-1">{cert.status}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Certifications;