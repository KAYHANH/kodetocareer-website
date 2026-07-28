'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ChevronRight, Award, Briefcase, GraduationCap, Code } from 'lucide-react';

interface Milestone {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  details: string[];
}

export default function InteractiveRoadmap3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);

  const milestones: Milestone[] = [
    {
      step: 1,
      title: 'Phase 1: Zero-to-One Foundations',
      subtitle: 'Month 1 - 2',
      description: 'Master core CS concepts, clean code standards, git workflows, and modern language features with daily hands-on coding labs.',
      icon: Code,
      color: '#3B82F6', // Blue
      details: ['400+ Tech Skills Covered', 'Daily 1-on-1 Mentor Assistance', 'Interactive Coding Challenges'],
    },
    {
      step: 2,
      title: 'Phase 2: Live Industry Projects',
      subtitle: 'Month 3',
      description: 'Build enterprise-scale full stack & AI applications with real API integrations, unit tests, and production CI/CD pipelines.',
      icon: GraduationCap,
      color: '#8B5CF6', // Purple
      details: ['3 Capstone Industry Projects', 'System Architecture Reviews', 'GitHub Portfolio Optimization'],
    },
    {
      step: 3,
      title: 'Phase 3: Guaranteed Internship',
      subtitle: 'Month 4',
      description: 'Work on live commercial products alongside senior engineers and earn a verifiable internship experience certificate.',
      icon: Briefcase,
      color: '#06B6D4', // Cyan
      details: ['Real Client Codebases', 'Agile/Scrum Team Environment', 'Verified Experience Certificate'],
    },
    {
      step: 4,
      title: 'Phase 4: Placement Drives & Jobs',
      subtitle: 'Month 5 - 6',
      description: 'Get referred directly to 300+ hiring partners with unlimited mock interviews, ATS resume reviews, and salary negotiations.',
      icon: Award,
      color: '#10B981', // Emerald
      details: ['300+ Hiring Partners', 'Unlimited Mock Interviews', 'Average Starting ₹6.5 - 14 LPA'],
    },
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // WebGL Availability Check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.04);

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 10);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 3, 50);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2, 40);
    cyanLight.position.set(5, -2, 2);
    scene.add(cyanLight);

    // 3D Curved Track Line
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 2, -5),
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(2, -1, 3),
      new THREE.Vector3(6, 1, 6),
    ]);

    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x3b82f6, opacity: 0.6, transparent: true });
    const curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject);

    // 4 Milestone Glowing Nodes
    const nodeSpheres: THREE.Mesh[] = [];
    const colors = [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x10b981];

    for (let i = 0; i < 4; i++) {
      const t = i / 3;
      const pos = curve.getPoint(t);

      const sphereGeo = new THREE.SphereGeometry(0.4, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });

      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.copy(pos);
      scene.add(sphere);
      nodeSpheres.push(sphere);
    }

    // Floating Particles Background
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Pulse Spheres
      nodeSpheres.forEach((sphere, index) => {
        sphere.rotation.y = elapsedTime * 0.5;
        sphere.position.y += Math.sin(elapsedTime * 2 + index) * 0.002;
      });

      // Rotate Particles
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-24 bg-[#050816] text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            3D Interactive Career Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Your Transformation Roadmap: <span className="gradient-text">Zero to Placed</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore the exact 4-phase milestone path engineered to guarantee career outcome readiness.
          </p>
        </div>

        {/* Main Content Grid: 3D Canvas Left, Milestone Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D WebGL Canvas Container */}
          <div className="lg:col-span-6 h-[400px] sm:h-[500px] rounded-3xl glass border border-white/10 relative overflow-hidden shadow-2xl">
            {webglSupported ? (
              <div ref={mountRef} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <Sparkles className="w-12 h-12 text-cyan-400 mb-3" />
                <p className="text-sm font-semibold text-white">3D Interactive Canvas Preview</p>
                <p className="text-xs text-slate-500 mt-1">Accelerated WebGL visualization active.</p>
              </div>
            )}

            {/* Overlay Step Switcher */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2 p-2 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
              {milestones.map((m, i) => (
                <button
                  key={m.step}
                  onClick={() => setActiveStep(i)}
                  className={`flex-1 py-2 px-2 text-[11px] font-bold rounded-xl transition-all ${
                    activeStep === i
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  Phase {m.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Milestone Card */}
          <div className="lg:col-span-6 space-y-4">
            {milestones.map((m, index) => {
              const Icon = m.icon;
              const isActive = activeStep === index;
              return (
                <motion.div
                  key={m.step}
                  onClick={() => setActiveStep(index)}
                  initial={false}
                  animate={{ scale: isActive ? 1.02 : 0.98, opacity: isActive ? 1 : 0.6 }}
                  className={`p-6 rounded-3xl cursor-pointer border transition-all ${
                    isActive
                      ? 'glass border-blue-500/40 shadow-2xl bg-slate-900/90'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-2xl border"
                        style={{
                          backgroundColor: `${m.color}15`,
                          borderColor: `${m.color}40`,
                          color: m.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                          {m.subtitle}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                          {m.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'rotate-90 text-cyan-400' : 'text-slate-600'
                      }`}
                    />
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-slate-800/60 space-y-3"
                    >
                      <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        {m.details.map((d, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300 bg-blue-500/10 px-2.5 py-1.5 rounded-lg border border-blue-500/20"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
