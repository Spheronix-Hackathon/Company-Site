import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, TrendingUp, BadgeCheck, X, Check, User, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import Button from './Button';
import BookingSuccessModal from './BookingSuccessModal';

import Manohar_reddy_yatham from '../../../assets/students/Manohar_reddy_yatham.jpeg';
import Navya_sree from '../../../assets/students/Navya_sree.jpeg';
import Shakeel_basha from '../../../assets/students/Shakeel_basha.jpeg';
import Sudheer_reddy_y from '../../../assets/students/Sudheer_reddy_y.jpeg';
import V_Ganesh from '../../../assets/students/V_Ganesh.jpeg';

const students = [
  {
    name: 'Manohar reddy yatham M',
    role: 'SDE-1',
    company: 'Zeta',
    package: '16 LPA',
    image: Manohar_reddy_yatham,
    quote: "From a tier-3 college to a product-based company."
  },
  {
    name: 'Navya sree',
    role: 'Software Engineer',
    company: 'CRED',
    package: '24 LPA',
    image: Navya_sree,
    quote: "The mentorship changed my career trajectory completely."
  },
  {
    name: 'Shakeel basha',
    role: 'Full Stack Dev',
    company: 'Razorpay',
    package: '18 LPA',
    image: Shakeel_basha,
    quote: "Practical projects helped me crack the interview."
  },
  {
    name: 'Sudheer reddy y',
    role: 'Frontend Engineer',
    company: 'Swiggy',
    package: '22 LPA',
    image: Sudheer_reddy_y,
    quote: "Learned more in 4 months here than 4 years of college."
  },
  {
    name: 'V_Ganesh',
    role: 'Backend Developer',
    company: 'Uber',
    package: '32 LPA',
    image: V_Ganesh,
    quote: "System design sessions were the game changer for me."
  },
{
    name: 'Manohar reddy yatham M',
    role: 'SDE-1',
    company: 'Zeta',
    package: '16 LPA',
    image: Manohar_reddy_yatham,
    quote: "From a tier-3 college to a product-based company."
  },
  {
    name: 'Navya sree',
    role: 'Software Engineer',
    company: 'CRED',
    package: '24 LPA',
    image: Navya_sree,
    quote: "The mentorship changed my career trajectory completely."
  },
  {
    name: 'Shakeel basha',
    role: 'Full Stack Dev',
    company: 'Razorpay',
    package: '18 LPA',
    image: Shakeel_basha,
    quote: "Practical projects helped me crack the interview."
  },
   {
    name: 'Shakeel basha',
    role: 'Full Stack Dev',
    company: 'Razorpay',
    package: '18 LPA',
    image: Shakeel_basha,
    quote: "Practical projects helped me crack the interview."
  },
  {
    name: 'Sudheer reddy y',
    role: 'Frontend Engineer',
    company: 'Swiggy',
    package: '22 LPA',
    image: Sudheer_reddy_y,
    quote: "Learned more in 4 months here than 4 years of college."
  },
  {
    name: 'V_Ganesh',
    role: 'Backend Developer',
    company: 'Uber',
    package: '32 LPA',
    image: V_Ganesh,
    quote: "System design sessions were the game changer for me."
  },
  {
    name: 'Sudheer reddy y',
    role: 'Frontend Engineer',
    company: 'Swiggy',
    package: '22 LPA',
    image: Sudheer_reddy_y,
    quote: "Learned more in 4 months here than 4 years of college."
  }
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

    // Auto-rotate every 2 seconds (2000ms)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % students.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]); // Reset timer on manual interaction

  const nextStudent = () => {
    setCurrentIndex((prev) => (prev + 1) % students.length);
  };

  const prevStudent = () => {
    setCurrentIndex((prev) => (prev - 1 + students.length) % students.length);
  };

  const handleOpenModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

      handleCloseModal();
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

  const currentStudent = students[currentIndex];

  return (
    <section className="relative w-full bg-[#020617] pt-12 pb-16 lg:py-20 overflow-hidden min-h-[90vh] flex items-center">
      
      {/* 
        ========================================
        CSS ANIMATION DEFINITIONS
        ========================================
      */}
      <style>{`
        /* 
          Main Background Aurora Movement
          Increased Speed: 8s loop
        */
        @keyframes aurora-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* 
          Blob Drift 1: Fast circular motion
          Speed: 7s
        */
        @keyframes drift-1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* 
          Blob Drift 2: Counter-movement
          Speed: 9s
        */
        @keyframes drift-2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 50px) scale(1.1); }
          66% { transform: translate(50px, -40px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* 
          Blob Drift 3: Vertical pulse
          Speed: 6s
        */
        @keyframes drift-3 {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(0) scale(1); opacity: 0.3; }
        }

        /* 
          Student Card Breathing Glow
          Soft outer glow that pulses - Replaces rotating border
        */
        @keyframes breathe-glow {
          0%, 100% { opacity: 0.4; filter: blur(20px); transform: scale(0.98); }
          50% { opacity: 0.7; filter: blur(30px); transform: scale(1.02); }
        }
      `}</style>

      {/* 
        ========================================
        ANIMATED BACKGROUND LAYERS (FASTER)
        ========================================
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
          
          {/* Layer 1: Base Dark Gradient */}
          <div className="absolute inset-0 bg-slate-950"></div>

          {/* Layer 2: Moving Mesh Gradient (The "Aurora") - 8s duration */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-screen"
            style={{
              background: 'linear-gradient(120deg, #4c1d95 0%, #2e1065 30%, #c026d3 70%, #4c1d95 100%)',
              backgroundSize: '300% 300%',
              animation: 'aurora-flow 8s ease infinite'
            }}
          ></div>

          {/* Layer 3: Drifting Light Blobs - Faster movement (6-9s) */}
          
          {/* Top Left: Deep Violet */}
          <div 
            className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-violet-800/20 blur-[100px] mix-blend-screen"
            style={{ animation: 'drift-1 7s ease-in-out infinite' }}
          ></div>

          {/* Bottom Right: Fuchsia/Pink */}
          <div 
            className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-800/20 blur-[100px] mix-blend-screen"
            style={{ animation: 'drift-2 9s ease-in-out infinite reverse' }}
          ></div>

          {/* Center: Accent Pulse */}
          <div 
            className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-purple-900/20 blur-[120px] mix-blend-screen"
            style={{ animation: 'drift-3 6s ease-in-out infinite' }}
          ></div>

          {/* Layer 4: Noise Texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          
          {/* Layer 5: Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Marketing Content */}
          <div className="space-y-8 flex flex-col justify-center">
             
             {/* Badge */}
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wide shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]">
                   <BadgeCheck size={14} strokeWidth={2.5} /> Job Guarantee Program
                </div>
             </div>

             {/* Headline & Sub-headline */}
             <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">₹5–10 LPA Career Transformation</span><br />
                  in 180 Days
                </h1>
                
                <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                   <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed">
                      We don’t train students like an institute. <br className="hidden lg:block"/>
                      We prepare <span className="text-white font-bold border-b-2 border-fuchsia-500/30">professionals for companies</span>.
                   </p>
                   <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                      Job-ready skills, real office exposure, and structured mentoring designed for <span className="text-fuchsia-400 font-semibold">industry roles</span>.
                   </p>
                </div>
             </div>

             {/* Micro Highlights (Badge Style) */}
             <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wide hover:border-violet-500/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                    Industry-driven training
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wide hover:border-fuchsia-500/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
                    Corporate environment
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wide hover:border-pink-500/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                    Placement-focused
                 </div>
             </div>

             {/* CTAs */}
             <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="shadow-lg shadow-violet-500/20" onClick={handleOpenModal}>Book Your Seat</Button>
             </div>
          </div>

          {/* RIGHT COLUMN: Student Showcase */}
          <div 
            className="relative h-[600px] w-full flex items-center justify-center lg:justify-end"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
             
             {/* Static Glow behind card (Immediate vicinity) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-violet-600/10 rounded-full blur-[60px]"></div>

             {/* Card Container with GLOW ANIMATION */}
             <div className="relative w-full max-w-[420px] h-[540px] group">
                
                {/* 1. SOFT BREATHING GLOW LAYER (New) */}
                <div 
                  className="absolute -inset-4 bg-gradient-to-r from-violet-600/60 to-fuchsia-400/60 rounded-[2rem] -z-10 blur-2xl opacity-60"
                  style={{ 
                    animation: 'breathe-glow 4s ease-in-out infinite',
                    animationPlayState: isPaused ? 'paused' : 'running'
                  }}
                ></div>

                {/* 2. Soft Pulsing Backing */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-fuchsia-400/20 rounded-3xl blur-md opacity-30 z-0"></div>

                {/* 3. Main Student Card */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-700/50 bg-[#0f172a] shadow-2xl flex flex-col z-10">
                    
                    {/* Image Section */}
                    <div className="relative h-[65%] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Placeholder while loading */}
                        <img 
                          key={currentIndex} // Triggers animation on change
                          src={currentStudent.image} 
                          alt={currentStudent.name}
                          style={{ animationDuration: '300ms' }} // Override to ensure fast transition
                          className="w-full h-full object-cover object-top animate-fade-in-up transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Floating Salary Badge */}
                        <div className="absolute top-6 right-6 z-10">
                             <div className="bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 pl-4 pr-5 py-2.5 rounded-2xl shadow-xl flex flex-col items-start transform transition-transform hover:scale-105">
                                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Package</span>
                                <span className="text-xl font-bold text-white flex items-center gap-1.5 leading-none">
                                   {currentStudent.package} <TrendingUp size={16} className="text-emerald-400" />
                                </span>
                             </div>
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="absolute bottom-0 w-full p-8 flex flex-col justify-end h-[45%]">
                       <div className="space-y-2 mb-4">
                          <h3 className="text-3xl font-bold text-white tracking-tight">{currentStudent.name}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg">
                             <span className="text-fuchsia-400 font-semibold">{currentStudent.role}</span>
                             <span className="text-slate-600 hidden sm:inline">•</span>
                             <span className="text-white font-medium">{currentStudent.company}</span>
                          </div>
                       </div>
                       
                       <p className="text-slate-400 text-sm italic border-l-2 border-fuchsia-500 pl-4 py-1 mb-6 opacity-90">
                          "{currentStudent.quote}"
                       </p>

                       {/* Navigation */}
                       <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                          <div className="flex gap-1.5 overflow-hidden max-w-[200px]">
                             {students.map((_, i) => (
                                <div key={i} className={`h-1 shrink-0 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-fuchsia-500' : 'w-2 bg-slate-700'}`}></div>
                             ))}
                          </div>
                          <div className="flex gap-3 shrink-0">
                             <button 
                                onClick={prevStudent} 
                                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-fuchsia-500 hover:text-white transition-all hover:scale-110 active:scale-95"
                                aria-label="Previous student"
                              >
                                <ArrowLeft size={18} />
                             </button>
                             <button 
                                onClick={nextStudent} 
                                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-fuchsia-500 hover:text-white transition-all hover:scale-110 active:scale-95"
                                aria-label="Next student"
                              >
                                <ArrowRight size={18} />
                             </button>
                          </div>
                       </div>
                    </div>
                </div>
             </div>
          </div>

        </div>

        {/* =======================
            MODAL POPUP
           ======================= */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             {/* Backdrop */}
             <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
             
             {/* Modal Content */}
             <div className="relative w-full max-w-4xl bg-[#0f172a]/95 border border-slate-700 rounded-2xl shadow-2xl shadow-fuchsia-900/20 overflow-hidden animate-fade-in-up flex flex-col md:flex-row">
                
                {/* Close Button */}
                <button 
                    onClick={handleCloseModal} 
                    className="absolute top-4 right-4 z-20 p-2 bg-black/20 text-slate-400 hover:text-white rounded-full transition-colors"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40"></div>
                    </div>
                    
                    <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                           Talk to Our <br/>
                           <span className="text-fuchsia-400">Career Counsellor</span>
                        </h3>
                        
                        <ul className="space-y-3 mb-6">
                            {[
                                "Book a Free Demo Class (Online & Offline)",
                                "Resolve Your Doubts",
                                "Career Guidance & Roadmap",
                                "Job-Oriented Mentorship",
                                "We’re Here to Help You"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                                    <div className="mt-0.5 w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                        <Check size={10} className="text-green-400" strokeWidth={3} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-7/12 p-8 bg-[#0f172a]">
                    <h3 className="text-xl font-bold text-white mb-1">Book Your Free Demo</h3>
                    <p className="text-slate-400 text-sm mb-6">Fill the form to reserve your spot.</p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name" 
                                required
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address" 
                                required
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                            <span className="absolute left-10 top-2.5 text-slate-400 text-sm font-medium border-r border-slate-700 pr-2 py-0.5">+91</span>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number" 
                                required
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2.5 pl-24 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="relative">
                             <MapPin className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
                             <select 
                                name="learningMode"
                                value={formData.learningMode}
                                onChange={handleChange}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all appearance-none cursor-pointer"
                             >
                                <option value="online">Online Live Class</option>
                                <option value="offline">Offline (Bangalore)</option>
                                <option value="hybrid">Hybrid</option>
                             </select>
                             <ChevronDown className="absolute right-3 top-3 text-slate-500 w-5 h-5 pointer-events-none" />
                        </div>

                        <Button type="submit" className="w-full mt-2 group" disabled={isSubmitting}>
                            {isSubmitting ? 'Booking...' : 'Attend Free Demo Class'} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                    
                    <div className="mt-4 text-center">
                         <p className="text-xs text-slate-500">
                            By clicking, you agree to our <a href="#" className="text-fuchsia-400 hover:underline">Terms & Privacy Policy</a>.
                         </p>
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

export default Hero;