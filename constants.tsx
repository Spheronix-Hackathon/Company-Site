import { ServiceInfo, CaseStudy, JobOpening } from './types';

export const SERVICES: ServiceInfo[] = [
  {
    id: 'ai',
    title: 'AI Development',
    description: 'We deliver production-grade AI solutions from computer vision to large language model integration.',
    icon: 'Brain',
    capabilities: ['ML Pipelines & MLOps', 'Model Optimization', 'Computer Vision', 'Natural Language Processing'],
    process: ['Discover', 'Prototype', 'Validate', 'Deploy', 'Operate'],
    techStack: ['Python', 'PyTorch/TensorFlow', 'ONNX', 'CUDA', 'AWS/GCP'],
    cta: 'Start an AI Assessment'
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Development',
    description: 'Resilient web and mobile architectures built for scale and high availability.',
    icon: 'Layers',
    capabilities: ['Web & Mobile Apps', 'API Design', 'Microservices', 'Cloud Native DevOps'],
    process: ['Architecture', 'Agile Dev', 'CI/CD', 'Security Audit', 'Scaling'],
    techStack: ['Node.js', 'React/Next.js', 'PostgreSQL', 'Kubernetes', 'Java'],
    cta: 'Request Architecture Review'
  },
  {
    id: 'embedded',
    title: 'Embedded Systems & IoT',
    description: 'Hardware bring-up, RTOS development, and robust IoT connectivity for industrial and consumer devices.',
    icon: 'Cpu',
    capabilities: ['Firmware Development', 'RTOS (Zephyr/FreeRTOS)', 'Edge AI', 'Connectivity (BLE/MQTT)', 'Hardware Bring-up'],
    process: ['Hardware Design', 'Firmware Dev', 'System Integration', 'Field Testing', 'Maintenance'],
    techStack: ['C/C++', 'Zephyr', 'FreeRTOS', 'Linux', 'MQTT/BLE'],
    cta: 'Schedule a Device Consult'
  },
  {
    id: 'robotics',
    title: 'Robotics Development',
    description: 'Advanced perception, control, and simulation for autonomous mobile robots and industrial automation.',
    icon: 'Activity',
    capabilities: ['Perception & SLAM', 'Motion Control', 'Autonomous Navigation', 'Gazebo Simulation'],
    process: ['Kinematics', 'Control Loops', 'Sensory Fusion', 'PoC Delivery', 'Deployment'],
    techStack: ['ROS/ROS2', 'C++', 'Python', 'SLAM', 'CUDA'],
    cta: 'Discuss a Robotics PoC'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Autonomous Warehouse Fleet Control',
    client: 'LogiTech Solutions',
    category: 'Robotics & AI',
    challenge: 'Inefficient pathfinding for 50+ autonomous robots in a high-density warehouse environment led to 15% downtime.',
    solution: 'Implemented a ROS2-based centralized fleet management system with custom SLAM optimization and real-time obstacle avoidance.',
    results: [
        '22% increase in throughput', 
        '99.9% collision-free operation', 
        'Reduction in latency by 250ms',
        'ROI achieved in under 6 months',
        'Reduced fleet energy consumption by 18%',
        'Zero packet loss in mesh network',
        'Maintenance downtime cut by 45%',
        'Seamless integration with SAP ERP'
    ],
    tech: ['ROS2', 'C++', 'Python', 'SLAM', 'AWS RoboMaker'],
    quote: "Spheronix didn't just write code; they understood our hardware constraints and delivered a system that scaled seamlessly."
  },
  {
    id: '2',
    title: 'Predictive Maintenance for Smart Grids',
    client: 'EnergiCorp',
    category: 'Embedded & IoT',
    challenge: 'Manual inspections of remote transformer stations were costly and reactive rather than proactive.',
    solution: 'Deployed edge AI nodes running specialized firmware to monitor vibration and temperature, transmitting anomalies via MQTT over LTE-M.',
    results: [
        '40% reduction in site visits', 
        'Prevented 3 major blackouts in Q1', 
        'Battery life extended to 5 years per node',
        'Real-time anomaly detection < 50ms',
        'Data transmission costs cut by 30%',
        '98% accuracy in fault classification',
        'Firmware updates deployed in < 2 mins',
        'Compliance with IEC 61850 standards'
    ],
    tech: ['C', 'Zephyr RTOS', 'TensorFlow Lite for Micro', 'LTE-M', 'Grafana'],
    quote: "The level of embedded expertise at Spheronix is unparalleled. Their firmware is lean, fast, and remarkably stable."
  },
  {
    id: '3',
    title: 'Neural Link Prosthetic Interface',
    client: 'Bionix Labs',
    category: 'MedTech & Embedded AI',
    challenge: 'High signal latency in myoelectric prosthetics resulted in unnatural movement, causing high rejection rates among amputees.',
    solution: 'Engineered a custom FPGA-based neural decoder utilizing low-power inference models to translate nerve impulses into fluid motor commands.',
    results: [
      'Response latency reduced to < 4ms',
      'Battery life increased by 65%',
      'Adaptive grip strength learning',
      'ISO 13485 medical compliance',
      'User adoption improved to 92%',
      'Haptic feedback integration',
      'IP67 Waterproof rating',
      'Real-time calibration telemetry'
    ],
    tech: ['Verilog', 'FPGA', 'TinyML', 'C++', 'Bluetooth LE'],
    quote: "Spheronix bridged biology and silicon. The fluidity of motion achieved is indistinguishable from a natural limb."
  },
  {
    id: '4',
    title: 'Deep-Sea Autonomous Inspection Swarm',
    client: 'Oceanic Energy',
    category: 'Marine Robotics',
    challenge: 'Offshore inspection required dangerous human diver teams and expensive support vessels, limited by extreme depth and weather.',
    solution: 'Deployed a swarm of micro-AUVs with acoustic mesh networking and sonar-visual sensor fusion for autonomous structure mapping.',
    results: [
      'Inspection costs cut by 75%',
      'Zero human risk exposure',
      '3D reconstruction to 2mm accuracy',
      'Operable at 3000m depth',
      'Autonomous docking & charging',
      'Swarm redundancy protocols',
      'Real-time edge anomaly detection',
      '90% reduced carbon footprint'
    ],
    tech: ['ROS2', 'Rust', 'Acoustic Comms', 'Sonar Fusion', 'Computer Vision'],
    quote: "We tasked them with the impossible: reliable coordination underwater without GPS. They delivered a swarm that thinks like a single organism."
  },
  {
    id: '5',
    title: 'Quantum-Resistant Financial Ledger',
    client: 'Apex Global Finance',
    category: 'FinTech & Cybersecurity',
    challenge: 'Looming quantum computing threats to RSA encryption jeopardized future security of trillion-dollar transactional pipelines.',
    solution: 'Architected a lattice-based cryptographic HSM (Hardware Security Module) on high-frequency FPGA clusters for post-quantum signing.',
    results: [
      'NIST Post-Quantum compliant',
      'Signing speed < 12 microseconds',
      'Zero impact on payment rails',
      'Self-destruct tamper mechanisms',
      'Scalable to 1M TPS',
      '40% less energy per tx',
      'Formally verified security',
      'Seamless hot-failover'
    ],
    tech: ['VHDL', 'Lattice Crypto', 'PCIe', 'C', 'Python'],
    quote: "Security usually kills speed. Spheronix gave us military-grade quantum resistance while actually accelerating our settlement layer."
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  { 
    id: 'j1', 
    title: 'Senior Embedded Engineer', 
    department: 'Engineering', 
    location: 'Remote / Hybrid', 
    type: 'Full-time',
    experienceLevel: 'Experienced',
    description: [
      'We are looking for a Senior Embedded Engineer to lead the firmware development for our next-generation robotics platform. You will be responsible for architecting real-time operating systems (RTOS) and ensuring sub-millisecond latency for critical control loops.',
      'Requirements: 5+ years of experience with C/C++, deep knowledge of RTOS (Zephyr, FreeRTOS), and experience with ARM Cortex-M architecture. Prior experience with motor control or robotics is a huge plus.'
    ]
  },
  { 
    id: 'j2', 
    title: 'AI Research Scientist', 
    department: 'AI & Data', 
    location: 'On-site (Austin, TX)', 
    type: 'Full-time',
    experienceLevel: 'Experienced',
    description: [
      'Join our core AI lab to push the boundaries of Edge AI and sensor fusion. You will work on training lightweight models for deployment on resource-constrained devices, optimizing for power and performance.',
      'Requirements: PhD or Master\'s in Computer Science/AI, extensive experience with PyTorch/TensorFlow, and a strong publication record. Experience with model quantization and hardware accelerators (NPU/TPU) is preferred.'
    ]
  },
  { 
    id: 'j3', 
    title: 'Junior Full-Stack Developer', 
    department: 'Product', 
    location: 'Remote', 
    type: 'Full-time',
    experienceLevel: 'Fresher',
    description: [
      'As a Junior Full-Stack Developer, you will collaborate with senior engineers to build resilient web interfaces and scalable backend services. This is a great opportunity to learn enterprise-grade software development.',
      'Requirements: Strong foundation in computer science, proficiency in modern JavaScript/TypeScript, React, and Node.js. Recent graduates or candidates with less than 2 years of experience are encouraged to apply.'
    ]
  },
  { 
    id: 'j4', 
    title: 'Trainee Embedded Systems Engineer', 
    department: 'Engineering', 
    location: 'Hybrid', 
    type: 'Full-time',
    experienceLevel: 'Fresher',
    description: [
      'We are seeking a passionate Trainee Embedded Systems Engineer. You will undergo intensive training in hardware bring-up and firmware development while contributing to real-world IoT projects.',
      'Requirements: Bachelor\'s degree in Electrical/Electronics/Computer Engineering. Basic understanding of microcontrollers, C programming, and digital logic. A strong desire to learn and tackle complex hardware problems.'
    ]
  },
  { 
    id: 'j5', 
    title: 'Robotics Internship (Summer 2024)', 
    department: 'Research', 
    location: 'On-site', 
    type: 'Internship',
    experienceLevel: 'Internship',
    description: [
      'Spend your summer working alongside our elite robotics team. You will assist in developing ROS2 packages, running Gazebo simulations, and testing navigation algorithms on physical robots.',
      'Requirements: Currently pursuing a degree in Robotics, Mechanical, or Computer Engineering. Familiarity with Linux, Python, and C++. Previous robotics project experience (e.g., student competitions) is highly desirable.'
    ]
  }
];
