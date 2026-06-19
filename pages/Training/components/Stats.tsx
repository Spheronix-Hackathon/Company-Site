import React, { useEffect, useState, useRef } from 'react';
import { Building2, GraduationCap, Laptop } from 'lucide-react';

const subStats = [
  { 
    label: 'Hiring Partners', 
    value: 1500, 
    suffix: '+', 
    Icon: Building2, 
  },
  { 
    label: 'Campus Workshops', 
    value: 1500, 
    suffix: '+', 
    Icon: GraduationCap, 
  },
  { 
    label: 'Live Projects', 
    value: 500, 
    suffix: '+', 
    Icon: Laptop, 
  },
];

const Counter = ({ end, duration, suffix, isVisible, className }: { end: number, duration: number, suffix: string, isVisible: boolean, className?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Cubic ease out
      const easeProgress = 1 - Math.pow(1 - progress, 3); 
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span className={className}>{count.toLocaleString()}{suffix}</span>;
};

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#020617] relative border-b border-slate-800/50">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Label */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-slate-400 font-medium text-lg tracking-wide">
            Trusted by students across <span className="text-slate-300 font-semibold">500+ colleges</span> in India
          </h3>
        </div>

        {/* Main Focal Metric */}
        <div className={`text-center mb-20 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative inline-block">
            {/* Glow behind number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-fuchsia-500/20 blur-[60px] rounded-full"></div>
            
            <div className="relative text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
              <Counter 
                end={15000} 
                duration={2500} 
                suffix="+" 
                isVisible={isVisible} 
                className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400"
              />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-4 tracking-tight">Students Trained</p>
        </div>

        {/* Supporting Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {subStats.map((stat, index) => (
            <div 
              key={index}
              className={`
                group relative p-6 rounded-2xl bg-[#0f172a] border border-slate-800/60
                flex flex-col items-center justify-center text-center
                hover:border-fuchsia-500/30 hover:bg-slate-900 
                hover:shadow-[0_0_30px_-10px_rgba(217,70,239,0.15)] hover:-translate-y-1
                transition-all duration-300 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${400 + (index * 150)}ms` }}
            >
              <div className="mb-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800 group-hover:border-fuchsia-500/30 transition-colors">
                <stat.Icon className="w-6 h-6 text-fuchsia-400" />
              </div>
              
              <div className="text-3xl font-bold text-white mb-1">
                <Counter end={stat.value} duration={2000} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              
              <div className="text-sm font-medium text-slate-500 group-hover:text-slate-400 transition-colors">
                {stat.label}
              </div>

              {/* Card Inner Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stats;