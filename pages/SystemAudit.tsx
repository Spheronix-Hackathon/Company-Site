
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Database, Activity, Lock, CheckCircle2, AlertTriangle, Search, ArrowRight, Server, Eye } from 'lucide-react';

const SystemAudit: React.FC = () => {
  const auditCategories = [
    {
      id: 'security',
      title: 'Security & Threat Posture',
      icon: <Shield size={32} className="text-emerald-400" />,
      description: 'Comprehensive vulnerability assessment against external threats and internal vectors.',
      checks: [
        'Penetration testing & vulnerability scanning',
        'Firewall & Intrusion Detection System (IDS) analysis',
        'End-to-end encryption verification (At-rest & In-transit)',
        'API endpoint security & rate limiting'
      ],
      standards: ['OWASP Top 10', 'AES-256', 'Zero Trust']
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      icon: <FileText size={32} className="text-blue-400" />,
      description: 'Ensuring your infrastructure meets rigorous global and industry-specific standards.',
      checks: [
        'Adherence to corporate IT governance policies',
        'GDPR, CCPA, and data sovereignty checks',
        'ISO 27001 Information Security Management verification',
        'SOC 2 Type II control auditing'
      ],
      standards: ['ISO 27001', 'GDPR', 'SOC 2']
    },
    {
      id: 'integrity',
      title: 'Data Integrity & Resilience',
      icon: <Database size={32} className="text-fuchsia-400" />,
      description: 'Validating that your data remains accurate, consistent, and recoverable.',
      checks: [
        'Immutable backup verification & restoration drills',
        'Database transaction consistency checks (ACID)',
        'Disaster Recovery (DR) plan simulation',
        'Unauthorized change detection protocols'
      ],
      standards: ['RPO/RTO', 'Data Lineage']
    },
    {
      id: 'performance',
      title: 'Performance & Reliability',
      icon: <Activity size={32} className="text-amber-400" />,
      description: 'Stress-testing system stability under peak load conditions.',
      checks: [
        'Load balancing & auto-scaling latency analysis',
        'Uptime monitoring & SLA verification (99.99%)',
        'Resource bottleneck identification (CPU/Memory/IO)',
        'Failover redundancy confirmation'
      ],
      standards: ['High Availability', 'Latency < 50ms']
    },
    {
      id: 'access',
      title: 'Identity & Access Control',
      icon: <Lock size={32} className="text-violet-400" />,
      description: 'Auditing the "Who, What, and When" of system accessibility.',
      checks: [
        'Role-Based Access Control (RBAC) matrix review',
        'Multi-Factor Authentication (MFA) enforcement',
        'Privileged Access Management (PAM) logs',
        'Real-time anomaly detection in user behavior'
      ],
      standards: ['IAM', 'Least Privilege']
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] pb-32 overflow-hidden relative font-sans">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in zoom-in duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Diagnostics Module
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400">Infrastructure Audit.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Identify critical vulnerabilities, ensure regulatory compliance, and optimize architectural performance before they impact your business continuity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact" 
              className="group bg-white text-slate-950 px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3"
            >
              <Search size={20} /> Request Audit Report
            </Link>
            <div className="flex items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> Non-Invasive</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> Full Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Scope Visualization */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
            <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">What Does an Audit Check?</h2>
                <p className="text-slate-400 max-w-xl">Our proprietary scanning engine evaluates your infrastructure across five critical dimensions.</p>
            </div>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass rounded-lg border-white/10 text-xs font-mono text-slate-400">
                <Server size={14} className="text-emerald-500" />
                <span>SERVER_STATUS: <span className="text-emerald-400">ONLINE</span></span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auditCategories.map((cat, idx) => (
                <div 
                    key={cat.id} 
                    className="glass-panel p-8 rounded-[2rem] border-white/5 hover:border-violet-500/30 group transition-all duration-500 hover:-translate-y-2"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500">
                            {cat.icon}
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{cat.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">
                        {cat.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                        {cat.checks.map((check, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0"></div>
                                <span className="text-sm text-slate-300 leading-tight">{check}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                        {cat.standards.map(std => (
                            <span key={std} className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                {std}
                            </span>
                        ))}
                    </div>
                </div>
            ))}

            {/* Final Call to Action Card */}
            <div className="glass-panel p-8 rounded-[2rem] border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 flex flex-col justify-center items-center text-center group">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Eye size={40} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Verify?</h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Get a detailed roadmap to harden your systems against modern threats.
                </p>
                <Link to="/contact" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
                    Start Audit <ArrowRight size={18} />
                </Link>
            </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 border-t border-white/5">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
             {/* Mock Certification Logos */}
             <div className="flex items-center gap-3 justify-center">
                 <Shield className="text-white" size={32} />
                 <span className="text-lg font-bold text-white">ISO 27001</span>
             </div>
             <div className="flex items-center gap-3 justify-center">
                 <Lock className="text-white" size={32} />
                 <span className="text-lg font-bold text-white">SOC 2 Type II</span>
             </div>
             <div className="flex items-center gap-3 justify-center">
                 <Database className="text-white" size={32} />
                 <span className="text-lg font-bold text-white">GDPR Ready</span>
             </div>
             <div className="flex items-center gap-3 justify-center">
                 <AlertTriangle className="text-white" size={32} />
                 <span className="text-lg font-bold text-white">NIST Framework</span>
             </div>
         </div>
      </section>
    </div>
  );
};

export default SystemAudit;
