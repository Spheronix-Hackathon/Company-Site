import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader, Plus, Trash2, X } from 'lucide-react';

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    resume: null,
    coverLetterFile: null,
    supportingDocuments: null,
  });
  const [educationList, setEducationList] = useState([
    { level: '', institution: '', passingYear: '', score: '' }
  ]);
  const [certificationList, setCertificationList] = useState<{title: string, issuer: string, year: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 500 * 1024) {
        setErrorMessage(`File ${file.name} exceeds the 500KB limit. Please upload a smaller file.`);
        setStatus('error');
        // Clear the file input
        e.target.value = '';
        return;
      }
      setStatus('idle');
      setErrorMessage('');
      setFiles({ ...files, [fieldName]: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const submissionData = new FormData();
    submissionData.append('jobId', jobId);
    submissionData.append('jobTitle', jobTitle);
    
    // Append dynamic arrays as JSON strings
    submissionData.append('educationDetails', JSON.stringify(educationList));
    submissionData.append('certificationDetails', JSON.stringify(certificationList));

    // Append text fields
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });

    // Append files
    if (files.resume) submissionData.append('resume', files.resume);
    if (files.coverLetterFile) submissionData.append('coverLetterFile', files.coverLetterFile);
    if (files.supportingDocuments) submissionData.append('supportingDocuments', files.supportingDocuments);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        // Omit Content-Type to let the browser set it to multipart/form-data with boundary
        body: submissionData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error((errorData && errorData.message) ? errorData.message : 'Failed to submit application');
      }
      setStatus('success');
    } catch (error: unknown) {
      console.error(error);
      const err = error as Error;
      setErrorMessage(err.message || 'Failed to submit application. Please check your inputs and try again.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/30 p-12 rounded-3xl text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-400" size={40} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
        <p className="text-slate-400">Thank you for applying to Spheronix. Our recruitment team will review your profile and get back to you soon.</p>
      </div>
    );
  }

  const renderInput = (label: string, name: string, type = 'text', required = false, extraProps = {}) => (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label} {required && <span className="text-red-400">*</span>}</label>
      <input 
        type={type} 
        name={name} 
        required={required}
        onChange={handleChange}
        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
        {...extraProps}
      />
    </div>
  );

  const renderFileInput = (label: string, name: string, required = false) => (
    <div className="border border-dashed border-white/20 rounded-2xl p-6 bg-slate-900/30 hover:bg-slate-900/50 transition-colors relative">
      <input 
        type="file" 
        name={name} 
        required={required}
        onChange={(e) => handleFileChange(e, name)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".pdf,.doc,.docx"
      />
      <div className="flex flex-col items-center justify-center text-center">
        <Upload className="text-violet-400 mb-2" size={24} />
        <h4 className="text-sm font-bold text-white mb-1">{label} {required && <span className="text-red-400">*</span>}</h4>
        <p className="text-xs text-slate-500">{files[name] ? files[name]?.name : 'Drag & drop or click to upload (PDF, DOCX)'}</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-fade-in relative">
      {status === 'error' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-slide-up">
            <div className="bg-red-500/10 p-6 flex flex-col items-center text-center relative">
              <button 
                type="button" 
                onClick={() => setStatus('idle')}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Notice</h3>
              <p className="text-slate-300">
                {errorMessage || 'Failed to submit application. Please check your inputs and try again.'}
              </p>
              <button 
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors w-full"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal Info */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">1. Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('Full Name', 'name', 'text', true)}
          {renderInput('Email Address', 'email', 'email', true)}
          {renderInput('Phone / Mobile', 'phone', 'tel', true, { pattern: '[0-9]{10}', maxLength: 10, title: 'Please enter exactly 10 digits' })}
          {renderInput('Current Location', 'currentLocation', 'text', true)}
          {renderInput('Date of Birth', 'dateOfBirth', 'date', true)}
          {renderInput('Nationality', 'nationality', 'text', true)}
        </div>
      </section>

      {/* Professional Info */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">2. Professional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('Current Job Title', 'currentJobTitle')}
          {renderInput('Current Company', 'currentCompany')}
          {renderInput('Total Experience (Years)', 'totalExperience')}
          {renderInput('Relevant Experience (Years)', 'relevantExperience')}
          {renderInput('Current CTC', 'currentCTC')}
          {renderInput('Expected CTC', 'expectedCTC')}
          {renderInput('Notice Period (Days)', 'noticePeriod')}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Work Authorization</label>
            <select name="workAuthorizationStatus" onChange={handleChange} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 appearance-none">
              <option value="">Select Option</option>
              <option>Citizen</option>
              <option>Permanent Resident</option>
              <option>Work Visa</option>
              <option>Require Sponsorship</option>
            </select>
          </div>
        </div>
      </section>

      {/* Educational Info */}
      <section>
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold text-white">3. Educational Information</h3>
          <button 
            type="button" 
            onClick={() => setEducationList([...educationList, { level: '', institution: '', passingYear: '', score: '' }])}
            className="text-xs font-bold bg-violet-600/20 text-violet-400 hover:bg-violet-600/40 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Plus size={14} /> Add Education
          </button>
        </div>
        
        <div className="space-y-6">
          {educationList.map((edu, index) => (
            <div key={index} className="bg-slate-900/30 border border-white/5 p-5 rounded-2xl relative group">
              {educationList.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => setEducationList(educationList.filter((_, i) => i !== index))}
                  className="absolute top-4 right-4 text-red-400 opacity-50 hover:opacity-100 transition-opacity"
                  title="Remove Education"
                >
                  <Trash2 size={16} />
                </button>
              )}
              <h4 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-widest">Education #{index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Level <span className="text-red-400">*</span></label>
                  <select 
                    required 
                    value={edu.level}
                    onChange={(e) => {
                      const newList = [...educationList];
                      newList[index].level = e.target.value;
                      setEducationList(newList);
                    }}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 appearance-none"
                  >
                    <option value="">Select Level</option>
                    <option value="SSC (10th)">SSC (10th)</option>
                    <option value="Intermediate (12th) / Diploma">Intermediate (12th) / Diploma</option>
                    <option value="Undergraduate (UG)">Undergraduate (UG)</option>
                    <option value="Postgraduate (PG)">Postgraduate (PG)</option>
                    <option value="Ph.D / Doctorate">Ph.D / Doctorate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Institution / University <span className="text-red-400">*</span></label>
                  <input type="text" required value={edu.institution} onChange={(e) => { const newList = [...educationList]; newList[index].institution = e.target.value; setEducationList(newList); }} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Year of Passing <span className="text-red-400">*</span></label>
                  <input type="text" required value={edu.passingYear} onChange={(e) => { const newList = [...educationList]; newList[index].passingYear = e.target.value; setEducationList(newList); }} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Percentage / CGPA <span className="text-red-400">*</span></label>
                  <input type="text" required value={edu.score} onChange={(e) => { const newList = [...educationList]; newList[index].score = e.target.value; setEducationList(newList); }} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Info */}
      <section>
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold text-white">4. Certifications & Internships</h3>
          <button 
            type="button" 
            onClick={() => setCertificationList([...certificationList, { title: '', issuer: '', year: '' }])}
            className="text-xs font-bold bg-amber-500/20 text-amber-400 hover:bg-amber-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Plus size={14} /> Add Certification
          </button>
        </div>
        
        {certificationList.length === 0 ? (
          <div className="text-sm text-slate-500 italic bg-slate-900/30 border border-white/5 p-4 rounded-xl text-center">
            No certifications added. Click the button above to add internships, online courses, or certifications.
          </div>
        ) : (
          <div className="space-y-4">
            {certificationList.map((cert, index) => (
              <div key={index} className="bg-slate-900/30 border border-white/5 p-5 rounded-2xl relative group">
                <button 
                  type="button" 
                  onClick={() => setCertificationList(certificationList.filter((_, i) => i !== index))}
                  className="absolute top-4 right-4 text-red-400 opacity-50 hover:opacity-100 transition-opacity"
                  title="Remove Certification"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Title / Course Name <span className="text-red-400">*</span></label>
                    <input type="text" required value={cert.title} onChange={(e) => { const newList = [...certificationList]; newList[index].title = e.target.value; setCertificationList(newList); }} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Issuer / Organization <span className="text-red-400">*</span></label>
                    <input type="text" required value={cert.issuer} onChange={(e) => { const newList = [...certificationList]; newList[index].issuer = e.target.value; setCertificationList(newList); }} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Year <span className="text-red-400">*</span></label>
                    <input type="text" required value={cert.year} onChange={(e) => { const newList = [...certificationList]; newList[index].year = e.target.value; setCertificationList(newList); }} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">5. Skills & Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('Primary Skills', 'primarySkills', 'text', true)}
          {renderInput('Secondary Skills', 'secondarySkills')}
          {renderInput('Technical Tools/Languages', 'technicalSkills', 'text', true)}
          {renderInput('Soft Skills', 'softSkills')}
        </div>
      </section>

      {/* Links & Docs */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">6. Web Profiles & Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {renderInput('LinkedIn Profile URL', 'linkedinUrl', 'url', true)}
          {renderInput('Portfolio / GitHub URL', 'portfolioUrl', 'url', true)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {renderFileInput('Resume / CV', 'resume', true)}
          {renderFileInput('Cover Letter', 'coverLetterFile')}
          {renderFileInput('Supporting Documents', 'supportingDocuments')}
        </div>
      </section>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'text-lg'}`}
      >
        {isSubmitting ? <><Loader className="animate-spin" /> Submitting...</> : 'Submit Application'}
      </button>
    </form>
  );
};

export default JobApplicationForm;
