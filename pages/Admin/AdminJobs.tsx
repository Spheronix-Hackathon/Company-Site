import React, { useState, useEffect } from 'react';

import { Plus, Edit, Trash2, Check, AlertCircle } from 'lucide-react';

interface AdminJobsProps {
  token: string;
}

interface JobData {
  id: string;
  _id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experienceLevel: string;
  [key: string]: unknown;
}

const AdminJobs: React.FC<AdminJobsProps> = ({ token }) => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  
  const initialFormState = {
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experienceLevel: 'Fresher',
    referenceNumber: '',
    salaryRange: '',
    aboutCompany: '',
    roleOverview: '',
    educationalRequirements: '',
    workingModel: 'Onsite',
    applicationDeadline: '',
    hiringProcess: '',
    equalOpportunityStatement: '',
    keyResponsibilities: [''],
    requiredSkills: [''],
    preferredQualifications: [''],
    benefits: ['']
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + '/jobs');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      const formattedData = data.map((job: JobData) => ({
        ...job,
        id: job._id
      }));
      setJobs(formattedData);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field: keyof typeof formData, index: number, value: string) => {
    const arr = formData[field] as string[];
    const newArr = [...arr];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field: keyof typeof formData) => {
    const arr = formData[field] as string[];
    setFormData({ ...formData, [field]: [...arr, ''] });
  };

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    const arr = formData[field] as string[];
    const newArr = arr.filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArr.length ? newArr : [''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/jobs/${currentJobId}` : `${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + '/jobs';
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to save job');
      
      resetForm();
      fetchJobs();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleEdit = (job: JobData) => {
    setIsEditing(true);
    setCurrentJobId(job.id);
    setFormData({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || 'Full-time',
      experienceLevel: job.experienceLevel || 'Fresher',
      referenceNumber: job.referenceNumber || '',
      salaryRange: job.salaryRange || '',
      aboutCompany: job.aboutCompany || '',
      roleOverview: job.roleOverview || '',
      educationalRequirements: job.educationalRequirements || '',
      workingModel: job.workingModel || 'Onsite',
      applicationDeadline: job.applicationDeadline || '',
      hiringProcess: job.hiringProcess || '',
      equalOpportunityStatement: job.equalOpportunityStatement || '',
      keyResponsibilities: (job.keyResponsibilities as string[])?.length ? (job.keyResponsibilities as string[]) : [''],
      requiredSkills: (job.requiredSkills as string[])?.length ? (job.requiredSkills as string[]) : [''],
      preferredQualifications: (job.preferredQualifications as string[])?.length ? (job.preferredQualifications as string[]) : [''],
      benefits: (job.benefits as string[])?.length ? (job.benefits as string[]) : ['']
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + `/jobs/${id}`, { 
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete job');
      fetchJobs();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentJobId(null);
    setFormData(initialFormState);
  };

  const renderArrayField = (label: string, field: keyof typeof formData) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{label}</label>
      {(formData[field] as string[]).map((item: string, idx: number) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input 
            type="text"
            value={item} 
            onChange={(e) => handleArrayChange(field, idx, e.target.value)} 
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 text-sm" 
            placeholder={`Item ${idx + 1}`}
          />
          <button type="button" onClick={() => removeArrayItem(field, idx)} className="p-2 h-fit rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(field)} className="text-xs font-bold text-violet-400 flex items-center gap-1 hover:text-violet-300">
        <Plus size={14} /> Add Item
      </button>
    </div>
  );

  return (
    <div className="w-full text-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Job Management Panel</h2>
          <p className="text-slate-400 font-medium">Create and manage detailed MNC standard career opportunities.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-3">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-3xl border-white/5 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                {isEditing ? <Edit size={20} className="text-violet-400"/> : <Plus size={20} className="text-green-400"/>}
                {isEditing ? 'Edit Job' : 'Create New Job'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Details */}
                <div className="p-4 bg-slate-900/30 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="font-bold text-violet-400">Basic Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Job Title</label>
                      <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ref Number</label>
                      <input type="text" name="referenceNumber" value={formData.referenceNumber} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department</label>
                      <input required type="text" name="department" value={formData.department} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                      <input required type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                      <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 appearance-none">
                        <option>Full-time</option><option>Part-time</option><option>Training</option><option>Internship</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Experience</label>
                      <select name="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 appearance-none">
                        <option>Fresher</option><option>Experienced</option><option>Internship</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Model</label>
                      <select name="workingModel" value={formData.workingModel} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 appearance-none">
                        <option>Onsite</option><option>Hybrid</option><option>Remote</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Salary Range</label>
                      <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deadline</label>
                      <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600" />
                    </div>
                  </div>
                </div>

                {/* Overviews */}
                <div className="p-4 bg-slate-900/30 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="font-bold text-violet-400">Overviews</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role Overview</label>
                    <textarea name="roleOverview" rows={3} value={formData.roleOverview} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">About Company</label>
                    <textarea name="aboutCompany" rows={3} value={formData.aboutCompany} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none" />
                  </div>
                </div>

                {/* Lists */}
                <div className="p-4 bg-slate-900/30 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="font-bold text-violet-400">Requirements & Benefits</h3>
                  {renderArrayField('Key Responsibilities', 'keyResponsibilities')}
                  {renderArrayField('Required Skills', 'requiredSkills')}
                  {renderArrayField('Preferred Qualifications', 'preferredQualifications')}
                  {renderArrayField('Benefits & Perks', 'benefits')}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Educational Requirements</label>
                    <input type="text" name="educationalRequirements" value={formData.educationalRequirements} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600" />
                  </div>
                </div>

                {/* Logistics */}
                <div className="p-4 bg-slate-900/30 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="font-bold text-violet-400">Logistics</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hiring Process</label>
                    <textarea name="hiringProcess" rows={2} value={formData.hiringProcess} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Equal Opportunity Statement</label>
                    <textarea name="equalOpportunityStatement" rows={2} value={formData.equalOpportunityStatement} onChange={handleInputChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none" />
                  </div>
                </div>

                <div className="pt-4 flex gap-3 sticky bottom-0 bg-slate-950/80 p-4 backdrop-blur-md rounded-xl border border-white/10">
                  <button type="submit" className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-violet-500">
                    <Check size={18} /> {isEditing ? 'Update Job' : 'Publish Job'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetForm} className="px-4 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-1">
             <div className="glass rounded-3xl border-white/5 overflow-hidden max-h-[80vh] flex flex-col">
                <div className="p-6 border-b border-white/5 bg-slate-900/30 flex justify-between items-center">
                   <h2 className="text-xl font-bold">Active Jobs ({jobs.length})</h2>
                </div>
                
                <div className="overflow-y-auto flex-1">
                  {isLoading ? (
                    <div className="p-12 text-center text-slate-400">Loading jobs...</div>
                  ) : jobs.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">No jobs found. Create one!</div>
                  ) : (
                    <div className="p-4 space-y-4">
                      {jobs.map((job) => (
                        <div key={job.id} className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:border-violet-500/30 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-white">{job.title}</h3>
                              <p className="text-sm text-slate-400">{job.department} &bull; {job.location}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(job)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20"><Edit size={16}/></button>
                              <button onClick={() => handleDelete(job.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"><Trash2 size={16}/></button>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-white/5 border border-white/10 text-violet-400">{job.type}</span>
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-white/5 border border-white/10 text-fuchsia-400">{job.experienceLevel}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
