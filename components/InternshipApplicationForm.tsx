import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface InternshipApplicationFormProps {
  jobId: string;
  jobTitle: string;
  previewOnly?: boolean;
}

const inputClass = 'w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors';
const labelClass = 'block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2';

const InternshipApplicationForm: React.FC<InternshipApplicationFormProps> = ({ jobId, jobTitle, previewOnly = false }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      setErrorMessage(`File ${file.name} exceeds the 500KB limit. Please upload a smaller file.`);
      setStatus('error');
      e.target.value = '';
      setResume(null);
      return;
    }
    setStatus('idle');
    setErrorMessage('');
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return;
    setIsSubmitting(true);
    setStatus('idle');

    const submissionData = new FormData();
    submissionData.append('jobId', jobId);
    submissionData.append('jobTitle', jobTitle);
    Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
    submissionData.append('resume', resume);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + '/applications', {
        method: 'POST',
        body: submissionData,
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to submit application');
      }
      setStatus('success');
    } catch (error: unknown) {
      console.error(error);
      setErrorMessage((error as Error).message || 'Failed to submit application. Please try again.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
        <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
        <p className="text-slate-400">Thank you for applying. Our team will review your profile and contact you about the next steps.</p>
      </div>
    );
  }

  const renderInput = (label: string, name: string, type = 'text', required = true) => (
    <div>
      <label htmlFor={name} className={labelClass}>{label} {required && <span className="text-red-400">*</span>}</label>
      <input id={name} type={type} name={name} required={required} onChange={handleChange} className={inputClass} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {renderInput('Full Name', 'name')}
        {renderInput('Email', 'email', 'email')}
        {renderInput('Phone', 'phone', 'tel')}
        {renderInput('College / University', 'university')}
        {renderInput('Degree & Branch', 'highestQualification')}
        {renderInput('Graduation Year', 'graduationYear', 'number')}
      </div>
      {renderInput('Key Skills', 'primarySkills')}
      {renderInput('LinkedIn or Portfolio URL', 'linkedinUrl', 'url', false)}
      <div>
        <label htmlFor="coverLetter" className={labelClass}>Why this internship?</label>
        <textarea id="coverLetter" name="coverLetter" rows={3} onChange={handleChange} className={inputClass} />
      </div>

      <div className="border border-dashed border-white/20 rounded-2xl p-6 bg-slate-900/30 hover:bg-slate-900/50 transition-colors relative">
        <input type="file" name="resume" required aria-label="Resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="flex flex-col items-center text-center">
          <Upload className="text-violet-400 mb-2" size={24} />
          <h4 className="text-sm font-bold text-white mb-1">Resume <span className="text-red-400">*</span></h4>
          <p className="text-xs text-slate-500">{resume ? resume.name : 'Click to upload (PDF, DOCX, max 500KB)'}</p>
        </div>
      </div>

      {status === 'error' && (
        <div role="alert" className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
          <AlertCircle size={18} className="shrink-0" /> {errorMessage}
        </div>
      )}

      {previewOnly && (
        <p role="status" className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-4 rounded-xl text-sm">
          Applications can't be submitted right now because we can't reach our server. Please try again shortly.
        </p>
      )}

      <button type="submit" disabled={isSubmitting || previewOnly} className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
        {isSubmitting ? <><Loader size={18} className="animate-spin" /> Submitting...</> : 'Submit Application'}
      </button>
    </form>
  );
};

export default InternshipApplicationForm;
