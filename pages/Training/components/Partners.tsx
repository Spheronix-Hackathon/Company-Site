import React from 'react';

// Explicitly import all logos from assets using relative paths
import accentureLogo from '../../../assets/company_logos/accenture_logo.png';
import amazonLogo from '../../../assets/company_logos/amazon_logo.png';
import credLogo from '../../../assets/company_logos/cred_logo.png';
import atlassianLogo from '../../../assets/company_logos/atlassian_logo.png';
import deloitteLogo from '../../../assets/company_logos/deloitte_logo.png';
import flipkartLogo from '../../../assets/company_logos/flipkart_logo.png';
import googleLogo from '../../../assets/company_logos/google_logo.png';
import ibmLogo from '../../../assets/company_logos/ibm_logo.png';
import infosysLogo from '../../../assets/company_logos/infosys_logo.png';
import microsoftLogo from '../../../assets/company_logos/microsoft_logo.png';
import oracleLogo from '../../../assets/company_logos/oracle_logo.png';
import phonepeLogo from '../../../assets/company_logos/phonepe_logo.png';
import razorpayLogo from '../../../assets/company_logos/razorpay_logo.png';
import salesforceLogo from '../../../assets/company_logos/salesforce_logo.png';
import swiggyLogo from '../../../assets/company_logos/swiggy_logo.png';
import tcsLogo from '../../../assets/company_logos/tcs_logo.png';
import uberLogo from '../../../assets/company_logos/uber_logo.png';
import zomatoLogo from '../../../assets/company_logos/zomoto_logo.png'; // Note: filename is zomoto_logo.png

const companies = [
  { name: 'Accenture', logo: accentureLogo },
  { name: 'Amazon', logo: amazonLogo },
  { name: 'Atlassian', logo: atlassianLogo },
  { name: 'CRED', logo: credLogo },
  { name: 'Deloitte', logo: deloitteLogo },
  { name: 'Flipkart', logo: flipkartLogo },
  { name: 'Google', logo: googleLogo },
  { name: 'IBM', logo: ibmLogo },
  { name: 'Infosys', logo: infosysLogo },
  { name: 'Microsoft', logo: microsoftLogo },
  { name: 'Oracle', logo: oracleLogo },
  { name: 'PhonePe', logo: phonepeLogo },
  { name: 'Razorpay', logo: razorpayLogo },
  { name: 'Salesforce', logo: salesforceLogo },
  { name: 'Swiggy', logo: swiggyLogo },
  { name: 'TCS', logo: tcsLogo },
  { name: 'Uber', logo: uberLogo },
  { name: 'Zomato', logo: zomatoLogo }
];

const CompanyCard: React.FC<{ company: { name: string, logo: string } }> = ({ company }) => (
  <div className="
    mx-8 w-40 h-24
    flex items-center justify-center
    relative
    group/card
    cursor-pointer
    flex-shrink-0
  ">
    {/* Logo Image */}
    <img 
      src={company.logo} 
      alt={`${company.name} logo`}
      loading="lazy"
      className="
        h-16 w-auto max-w-full object-contain 
        transition-transform duration-300
        group-hover/card:scale-110
      "
      onError={(e) => {
        // Fallback to text if image fails
        (e.target as HTMLImageElement).style.display = 'none';
        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
      }}
    />
    
    {/* Fallback Text */}
    <span className="hidden text-slate-500 font-bold text-sm group-hover/card:text-slate-300 transition-colors">
      {company.name}
    </span>
  </div>
);

const Partners: React.FC = () => {
  return (
    <section className="py-20 bg-[#020617] border-b border-slate-800/50 relative overflow-hidden">
      
      {/* 
        INJECTED STYLES: 
        This style tag defines the keyframes and class locally so you don't need external files.
      */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* Ambient Background Glow matching Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
         <div className="text-center animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-3">
            Our Students Are Placed In <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Top Companies</span>
          </h2>
          <p className="text-slate-400 text-base font-medium">
            From high-growth startups to global tech giants
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden group py-4">
        
        {/* Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-[#020617] via-[#020617]/90 to-transparent pointer-events-none"></div>

        <div className="flex">
          {/* Track 1 */}
          <div 
            className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
          >
            {companies.map((company, index) => (
              <CompanyCard key={`t1-${index}`} company={company} />
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless loop) */}
          <div 
            className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {companies.map((company, index) => (
              <CompanyCard key={`t2-${index}`} company={company} />
            ))}
          </div>
        </div>

      </div>
      
      {/* Micro-copy */}
      <div className="text-center mt-10 relative z-10 px-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <p className="text-slate-500 text-xs md:text-sm font-medium tracking-widest uppercase opacity-70">
          Trusted by startups, unicorns, and global enterprises worldwide
        </p>
      </div>

    </section>
  );
};

export default Partners;