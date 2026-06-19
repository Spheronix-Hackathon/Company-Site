
import React from 'react';
import { Shield, Target, Globe, Sparkles } from 'lucide-react';

import B_Vijaya from '../assets/members/B_Vijaya.png';
import Pallapa_Dhanush from '../assets/members/Dhanush_edit.png'
import K_Lakshmi from '../assets/members/K_Lakshmi.jpeg';
import Kommara_Manjunath from '../assets/members/Kommara_Manjunath.png';
import Yeswanth from '../assets/members/Yeswanth.jpeg';
import Pallapa_Chethan from '../assets/members/Pallapa_Chethan.png';
import Kiran from '../assets/members/Kiran.jpg';
import Bhavani from '../assets/members/Bhavani.jpg';

const About: React.FC = () => {
  const team = [
    { 
        name: 'K. Manjunath', 
        role: 'Managing Director & Founder', 
        bio: '15+ years in Business Management. Driving operational excellence, global expansion, and sustainable corporate growth.', 
        img: Kommara_Manjunath 
     },
     { 
        name: 'Pallapa Dhanush', 
        role: 'Founder & CEO', 
        bio: 'Visionary architect behind Spheronix, driving the convergence of deep-tech innovation and scalable business strategy.', 
        img: Pallapa_Dhanush
     },
    {
        name: 'Pallapa_Chethan',
        role: 'Principal Embedded Architect',
        bio: 'Specialist in RTOS optimization and low-power silicon design.',
        img: Pallapa_Chethan
    },
      {
        name: 'Yeswanth',
        role: 'Lead Robotics Engineer',
        bio: '10 years designing autonomous navigation systems for industrial rovers.',
        img: Yeswanth
    },
       {
        name: 'K_Lakshmi',
        role: 'VP of AI Research',
        bio: 'Ex-DeepMind researcher focused on reinforcement learning and large-scale neural architectures.',
        img: K_Lakshmi
    },
    { 
        name: 'B. Vijaya', 
        role: 'CTO', 
        bio: 'Embedded systems veteran with 20+ patents in edge AI and connectivity.', 
        img: B_Vijaya
    },
    {
        name: 'Kiran',
        role: 'Head of Product',
        bio: 'Bridging the gap between deep-tech engineering and user-centric application design.',
        img: Kiran
    },
    {
        name: 'Bhavani',
        role: 'Director of Operations',
        bio: 'Ensuring seamless global supply chain logistics for our hardware divisions.',
        img: Bhavani
    }
  ];

  return (
    <div className="pb-32 bg-[#020617] neural-grid overflow-hidden relative">
       {/* Background Ambience */}
       <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[120px] animate-float"></div>
         <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero */}
      <section className="pt-40 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl reveal">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-8">
               <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
               Our Origin Story
             </div>
             <h1 className="text-6xl lg:text-8xl font-bold text-white mb-10 leading-[0.9] tracking-tight">
               Engineering for the <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 italic">Intelligent Era.</span>
             </h1>
             <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed border-l-2 border-violet-500/30 pl-8">
               Founded in 2018, Spheronix was built on a single premise: deep-tech expertise shouldn't be fragmented. We unite the smartest minds in hardware and software to build products that last.
             </p>
           </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal-left">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
              <Target className="text-fuchsia-500" /> Our Mission
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-12 font-medium">
              To empower organizations with robust, scalable technology solutions while cultivating the next generation of engineering leadership through unparalleled corporate training.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border-white/5 hover:border-violet-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-violet-600/20 text-violet-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield size={24} />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Trust by Design</h4>
                <p className="text-sm text-slate-500">Rigorous testing and code quality are non-negotiable mandates.</p>
              </div>

              <div className="glass p-6 rounded-2xl border-white/5 hover:border-fuchsia-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-fuchsia-600/20 text-fuchsia-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">Global Impact</h4>
                <p className="text-sm text-slate-500">Deploying solutions that move the needle worldwide.</p>
              </div>
            </div>
          </div>
          
          <div className="relative reveal-right">
             <div className="absolute inset-0 bg-violet-600/20 blur-[60px] rounded-full animate-pulse"></div>
             <div className="relative z-10 glass p-3 rounded-[2.5rem] border-white/10 rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20 pointer-events-none rounded-[2rem] z-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                  className="rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
                  alt="Team Meeting" 
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 glass px-6 py-4 rounded-2xl flex items-center gap-3 border border-white/10 shadow-xl animate-float">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                   <div className="text-sm font-bold text-white">
                      System Operational <br/> 
                      <span className="text-xs text-slate-400 font-normal">HQ: Bangalore, IN</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-40">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">The Minds Behind Spheronix</h2>
          <p className="text-slate-400 text-lg">Built by engineers, for engineers.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {team
            .filter(leader => ![
              'K. Manjunath',
              'Pallapa Dhanush',
              'Pallapa_Chethan',
              'Yeswanth',
              'K_Lakshmi',
              'B. Vijaya',
              'Kiran',
              'Bhavani'
            ].includes(leader.name))
            .map((leader, idx) => (
            <div key={leader.name} className="group relative reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
               <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-transparent rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               <div className="glass p-6 rounded-[2.5rem] border-white/5 group-hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2">
                 <div className="mb-8 relative rounded-[2rem] overflow-hidden aspect-square border border-white/5">
                   <div className="absolute inset-0 bg-violet-900/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <img 
                     src={leader.img} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110" 
                     alt={leader.name} 
                   />
                   <div className="absolute bottom-4 left-4 right-4 z-20">
                     <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <p className="text-[#a78bfa] font-bold text-xs uppercase tracking-widest">{leader.role}</p>
                     </div>
                   </div>
                 </div>
                 
                 <div className="text-center px-2">
                    <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                    {/* Mobile Only Role Display */}
                    <p className="text-violet-400 font-bold text-xs uppercase tracking-widest mb-4 md:hidden">{leader.role}</p>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                      {leader.bio}
                    </p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diversity Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="reveal relative rounded-[3rem] overflow-hidden p-16 lg:p-24 text-center border border-white/10 group">
           {/* Animated Gradient Background */}
           <div className="absolute inset-0 bg-gradient-to-r from-violet-900/40 via-fuchsia-900/40 to-indigo-900/40 opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           
           <div className="relative z-10 max-w-4xl mx-auto">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-white shadow-2xl backdrop-blur-sm">
                <Sparkles size={32} />
             </div>
             <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
               "The hardest engineering problems are solved by the most <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">diverse perspectives.</span>"
             </h2>
             <p className="text-xl text-slate-300 leading-relaxed font-medium">
               Our culture thrives on inclusion. We are committed to building a workforce that reflects the global community we serve.
             </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
