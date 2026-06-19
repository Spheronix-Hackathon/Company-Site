import React from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Partners from './components/Partners';
import Features from './components/Features';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import OfficeEnvironment from './components/OfficeEnvironment';

const TrainingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative">
      <main className="flex-grow">
        <Hero />
        <Partners />
        <Stats />
        <OfficeEnvironment />
        <Certifications />
        <Projects />
        <Features />
      </main>
      <FloatingWhatsapp />
    </div>
  );
};

export default TrainingPage;