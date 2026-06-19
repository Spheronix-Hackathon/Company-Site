
import React from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../constants';
import { Quote, ArrowRight, TrendingUp, Activity, ShieldCheck, Target, Zap, Layers, Cpu, Hash } from 'lucide-react';

const CaseStudies: React.FC = () => {
  // High-impact, reliable Unsplash IDs matching the specific domains
  const studyImages: Record<string, string> = {
    '1': '1581091226825-a6a2a5aee158', // Autonomous Warehouse (Laptop/Tech/Robot arm vibe)
    '2': '1451187580459-43490279c0fa', // Smart Grid (Network lines)
    '3': '1550751827-4bd374c3f58b', // Neural Link (Cybernetic hand)
    '4': '1551288049-bebda4e38f71', // Deep Sea (Dark Underwater/Abstract)
    '5': '1635070041078-e363dbe005cb', // Quantum (Quantum Processor/Lattice)
  };

  const getTopicIcon = (category: string) => {
    if (category.includes('Robotics')) return <Cpu size={16} />;
    if (category.includes('IoT')) return <WifiIcon size={16} />;
    if (category.includes('MedTech')) return <Activity size={16} />;
    if (category.includes('Marine')) return <Layers size={16} />;
    return <Hash size={16} />;
  };

  const WifiIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
  );

  return (
    <div className="pb-32 bg-[#020617] neural-grid overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[120px] animate-float"></div>
         <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Header */}
      <section className="pt-40 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
              Engineering Portfolio
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-10 leading-[0.9] tracking-tight">
              Proving the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 italic">Impossible.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed border-l-2 border-violet-500/30 pl-8">
              Real-world challenges solved with edge-compute, autonomous systems, and custom silicon. Explore how we engineer competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-40">
          {CASE_STUDIES.map((study, idx) => (
            <div key={study.id} className={`group relative flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-stretch`}>
              
              {/* Connector Line for Desktop */}
              <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-violet-500/20 to-transparent -translate-x-1/2"></div>
              
              {/* Image / Visual Column */}
              <div className="lg:w-1/2 relative reveal">
                <div className="sticky top-32">
                   {/* Main Image Card */}
                   <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900/50 shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] group-hover:border-violet-500/30">
                      
                      {/* Image Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10"></div>
                      
                      {/* Actual Image */}
                      <img
                        src={`https://images.unsplash.com/photo-${studyImages[study.id] || '1550751827-4bd374c3f58b'}?auto=format&fit=crop&q=80&w=1200`}
                        alt={study.title}
                        className="w-full aspect-[4/5] lg:aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-110"
                      />

                      {/* Floating Data Card Overlay */}
                      <div className="absolute bottom-8 left-8 right-8 z-20">
                         <div className="glass p-6 rounded-3xl border border-white/10 backdrop-blur-xl bg-slate-900/60 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                               <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Tech Stack</span>
                               <Layers size={14} className="text-violet-400" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                               {study.tech.slice(0, 4).map(t => (
                                 <span key={t} className="text-[10px] font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                                   {t}
                                 </span>
                               ))}
                            </div>
                         </div>
                      </div>

                      {/* Top Corner Badge */}
                      <div className="absolute top-8 right-8 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                         <span className="text-xs font-bold text-white uppercase tracking-widest">Case #{study.id}</span>
                      </div>
                   </div>

                   {/* Decorative background element behind image */}
                   <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[3.5rem] blur-3xl opacity-0 group-hover:opacity-10 -z-10 transition-opacity duration-700"></div>
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:w-1/2 flex flex-col justify-center py-10 reveal-right">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 shadow-inner">
                      {getTopicIcon(study.category)}
                   </div>
                   <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{study.category}</div>
                      <div className="text-sm font-bold text-white">{study.client}</div>
                   </div>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                  {study.title}
                </h2>

                <div className="space-y-8 mb-12">
                   <div className="pl-6 border-l border-slate-800 hover:border-violet-500 transition-colors duration-300">
                      <h4 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Target size={14} /> The Challenge
                      </h4>
                      <p className="text-slate-400 leading-relaxed font-medium">
                        {study.challenge}
                      </p>
                   </div>
                   <div className="pl-6 border-l border-slate-800 hover:border-fuchsia-500 transition-colors duration-300">
                      <h4 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Zap size={14} /> The Solution
                      </h4>
                      <p className="text-slate-400 leading-relaxed font-medium">
                        {study.solution}
                      </p>
                   </div>
                </div>

                {/* Metrics Grid */}
                <div className="bg-white/5 rounded-3xl p-8 border border-white/5 hover:bg-white/10 transition-colors duration-300 mb-10">
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                     <TrendingUp size={16} className="text-green-400" /> Key Outcomes
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {study.results.slice(0, 4).map((res, i) => (
                        <div key={i} className="flex items-start gap-3">
                           <ShieldCheck size={18} className="text-violet-500 shrink-0 mt-0.5" />
                           <span className="text-sm text-slate-300 font-medium leading-tight">{res}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Quote */}
                <div className="relative">
                   <Quote className="absolute -top-4 -left-2 text-white/5 w-16 h-16 transform -scale-x-100" />
                   <blockquote className="relative z-10 text-lg text-slate-400 italic font-medium pl-8">
                      "{study.quote}"
                   </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-violet-900 via-slate-900 to-indigo-900 p-16 lg:p-24 text-center reveal">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px]"></div>
           
           <div className="relative z-10">
             <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Ready to define <br />the next benchmark?</h2>
             <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="bg-white text-violet-900 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl">
                   Start a Project <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="bg-transparent border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                   View Services
                </Link>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
