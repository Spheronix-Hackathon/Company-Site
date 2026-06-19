
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundEffects: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- CONFIGURATION ---
    const config = {
      particleCount: window.innerWidth < 768 ? 60 : 130, // Responsive count
      connectionDistance: window.innerWidth < 768 ? 150 : 200,
      baseColor: 0x8b5cf6, // Violet-500
      accentColor: 0x06b6d4, // Cyan-500
      bgColorTop: 0x020617, // Slate 950
      bgColorBottom: 0x0f172a, // Slate 900
    };

    // --- SETUP ---
    const scene = new THREE.Scene();
    // Add Fog for depth - fading into the deep slate background
    scene.fog = new THREE.FogExp2(config.bgColorTop, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Important: We'll use CSS for the main gradient background, and allow Three.js to be transparent
    renderer.setClearColor(0x000000, 0); 
    currentMount.appendChild(renderer.domElement);

    // --- TEXTURES ---
    // Programmatically create a soft glow texture to avoid loading external assets
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(230, 230, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    // --- PARTICLES (NEURONS) ---
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(config.particleCount * 3);
    const velArray = new Float32Array(config.particleCount * 3); // Velocity
    const colorArray = new Float32Array(config.particleCount * 3);
    
    // Color objects for interpolation
    const color1 = new THREE.Color(config.baseColor);
    const color2 = new THREE.Color(config.accentColor);

    for (let i = 0; i < config.particleCount * 3; i += 3) {
      // Position: Spread widely
      posArray[i] = (Math.random() - 0.5) * 1000;     // x
      posArray[i + 1] = (Math.random() - 0.5) * 600;  // y
      posArray[i + 2] = (Math.random() - 0.5) * 600;  // z

      // Velocity: Slow, organic drift
      velArray[i] = (Math.random() - 0.5) * 0.2;
      velArray[i + 1] = (Math.random() - 0.5) * 0.2;
      velArray[i + 2] = (Math.random() - 0.5) * 0.2;

      // Color: Mix between Violet and Cyan
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colorArray[i] = mixedColor.r;
      colorArray[i + 1] = mixedColor.g;
      colorArray[i + 2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 6,
      map: createGlowTexture(),
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    
    // Group to hold everything for parallax
    const neuralGroup = new THREE.Group();
    neuralGroup.add(particlesMesh);
    scene.add(neuralGroup);

    // --- LINES (SYNAPSES) ---
    // We use LineSegments for performance. 
    // We need to update the geometry every frame, which is okay for < 200 particles.
    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15, // Very subtle lines
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    neuralGroup.add(linesMesh);

    // --- MOUSE INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      clock.getDelta();

      // 1. Update Particle Positions
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < config.particleCount * 3; i += 3) {
        positions[i] += velArray[i];
        positions[i+1] += velArray[i+1];
        positions[i+2] += velArray[i+2];

        // Boundary Wrap (keep them in the box)
        if (positions[i] > 500) positions[i] = -500;
        if (positions[i] < -500) positions[i] = 500;
        if (positions[i+1] > 300) positions[i+1] = -300;
        if (positions[i+1] < -300) positions[i+1] = 300;
        if (positions[i+2] > 300) positions[i+2] = -300;
        if (positions[i+2] < -300) positions[i+2] = 300;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // 2. Connect Particles (Dynamic Synapses)
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      const particleColors = particlesGeometry.attributes.color.array as Float32Array;

      // Squared distance check is faster than Math.sqrt
      const connectDistSq = config.connectionDistance * config.connectionDistance;

      for (let i = 0; i < config.particleCount; i++) {
        for (let j = i + 1; j < config.particleCount; j++) {
          const x1 = positions[i * 3];
          const y1 = positions[i * 3 + 1];
          const z1 = positions[i * 3 + 2];

          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectDistSq) {
            // Add Line Vertices
            linePositions.push(x1, y1, z1, x2, y2, z2);

            // Add Line Colors (inherit from particles)
            // We use the particle's color for the line vertex to create a gradient line
            lineColors.push(
              particleColors[i * 3], particleColors[i * 3 + 1], particleColors[i * 3 + 2],
              particleColors[j * 3], particleColors[j * 3 + 1], particleColors[j * 3 + 2]
            );
          }
        }
      }

      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

      // 3. Cinematic Camera Movement (Parallax)
      targetX = mouseX * 0.2; // Max rotation amount
      targetY = mouseY * 0.2;

      // Smooth Lerp
      neuralGroup.rotation.y += 0.05 * (targetX - neuralGroup.rotation.y);
      neuralGroup.rotation.x += 0.05 * (targetY - neuralGroup.rotation.x);
      
      // Gentle auto-rotation
      neuralGroup.rotation.z += 0.0005;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Start Loop
    const animId = requestAnimationFrame(animate);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      // Dispose Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#020617] to-[#0f172a]">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-10" />
      
      {/* Optional: Deep Space Vignette Overlay for cinematic focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] z-20 pointer-events-none" />
    </div>
  );
};

export default BackgroundEffects;
