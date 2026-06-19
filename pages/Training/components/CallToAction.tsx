import React from 'react';
import Button from './Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Start Your Career Transformation Today
        </h2>
        <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
          Don't let another year pass by. Join the next cohort and start your journey towards a high-growth tech career.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="shadow-xl shadow-violet-900/50">
            Apply Now
          </Button>
          <Button variant="outline" size="lg" className="bg-slate-900/50 border-violet-400/30 text-violet-100 hover:bg-slate-900 hover:text-white">
            Talk to an Advisor
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-violet-200/60">
          Limited seats available for the upcoming batch.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;