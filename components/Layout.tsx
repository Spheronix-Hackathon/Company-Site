
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Linkedin, Twitter, Github, LayoutDashboard, Instagram } from 'lucide-react';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import RefundPolicyModal from './RefundPolicyModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const openRefundModal = () => {
    setPrevPath(location.pathname);
    setShowRefundModal(true);
    navigate('/refund-policy');
  };

  const closeRefundModal = () => {
    setShowRefundModal(false);
    if (prevPath && prevPath !== '/refund-policy') {
      navigate(prevPath);
    } else {
      navigate('/', { replace: true });
    }
  };

  const openTermsModal = () => {
    setPrevPath(location.pathname);
    setShowTermsModal(true);
    navigate('/terms-and-conditions');
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
    if (prevPath && prevPath !== '/terms-and-conditions') {
      navigate(prevPath);
    } else {
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Training', href: '/training' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen relative z-10">
      {/* Skip to Content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-violet-600 text-white px-4 py-2 z-50 rounded-lg">
        Skip to main content
      </a>

      {/* Header */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 border-b border-transparent ${scrolled ? 'nav-glass py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <img 
                  src="logo.png" 
                  alt="Spheronix Technology" 
                  className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback in case logo.png isn't found during initial setup
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'gap-3');
                    const fallback = document.createElement('div');
                    fallback.className = "w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]";
                    fallback.innerText = "S";
                    const text = document.createElement('span');
                    text.className = "text-2xl font-bold text-white tracking-tight";
                    text.innerText = "Spheronix";
                    e.currentTarget.parentElement?.appendChild(fallback);
                    e.currentTarget.parentElement?.appendChild(text);
                  }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold transition-all hover:text-violet-400 relative py-1 ${
                    isActive(link.href) ? 'text-violet-400' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                  )}
                </Link>
              ))}
              
              {/* Creative Dashboard Button */}
              <a 
                href="https://dashboard.spheronixtechnology.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group ml-2"
              >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative flex items-center gap-2 px-4 py-2 bg-slate-950 rounded-full border border-white/10 hover:bg-slate-900 transition-colors">
                      <LayoutDashboard size={14} className="text-violet-400 group-hover:text-fuchsia-400 transition-colors" />
                      <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase tracking-widest">Dashboard</span>
                  </div>
              </a>

              <Link
                to="/contact"
                className="bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/10 transition-all hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-md"
              >
                Request a Consult
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden nav-glass border-b border-white/10 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-10 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-5 text-lg font-semibold border-b border-white/5 ${
                    isActive(link.href) ? 'text-violet-500' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="https://www.google.com"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-5 text-lg font-semibold border-b border-white/5 text-slate-300 hover:text-violet-400 group"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/40 transition-colors">
                    <LayoutDashboard size={18} className="text-violet-500 group-hover:text-white" />
                </div>
                Dashboard
              </a>
              <div className="pt-6">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full block text-center bg-violet-600 text-white px-5 py-5 rounded-2xl text-lg font-bold"
                >
                  Request a Consult
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="nav-glass text-slate-400 py-24 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="space-y-8">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-white tracking-tight">Spheronix</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Engineering deep-tech futures with AI, Robotics, and Embedded systems. Building the resilient products of tomorrow.
              </p>
              <div className="flex space-x-5">
                <a 
                  href="https://www.instagram.com/spheronix_technology?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-violet-400 transition-colors" 
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/109393931/admin/dashboard/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-violet-400 transition-colors" 
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a href="#" className="hover:text-violet-400 transition-colors" aria-label="Twitter"><Twitter size={22} /></a>
                <a href="#" className="hover:text-violet-400 transition-colors" aria-label="GitHub"><Github size={22} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-8">Services</h3>
              <ul className="space-y-5 text-sm">
                <li><Link to="/services/ai" className="hover:text-violet-400">AI Development</Link></li>
                <li><Link to="/services/full-stack" className="hover:text-violet-400">Full-Stack Platforms</Link></li>
                <li><Link to="/services/embedded" className="hover:text-violet-400">Embedded Systems</Link></li>
                <li><Link to="/services/robotics" className="hover:text-violet-400">Robotics & Control</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-8">Company</h3>
              <ul className="space-y-5 text-sm">
                <li><Link to="/about" className="hover:text-violet-400">Our Story</Link></li>
                <li><Link to="/careers" className="hover:text-violet-400">Careers</Link></li>
                <li><Link to="/training" className="hover:text-violet-400">Corporate Training</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-8">Intelligence</h3>
              <p className="text-sm text-slate-500 mb-6">Join 5,000+ engineers receiving our tech briefings.</p>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="name@work.com"
                  className="bg-slate-900/50 border border-white/10 text-white rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all backdrop-blur-sm"
                  required
                />
                <button className="bg-violet-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-violet-700 transition-all shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-6">
            <p>&copy; {new Date().getFullYear()} Spheronix Technology Pvt.Ltd. Crafted for the edge.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <button onClick={openRefundModal} className="hover:text-slate-400">Refund Policy</button>
              <a href="#" className="hover:text-slate-400">Security</a>
              <button onClick={openTermsModal} className="hover:text-slate-400">Terms and Conditions</button>
              <Link to="/portal" className="text-violet-400 hover:text-fuchsia-400 font-bold transition-colors">Admin Portal</Link>
            </div>
          </div>
        </div>
      </footer>
      
      <RefundPolicyModal
        isOpen={showRefundModal}
        onClose={closeRefundModal}
      />
      
      <TermsAndConditionsModal 
        isOpen={showTermsModal} 
        onClose={closeTermsModal} 
      />
    </div>
  );
};

export default Layout;
