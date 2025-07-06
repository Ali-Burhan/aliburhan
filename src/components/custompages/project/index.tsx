'use client'
import { useEffect, useState, useRef, useCallback } from "react"
import * as THREE from 'three'
// Import post-processing effects
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


// Enhanced ProjectCard with 3D Tilt Effect
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300 ease-out opacity-0 translate-y-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${index * 200}ms`,
        position: 'relative',
        zIndex: 50,
        transformStyle: 'preserve-3d'
      }}
    >
        {/* Animated Aurora Border on Hover */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-70 transition-opacity duration-500" style={{ filter: 'blur(10px)' }} />

      <div className="relative bg-slate-900/80 rounded-3xl p-8" style={{ transform: 'translateZ(20px)' }}>
          {/* Content */}
          <div className="relative z-10">
             {/* Header */}
             <div className="flex items-start justify-between mb-6">
               <div className="flex items-center gap-4">
                 <div className="relative">
                   <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-500 group-hover:scale-110">
                     <project.icon className="w-8 h-8 text-white" />
                   </div>
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all duration-500">
                     {project.title}
                   </h3>
                   <p className="text-indigo-400 font-medium">{project.category}</p>
                 </div>
               </div>
               <div className="flex flex-wrap gap-2">
                 {project.tags.map((tag, i) => (
                   <span
                     key={i}
                     className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/30 hover:bg-indigo-500/40 hover:border-indigo-400/50 transition-colors duration-300"
                   >
                     {tag}
                   </span>
                 ))}
               </div>
             </div>

             {/* Description */}
             <p className="text-gray-300 leading-relaxed mb-8 text-lg">
               {project.description}
             </p>

             {/* Tech Stack */}
             <div className="mb-8">
               <h4 className="text-white font-semibold mb-3 text-lg">Tech Stack:</h4>
               <div className="flex flex-wrap gap-2">
                 {project.techStack.map((tech, i) => (
                   <span
                     key={i}
                     className="px-3 py-2 bg-slate-800/50 text-cyan-300 text-sm rounded-xl border border-cyan-500/30 hover:bg-slate-700/50 hover:border-cyan-400/50 transition-colors duration-300"
                   >
                     {tech}
                   </span>
                 ))}
               </div>
             </div>

             {/* Key Features */}
             <div className="mb-8">
               <h4 className="text-white font-semibold mb-3 text-lg">Key Features:</h4>
               <ul className="space-y-2">
                 {project.features.map((feature, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-300">
                     <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>

             {/* Action Buttons */}
             <div className="flex gap-4">
               {project.liveUrl && (
                 <a
                   href={project.liveUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
                 >
                   <span>Live Demo</span>
                   <ExternalLinkIcon className="w-4 h-4" />
                 </a>
               )}
               {project.githubUrl && (
                 <a
                   href={project.githubUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group/btn flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50"
                 >
                   <GithubIcon className="w-4 h-4" />
                   <span>View Code</span>
                 </a>
               )}
             </div>
           </div>
        </div>
    </div>
  );
};

const ProjectsPage = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTitle, setCurrentTitle] = useState('My Projects');

  // Same project data as provided
  const projects = [
        {
          id: 1,
          title: 'Cazvid',
          category: 'Full-Stack Platform',
          description: 'A professional talent acquisition platform that connects top-tier candidates with leading companies. Built with modern technologies to streamline the hiring process for both recruiters and job seekers.',
          techStack: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Redis', 'Docker'],
          features: [
            'Advanced candidate matching algorithms',
            'Real-time chat and video interviews',
            'Comprehensive candidate profiles',
            'Automated screening processes',
            'Analytics and reporting dashboard'
          ],
          tags: ['Platform', 'AI-Powered'],
          liveUrl: null,
          githubUrl: null,
          icon: BriefcaseIcon
        },
        {
          id: 2,
          title: 'Forwood Safety',
          category: 'Serverless Architecture',
          description: 'A comprehensive safety management system built entirely on serverless architecture. Utilizes AWS Lambda, API Gateway, and modern infrastructure-as-code practices for maximum scalability and reliability.',
          techStack: ['React.js', 'AWS Lambda', 'API Gateway', 'Terraform', 'DynamoDB', 'S3', 'CloudFormation'],
          features: [
            'Serverless microservices architecture',
            'Real-time safety monitoring',
            'Automated incident reporting',
            'Compliance tracking and alerts',
            'Mobile-responsive dashboard'
          ],
          tags: ['Serverless', 'AWS', 'Enterprise'],
          liveUrl: null,
          githubUrl: null,
          icon: ShieldIcon
        },
        {
          id: 3,
          title: 'Lumaya',
          category: 'Business Acquisition Platform',
          description: 'A sophisticated business acquisition platform (lumaya.ch) that facilitates the buying and selling of businesses. Features advanced valuation tools, due diligence workflows, and secure transaction management.',
          techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Python', 'Stripe', 'AWS', 'Docker'],
          features: [
            'Business valuation algorithms',
            'Due diligence document management',
            'Secure payment processing',
            'Advanced search and filtering',
            'Real-time notifications and updates'
          ],
          tags: ['E-commerce', 'FinTech'],
          liveUrl: 'https://lumaya.ch',
          githubUrl: null,
          icon: TrendingUpIcon
        }
      ];

  // Title animation effect
  useEffect(() => {
    const titles = ['My Projects', 'My Creations', 'My Solutions', 'My Innovations'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % titles.length;
      setCurrentTitle(titles[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced Three.js Scene Setup
  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Mouse position
    const mouse = new THREE.Vector2(-10, -10); // Start off-screen
    const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Lighting
    const pointLight = new THREE.PointLight(0x6366f1, 200, 0); // Color, Intensity, Distance
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Crystalline Shapes
    const shapes = [];
    const geo1 = new THREE.IcosahedronGeometry(1, 0);
    const mat1 = new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        roughness: 0.1,
        metalness: 0.5,
    });
    const shape1 = new THREE.Mesh(geo1, mat1);
    shape1.position.set(-2.5, 1, -2);
    scene.add(shape1);
    shapes.push(shape1);

    const geo2 = new THREE.IcosahedronGeometry(0.8, 0);
    const mat2 = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.2,
        metalness: 0.8,
    });
    const shape2 = new THREE.Mesh(geo2, mat2);
    shape2.position.set(2.5, -1, -1);
    scene.add(shape2);
    shapes.push(shape2);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.007,
        transparent: true,
        color: 0x818cf8,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Post-processing for Bloom Effect
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 0.6; // Bloom intensity
    bloomPass.radius = 0.5;
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Animation Loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Animate shapes
      shapes.forEach(shape => {
          shape.rotation.x += 0.001;
          shape.rotation.y += 0.002;
      });
      // Make particles drift
      particlesMesh.rotation.y += 0.0002;

      // Make light follow mouse
      pointLight.position.x = mouse.x * 5;
      pointLight.position.y = mouse.y * 5;

      // Subtle camera parallax
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      composer.render();
    };
    animate();

    const handleResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        composer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    setTimeout(() => setIsLoaded(true), 500);

    return () => {
        cancelAnimationFrame(animationRef.current);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (mount && renderer.domElement) {
            mount.removeChild(renderer.domElement);
        }
        // Dispose of Three.js objects to prevent memory leaks
        scene.traverse(object => {
          if (object.isMesh || object.isPoints) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
        renderer.dispose();
    };
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === '' || project.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchTerm === '' ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 text-center">
          <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-500">
                {currentTitle}
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-300 font-light mb-8">
              Crafting Digital Experiences That Matter
            </p>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Each project represents a unique challenge solved with cutting-edge technology, innovative design, and meticulous attention to detail.
            </p>
            {/* Scroll Indicator */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
               <div className="flex flex-col items-center text-gray-400">
                 <span className="text-sm mb-4">Explore My Work</span>
                 <div className="w-px h-16 bg-gradient-to-b from-indigo-500 to-transparent">
                   <div className="w-3 h-3 bg-indigo-500 rounded-full -translate-x-1 animate-bounce" />
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="sticky top-0 bg-slate-900/50 backdrop-blur-xl border-y border-white/10" style={{ zIndex: 20 }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-white font-semibold text-lg">Filter:</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                >
                  <option value="">All Categories</option>
                  <option value="Full-Stack Platform">Full-Stack Platform</option>
                  <option value="Serverless Architecture">Serverless Architecture</option>
                  <option value="Business Acquisition Platform">Business Platform</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects, technologies..."
                  className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all w-full lg:w-80"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="relative py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 text-xl mb-4">No projects found</div>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative py-20 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's collaborate on your next project and bring your vision to life with cutting-edge technology and innovative design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:aliburhandev@gmail.com"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
              >
                <EmailIcon className="w-5 h-5" />
                <span>Start a Project</span>
              </a>
              <a
                href="https://github.com/Ali-Burhan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold text-lg rounded-full transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50"
              >
                <GithubIcon className="w-5 h-5" />
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Icon Components (as provided in the original code)
function BriefcaseIcon({ className = "w-6 h-6" }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }

  function ShieldIcon({ className = "w-6 h-6" }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }

  function TrendingUpIcon({ className = "w-6 h-6" }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
  }

  function SearchIcon({ className = "w-4 h-4" }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    );
  }

  function ExternalLinkIcon({ className = "w-4 h-4" }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    );
  }

  function EmailIcon({ className = "w-5 h-5" }) {
    return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }

  function GithubIcon({ className = "w-5 h-5" }) {
    return (
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.019.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }

export default ProjectsPage;