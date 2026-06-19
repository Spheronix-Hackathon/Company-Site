import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code2, Users2, LineChart, FileText, MonitorPlay, ChevronDown, Sparkles } from 'lucide-react';

// 1. IMPORT THE MISSING IMAGES HERE
// This tells the bundler to include these files in the 'dist' folder
import placementCompany1 from '../../../assets/company/placements1.png';
import placementCompany2 from '../../../assets/company/placements2.png';

const features = [
  {
    icon: Terminal,
    title: 'Practical Learning',
    desc: 'Hands-on engineering with real workflows, not just theory.',
    details: 'Our curriculum focuses on building scalable systems, debugging complex issues, and deploying to production environments using Docker and Kubernetes.',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: MonitorPlay,
    title: 'Portfolio-Ready',
    desc: 'Build production-grade projects recruiters actually review.',
    details: 'Create a GitHub profile filled with deployed full-stack applications that demonstrate your coding proficiency and problem-solving skills.',
    color: 'from-violet-500 to-purple-400'
  },
  {
    icon: LineChart,
    title: 'Career Support',
    desc: 'Dedicated placement ecosystem with continuous opportunities.',
    details: 'Access our exclusive job portal, receive personalized career guidance, and get referred to top tech companies through our hiring network.',
    color: 'from-fuchsia-500 to-pink-400'
  },
  {
    icon: Code2,
    title: 'Real Projects',
    desc: 'Work on systems that mirror real company environments.',
    details: 'Experience agile methodologies, daily stand-ups, sprint planning, and rigorous code reviews just like in a real software development team.',
    color: 'from-emerald-500 to-teal-400'
  },
  {
    icon: Users2,
    title: 'Mock Interviews',
    desc: 'Unlimited mock interviews with industry professionals.',
    details: 'Practice data structures, algorithms, and system design interviews with experts who give detailed feedback to refine your approach.',
    color: 'from-orange-500 to-amber-400'
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    desc: 'ATS-optimized resumes and LinkedIn optimization.',
    details: 'We help you craft a resume that passes automated screenings and a LinkedIn profile that attracts recruiters and hiring managers.',
    color: 'from-rose-500 to-red-400'
  }
];

const Features: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleCard = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* === UPDATED SECTION: OUR PARTNERS === */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-10">
            Our Partners
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16">
            
            {/* 2. USE THE IMPORTED VARIABLES HERE */}
            <img 
              src={placementCompany1} 
              alt="Partner 1" 
              className="w-[500px] h-[500px] object-cover rounded-3xl shadow-xl shadow-indigo-900/30 transition-transform hover:scale-105"
            />
            <img 
              src={placementCompany2}  
              alt="Partner 2" 
              className="w-[500px] h-[500px] object-cover rounded-3xl shadow-xl shadow-purple-900/30 transition-transform hover:scale-105"
            />

          </div>
        </div>
        
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-700 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md mb-6 shadow-lg shadow-violet-900/20">
            <Sparkles className="w-4 h-4 text-amber-400" fill="currentColor" />
            <span className="text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-fuchsia-200">Premium Education</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Why Choose <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">Spheronix Technology?</span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We don't just teach code; we shape engineering mindsets. Experience an ecosystem designed to take you from novice to professional.
          </p>
        </div>

        {/* GLASS CARDS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isActive = activeCard === index;
            
            return (
              <div 
                key={index}
                onClick={() => toggleCard(index)}
                className={`
                  group relative rounded-[2rem] transition-all duration-500 ease-out cursor-pointer
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  ${isActive ? 'scale-[1.02]' : 'hover:-translate-y-2'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`
                  absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br ${feature.color}
                  transition-opacity duration-500 blur-sm
                  ${isActive ? 'opacity-70' : 'opacity-0 group-hover:opacity-40'}
                `}></div>

                <div className={`
                  relative h-full rounded-[2rem] overflow-hidden transition-colors duration-500
                  bg-[#0f172a]/80 backdrop-blur-xl border border-white/5
                  ${isActive ? 'bg-[#0f172a]/90' : 'group-hover:bg-[#0f172a]/70'}
                `}>
                  
                  <div className={`
                    absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full blur-[60px] opacity-20 pointer-events-none transition-transform duration-700
                    ${isActive ? 'scale-150 opacity-30' : 'group-hover:scale-110'}
                  `}></div>

                  <div className="p-8 flex flex-col h-full relative z-10">
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className={`
                        w-14 h-14 rounded-2xl flex items-center justify-center
                        bg-gradient-to-br ${feature.color} shadow-lg shadow-black/20
                        transform transition-transform duration-500
                        ${isActive ? 'scale-110 rotate-3' : 'group-hover:scale-105 group-hover:-rotate-3'}
                      `}>
                        <feature.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                      </div>

                      <div className={`
                        w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center
                        transition-all duration-300
                        ${isActive ? 'bg-slate-800 text-white border-slate-600 rotate-180' : 'text-slate-500 group-hover:border-slate-500'}
                      `}>
                        <ChevronDown size={16} />
                      </div>
                    </div>

                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-4">
                      {feature.desc}
                    </p>

                    <div className={`
                      grid transition-[grid-template-rows] duration-500 ease-in-out
                      ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                    `}>
                      <div className="overflow-hidden">
                         <div className="pt-4 mt-2 border-t border-slate-800">
                           <div className="flex gap-3">
                             <div className={`w-1 min-h-full bg-gradient-to-b ${feature.color} rounded-full opacity-60`}></div>
                             <p className="text-slate-300 text-sm leading-relaxed">
                               {feature.details}
                             </p>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'}`}></div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Features;