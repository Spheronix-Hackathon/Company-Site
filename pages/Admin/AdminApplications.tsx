import React, { useState, useEffect } from 'react';
import { Mail, Phone, Link as LinkIcon, FileText, ExternalLink, Download, MapPin, Briefcase, GraduationCap, Calendar, Globe, Star } from 'lucide-react';

interface AdminApplicationsProps {
  token: string;
}

interface ApplicationData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  jobTitle?: string;
  applyingPosition?: string;
  createdAt: string;
  resumePath?: string;
  coverLetterPath?: string;
  supportingDocumentsPath?: string;
  educationDetails?: Array<{
    level: string;
    institution: string;
    passingYear: string;
    score: string;
  }>;
  certificationDetails?: Array<{
    title: string;
    issuer: string;
    year: string;
  }>;
  [key: string]: unknown;
}

const AdminApplications: React.FC<AdminApplicationsProps> = ({ token }) => {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState<ApplicationData | null>(null);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api'}` + '/applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      setApplications(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSection = (title: string, icon: React.ReactNode, fields: { label: string; value: React.ReactNode }[]) => {
    const validFields = fields.filter(f => f.value);
    if (validFields.length === 0) return null;

    return (
      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl mb-6">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-4 uppercase tracking-widest border-b border-white/5 pb-3">
          {icon} {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
          {validFields.map((field, idx) => (
            <div key={idx}>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{field.label}</div>
              <div className="text-sm font-medium text-white break-words">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full text-white relative">
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Job Applications</h2>
          <p className="text-slate-400 font-medium">Review candidates who applied via the Careers portal.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Applications List */}
          <div className={`lg:col-span-1 glass rounded-3xl border-white/5 overflow-hidden flex flex-col max-h-[85vh] ${selectedApp ? 'hidden lg:flex' : 'flex'}`}>
             <div className="p-6 border-b border-white/5 bg-slate-900/30">
               <h3 className="font-bold text-lg">Inbox ({applications.length})</h3>
             </div>
             
             <div className="overflow-y-auto flex-1 p-2">
               {isLoading ? (
                 <div className="p-8 text-center text-slate-400">Loading...</div>
               ) : applications.length === 0 ? (
                 <div className="p-8 text-center text-slate-400">No applications yet.</div>
               ) : (
                 applications.map(app => (
                   <button 
                     key={app._id}
                     onClick={() => setSelectedApp(app)}
                     className={`w-full text-left p-4 rounded-2xl mb-2 transition-all ${selectedApp?._id === app._id ? 'bg-violet-600/20 border border-violet-500/30' : 'hover:bg-white/5 border border-transparent'}`}
                   >
                     <div className="font-bold text-white text-sm mb-1">{app.name}</div>
                     <div className="text-xs text-violet-400 font-bold mb-2">{app.jobTitle || app.applyingPosition}</div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-wider">{new Date(app.createdAt).toLocaleDateString()}</div>
                   </button>
                 ))
               )}
             </div>
          </div>

          {/* Application Detail */}
          <div className={`lg:col-span-3 glass rounded-3xl border-white/5 overflow-hidden flex flex-col max-h-[85vh] ${!selectedApp ? 'hidden lg:flex items-center justify-center p-8' : 'flex'}`}>
             {!selectedApp ? (
               <div className="text-slate-500 font-medium text-center">Select an application from the inbox to review.</div>
             ) : (
               <div className="animate-fade-in flex flex-col h-full">
                 <div className="p-6 border-b border-white/5 bg-slate-900/80 sticky top-0 z-20 backdrop-blur-md flex justify-between items-start">
                   <div>
                     <button className="lg:hidden mb-4 text-xs font-bold text-violet-400 hover:text-violet-300" onClick={() => setSelectedApp(null)}>
                       &larr; Back to Inbox
                     </button>
                     <h2 className="text-3xl font-bold text-white mb-2">{selectedApp.name}</h2>
                     <p className="text-violet-400 font-bold tracking-widest uppercase text-sm">Applied for: {selectedApp.jobTitle || selectedApp.applyingPosition}</p>
                   </div>
                   <div className="text-right">
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold text-slate-300 block mb-3">
                        {new Date(selectedApp.createdAt).toLocaleString()}
                      </span>
                      {selectedApp.resumePath && (
                        <a href={`https://company-site-1eac.onrender.com${selectedApp.resumePath}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                          <Download size={14} /> Download Resume
                        </a>
                      )}
                   </div>
                 </div>

                 <div className="overflow-y-auto flex-1 p-8">
                   
                   {/* Contact Overview Cards */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                     <div className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                       <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><Mail size={20} /></div>
                       <div className="overflow-hidden">
                         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</div>
                         <a href={`mailto:${selectedApp.email}`} className="text-sm font-medium text-white hover:text-blue-400 truncate block">{selectedApp.email}</a>
                       </div>
                     </div>
                     <div className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                       <div className="p-3 bg-green-500/10 text-green-400 rounded-xl"><Phone size={20} /></div>
                       <div>
                         <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone / Mobile</div>
                         <div className="text-sm font-medium text-white">{selectedApp.phone || selectedApp.mobileNumber}</div>
                       </div>
                     </div>
                   </div>

                   {renderSection('Personal Information', <MapPin size={16} className="text-fuchsia-400" />, [
                     { label: 'Current Location', value: selectedApp.currentLocation },
                     { label: 'Date of Birth', value: selectedApp.dateOfBirth },
                     { label: 'Nationality', value: selectedApp.nationality },
                     { label: 'Work Authorization', value: selectedApp.workAuthorizationStatus },
                   ])}

                   {renderSection('Professional Experience', <Briefcase size={16} className="text-amber-400" />, [
                     { label: 'Current Job Title', value: selectedApp.currentJobTitle },
                     { label: 'Current Company', value: selectedApp.currentCompany },
                     { label: 'Total Experience', value: selectedApp.totalExperience },
                     { label: 'Relevant Experience', value: selectedApp.relevantExperience },
                     { label: 'Current CTC', value: selectedApp.currentCTC },
                     { label: 'Expected CTC', value: selectedApp.expectedCTC },
                     { label: 'Notice Period', value: selectedApp.noticePeriod },
                     { label: 'Employment Preference', value: selectedApp.employmentTypePreference },
                   ])}

                   {/* Legacy Educational Information (if exists) */}
                   {selectedApp.highestQualification && renderSection('Legacy Educational Information', <GraduationCap size={16} className="text-blue-400" />, [
                     { label: 'Highest Qualification', value: selectedApp.highestQualification },
                     { label: 'University / College', value: selectedApp.university },
                     { label: 'Graduation Year', value: selectedApp.graduationYear },
                     { label: 'Certifications', value: selectedApp.certifications },
                   ])}

                   {/* Dynamic Educational Information */}
                   {selectedApp.educationDetails && selectedApp.educationDetails.length > 0 && (
                     <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl mb-6">
                       <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-4 uppercase tracking-widest border-b border-white/5 pb-3">
                         <GraduationCap size={16} className="text-blue-400" /> Educational Background
                       </h3>
                       <div className="space-y-4">
                         {selectedApp.educationDetails.map((edu, idx) => (
                           <div key={idx} className="bg-slate-900/30 p-4 rounded-xl border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
                             <div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Level</div>
                               <div className="text-sm font-medium text-white">{edu.level}</div>
                             </div>
                             <div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Institution</div>
                               <div className="text-sm font-medium text-white">{edu.institution}</div>
                             </div>
                             <div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Year</div>
                               <div className="text-sm font-medium text-white">{edu.passingYear}</div>
                             </div>
                             <div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Score</div>
                               <div className="text-sm font-medium text-white">{edu.score}</div>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* Dynamic Certifications */}
                   {selectedApp.certificationDetails && selectedApp.certificationDetails.length > 0 && (
                     <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl mb-6">
                       <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-4 uppercase tracking-widest border-b border-white/5 pb-3">
                         <Star size={16} className="text-amber-400" /> Certifications & Internships
                       </h3>
                       <div className="space-y-4">
                         {selectedApp.certificationDetails.map((cert, idx) => (
                           <div key={idx} className="bg-slate-900/30 p-4 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Title</div>
                               <div className="text-sm font-medium text-white">{cert.title}</div>
                             </div>
                             <div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Issuer</div>
                               <div className="text-sm font-medium text-white">{cert.issuer}</div>
                             </div>
                             <div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Year</div>
                               <div className="text-sm font-medium text-white">{cert.year}</div>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {renderSection('Skills & Expertise', <Star size={16} className="text-violet-400" />, [
                     { label: 'Primary Skills', value: selectedApp.primarySkills },
                     { label: 'Secondary Skills', value: selectedApp.secondarySkills },
                     { label: 'Technical Skills', value: selectedApp.technicalSkills },
                     { label: 'Soft Skills', value: selectedApp.softSkills },
                   ])}

                   {renderSection('Application Details', <Calendar size={16} className="text-green-400" />, [
                     { label: 'Preferred Location', value: selectedApp.preferredLocation },
                     { label: 'Available Joining Date', value: selectedApp.availableJoiningDate },
                   ])}

                   {/* Web Links */}
                   {(selectedApp.linkedinUrl || selectedApp.portfolioUrl) && (
                     <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl mb-6">
                        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-4 uppercase tracking-widest border-b border-white/5 pb-3">
                          <Globe size={16} className="text-sky-400" /> Web Profiles
                        </h3>
                        <div className="flex flex-col gap-3">
                          {selectedApp.linkedinUrl && (
                            <a href={selectedApp.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-sky-400 hover:text-sky-300 flex items-center gap-2 w-fit">
                              <LinkIcon size={14} /> LinkedIn Profile <ExternalLink size={14} />
                            </a>
                          )}
                          {selectedApp.portfolioUrl && (
                            <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-2 w-fit">
                              <LinkIcon size={14} /> Portfolio / GitHub <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                     </div>
                   )}

                   {/* Cover Letter */}
                   {selectedApp.coverLetter && (
                     <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl mb-6">
                       <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-4 uppercase tracking-widest border-b border-white/5 pb-3">
                         <FileText size={16} className="text-slate-500" /> Cover Letter Notes
                       </h3>
                       <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                         {selectedApp.coverLetter}
                       </div>
                     </div>
                   )}

                   {/* Document Downloads */}
                   {(selectedApp.coverLetterPath || selectedApp.supportingDocumentsPath) && (
                     <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl mb-6 flex flex-wrap gap-4">
                        {selectedApp.coverLetterPath && (
                          <a href={`https://company-site-1eac.onrender.com${selectedApp.coverLetterPath}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-3 rounded-xl text-sm font-bold transition-colors">
                            <Download size={16} className="text-slate-400" /> Download Cover Letter File
                          </a>
                        )}
                        {selectedApp.supportingDocumentsPath && (
                          <a href={`https://company-site-1eac.onrender.com${selectedApp.supportingDocumentsPath}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-3 rounded-xl text-sm font-bold transition-colors">
                            <Download size={16} className="text-slate-400" /> Download Supporting Docs
                          </a>
                        )}
                     </div>
                   )}

                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
