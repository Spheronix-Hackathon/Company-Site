
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServicesOverview from './pages/ServicesOverview';
import ServiceDetail from './pages/ServiceDetail';
import TrainingPage from './pages/Training';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import Contact from './pages/Contact';
import PortalHub from './pages/Portal/PortalHub';
import SystemAudit from './pages/SystemAudit';
import BackgroundEffects from './components/BackgroundEffects';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const App: React.FC = () => {
  return (
    <Router>
      <BackgroundEffects />
      <ScrollToTop />
      <Routes>
        {/* Portal without Header/Footer */}
        <Route path="/portal" element={<PortalHub />} />
        
        {/* Public site with Header/Footer */}
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/system-audit" element={<SystemAudit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
