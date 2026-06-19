import React, { useState } from 'react';
import { ArrowRight, X, Server, Layers, Users, ShieldCheck } from 'lucide-react';
import Button from './Button';

interface ProjectDetails {
  flow: string[];
  roles: string[];
  architecture: string;
}

interface Project {
  id: number;
  title: string;
  desc: string;
  features: string[];
  tech: string[];
  image: string;
  details: ProjectDetails;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Smart College Attendance & Scheduling System (RFID-Based)",
    desc: "A real-world college management system where students and staff use RFID ID cards. Attendance updates automatically when cards are scanned.",
    features: [
      "RFID-based attendance tracking",
      "Student & staff role-based login",
      "Real-time sync to web & mobile app",
      "Class schedules per department",
      "Staff dashboard & analytics"
    ],
    tech: ["React", "Node.js", "MongoDB", "RFID", "Firebase", "REST APIs"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    details: {
      flow: [
        "Student scans RFID card at classroom reader.",
        "Reader sends ID data to IoT Controller (NodeMCU).",
        "Controller hits Backend API to validate and mark attendance.",
        "Database updates with timestamp and location.",
        "Web Dashboard reflects attendance instantly."
      ],
      roles: ["Admin (Principal/HOD)", "Faculty (Teachers)", "Students"],
      architecture: "IoT Edge Devices -> Node.js API Gateway -> MongoDB Cluster -> React Frontend."
    }
  },
  {
    id: 2,
    title: "Smart Office Access & Employee Management System",
    desc: "A corporate-grade system where employees use RFID or QR-based ID cards to access office floors. Tracks attendance and work hours.",
    features: [
      "Secure access control",
      "Work-hour tracking",
      "Role-based access floors",
      "HR dashboard & reports",
      "Leave & shift management"
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "RFID", "JWT", "AWS"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
    details: {
      flow: [
        "Employee taps card at turnstile entry.",
        "System verifies access level for that specific floor.",
        "Entry log recorded; Shift timer starts.",
        "Employee requests leave via portal.",
        "HR approves; System adjusts payroll hours."
      ],
      roles: ["Super Admin", "HR Manager", "Employee", "Security"],
      architecture: "RFID Hardware -> AWS Lambda -> PostgreSQL RDS -> Next.js Dashboard."
    }
  },
  {
    id: 3,
    title: "Hospital Patient Queue & Appointment System",
    desc: "A real hospital system that manages patient appointments, doctor schedules, queue status, and notifications in real time.",
    features: [
      "Appointment booking",
      "Real-time queue display",
      "Doctor availability tracking",
      "SMS/Push notifications",
      "Admin hospital dashboard"
    ],
    tech: ["React", "Node.js", "Firebase", "Google Maps API", "Twilio"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    details: {
      flow: [
        "Patient books appointment via App.",
        "System generates token number.",
        "Doctor updates status (In Consult / Available).",
        "Live Queue Screen updates in waiting room.",
        "SMS sent when 2 patients are remaining."
      ],
      roles: ["Hospital Admin", "Doctor", "Receptionist", "Patient"],
      architecture: "React Native App -> Firebase Realtime DB -> Node.js Notification Service."
    }
  },
  {
    id: 4,
    title: "Smart Hostel & Visitor Management System",
    desc: "A security-focused system used in hostels or gated communities to track residents, visitors, and entry/exit logs.",
    features: [
      "RFID / QR-based entry",
      "Visitor pre-approval",
      "Real-time logs",
      "Emergency alerts",
      "Admin & security dashboards"
    ],
    tech: ["React Native", "Node.js", "MongoDB", "Firebase", "Cloud Functions"],
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop",
    details: {
      flow: [
        "Visitor entry details logged by security.",
        "Resident approves visitor via app notification.",
        "Gate opens via connected relay.",
        "Resident scans card for night curfew tracking.",
        "Automatic alert to warden if late."
      ],
      roles: ["Warden/Admin", "Security Guard", "Resident/Student"],
      architecture: "Mobile App -> Cloud Functions -> MongoDB Atlas -> Admin Dashboard."
    }
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="py-20 bg-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Industry Relevant Projects</h2>
          <p className="text-slate-400">
            Theory is not enough. Build <span className="text-white font-semibold">real-world systems</span> used in actual organizations.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 px-4 md:px-0 max-w-7xl mx-auto no-scrollbar">
        {projects.map((project) => (
          <div key={project.id} className="snap-center shrink-0 w-80 md:w-96 glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-fuchsia-500/10 transition-all duration-300 group border border-slate-800 flex flex-col h-full">
            
            {/* Image */}
            <div className="relative h-48 overflow-hidden shrink-0">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur border border-fuchsia-500/30 text-fuchsia-400 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Industry Grade
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-2 leading-tight min-h-[56px]">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                {project.desc}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 4).map((t, i) => (
                  <span key={i} className="text-xs font-medium bg-slate-800/80 text-violet-300 px-2 py-1 rounded border border-slate-700/50">
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs font-medium bg-slate-800/80 text-slate-500 px-2 py-1 rounded border border-slate-700/50">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => openModal(project)}
                  variant="outline" 
                  className="w-full group hover:bg-fuchsia-950/30 hover:border-fuchsia-500/50 hover:text-fuchsia-400"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-3xl bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="relative h-48 shrink-0">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
              
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2">
                   {selectedProject.tech.map((t, i) => (
                      <span key={i} className="text-xs font-bold text-fuchsia-400 bg-fuchsia-950/50 border border-fuchsia-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                        {t}
                      </span>
                   ))}
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Description & Features */}
                <div>
                   <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <ShieldCheck className="text-violet-500" size={20} /> Project Overview
                   </h4>
                   <p className="text-slate-400 mb-6 leading-relaxed">
                     {selectedProject.desc}
                   </p>
                   
                   <h5 className="font-semibold text-white mb-3">Key Features:</h5>
                   <ul className="space-y-2">
                     {selectedProject.features.map((feature, i) => (
                       <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                         <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-2 shrink-0"></span>
                         {feature}
                       </li>
                     ))}
                   </ul>
                </div>

                {/* Architecture & Roles */}
                <div className="space-y-8">
                  <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                      <Server className="text-purple-500" size={18} /> System Architecture
                    </h4>
                    <p className="text-slate-400 text-sm font-mono leading-relaxed">
                      {selectedProject.details.architecture}
                    </p>
                  </div>

                  <div>
                     <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                       <Users className="text-green-500" size={18} /> User Roles
                     </h4>
                     <div className="flex flex-wrap gap-2">
                        {selectedProject.details.roles.map((role, i) => (
                          <span key={i} className="text-sm text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                            {role}
                          </span>
                        ))}
                     </div>
                  </div>
                </div>
              </div>

              {/* Logic Flow */}
              <div className="border-t border-slate-800 pt-8">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Layers className="text-orange-500" size={20} /> System Logic Flow
                </h4>
                <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                  {selectedProject.details.flow.map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[30px] w-6 h-6 rounded-full bg-slate-900 border-2 border-fuchsia-500/50 flex items-center justify-center text-[10px] font-bold text-fuchsia-400 z-10">
                        {i + 1}
                      </div>
                      <div className="bg-slate-900 p-4 rounded-lg border border-slate-800/60 hover:border-slate-700 transition-colors">
                        <p className="text-slate-300 text-sm">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;