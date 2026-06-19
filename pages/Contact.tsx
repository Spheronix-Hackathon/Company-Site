import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'AI / Machine Learning',
    scale: 'Strategic Research',
    message: '',
  });

  // Update form input values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://company-site-1eac.onrender.com/api';
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');

      setSubmitted(true);
      // Clear form
      setFormData({
        name: '',
        email: '',
        domain: 'AI / Machine Learning',
        scale: 'Strategic Research',
        message: '',
      });
    } catch (err) {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-8 bg-[#020617]">
        <div className="max-w-md w-full glass p-16 rounded-[3rem] border-violet-500/30 text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-violet-600/20 text-violet-400 rounded-full flex items-center justify-center mx-auto mb-10 pulse-violet">
            <Check size={48} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Mission Received</h2>
          <p className="text-slate-400 mb-10 leading-relaxed text-lg">
            Our engineering lead has been notified. Expect a technical brief in your inbox within 12 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-violet-400 font-bold hover:text-white transition-colors"
          >
            Submit another briefing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      {/* Header */}
      <section className="bg-slate-950 pt-32 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-10">Technical <br /><span className="text-fuchsia-500">Kickoff.</span></h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium">
              Ready to ship? Brief us on your hardware/software objectives and our architects will provide a preliminary scope.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-10 reveal">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(139,92,246,0.2)]">
              <h3 className="text-3xl font-bold mb-12">HQ Access</h3>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
                    <Mail size={22} />
                  </div>
                  <div className="break-all">
                    <div className="text-sm text-white/60 font-bold uppercase tracking-widest">Email</div>
                    <div className="font-bold text-lg">spheronixtechnology@gmail.com</div>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform">
                    <Phone size={22} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 font-bold uppercase tracking-widest">Secure Line</div>
                    <div className="font-bold text-lg">9515906062</div>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 font-bold uppercase tracking-widest">Location</div>
                    <div className="font-bold text-base leading-snug">
                      3rd Floor, No 8 & 9, Shantipura Main Rd, Phase II, Electronic City, Bengaluru, Karnataka 560100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-10 rounded-[2.5rem] space-y-6">
              <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-violet-500"></div> Rapid Requests
              </h4>
              <button className="w-full flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-violet-500/30 text-slate-300 font-bold">
                Download Capabilities Deck <ArrowRight size={18} />
              </button>
              <button className="w-full flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-fuchsia-500/30 text-slate-300 font-bold">
                Request Training Syllabus <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="glass p-12 lg:p-16 rounded-[3.5rem] border-white/5 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all placeholder:text-slate-700"
                      placeholder="Principal Engineer Name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Communications</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all placeholder:text-slate-700"
                      placeholder="name@firm.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Domain</label>
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-slate-900">AI / Machine Learning</option>
                      <option className="bg-slate-900">Embedded Firmware</option>
                      <option className="bg-slate-900">Robotics & Vision</option>
                      <option className="bg-slate-900">Training / Upskilling</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Project Scale</label>
                    <select
                      name="scale"
                      value={formData.scale}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-slate-900">Strategic Research</option>
                      <option className="bg-slate-900">Production Build</option>
                      <option className="bg-slate-900">Legacy Refactor</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Briefing</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all placeholder:text-slate-700"
                    placeholder="Describe your technical constraints and success metrics..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-4 hover:brightness-110 transition-all shadow-[0_20px_40px_rgba(139,92,246,0.2)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Mission Data...' : 'Initiate Consult'} <Send size={24} className={isSubmitting ? 'animate-ping' : ''} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
