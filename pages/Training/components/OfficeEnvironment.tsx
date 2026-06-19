import React, { useState, useEffect } from 'react';
import { Building2, Armchair, Briefcase, IdCard, CheckCircle2, XCircle, ChevronLeft, ChevronRight, ArrowRight, X, Check, User, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import Button from './Button';
import BookingSuccessModal from './BookingSuccessModal';

// Import local images using relative paths
import workspaceImg from '../../../assets/office pics/Office-Like Workspace.jpeg';
import workstationImg from '../../../assets/office pics/Individual Workstations.jpeg';
import cultureImg from '../../../assets/office pics/Professional Culture.jpeg';
import onboardingImg from '../../../assets/office pics/Employee Onboarding.jpeg';

const environmentFeatures = [
  {
    id: 1,
    title: 'Office-Like Workspace',
    icon: Building2,
    image: workspaceImg,
    shortDesc: 'Learn in a real corporate-style environment.',
    details: 'Ditch the classroom. Work in a modern office setup with ergonomic seating, conference rooms, and breakout areas designed to simulate a real tech company.'
  },
  {
    id: 2,
    title: 'Individual Workstations',
    icon: Armchair,
    image: workstationImg,
    shortDesc: 'Your own dedicated desk, just like a job.',
    details: 'No shared benches or crowded halls. You get a dedicated personal workspace to focus, code, and build projects without distractions.'
  },
  {
    id: 3,
    title: 'Professional Culture',
    icon: Briefcase,
    image: cultureImg,
    shortDesc: 'Mentorship that mirrors corporate reporting.',
    details: 'Experience daily stand-ups, sprint planning, and code reviews. Our mentors act as engineering managers, instilling professional discipline.'
  },
  {
    id: 4,
    title: 'Employee Onboarding',
    icon: IdCard,
    image: onboardingImg,
    shortDesc: 'Official IDs and Welcome Kits on day one.',
    details: 'Feel like an employee from the start. Receive an official ID card, company swag, and a proper induction process to set the right mindset.'
  }
];

interface ComparisonRow {
  feature: string;
  traditional: string;
  nexus: string;
  subtext?: string;
}

const comparisonData: ComparisonRow[] = [
  { feature: 'Seating Arrangement', traditional: 'Classroom Benches', nexus: 'Office Workstations' },
  { feature: 'Work Space', traditional: 'Shared / Crowded', nexus: 'Dedicated Individual Desk' },
  { feature: 'Teaching Style', traditional: 'Academic Lectures', nexus: 'Corporate Mentoring' },
  { feature: 'Daily Routine', traditional: 'Attendance & Theory', nexus: 'Stand-ups & Sprints' },
  { feature: 'End Goal', traditional: 'Certificate', nexus: 'Job-Ready Professional' },
  { 
    feature: 'Experience Letter', 
    traditional: 'Not Provided / Certificate Only', 
    nexus: 'Experience Letter Issued',
    subtext: 'Provided after successful course completion'
  },
];

const OfficeEnvironment: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Modal States
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    learningMode: 'online'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % environmentFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % environmentFeatures.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + environmentFeatures.length) % environmentFeatures.length);

  const getCardStyle = (index: number) => {
    const total = environmentFeatures.length;
    // Calculate relative position (-1, 0, 1, or hidden)
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;

    // Desktop: 3 cards visible logic
    if (diff === 0) {
      // Center Active Card
      return "z-20 scale-100 opacity-100 translate-x-0 blur-0 shadow-[0_0_50px_-10px_rgba(217,70,239,0.2)] border-fuchsia-500/50 bg-[#0f172a]";
    } else if (diff === -1 || (currentIndex === 0 && index === total - 1)) {
      // Left Card
      return "z-10 scale-90 opacity-40 -translate-x-[60%] md:-translate-x-[70%] blur-[2px] bg-[#0f172a]/50 border-slate-800 pointer-events-none";
    } else if (diff === 1 || (currentIndex === total - 1 && index === 0)) {
      // Right Card
      return "z-10 scale-90 opacity-40 translate-x-[60%] md:translate-x-[70%] blur-[2px] bg-[#0f172a]/50 border-slate-800 pointer-events-none";
    } else {
      // Hidden/Back Card
      return "z-0 scale-75 opacity-0 translate-y-10 pointer-events-none";
    }
  };

  const handleOpenForm = () => {
    setShowFormModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    document.body.style.overflow = 'unset';
  };

  const handleOpenDetails = () => {
    setShowFormModal(false);
    setShowDetailsModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    document.body.style.overflow = 'unset';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api';
      const res = await fetch(`${apiUrl}/demo/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to book demo');

      handleCloseForm();
      setShowSuccessModal(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        learningMode: 'online'
      });
    } catch (err) {
      alert('Failed to book demo. Please try again later.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#020617] relative border-b border-slate-800/50 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-violet-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Learn in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Real Office Environment</span>
          </h2>
          <p className="text-lg text-slate-400">
            We don’t train students like an institute. We prepare professionals for companies.
          </p>
        </div>

        {/* PART 1: Interactive Carousel */}
        <div 
          className="relative h-[550px] max-w-4xl mx-auto mb-12 flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons (Desktop) */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 md:-left-12 z-30 p-3 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-fuchsia-500 hover:text-white hover:scale-110 transition-all shadow-lg backdrop-blur-sm hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 md:-right-12 z-30 p-3 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-fuchsia-500 hover:text-white hover:scale-110 transition-all shadow-lg backdrop-blur-sm hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {environmentFeatures.map((feature, index) => (
              <div 
                key={feature.id}
                className={`
                  absolute w-[85%] md:w-[400px] h-[500px] rounded-3xl border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  flex flex-col overflow-hidden backdrop-blur-md
                  ${getCardStyle(index)}
                `}
              >
                 {/* Image Area */}
                 <div className="relative h-48 w-full shrink-0">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
                 </div>

                 {/* Card Content */}
                 <div className="p-6 pt-0 flex flex-col flex-grow relative">
                    {/* Icon - Overlapping */}
                    <div className="w-12 h-12 -mt-6 relative z-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 shadow-lg group-hover:border-fuchsia-500/50 transition-colors">
                      <feature.icon className="w-6 h-6 text-fuchsia-400" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
                    <p className="text-slate-300 text-sm font-medium mb-4 leading-relaxed">
                      {feature.shortDesc}
                    </p>
                    
                    <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mb-4 opacity-50"></div>

                    <p className="text-sm text-slate-400 leading-relaxed opacity-90">
                      {feature.details}
                    </p>
                 </div>

                 {/* Decorative Corner Glow */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-[40px] rounded-full pointer-events-none mix-blend-screen"></div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="absolute -bottom-8 flex gap-2">
            {environmentFeatures.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-fuchsia-400' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
              />
            ))}
          </div>
        </div>

        {/* MAIN EXPLORE BUTTON */}
        <div className="flex justify-center mb-24 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
           <Button 
              onClick={handleOpenForm}
              size="lg"
              className="group shadow-xl shadow-fuchsia-500/20 w-full sm:w-auto"
           >
              Explore Office Experience
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </div>

        {/* PART 2: Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">Why We’re Different from Others</h3>
          </div>

          <div className="bg-[#0f172a] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-3 p-6 bg-slate-900/50 border-b border-slate-800 text-sm uppercase tracking-wider font-semibold text-slate-400">
              <div className="col-span-1">Feature</div>
              <div className="col-span-1 text-center hidden md:block text-red-400/80">Traditional Institutes</div>
              <div className="col-span-1 text-center text-fuchsia-400">Spheronix Technology</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-800">
              {comparisonData.map((row, index) => (
                <div 
                  key={index} 
                  className="grid grid-cols-1 md:grid-cols-3 p-6 items-center gap-4 hover:bg-slate-800/50 transition-colors group relative"
                >
                  {/* Highlight for Spheronix Column on Hover */}
                  <div className="absolute inset-y-0 right-0 w-1/3 bg-fuchsia-900/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block"></div>

                  {/* Feature Label */}
                  <div className="font-medium text-slate-300 group-hover:text-white transition-colors">{row.feature}</div>
                  
                  {/* Traditional */}
                  <div className="flex md:justify-center items-center gap-3 text-slate-500 group-hover:text-slate-400 transition-colors">
                    <XCircle size={18} className="text-red-500/50 shrink-0" />
                    <span className="md:text-center text-sm">{row.traditional}</span>
                  </div>

                  {/* Nexus */}
                  <div className="flex md:justify-center items-center gap-3 relative z-10">
                    <div className="absolute inset-y-[-24px] -left-4 -right-4 bg-fuchsia-950/10 border-x border-fuchsia-900/20 hidden md:block pointer-events-none"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-fuchsia-400 shrink-0" />
                      <div className="flex flex-col md:items-center">
                        <span className="md:text-center font-bold text-white text-sm">{row.nexus}</span>
                        {row.subtext && (
                          <span className="text-[11px] text-fuchsia-300/80 md:text-center mt-0.5 font-medium leading-tight">
                            {row.subtext}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =======================
            FORM MODAL (Lead Gen)
           ======================= */}
        {showFormModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={handleCloseForm}></div>
             
             <div className="relative w-full max-w-4xl bg-[#0f172a] border border-slate-700 rounded-3xl shadow-2xl shadow-fuchsia-900/40 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
                
                <button 
                    onClick={handleCloseForm} 
                    className="absolute top-4 right-4 z-20 p-2 bg-black/40 text-slate-300 hover:text-white hover:bg-fuchsia-500 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Visual + Benefits */}
                <div className="w-full md:w-5/12 relative flex flex-col">
                    <div className="absolute inset-0">
                        <img 
                           src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                           alt="Career Counsellor" 
                           className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/40"></div>
                    </div>
                    
                    <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                           Talk to Our <br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">Career Counsellor</span>
                        </h3>
                        
                        <ul className="space-y-4 mb-6">
                            {[
                                "Book a Free Demo Class",
                                "Experience Real Office Env.",
                                "Individual Workstations",
                                "ID Cards & Welcome Kits",
                                "Step-by-Step Guidance"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-green-400" strokeWidth={3} />
                                    </div>
                                    <span className="drop-shadow-md">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-7/12 p-8 md:p-10 bg-[#0f172a] relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none"></div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">Book Your Free Demo</h3>
                    <p className="text-slate-400 text-sm mb-8">Fill the form to reserve your spot instantly.</p>

                    <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-fuchsia-400 transition-colors" />
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name" 
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-fuchsia-400 transition-colors" />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address" 
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="relative group">
                            <Phone className="absolute left-4 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-fuchsia-400 transition-colors" />
                            <span className="absolute left-12 top-3 text-slate-400 text-sm font-medium border-r border-slate-700 pr-3 py-0.5">+91</span>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number" 
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-28 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="relative group">
                             <MapPin className="absolute left-4 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-fuchsia-400 transition-colors" />
                             <select 
                                name="learningMode"
                                value={formData.learningMode}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all appearance-none cursor-pointer"
                             >
                                <option value="online">Online Live Class</option>
                                <option value="offline">Offline (Bangalore)</option>
                                <option value="hybrid">Hybrid</option>
                             </select>
                             <ChevronDown className="absolute right-4 top-3.5 text-slate-500 w-5 h-5 pointer-events-none" />
                        </div>

                        <div className="flex items-start gap-3 pt-2">
                            <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded bg-slate-800 border-slate-600 text-fuchsia-500 focus:ring-fuchsia-500 cursor-pointer" />
                            <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed cursor-pointer hover:text-slate-400 transition-colors">
                                I agree to the <a href="#" className="text-fuchsia-400 hover:text-fuchsia-300 hover:underline">Terms & Privacy Policy</a> and authorize Spheronix to contact me.
                            </label>
                        </div>

                        <Button type="submit" className="w-full mt-4 group relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-fuchsia-500/25" disabled={isSubmitting}>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? 'Booking...' : 'Attend Free Demo Class'} 
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                        <p className="text-slate-500 text-sm mb-3">Just want to see the campus?</p>
                        <button 
                            onClick={handleOpenDetails}
                            className="text-fuchsia-400 text-sm font-bold hover:text-fuchsia-300 transition-colors flex items-center justify-center gap-1 mx-auto group bg-fuchsia-500/10 px-4 py-2 rounded-full hover:bg-fuchsia-500/20"
                        >
                            Explore Office Environment 
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* =======================
            DETAILS MODAL (Gallery)
           ======================= */}
        {showDetailsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={handleCloseDetails}></div>
             
             <div className="relative w-full max-w-5xl bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-[#0f172a] z-10">
                   <h3 className="text-2xl font-bold text-white">Experience Our Office Environment</h3>
                   <button 
                      onClick={handleCloseDetails} 
                      className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white transition-colors border border-slate-700"
                   >
                      <X size={20} />
                   </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {environmentFeatures.map(feature => (
                            <div key={feature.id} className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800 group hover:border-fuchsia-500/30 transition-all duration-300">
                                <div className="h-56 overflow-hidden relative">
                                    <img 
                                      src={feature.image} 
                                      alt={feature.title} 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
                                    <div className="absolute top-4 left-4">
                                       <div className="w-10 h-10 rounded-lg bg-slate-950/50 backdrop-blur border border-slate-700 flex items-center justify-center text-fuchsia-400">
                                            <feature.icon size={20} />
                                       </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{feature.shortDesc}</p>
                                    <div className="h-px w-full bg-slate-800 mb-4"></div>
                                    <p className="text-slate-400 text-sm">{feature.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* Success Modal */}
        <BookingSuccessModal 
          isOpen={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)} 
        />

      </div>
    </section>
  );
};

export default OfficeEnvironment;