import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { MapPin, Briefcase, Clock, ArrowLeft, Building2, GraduationCap, CheckCircle2, ChevronRight, Zap, Star, Heart } from 'lucide-react';
import JobApplicationForm from '../components/JobApplicationForm';

interface JobDetailData {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experienceLevel: string;
  description?: string[];
  referenceNumber?: string;
  workingModel?: string;
  salaryRange?: string;
  aboutCompany?: string;
  roleOverview?: string;
  keyResponsibilities?: string[];
  requiredSkills?: string[];
  preferredQualifications?: string[];
  educationalRequirements?: string;
  benefits?: string[];
  hiringProcess?: string;
  applicationDeadline?: string;
  equalOpportunityStatement?: string;
}

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs`); // Fetch all to find specific, or we can add single fetch API
        if (!res.ok) throw new Error('Failed to fetch job details');
        const data = await res.json();
        const found = data.find((j: JobDetailData) => j._id === id);
        if (!found) throw new Error('Job not found');
        setJob(found);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-violet-400">Loading Job Details...</div>;
  }

  if (error || !job) {
    return <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
      <Link to="/careers" className="text-violet-400 hover:text-violet-300">&larr; Back to Careers</Link>
    </div>;
  }

  const renderArraySection = (title: string, items: string[], icon: React.ReactNode) => {
    if (!items || items.length === 0 || (items.length === 1 && items[0] === '')) return null;
    return (
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-violet-600/20 text-violet-400 rounded-lg">{icon}</div> {title}
        </h3>
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-300">
              <CheckCircle2 size={18} className="text-fuchsia-400 mt-1 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-[#020617] min-h-screen pb-32">
      {/* Header */}
      <div className="pt-40 pb-20 relative border-b border-white/5 bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/careers" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 font-bold text-sm">
            <ArrowLeft size={16} /> Back to All Roles
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-full text-xs font-bold uppercase tracking-widest">{job.department}</span>
            {job.workingModel && <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-full text-xs font-bold uppercase tracking-widest">{job.workingModel}</span>}
            {job.referenceNumber && <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-bold uppercase tracking-widest">REF: {job.referenceNumber}</span>}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">{job.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">
            <span className="flex items-center gap-2"><MapPin size={16} className="text-slate-500" /> {job.location}</span>
            <span className="flex items-center gap-2"><Briefcase size={16} className="text-slate-500" /> {job.experienceLevel}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-slate-500" /> {job.type}</span>
            {job.salaryRange && <span className="flex items-center gap-2 text-green-400 border-l border-white/10 pl-6">{job.salaryRange}</span>}
          </div>

          {!showApplyForm && (
            <button 
              onClick={() => setShowApplyForm(true)}
              className="bg-white text-violet-950 px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Apply for this role <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {showApplyForm ? (
          <div>
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Complete your Application</h2>
              <button onClick={() => setShowApplyForm(false)} className="text-slate-400 hover:text-white font-bold text-sm">Cancel Application</button>
            </div>
            <JobApplicationForm jobId={job._id} jobTitle={job.title} />
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Standard Description (Legacy Support) */}
            {job.description && job.description.length > 0 && job.description[0] !== '' && !job.roleOverview && (
              <div className="mb-12 text-slate-300 leading-relaxed space-y-4">
                {job.description.map((desc: string, i: number) => <p key={i}>{desc}</p>)}
              </div>
            )}

            {/* MNC Standard Sections */}
            {job.aboutCompany && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="p-2 bg-slate-800 text-white rounded-lg"><Building2 size={20} /></div> About the Company
                </h3>
                <p className="text-slate-300 leading-relaxed">{job.aboutCompany}</p>
              </div>
            )}

            {job.roleOverview && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Zap size={20} /></div> Role Overview
                </h3>
                <p className="text-slate-300 leading-relaxed">{job.roleOverview}</p>
              </div>
            )}

            {renderArraySection('Key Responsibilities', job.keyResponsibilities, <Briefcase size={20} />)}
            {renderArraySection('Required Skills & Experience', job.requiredSkills, <Zap size={20} />)}
            {renderArraySection('Preferred Qualifications', job.preferredQualifications, <Star size={20} />)}
            
            {job.educationalRequirements && (
              <div className="mb-12 bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                <div className="p-3 bg-fuchsia-500/20 text-fuchsia-400 rounded-xl"><GraduationCap size={24} /></div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Educational Requirements</h4>
                  <p className="text-white font-medium">{job.educationalRequirements}</p>
                </div>
              </div>
            )}

            {renderArraySection('Benefits & Perks', job.benefits, <Heart size={20} />)}

            <div className="mt-20 border-t border-white/10 pt-12 text-sm text-slate-500 space-y-6">
              {job.hiringProcess && (
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-widest mb-2">Hiring Process</h4>
                  <p>{job.hiringProcess}</p>
                </div>
              )}
              {job.applicationDeadline && (
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-widest mb-2">Application Deadline</h4>
                  <p>{new Date(job.applicationDeadline).toLocaleDateString()}</p>
                </div>
              )}
              {job.equalOpportunityStatement && (
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-widest mb-2">Equal Opportunity Statement</h4>
                  <p>{job.equalOpportunityStatement}</p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
