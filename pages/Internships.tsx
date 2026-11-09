import React, { useState, useEffect } from 'react';
import { MapPin, Clock, BadgeCheck, ArrowRight, X } from 'lucide-react';
import InternshipApplicationForm from '../components/InternshipApplicationForm';

interface Internship {
  _id: string;
  title: string;
  location: string;
  type: string;
  salaryRange?: string;
  roleOverview?: string;
  requiredSkills?: string[];
}

const TERMS = [
  { type: 'Short-Term Internship', label: 'Short-Term', duration: '1–3 months' },
  { type: 'Long-Term Internship', label: 'Long-Term', duration: '6 months' },
];

const SAMPLE_DOMAINS = [
  'Web Development', 'Python & Data Science', 'AI / Machine Learning', 'UI/UX Design',
  'Software Testing', 'Digital Marketing', 'Embedded Systems', 'Internet of Things (IoT)',
];

// Shown when the live list can't be loaded, so the page and form are still visible
const SAMPLE_INTERNSHIPS: Internship[] = TERMS.flatMap(term =>
  SAMPLE_DOMAINS.map(title => ({ _id: `sample-${term.label}-${title}`, title, location: 'Remote', type: term.type }))
);

const Internships: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [activeTerm, setActiveTerm] = useState(TERMS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSample, setIsSample] = useState(false);
  const [selected, setSelected] = useState<Internship | null>(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + '/jobs');
        if (!res.ok) throw new Error('Failed to fetch internships');
        const data: Internship[] = await res.json();
        const live = data.filter(job => TERMS.some(term => term.type === job.type));
        setInternships(live.length > 0 ? live : SAMPLE_INTERNSHIPS);
        setIsSample(live.length === 0);
      } catch (err) {
        console.error('Failed to fetch internships:', err);
        setInternships(SAMPLE_INTERNSHIPS);
        setIsSample(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const visible = internships.filter(item => item.type === activeTerm.type);
  const selectedTerm = TERMS.find(term => term.type === selected?.type);

  return (
    <div className="pb-32 bg-[#020617] neural-grid overflow-hidden relative min-h-screen">
      <section className="pt-10 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Start with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 italic">real work.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 leading-relaxed font-medium max-w-3xl mb-8">
            Free internships for students who want practical experience beyond the classroom. Pick a domain, choose the duration that fits your studies, and build skills by working on real projects with our team.
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-300">
            <li className="flex items-center gap-2"><BadgeCheck size={18} className="text-green-400" /> Free for all students</li>
            <li className="flex items-center gap-2"><Clock size={18} className="text-violet-400" /> Short-term: 1–3 months</li>
            <li className="flex items-center gap-2"><Clock size={18} className="text-fuchsia-400" /> Long-term: 6 months</li>
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex gap-3 mb-10" role="tablist" aria-label="Internship duration">
          {TERMS.map(term => (
            <button
              key={term.type}
              role="tab"
              aria-selected={activeTerm.type === term.type}
              onClick={() => setActiveTerm(term)}
              className={`px-6 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest transition-all ${activeTerm.type === term.type ? 'bg-violet-600 text-white border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
            >
              {term.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-400 font-medium animate-pulse">Loading internships...</div>
        ) : visible.length === 0 ? (
          <div className="p-12 text-center text-slate-400 font-medium">No {activeTerm.label.toLowerCase()} internships are open right now. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map(item => (
              <article key={item._id} className="glass p-8 rounded-3xl border-white/5 hover:border-violet-500/30 transition-all flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
                {item.roleOverview && <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.roleOverview}</p>}
                <div className="space-y-2 text-sm font-medium text-slate-300 mb-6">
                  <div className="flex items-center gap-2 text-green-400 font-bold"><BadgeCheck size={16} /> Free Internship</div>
                  <div className="flex items-center gap-2"><Clock size={16} className="text-slate-500" /> {activeTerm.duration}</div>
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-500" /> {item.location}</div>
                </div>
                <button onClick={() => setSelected(item)} className="mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-violet-600 hover:border-violet-500 transition-all flex items-center justify-center gap-2">
                  Apply Now <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {selected && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="apply-title">
          <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-2xl my-8">
            <div className="flex justify-between items-start gap-4 mb-6">
              <div>
                <h2 id="apply-title" className="text-2xl font-bold text-white">{selected.title}</h2>
                <p className="text-violet-400 text-sm font-bold">{selectedTerm?.label} Internship · Free</p>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close application form" className="text-slate-400 hover:text-white"><X size={24} /></button>
            </div>
            <InternshipApplicationForm jobId={selected._id} jobTitle={`${selected.title} (${selected.type})`} previewOnly={isSample} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
