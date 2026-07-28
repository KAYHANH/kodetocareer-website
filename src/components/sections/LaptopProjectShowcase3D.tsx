'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Sparkles, ExternalLink, Award, CheckCircle, Code, ChevronRight, Layers } from 'lucide-react';
import Link from 'next/link';

interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  program: string;
  packagePlaced: string;
  company: string;
  tags: string[];
  description: string;
  screenColor: number;
}

export default function LaptopProjectShowcase3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const projects: StudentProject[] = [
    {
      id: 'mern-ecommerce',
      title: 'Multivendor E-Commerce Engine',
      studentName: 'Aman Verma',
      program: 'Full Stack MERN Developer',
      packagePlaced: '₹12.5 LPA',
      company: 'High-Growth Fintech Startup',
      tags: ['React 19', 'Node.js', 'MongoDB', 'Redis', 'Stripe'],
      description: 'Architected high-concurrency multivendor marketplace supporting 50,000+ monthly transactions with microservices architecture.',
      screenColor: 0x2563eb, // Electric Blue
    },
    {
      id: 'ai-analytics',
      title: 'Predictive Medical AI Portal',
      studentName: 'Priya Sundaram',
      program: 'Data Science & GenAI',
      packagePlaced: '₹14.0 LPA',
      company: 'Global HealthTech MNC',
      tags: ['Python', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Docker'],
      description: 'Trained deep learning model for automated medical image segmentation with 97.4% diagnostic accuracy and REST API integration.',
      screenColor: 0x7c3aed, // Violet
    },
    {
      id: 'cloud-devops',
      title: 'Automated Kubernetes CI/CD Pipeline',
      studentName: 'Karan Patel',
      program: 'Cloud DevOps & AWS',
      packagePlaced: '₹13.2 LPA',
      company: 'Tier-1 Cloud Solutions Firm',
      tags: ['AWS EKS', 'Terraform', 'Docker', 'Prometheus', 'GitHub Actions'],
      description: 'Engineered zero-downtime automated deployment pipelines using Terraform Infrastructure-as-Code and Grafana monitoring dashboards.',
      screenColor: 0x06b6d4, // Cyan
    },
  ];

  const currentProject = projects[activeProjectIndex];

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x3b82f6, 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 3D Laptop Group
    const laptopGroup = new THREE.Group();

    // Base Chassis
    const baseGeo = new THREE.BoxGeometry(4.2, 0.2, 2.8);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const baseMesh = new THREE.Mesh(baseGeo, chassisMat);
    laptopGroup.add(baseMesh);

    // Screen Bezel
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.1, -1.4);

    const bezelGeo = new THREE.BoxGeometry(4.0, 2.6, 0.1);
    const bezelMesh = new THREE.Mesh(bezelGeo, chassisMat);
    bezelMesh.position.set(0, 1.3, 0);
    screenGroup.add(bezelMesh);

    // Dynamic Display Screen Mesh
    const displayGeo = new THREE.PlaneGeometry(3.7, 2.3);
    const displayMat = new THREE.MeshStandardMaterial({
      color: currentProject.screenColor,
      emissive: currentProject.screenColor,
      emissiveIntensity: 0.4,
      roughness: 0.1,
    });
    const displayMesh = new THREE.Mesh(displayGeo, displayMat);
    displayMesh.position.set(0, 1.3, 0.06);
    screenGroup.add(displayMesh);

    // Open Screen Angle
    screenGroup.rotation.x = -Math.PI * 0.1;
    laptopGroup.add(screenGroup);

    scene.add(laptopGroup);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating and rotation
      laptopGroup.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;
      laptopGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

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
  }, [activeProjectIndex]);

  return (
    <section className="py-24 bg-[#050816] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider">
            <Monitor className="w-4 h-4 text-cyan-400" />
            3D Student Project Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Real Student Projects <span className="gradient-text">& Placements</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            See the exact capstone projects built by our graduates that secured packages up to ₹14 LPA.
          </p>
        </div>

        {/* Grid: 3D Laptop Preview Left, Project Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Laptop Interactive Stage */}
          <div className="lg:col-span-7 h-[420px] sm:h-[500px] rounded-3xl glass border border-white/10 relative overflow-hidden shadow-2xl flex flex-col justify-between p-6">
            <div className="flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-300 font-bold">
                Rotatable 3D Canvas
              </span>
              <div className="flex gap-2">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeProjectIndex === idx
                        ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                        : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Three.js Mount */}
            <div ref={mountRef} className="w-full h-full absolute inset-0" />

            {/* Project Quick Info Footer */}
            <div className="z-10 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white font-heading">{currentProject.title}</div>
                <div className="text-[11px] text-slate-400">By {currentProject.studentName}</div>
              </div>
              <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                {currentProject.packagePlaced}
              </div>
            </div>
          </div>

          {/* Project Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl bg-slate-900/80">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-[11px] font-semibold">
                  {currentProject.program}
                </span>
                <h3 className="text-2xl font-bold text-white font-heading">{currentProject.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Student & Hiring Partner Details */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Student Graduate:</span>
                  <span className="font-semibold text-white">{currentProject.studentName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Hired By:</span>
                  <span className="font-semibold text-cyan-300">{currentProject.company}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Salary Package:</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{currentProject.packagePlaced}</span>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Technologies Used:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-300 font-mono text-[10px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/courses"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs hover:shadow-lg hover:shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Build Similar Capstones in Course</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
