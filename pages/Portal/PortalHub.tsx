
import React, { useState, useEffect } from 'react';
import { UserRole, UserSession, PortalTask } from '../../types';
import { 
  Lock, Mail, Shield, BookOpen, 
  Clock, BarChart3, Settings, LogOut, ChevronRight, 
  Terminal, Code, ClipboardList, TrendingUp, Cpu, Zap, AlertCircle
} from 'lucide-react';
import AdminJobs from '../Admin/AdminJobs';
import AdminApplications from '../Admin/AdminApplications';
import AdminSettings from '../Admin/AdminSettings';

const PortalHub: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'OVERVIEW' | 'JOBS' | 'APPLICATIONS' | 'SETTINGS'>('OVERVIEW');

  useEffect(() => {
    // Check if token exists in local storage on load
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setSession(JSON.parse(user));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const newSession: UserSession = {
        id: data.id,
        userName: data.userName,
        role: data.role as UserRole,
        token: data.token,
        lastLogin: new Date().toISOString()
      };

      setSession(newSession);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(newSession));
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const tasks: PortalTask[] = [
    { id: 't1', title: 'Implement RTOS Semaphore', status: 'IN_PROGRESS', dueDate: '2024-05-25' },
    { id: 't2', title: 'Unit Tests for Neural API', status: 'TODO', dueDate: '2024-05-28' },
    { id: 't3', title: 'Submit Hardware Schematic', status: 'DONE', dueDate: '2024-05-15' }
  ];

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-[#020617]">
        <div className="max-w-md w-full glass p-10 lg:p-16 rounded-[3rem] border-violet-500/20 shadow-2xl reveal relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="text-center mb-10 relative z-10">
            <div className="w-20 h-20 bg-violet-600/20 text-violet-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Portal Access</h1>
            <p className="text-slate-500 text-sm">Secure entry for Students & Staff</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3 relative z-10 text-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-4 text-slate-600 group-focus-within/input:text-violet-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all placeholder:text-slate-700"
                  placeholder="name@spheronix.tech"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Credential</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-4 text-slate-600 group-focus-within/input:text-violet-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all placeholder:text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button 
              disabled={isLoading}
              className={`w-full bg-violet-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-violet-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-95 transform ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Authenticating...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pb-20 selection:bg-violet-500 selection:text-white">
      {/* Portal Header */}
      <div className="bg-slate-950/50 border-b border-white/5 backdrop-blur-xl fixed top-20 left-0 w-full z-30 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <div className="w-8 h-8 bg-violet-600/20 text-violet-400 rounded flex items-center justify-center font-bold transition-transform group-hover:scale-110">
              {session.role ? session.role[0] : 'U'}
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-white font-bold tracking-tight">{session.userName || 'User'}</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                {session.role || 'GUEST'} ACCESS LEVEL
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="group text-slate-500 hover:text-red-400 transition-all flex items-center gap-2 text-sm font-bold bg-white/5 px-4 py-2 rounded-xl hover:bg-red-500/10"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="hidden sm:inline">Terminate Session</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44">
        {session.role === 'STUDENT' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section className="glass p-10 rounded-[2.5rem] border-violet-500/10 hover:border-violet-500/30 transition-all duration-700 group">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <BookOpen className="text-violet-400 group-hover:scale-110 transition-transform" /> Active Assessments
                </h2>
                <div className="space-y-4">
                  {[
                    { title: 'Embedded RTOS Final Exam', time: '120m', status: 'Ready', icon: <Cpu className="text-violet-400" size={18} /> },
                    { title: 'JavaScript Engine Internals MCQ', time: '45m', status: 'In Progress', icon: <Zap className="text-amber-400" size={18} /> }
                  ].map((exam, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between group/exam hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-500 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center transition-transform group-hover/exam:scale-110 group-hover/exam:rotate-3 shadow-lg">
                          {exam.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1 group-hover/exam:text-violet-300 transition-colors">{exam.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-tight">
                            <span className="flex items-center gap-1"><Clock size={14} className="text-violet-500" /> {exam.time}</span>
                            <span className={`px-2 py-0.5 rounded-full border border-white/5 bg-white/5 ${exam.status === 'Ready' ? 'text-green-400' : 'text-amber-400'}`}>{exam.status}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-violet-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold opacity-80 group-hover/exam:opacity-100 group-hover/exam:bg-violet-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-600/20">
                        Launch IDE
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-fuchsia-500/20 transition-all duration-700 group">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <ClipboardList className="text-fuchsia-400 group-hover:scale-110 transition-transform" /> My Tasks
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 flex items-start justify-between group/task hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5 transition-all duration-500 cursor-default">
                      <div>
                        <div className={`w-2 h-2 rounded-full mb-3 shadow-[0_0_8px] ${task.status === 'DONE' ? 'bg-green-500 shadow-green-500/50' : task.status === 'IN_PROGRESS' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-slate-700 shadow-slate-700/50'}`}></div>
                        <h4 className="font-bold text-white text-sm mb-1 group-hover/task:text-fuchsia-300 transition-colors">{task.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Due: {task.dueDate}</p>
                      </div>
                      <button className="text-slate-600 hover:text-white transition-all transform group-hover/task:translate-x-1">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <section className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 p-10 rounded-[2.5rem] border border-violet-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-700 group">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="text-violet-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> My Performance
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Current Score</span>
                    <span className="text-4xl font-bold text-white tabular-nums group-hover:scale-105 transition-transform origin-right">882 <span className="text-xs text-slate-500">XP</span></span>
                  </div>
                  <div className="h-3 w-full bg-slate-900/80 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 w-[72%] shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-1000 ease-out"></div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed italic font-medium">
                    You are in the top 15% of the "Cloud Architecture" cohort. Keep up the high coding velocity.
                  </p>
                </div>
              </section>

              <section className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-violet-500/20 transition-all duration-700">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {[
                    { date: 'MAY 22', title: 'Deep Dive: MLOps', color: 'text-violet-400', bg: 'hover:bg-violet-500/10' },
                    { date: 'MAY 25', title: 'Peer Code Review', color: 'text-fuchsia-400', bg: 'hover:bg-fuchsia-500/10' }
                  ].map((event, i) => (
                    <div key={i} className={`flex gap-4 p-4 bg-white/5 rounded-2xl text-xs transition-all cursor-default ${event.bg} hover:scale-102 hover:translate-x-1`}>
                      <div className={`${event.color} font-bold shrink-0 w-12 tracking-tighter`}>{event.date}</div>
                      <div className="text-slate-400 font-medium">{event.title} Session #4</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {session.role === 'EMPLOYEE' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
             <div className="lg:col-span-3 mb-4">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Content Orchestrator</h1>
                <p className="text-slate-500 font-medium">Build, monitor, and scale cohort learning experiences.</p>
             </div>
             
             {[
               { id: 'qb', title: 'Question Banks', desc: 'Manage 1,400+ technical prompts across coding, MCQ, and reasoning modules.', icon: <Code size={28} />, color: 'violet', glow: 'shadow-violet-600/20', btn: 'Enter Question Lab' },
               { id: 'es', title: 'Exam Scheduling', desc: 'Currently 4 active cohorts taking "Advanced Embedded" certifications.', icon: <ClipboardList size={28} />, color: 'fuchsia', glow: 'shadow-fuchsia-600/20', btn: 'Manage Schedules' },
               { id: 'ca', title: 'Cohort Analytics', desc: 'Analyze performance drift and engagement metrics for all students.', icon: <BarChart3 size={28} />, color: 'indigo', glow: 'shadow-indigo-600/20', btn: 'View Insight Board' }
             ].map((card) => (
               <div key={card.id} className={`glass p-10 rounded-[3rem] border-${card.color}-500/10 hover:border-${card.color}-500/40 transition-all duration-700 hover:-translate-y-2 group shadow-xl`}>
                 <div className={`w-14 h-14 bg-${card.color}-600/20 text-${card.color}-400 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                   {card.icon}
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4 transition-colors group-hover:text-white/90">{card.title}</h3>
                 <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                   {card.desc}
                 </p>
                 <button className={`w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold text-sm hover:bg-${card.color}-600 transition-all shadow-lg active:scale-95`}>
                   {card.btn}
                 </button>
               </div>
             ))}

             <section className="lg:col-span-3 glass p-10 rounded-[3rem] border-white/5 hover:border-violet-500/10 transition-all duration-700 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-bold text-white">Recent Submissions Queue</h2>
                  <button className="text-xs font-bold text-violet-400 hover:text-white transition-colors uppercase tracking-widest">Refresh Feed</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-white/10 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <tr>
                        <th className="pb-6 px-4">Student</th>
                        <th className="pb-6 px-4">Assessment</th>
                        <th className="pb-6 px-4">Submitted At</th>
                        <th className="pb-6 px-4 text-right">Raw Score</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-slate-300">
                      {[
                        { name: 'Marcus J.', exam: 'Full Stack Lab 1', time: '10m ago', score: '92%', trend: 'up' },
                        { name: 'Sarah L.', exam: 'RTOS Drivers', time: '45m ago', score: '88%', trend: 'up' },
                        { name: 'Chen W.', exam: 'Aptitude Tier 1', time: '1h ago', score: '74%', trend: 'down' }
                      ].map((sub, i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 group hover:bg-white/5 transition-all duration-300">
                          <td className="py-6 px-4 font-bold text-white group-hover:pl-6 transition-all">{sub.name}</td>
                          <td className="py-6 px-4 text-slate-500 font-medium">{sub.exam}</td>
                          <td className="py-6 px-4 text-slate-500 text-xs font-bold uppercase">{sub.time}</td>
                          <td className="py-6 px-4 text-right font-black text-violet-400 tracking-tighter text-base">{sub.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </section>
          </div>
        )}

        {session.role === 'ADMIN' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 reveal">
            <div className="lg:col-span-4 flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Global Oversight</h1>
                <p className="text-slate-500 font-medium">Enterprise KPIs, user auditing, and global system settings.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto bg-slate-900/50 p-2 rounded-2xl border border-white/5">
                <button 
                  onClick={() => setActiveAdminTab('OVERVIEW')}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeAdminTab === 'OVERVIEW' ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveAdminTab('JOBS')}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeAdminTab === 'JOBS' ? 'bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  Job Management
                </button>
                <button 
                  onClick={() => setActiveAdminTab('APPLICATIONS')}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeAdminTab === 'APPLICATIONS' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  Applications
                </button>
                <button 
                  onClick={() => setActiveAdminTab('SETTINGS')}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeAdminTab === 'SETTINGS' ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  Settings
                </button>
              </div>
            </div>

            {activeAdminTab === 'JOBS' ? (
              <div className="lg:col-span-4">
                <AdminJobs token={session.token || ''} />
              </div>
            ) : activeAdminTab === 'APPLICATIONS' ? (
              <div className="lg:col-span-4">
                <AdminApplications token={session.token || ''} />
              </div>
            ) : activeAdminTab === 'SETTINGS' ? (
              <div className="lg:col-span-4">
                <AdminSettings session={session} setSession={setSession} />
              </div>
            ) : (
              <>
                {[
                  { label: 'Active Students', value: '1,245', sub: '+12% vs last month', color: 'text-white', growth: 'text-green-500' },
                  { label: 'Certifications Issued', value: '4,890', sub: 'Lifetime Aggregate', color: 'text-fuchsia-400', growth: 'text-slate-600' },
                  { label: 'API Latency', value: '142', unit: 'ms', sub: 'Status: Healthy', color: 'text-white', growth: 'text-green-500' },
                  { label: 'Infrastructure Cost', value: '$12.4k', sub: 'Critical Scaling Needed', color: 'text-white', growth: 'text-red-500' }
                ].map((kpi, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/10 hover:border-violet-500/20 transition-all duration-700 shadow-xl group hover:-translate-y-1">
                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">{kpi.label}</div>
                <div className={`text-4xl font-black ${kpi.color} tabular-nums mb-4 tracking-tighter group-hover:scale-110 transition-transform origin-left`}>
                  {kpi.value}{kpi.unit && <span className="text-sm text-slate-500 ml-1 italic font-medium">{kpi.unit}</span>}
                </div>
                <div className={`text-[10px] font-black uppercase tracking-widest ${kpi.growth}`}>{kpi.sub}</div>
              </div>
            ))}

            <section className="lg:col-span-3 glass p-10 rounded-[3rem] border-white/5 hover:border-violet-500/10 transition-all duration-700 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
                <Terminal className="text-violet-400" /> System Audit Logs
              </h2>
              <div className="space-y-4">
                {[
                  { actor: 'Dr. Aris V.', action: 'Global Setting Update', entity: 'RBAC Table', time: '5m ago', icon: <Settings size={18} /> },
                  { actor: 'System', action: 'Daily Backup Complete', entity: 'Postgres Prod', time: '1h ago', icon: <Shield size={18} /> },
                  { actor: 'Admin User', action: 'Role Escalation', entity: 'user_id: 104', time: '2h ago', icon: <Shield size={18} /> },
                  { actor: 'System', action: 'DDoS Throttling Triggered', entity: 'Edge-R-2', time: '4h ago', icon: <Zap size={18} /> }
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 text-xs group/log hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500 group-hover/log:text-violet-400 transition-colors shadow-lg">
                        {log.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm mb-0.5">{log.action}</div>
                        <div className="text-slate-500 font-medium tracking-tight">
                          <span className="text-violet-400 font-bold">{log.actor}</span> modified {log.entity}
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-600 italic font-bold group-hover/log:text-slate-400 transition-colors">{log.time}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="lg:col-span-1 glass p-10 rounded-[3rem] border-white/5 hover:border-fuchsia-500/10 transition-all duration-700 shadow-2xl group">
               <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-2">
                 <BarChart3 className="text-fuchsia-400" /> User Split
               </h3>
               <div className="space-y-8">
                  {[
                    { label: 'Students', val: 82, color: 'violet' },
                    { label: 'Employees', val: 14, color: 'fuchsia' },
                    { label: 'Admins', val: 4, color: 'indigo' }
                  ].map((item) => (
                    <div key={item.label} className="group/bar">
                      <div className="flex justify-between items-center text-xs mb-3">
                        <span className="text-slate-500 font-bold uppercase tracking-widest">{item.label}</span>
                        <span className="text-white font-black">{item.val}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full bg-${item.color}-600 rounded-full group-hover/bar:brightness-125 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                          style={{ width: `${item.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="mt-12 pt-10 border-t border-white/5">
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium uppercase tracking-tighter italic">
                    Data reflects verified sessions from current billing period.
                  </p>
               </div>
            </div>
            </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalHub;
