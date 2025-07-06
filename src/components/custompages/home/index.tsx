'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
//@ts-ignore
import * as THREE from 'three';
import Page from '@/app/projects/page';

// Mock components for demonstration
const ParallaxSection = () => <div className="h-96 bg-gradient-to-b from-slate-900 to-gray-900 flex items-center justify-center text-white text-2xl">Parallax Section</div>;
const Techbelow = () => <div className="h-96 bg-gradient-to-b from-gray-900 to-slate-900 flex items-center justify-center text-white text-2xl">Tech Below</div>;
const Technology = () => <div className="h-96 bg-gradient-to-b from-slate-900 to-gray-900 flex items-center justify-center text-white text-2xl">Technology</div>;
// const Page = () => <div className="h-96 bg-gradient-to-b from-gray-900 to-slate-900 flex items-center justify-center text-white text-2xl">Projects Page</div>;

export default function Home() {
  const mountRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    if (mountRef.current) {
      //@ts-ignore
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create geometric shapes
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x6366f1,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x1a1a2e,
      emissiveIntensity: 0.1
    });
    
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Set loaded after a brief delay for smooth entrance
    setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        //@ts-ignore
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        {/* Three.js Background */}
        <div 
          ref={mountRef} 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10" />
        
        {/* Main Content */}
        <div className="relative z-20 flex items-center justify-center h-full px-6 sm:px-8 lg:px-12">
          <div className={`max-w-7xl mx-auto w-full transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Hero Section */}
            <div className="text-center lg:text-left lg:flex lg:items-center lg:gap-16">
              
              {/* Content */}
              <div className="flex-1 mb-8 lg:mb-0">
                {/* Greeting */}
                <div className="mb-6">
                  <p className="text-indigo-400 font-medium text-lg mb-2 tracking-wide">
                    Hello, I&apos;m Ali Burhan
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
                    <TypeAnimation
                      sequence={[
                        'I am a Designer',
                        2000,
                        'I am a Developer',
                        2000,
                        'I am a Data Scientist',
                        2000,
                        'I am a Problem Solver',
                        2000
                      ]}
                      wrapper="span"
                      speed={50}
                      className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
                      repeat={Infinity}
                    />
                  </h1>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-light mb-6">
                    That listens to your problems
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mb-8 leading-relaxed">
                  I am a Pakistan-based Graphic Designer & Next.js Developer who works with startups & corporations on web design, branding, and presentations.
                </p>

                {/* CTA Button */}
                <div className="mb-8">
                  <Link 
                    href="/projects"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
                  >
                    <span>Start Project</span>
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12H3"></path>
                      <path d="m15 6 6 6-6 6"></path>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Contact Cards - Side Panel */}
              <div className="flex-shrink-0 lg:w-80">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-white font-semibold text-lg mb-4">Get In Touch</h3>
                  <div className="space-y-3">
                    <ContactCard
                      href="mailto:aliburhandev@gmail.com"
                      icon={<EmailIcon />}
                      title="Email"
                      subtitle="aliburhandev@gmail.com"
                      color="indigo"
                    />
                    <ContactCard
                      href="tel:+923161499488"
                      icon={<PhoneIcon />}
                      title="Phone"
                      subtitle="+92 316 1499488"
                      color="green"
                    />
                    <ContactCard
                      href="https://github.com/Ali-Burhan"
                      icon={<GithubIcon />}
                      title="GitHub"
                      subtitle="github.com/Ali-Burhan"
                      color="gray"
                      external
                    />
                    <ContactCard
                      href="https://www.linkedin.com/in/ali-burhan-9076b42b6/"
                      icon={<LinkedInIcon />}
                      title="LinkedIn"
                      subtitle="linkedin.com/in/ali-burhan"
                      color="blue"
                      external
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent">
              <div className="w-2 h-2 bg-indigo-500 rounded-full -translate-x-0.5 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Other Components */}
      <Page />
      {/* <ParallaxSection />
      <Technology />
      <Techbelow /> */}
    </>
  );
}

// Contact Card Component
function ContactCard({ href, icon, title, subtitle, color, external = false } : {href?:string, icon?:any, title?:string, subtitle?:string, color:string, external?:boolean}) {
  const colorClasses = {
    indigo: 'hover:bg-indigo-500/10 hover:border-indigo-500/20',
    green: 'hover:bg-green-500/10 hover:border-green-500/20',
    gray: 'hover:bg-gray-500/10 hover:border-gray-500/20',
    blue: 'hover:bg-blue-500/10 hover:border-blue-500/20'
  };

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      //@ts-ignore
      className={`group flex items-center gap-3 p-3 rounded-xl border border-white/10 transition-all duration-300 ${colorClasses[color]} hover:scale-105`}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm">{title}</p>
        <p className="text-gray-400 text-xs truncate">{subtitle}</p>
      </div>
    </a>
  );
}

// Icon Components
function EmailIcon() {
  return (
    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}