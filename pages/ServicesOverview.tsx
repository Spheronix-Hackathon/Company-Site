
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Brain, Layers, Cpu, Activity, ArrowRight, Shield, Zap, Clock, Users } from 'lucide-react';

const ServicesOverview: React.FC = () => {
  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="bg-slate-950 pt-32 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl reveal">
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-10 leading-tight">Capabilities <br /><span className="text-violet-500">& Expertise.</span></h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              Our engineering teams operate at the intersection of high-level intelligence and low-level control. We ship hardware and software that works in the most demanding environments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((s, i) => (
            <div key={s.id} className="reveal group glass rounded-[3rem] overflow-hidden flex flex-col hover:border-violet-500/50 transition-all duration-500 shadow-2xl" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="p-12 flex-grow">
                <div className="w-20 h-20 bg-violet-600/10 rounded-3xl flex items-center justify-center text-violet-400 mb-10 group-hover:scale-110 transition-transform shadow-inner">
                  {s.icon === 'Brain' && <Brain size={40} />}
                  {s.icon === 'Layers' && <Layers size={40} />}
                  {s.icon === 'Cpu' && <Cpu size={40} />}
                  {s.icon === 'Activity' && <Activity size={40} />}
                </div>
                <h2 className="text-4xl font-bold text-white mb-6 group-hover:text-violet-400 transition-colors">{s.title}</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">{s.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                   {s.capabilities.map(cap => (
                     <div key={cap} className="flex items-center gap-3 text-slate-300 text-sm font-semibold">
                       <Shield className="text-violet-500/50" size={18} />
                       {cap}
                     </div>
                   ))}
                </div>
              </div>
              <div className="p-10 bg-white/5 border-t border-white/5">
                <Link
                  to={`/services/${s.id}`}
                  className="w-full bg-violet-600 text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-violet-700 transition-all shadow-lg"
                >
                  Technical Specifications <ArrowRight size={22} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-48">
        <div className="text-center mb-24 reveal">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Execution Structures</h2>
          <p className="text-slate-500 text-lg">Integrated engineering partnerships built for reliability.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Zap />, title: 'Accelerated PoC', desc: '4-week fixed sprints to validate core hardware/software assumptions.', color: 'text-violet-400' },
            { icon: <Clock />, title: 'R&D Retainer', desc: 'Flexible monthly bandwidth for high-iteration AI and robotics research.', color: 'text-fuchsia-400' },
            { icon: <Users />, title: 'Staff Augmentation', desc: 'Senior engineers embedded directly into your core product squads.', color: 'text-indigo-400' }
          ].map((item, i) => (
            <div key={item.title} className="reveal glass p-10 rounded-[2.5rem] text-center border-white/5 hover:border-violet-500/20 transition-all" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={`w-16 h-16 bg-slate-900 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesOverview;
