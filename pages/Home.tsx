
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Brain, Layers, Activity, Shield, Zap, Power, Bot, Sparkles, Network, BarChart3, Wifi, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = 2500;
    const incrementTime = (totalMiliseconds / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-5xl lg:text-7xl font-bold text-white mb-4 tabular-nums">
        {count}{label.includes('%') ? '%' : '+'}
      </div>
      <div className="text-violet-400 text-xs font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
};

const CONSOLE_LOG_LINES = [
  '> SPHERONIX CORE v2.5.0 INITIALIZING...',
  '> CONNECTING TO EDGE NODES...',
  '> NEURAL MESH ONLINE',
  '> ANALYZING ROBOTIC KINEMATICS...',
  '> DEPLOYING AI WORKLOADS...',
  '> SYSTEM READY: OPTIMAL PERFORMANCE'
];

const TechConsole = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < CONSOLE_LOG_LINES.length) {
        setLines(prev => [...prev, CONSOLE_LOG_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8 }}
      className="glass-panel p-6 rounded-2xl font-mono text-xs text-violet-400/90 w-full max-w-sm hidden lg:block absolute -bottom-10 -right-10 z-20 border-l-4 border-l-violet-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="w-2 h-2 rounded-full bg-red-500"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span className="ml-2 text-[10px] opacity-70 uppercase tracking-tighter text-slate-300">System Terminal</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, idx) => (
          <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-300">
            {line}
          </div>
        ))}
        <div className="animate-pulse w-2 h-4 bg-violet-500/50 inline-block align-middle"></div>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
  };

  // Floating animation for zero-gravity feel
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="pb-20 overflow-hidden relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Text Column */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 relative z-50"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-violet-300 text-xs font-bold uppercase tracking-wider border border-violet-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                Industry 4.0 Standardized
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-7xl lg:text-[7rem] font-bold text-white leading-[0.9] tracking-tighter relative z-50">
                Evolve <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-300 animate-pulse">
                  Engineering
                </span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl text-slate-300 leading-relaxed max-w-xl font-medium relative z-50">
                Spheronix delivers the intelligent backbone for modern industry—robotic perception, Generative AI, and resilient firmware built for the extreme.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 relative z-50">
                <Link
                  to="/contact"
                  className="bg-white text-slate-950 px-8 py-4 rounded-xl text-lg font-bold transition-all hover:bg-violet-50 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3 group"
                >
                  Initiate Consult <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link to="/system-audit" className="glass-btn text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center">
                  System Audit
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="relative z-20 perspective-1000"
            >
              <motion.div 
                 variants={floatVariants}
                 animate="animate"
                 style={{ y: y2, rotateY: -8, rotateX: 4 }}
                 className="relative z-10 p-2 glass-panel rounded-[3.5rem] overflow-hidden shadow-2xl transition-transform duration-1000 hover:rotate-0"
              >
                <div className="scanline"></div>
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
                  alt="Industrial Robotics"
                  className="rounded-[3rem] object-cover aspect-square opacity-90 transition-all duration-1000 scale-105 hover:scale-100"
                />
              </motion.div>
              <TechConsole />
              {/* Floating Tech Chips */}
              <motion.div 
                style={{ y: y1 }}
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 glass-panel p-4 rounded-2xl border-l-4 border-violet-500 flex items-center gap-3 z-30 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                <div className="w-10 h-10 bg-violet-600/20 rounded-lg flex items-center justify-center text-violet-400">
                  <Brain size={20} />
                </div>
                <div className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Neural Core<br/><span className="text-slate-500">Active</span></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((s, i) => (
            <motion.div key={s.id} variants={itemVariants}>
              <Link 
                to={`/services/${s.id}`} 
                className="group glass-panel p-10 rounded-[2.5rem] block h-full relative overflow-hidden"
              >
                <div className="scanline opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-violet-400 mb-8 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-lg">
                  {s.icon === 'Brain' && <Brain size={28} />}
                  {s.icon === 'Layers' && <Layers size={28} />}
                  {s.icon === 'Cpu' && <Cpu size={28} />}
                  {s.icon === 'Activity' && <Activity size={28} />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-violet-300">{s.title}</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                  {s.description}
                </p>
                <div className="flex items-center justify-between mt-auto absolute bottom-10 left-10 right-10">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Tier {i + 1}</span>
                  <ArrowRight size={20} className="text-violet-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* EXPANDED: The Engineering Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">The Engineering <span className="text-violet-500">Ecosystem.</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl font-medium">We converge diverse disciplines—from atomic-scale silicon to global-scale grids—to build the infrastructure of tomorrow.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Generative AI & LLMs', desc: 'Beyond chat. We engineer RAG pipelines and fine-tune 7B+ parameter models.', img: 'photo-1620712943543-bcc4688e7485', icon: <Sparkles size={24}/>, color: 'violet', tags: ['Llama-3', 'Vector DB'] },
              { title: 'Autonomous Robotics', desc: 'Visual SLAM and sensor fusion for robots that navigate unstructured chaos.', img: 'photo-1581092335397-9583eb92d232', icon: <Bot size={24}/>, color: 'fuchsia', tags: ['ROS 2', 'LiDAR'] },
              { title: 'Silicon & Firmware', desc: 'FPGA acceleration, RTOS implementation, and neuromorphic architectures.', img: 'photo-1597733336794-12d05021d510', icon: <Cpu size={24}/>, color: 'indigo', tags: ['Verilog', 'Rust'] },
              { title: 'Data Analytics', desc: 'Turning petabytes of industrial telemetry into actionable foresight.', img: 'photo-1551288049-bebda4e38f71', icon: <BarChart3 size={24}/>, color: 'cyan', tags: ['Spark', 'Snowflake'] },
              { title: 'Next-Gen Networking', desc: 'Architecting self-healing mesh networks and 5G private infrastructure.', img: 'photo-1451187580459-43490279c0fa', icon: <Wifi size={24}/>, color: 'emerald', tags: ['SD-WAN', 'Mesh'] },
              { title: 'Smart Energy & Gen', desc: 'From smart grid optimization to renewable energy harvesting and BMS.', img: 'photo-1473341304170-971dccb5ac1e', icon: <Zap size={24}/>, color: 'amber', tags: ['SCADA', 'BMS'] }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative h-96 rounded-[2.5rem] overflow-hidden glass-panel hover:border-violet-500/40"
              >
                  <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/${card.img}?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                      <div className={`w-12 h-12 bg-${card.color}-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                          {card.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                          {card.desc}
                      </p>
                      <div className="flex gap-2">
                          {card.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white/80 bg-white/10 px-2 py-1 rounded border border-white/10">{tag}</span>
                          ))}
                      </div>
                  </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Metrics Section with Animated Counters */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-16 glass-panel p-12 rounded-[3rem]"
          >
            <AnimatedCounter value={200} label="Global Deployments" />
            <AnimatedCounter value={98} label="Training Satisfaction" />
            <AnimatedCounter value={45} label="Hardware Patents" />
            <AnimatedCounter value={12000} label="Alumni Engineers" />
          </motion.div>
        </div>
      </section>

      {/* NEW: R&D Labs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-12 lg:p-20 rounded-[3rem] relative overflow-hidden"
        >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Live from the Lab
                     </div>
                     <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">Researching the <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Uncharted.</span></h2>
                     <p className="text-slate-300 text-lg mb-8 leading-relaxed font-medium">
                        Our internal R&D division, <strong>Spheronix X</strong>, is currently prototyping breakthroughs in swarm intelligence and bio-mimetic propulsion.
                     </p>
                     <ul className="space-y-4 mb-10">
                        {[
                            "Self-healing mesh networks for disaster zones",
                            "Photosynthetic energy harvesting for IoT sensors",
                            "Zero-shot learning for industrial defect detection"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-violet-400">
                                    <ArrowRight size={12} />
                                </div>
                                {item}
                            </li>
                        ))}
                     </ul>
                     <Link to="/about" className="text-white border-b border-violet-500 pb-1 hover:text-violet-400 transition-colors font-bold inline-flex items-center gap-2 group">
                        Read our Whitepapers <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative h-80 lg:h-[500px] rounded-[2.5rem] overflow-hidden group shadow-2xl"
                >
                     <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Lab" />
                     <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                     {/* Overlay Data */}
                     <div className="absolute bottom-8 left-8 right-8">
                        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center backdrop-blur-md">
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Experiment 042</div>
                                <div className="text-white font-bold flex items-center gap-2"><Network size={16} className="text-violet-400" /> Swarm Drone Sync</div>
                            </div>
                            <div className="text-green-400 font-mono text-xs bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">98.4% Success</div>
                        </div>
                     </div>
                </motion.div>
            </div>
        </motion.div>
      </section>

      {/* Featured Innovation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12 order-2 lg:order-1"
          >
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">Beyond <span className="text-fuchsia-500">Code.</span></h2>
            <div className="space-y-8">
              {[
                { icon: <Shield />, title: 'Hardened Security', desc: 'Hardware-root-of-trust and secure boot flows for every device we ship.' },
                { icon: <Zap />, title: 'Edge Velocity', desc: 'AI models optimized for ARM and RISC-V with sub-10ms inference.' },
                { icon: <Power />, title: 'Total Observability', desc: 'Real-time telemetry and digital twins for fleet management.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-lg hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="transition-transform group-hover:translate-x-2">
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
             <div className="relative">
                <div className="glass-panel p-4 rounded-[3rem] relative z-10 shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-700">
                  <div className="scanline"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" 
                    alt="Circuitry" 
                    className="rounded-[2.5rem] opacity-70 group-hover:opacity-100 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
                  />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* New Professional CTA - System Initialization Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden glass-panel group border-violet-500/20"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
             {/* Left: Engagement */}
             <div className="p-16 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br from-violet-950/20 to-transparent">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Systems Operational
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[0.9] tracking-tighter">
                    Ready to <br />
                    <span className="text-violet-400">Initialize?</span>
                  </h2>
                  <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md">
                    Skip the proof-of-concept limbo. Deploy production-grade autonomous systems with Spheronix architecture.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to="/contact" className="group flex items-center justify-center gap-4 bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <Power size={20} className="text-slate-950" />
                    <span>Initialize Project</span>
                    <ArrowRight size={20} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                  <Link to="/services" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all">
                    Explore Docs
                  </Link>
                </div>
             </div>

             {/* Right: Technical Dashboard Visual */}
             <div className="p-16 lg:p-24 bg-slate-950/40 font-mono relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>
                
                {/* Status Items */}
                <div className="space-y-6">
                   {[
                     { label: 'HARDWARE SECURITY MODULE', status: 'LOCKED', color: 'text-green-400' },
                     { label: 'NEURAL PROCESSING UNIT', status: 'ONLINE', color: 'text-green-400' },
                     { label: 'MESH NETWORK LATENCY', status: '< 4ms', color: 'text-violet-400' },
                     { label: 'ENCRYPTION PROTOCOL', status: 'AES-256-GCM', color: 'text-fuchsia-400' }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 group/item">
                        <div className="flex items-center gap-3">
                           <CheckCircle2 size={16} className="text-slate-600 group-hover/item:text-violet-500 transition-colors" />
                           <span className="text-xs lg:text-sm font-bold text-slate-400 tracking-widest">{item.label}</span>
                        </div>
                        <span className={`text-xs lg:text-sm font-bold ${item.color} tracking-widest shadow-lg`}>{item.status}</span>
                     </div>
                   ))}
                   
                   {/* Animated Progress Bar */}
                   <div className="mt-8">
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">
                         <span>Deployment Readiness</span>
                         <span>100%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: "100%" }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                        ></motion.div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
