
import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowLeft, CheckCircle2, Terminal, Workflow, Rocket, Code2, Cpu, Brain, Layers, Activity } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((s) => s.id === id);
  useEffect(() => {
      // scroll listener removed as scrolled was unused
  }, []);

  if (!service) return <Navigate to="/services" />;

  // Dynamic Icon based on service
  const renderIcon = () => {
    switch (service.icon) {
      case 'Brain': return <Brain size={64} className="text-violet-400" />;
      case 'Layers': return <Layers size={64} className="text-blue-400" />;
      case 'Cpu': return <Cpu size={64} className="text-emerald-400" />;
      case 'Activity': return <Activity size={64} className="text-amber-400" />;
      default: return <Terminal size={64} className="text-violet-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pb-24 relative overflow-hidden font-sans text-slate-200">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] animate-float"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-32 pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-violet-400 hover:text-white transition-colors mb-10 text-sm font-bold uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
            <div className="p-8 glass rounded-[2.5rem] border-violet-500/20 shadow-[0_0_50px_rgba(139,92,246,0.1)] reveal">
                {renderIcon()}
            </div>
            <div className="max-w-4xl reveal-right">
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? "text-white" : "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"}> {word}</span>
                  ))}
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium">
                    {service.description}
                </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-20">
            {/* Capabilities */}
            <section className="reveal">
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400 shadow-inner">
                    <Code2 size={24} />
                </div>
                Core Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.capabilities.map((cap) => (
                  <div key={cap} className="glass p-6 rounded-2xl border-white/5 hover:border-violet-500/30 transition-all duration-300 group hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="text-violet-500 shrink-0 mt-1 group-hover:text-fuchsia-400 transition-colors" size={20} />
                      <div>
                        <h3 className="font-bold text-white text-lg mb-2">{cap}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">Enterprise-grade implementation tailored for high-availability environments.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="reveal">
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-fuchsia-600/10 flex items-center justify-center text-fuchsia-400 shadow-inner">
                    <Workflow size={24} />
                </div>
                Engineering Lifecycle
              </h2>
              <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 hidden md:block opacity-30"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {service.process.map((step, idx) => (
                        <div key={step} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full glass border border-violet-500/30 flex items-center justify-center text-white font-bold mb-4 shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:scale-110 group-hover:bg-violet-600 group-hover:border-violet-600 transition-all duration-300">
                                {idx + 1}
                            </div>
                            <h4 className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{step}</h4>
                        </div>
                    ))}
                  </div>
              </div>
            </section>

            {/* Tech Stack */}
            <section className="reveal">
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 shadow-inner">
                    <Terminal size={24} />
                </div>
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-4">
                {service.techStack.map((tech) => (
                  <div key={tech} className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-mono text-sm text-violet-300 hover:bg-violet-600/20 hover:border-violet-500/50 hover:text-white transition-all cursor-default shadow-lg">
                    {tech}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 reveal-right">
            <div className="sticky top-32 space-y-8">
              <div className="bg-gradient-to-br from-violet-600 to-fuchsia-700 text-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(139,92,246,0.3)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                    <Rocket className="w-12 h-12 mb-6 text-white/90" />
                    <h3 className="text-2xl font-bold mb-4">Deploy {service.title}</h3>
                    <p className="text-white/80 mb-8 leading-relaxed font-medium">
                    Schedule a specialized architectural review with our principal engineers.
                    </p>
                    <Link to="/contact" className="w-full bg-white text-violet-700 py-4 rounded-xl font-bold block text-center hover:bg-slate-50 transition-all shadow-lg active:scale-95">
                    {service.cta}
                    </Link>
                </div>
              </div>

              <div className="glass p-8 rounded-[2.5rem] border-white/5 shadow-2xl">
                <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                    <Activity size={18} className="text-emerald-400" /> Performance SLA
                </h4>
                <ul className="space-y-6">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                    <span className="text-slate-500">Kickoff Velocity</span>
                    <span className="font-bold text-white">48 Hours</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                    <span className="text-slate-500">Code Coverage</span>
                    <span className="font-bold text-white">98% Min</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Uptime Guarantee</span>
                    <span className="font-bold text-white">99.99%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
