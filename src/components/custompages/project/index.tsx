'use client'
import { useEffect, useState, useRef } from "react"
import * as THREE from 'three'

const ProjectCard = ({ project, index }:any) => {
  const cardRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: any) => {
        if (entry.isIntersecting) {
          // Instead of adding a class, directly apply the styles
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0px)';
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e:any) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(0px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-700 ease-out opacity-0 translate-y-20"
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
              {project.tags.map((tag:any, i:any) => (
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
              {project.techStack.map((tech:any, i:any) => (
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
              {project.features.map((feature:any, i:any) => (
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
  const mountRef = useRef<any>(null);
  const animationRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTitle, setCurrentTitle] = useState('My Projects');

  // Project data
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

    // Mouse position tracking
    const mouse = new THREE.Vector2(-10, -10);
    const handleMouseMove = (event:any) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Enhanced Lighting Setup
    const pointLight1 = new THREE.PointLight(0x6366f1, 200, 20);
    pointLight1.position.set(0, 0, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 150, 15);
    pointLight2.position.set(-5, 3, 2);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x38bdf8, 100, 12);
    pointLight3.position.set(5, -3, 1);
    scene.add(pointLight3);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Enhanced Crystalline Shapes with more variety
    const shapes:any = [];
    
    // Large central crystal
    const geo1 = new THREE.IcosahedronGeometry(1.2, 1);
    const mat1 = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
      specular: 0xffffff
    });
    const shape1 = new THREE.Mesh(geo1, mat1);
    shape1.position.set(-3, 1.5, -3);
    scene.add(shape1);
    shapes.push(shape1);

    // Floating octahedron
    const geo2 = new THREE.OctahedronGeometry(0.8, 0);
    const mat2 = new THREE.MeshPhongMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      shininess: 80,
      specular: 0xffffff
    });
    const shape2 = new THREE.Mesh(geo2, mat2);
    shape2.position.set(3, -1.5, -2);
    scene.add(shape2);
    shapes.push(shape2);

    // Additional tetrahedron
    const geo3 = new THREE.TetrahedronGeometry(0.6, 0);
    const mat3 = new THREE.MeshPhongMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
      shininess: 60,
      specular: 0xffffff
    });
    const shape3 = new THREE.Mesh(geo3, mat3);
    shape3.position.set(0, 2.5, -4);
    scene.add(shape3);
    shapes.push(shape3);

    // Small dodecahedron
    const geo4 = new THREE.DodecahedronGeometry(0.4, 0);
    const mat4 = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.5,
      shininess: 40,
      specular: 0xffffff
    });
    const shape4 = new THREE.Mesh(geo4, mat4);
    shape4.position.set(-1.5, -2.5, -1.5);
    scene.add(shape4);
    shapes.push(shape4);

    // Enhanced Particle System with multiple layers
    const particleGroups:any = [];
    
    // Main particle system
    const particlesGeometry1 = new THREE.BufferGeometry();
    const particlesCount1 = 8000;
    const posArray1 = new Float32Array(particlesCount1 * 3);
    const colorArray1 = new Float32Array(particlesCount1 * 3);
    
    for (let i = 0; i < particlesCount1 * 3; i += 3) {
      posArray1[i] = (Math.random() - 0.5) * 25;
      posArray1[i + 1] = (Math.random() - 0.5) * 25;
      posArray1[i + 2] = (Math.random() - 0.5) * 25;
      
      // Varied colors
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.3, 0.8, 0.5 + Math.random() * 0.5);
      colorArray1[i] = color.r;
      colorArray1[i + 1] = color.g;
      colorArray1[i + 2] = color.b;
    }
    
    particlesGeometry1.setAttribute('position', new THREE.BufferAttribute(posArray1, 3));
    particlesGeometry1.setAttribute('color', new THREE.BufferAttribute(colorArray1, 3));
    
    const particlesMaterial1 = new THREE.PointsMaterial({
      size: 0.008,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh1 = new THREE.Points(particlesGeometry1, particlesMaterial1);
    scene.add(particlesMesh1);
    particleGroups.push(particlesMesh1);

    // Secondary particle layer
    const particlesGeometry2 = new THREE.BufferGeometry();
    const particlesCount2 = 3000;
    const posArray2 = new Float32Array(particlesCount2 * 3);
    
    for (let i = 0; i < particlesCount2 * 3; i += 3) {
      posArray2[i] = (Math.random() - 0.5) * 15;
      posArray2[i + 1] = (Math.random() - 0.5) * 15;
      posArray2[i + 2] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    
    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.012,
      transparent: true,
      opacity: 0.6,
      color: 0x60a5fa,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh2 = new THREE.Points(particlesGeometry2, particlesMaterial2);
    scene.add(particlesMesh2);
    particleGroups.push(particlesMesh2);

    // Nebula-like background
    const nebulaGeometry = new THREE.SphereGeometry(50, 32, 32);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      color: 0x0f0f23,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // Animation Loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate crystalline shapes with varied movements
      shapes.forEach((shape:any, index:any) => {
        shape.rotation.x += 0.002 + index * 0.001;
        shape.rotation.y += 0.003 + index * 0.0005;
        shape.rotation.z += 0.001 + index * 0.0003;
        
        // Floating animation
        shape.position.y += Math.sin(time + index * 2) * 0.002;
        shape.position.x += Math.cos(time * 0.5 + index * 3) * 0.001;
      });

      // Animate particle groups
      particleGroups.forEach((group:any, index:any) => {
        group.rotation.y += 0.0003 + index * 0.0001;
        group.rotation.x += 0.0002 + index * 0.00005;
      });

      // Enhanced light animation
      pointLight1.position.x = mouse.x * 8 + Math.sin(time * 0.5) * 2;
      pointLight1.position.y = mouse.y * 8 + Math.cos(time * 0.3) * 2;
      
      pointLight2.position.x = -5 + Math.sin(time * 0.3) * 3;
      pointLight2.position.y = 3 + Math.cos(time * 0.4) * 2;
      
      pointLight3.position.x = 5 + Math.sin(time * 0.2) * 2;
      pointLight3.position.y = -3 + Math.cos(time * 0.6) * 3;

      // Enhanced camera parallax with smooth transitions
      const targetX = mouse.x * 0.8;
      const targetY = -mouse.y * 0.8;
      
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Subtle nebula rotation
      nebula.rotation.y += 0.0001;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
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
      // Dispose of Three.js objects
      scene.traverse((object:any) => {
        if (object.isMesh || object.isPoints) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material:any) => material.dispose());
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
        <div className="relative py-20">
          <div className="max-w-7xl mx-auto relative px-6 sm:px-8 lg:px-12">
            {filteredProjects.length > 0 && (
              <div className="grid relative grid-cols-1 lg:grid-cols-2 gap-12">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
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
              Let&apos;s collaborate on your next project and bring your vision to life with cutting-edge technology and innovative design.
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

// Icon Components
function BriefcaseIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 6a6 6 0 016-6c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4zm-1.5-6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}

export default ProjectsPage