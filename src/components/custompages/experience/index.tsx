'use client'
import { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import * as THREE from 'three';

const ExperienceCustomPage = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Three.js elements
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const particlesMeshRef = useRef<THREE.Points | null>(null);
    const lineMeshRef = useRef<THREE.LineSegments | null>(null); // For connecting lines

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false,
        });

        // Initialize Three.js scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // --- Particle Network ---
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        const sizesArray = new Float32Array(particlesCount); // For varying particle sizes
        const maxRange = 10; // Spread of particles
        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * maxRange; // X
            posArray[i + 1] = (Math.random() - 0.5) * maxRange; // Y
            posArray[i + 2] = (Math.random() - 0.5) * maxRange; // Z
        }
        for (let i = 0; i < particlesCount; i++) {
            sizesArray[i] = Math.random() * 0.05 + 0.01; // Particle sizes between 0.01 and 0.06
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1)); // Custom attribute for size

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x8b5cf6, // Purple
            size: 0.03, // Base size
            sizeAttenuation: true, // Particles closer appear larger
            transparent: true,
            opacity: 0.8
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        particlesMeshRef.current = particlesMesh;

        // --- Connecting Lines ---
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x6366f1, // Indigo
            transparent: true,
            opacity: 0.3, // Increased opacity for better visibility
            linewidth: 1 // This may not work consistently across all renderers
        });
        const lineGeometry = new THREE.BufferGeometry();
        const maxConnections = particlesCount * 2; // Max lines for buffer
        const linePositions = new Float32Array(maxConnections * 3 * 2); // (x,y,z) * 2 points per line * max_connections
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setDrawRange(0, 0); // Start with no lines drawn

        const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineMesh);
        lineMeshRef.current = lineMesh;

        // Populate lines based on particle proximity
        const updateLines = () => {
            if (!particlesMeshRef.current || !lineMeshRef.current) return;

            const positions = particlesMeshRef.current.geometry.attributes.position.array;
            let lineIndex = 0;
            const maxDistance = 1.5; // Max distance for particles to connect

            for (let i = 0; i < particlesCount; i++) {
                const iX = positions[i * 3];
                const iY = positions[i * 3 + 1];
                const iZ = positions[i * 3 + 2];

                for (let j = i + 1; j < particlesCount; j++) {
                    const jX = positions[j * 3];
                    const jY = positions[j * 3 + 1];
                    const jZ = positions[j * 3 + 2];

                    const dx = iX - jX;
                    const dy = iY - jY;
                    const dz = iZ - jZ;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < maxDistance) {
                        linePositions[lineIndex++] = iX;
                        linePositions[lineIndex++] = iY;
                        linePositions[lineIndex++] = iZ;

                        linePositions[lineIndex++] = jX;
                        linePositions[lineIndex++] = jY;
                        linePositions[lineIndex++] = jZ;
                    }
                    if (lineIndex >= maxConnections * 6) break; // Prevent overflow
                }
                if (lineIndex >= maxConnections * 6) break;
            }

            lineGeometry.setDrawRange(0, lineIndex / 3); // Update draw range
            lineGeometry.attributes.position.needsUpdate = true;
        };

        // Initial update of lines
        updateLines();


        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (particlesMeshRef.current) {
                particlesMeshRef.current.rotation.x += 0.0005;
                particlesMeshRef.current.rotation.y += 0.0005;
            }
            if (lineMeshRef.current) {
                 lineMeshRef.current.rotation.x += 0.0005;
                 lineMeshRef.current.rotation.y += 0.0005;
            }
            renderer.render(scene, camera);
        };
        animate();

        // Handle scroll and resize
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) { // Removed mountRef.current here
                cameraRef.current.aspect = window.innerWidth / window.innerHeight; // Use window dimensions
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight); // Use window dimensions
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            scene.clear();
        };
    }, []); // Empty dependency array means this runs once on mount


    return (
        <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-16 text-white'>
            {/* Three.js Background for the entire page */}
            <div
                ref={mountRef}
                className="fixed inset-0 z-0 w-screen h-screen" // Added w-screen h-screen for full coverage
                style={{ transform: `translateY(-${scrollY * 0.2}px)` }} // Parallax effect
            />

            {/* Gradient Overlay for the entire page */}
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10" />

            {/* Content Container */}
            <div className="relative z-20 py-16 px-8 lg:px-28 md:px-14 sm:px-8">
                {/* Header Section */}
                <div data-aos="fade-up" className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight mb-4">
                        Professional Experience
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover the journey and accomplishments of Ali Burhan as a Full-Stack Developer and AI Engineer.
                    </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="200" className="mb-16 mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">My Professional Journey</h2>
    <div className="relative wrap overflow-hidden p-0 md:p-10 h-full">
        {/* Vertical line for timeline - hidden on small screens, shown on md and up */}
        <div className="hidden md:block border-2-2 absolute border-opacity-60 border-blue-600 h-full border"
            style={{ left: '50%' }}></div>

        {/* Experience 1: Hashlogics */}
        <div data-aos="fade-right" data-aos-offset="150"
            className="mb-8 flex flex-col md:flex-row justify-between items-center w-full md:right-timeline">
            <div className="order-1 md:w-6/12"></div> {/* Empty div for spacing on larger screens */}
            <div
                className="z-20 flex items-center order-1 bg-gradient-to-br from-blue-500 to-indigo-500 shadow-xl w-10 h-10 rounded-full md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-4 md:mt-0">
                <h1 className="mx-auto font-semibold text-lg text-white">💼</h1>
            </div>
            <div className="order-1 md:w-6/12 px-6 py-4 text-center md:text-left md:pr-12">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-300">Hashlogics</h3>
                <p className="text-md sm:text-lg font-medium text-blue-200 mb-4">MERN Stack Developer | October 2024 -
                    Present</p>
                <div
                    className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:border-blue-400">
                    <ul className="space-y-4 text-gray-200 text-base">
                        <li><strong className="font-semibold text-white">Project Lumaya:</strong> Developed responsive
                            and feature-rich frontend applications using Next.js, with a focus on performance and
                            accessibility.</li>
                        <li><strong className="font-semibold text-white">Backend Development:</strong> Designed and
                            implemented a robust backend using FastAPI, enabling efficient data handling and secure API
                            integrations.</li>
                        <li><strong className="font-semibold text-white">Full-Stack Delivery:</strong> Delivered a
                            complete and scalable solution as a single-handed developer, showcasing expertise in both
                            frontend and backend technologies.</li>
                        <li><strong className="font-semibold text-white">Version Control:</strong> Managed the project
                            lifecycle using Git and GitLab for version control and collaborative development.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Experience 2: Techling */}
        <div data-aos="fade-left" data-aos-offset="150"
            className="mb-8 flex flex-col md:flex-row-reverse justify-between items-center w-full md:left-timeline">
            <div className="order-1 md:w-6/12"></div> {/* Empty div for spacing on larger screens */}
            <div
                className="z-20 flex items-center order-1 bg-gradient-to-br from-green-500 to-teal-500 shadow-xl w-10 h-10 rounded-full md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-4 md:mt-0">
                <h1 className="mx-auto font-semibold text-lg text-white">💻</h1>
            </div>
            <div className="order-1 md:w-6/12 px-6 py-4 text-center md:text-right md:pl-12">
                <h3 className="text-xl sm:text-2xl font-bold text-green-300">Techling</h3>
                <p className="text-md sm:text-lg font-medium text-green-200 mb-4">Junior Web Developer | May 2024 -
                    October 2024</p>
                <div
                    className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:border-green-400">
                    <ul className="space-y-4 text-gray-200 text-base">
                        <li><strong className="font-semibold text-white">Project CazVid:</strong> Developed frontend
                            applications focusing on creating responsive and high-performance web experiences using
                            Next.js, with an emphasis on user experience and interface design.</li>
                        <li><strong className="font-semibold text-white">Full-Stack Contribution:</strong> Engaged in
                            full-stack development projects, applying both frontend and backend skills to create
                            comprehensive and scalable solutions.</li>
                        <li><strong className="font-semibold text-white">Collaboration & Version Control:</strong>
                            Utilized Git for version control and collaborated with the team through GitHub and GitLab,
                            ensuring smooth code management and team synchronization.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

                {/* Skills Section */}
                <div data-aos="fade-up" data-aos-delay="400" className="mb-16 max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">Skills Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Languages */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:border-blue-300">
                            <h3 className="text-xl font-semibold text-blue-300 mb-4">Languages</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Typescript', 'Javascript', 'Python', 'SQL', 'Git'].map((skill, index) => (
                                    <span key={index} className="text-sm px-3 py-1 rounded-full bg-blue-600/30 text-blue-100 border border-blue-500/50 hover:bg-blue-500/50 transition-colors duration-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Frameworks (Web) */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:border-teal-300">
                            <h3 className="text-xl font-semibold text-teal-300 mb-4">Frameworks (Web)</h3>
                            <div className="flex flex-wrap gap-2">
                                {['React.js', 'Next.js', 'Flask', 'FastAPI', 'Tailwind CSS', 'Material UI', 'Antd', 'Express.js'].map((skill, index) => (
                                    <span key={index} className="text-sm px-3 py-1 rounded-full bg-teal-600/30 text-teal-100 border border-teal-500/50 hover:bg-teal-500/50 transition-colors duration-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Frameworks (AI) */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:border-purple-300">
                            <h3 className="text-xl font-semibold text-purple-300 mb-4">Frameworks (AI)</h3>
                            <div className="flex flex-wrap gap-2">
                                {['SKLearn', 'Pytorch', 'LangChain', 'LangGraph', 'Phi Data', 'Crew AI', 'Hugging Face'].map((skill, index) => (
                                    <span key={index} className="text-sm px-3 py-1 rounded-full bg-purple-600/30 text-purple-100 border border-purple-500/50 hover:bg-purple-500/50 transition-colors duration-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Tools */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-yellow-400/50 transition-all duration-300 hover:shadow-xl hover:border-yellow-300">
                            <h3 className="text-xl font-semibold text-yellow-300 mb-4">Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Git', 'GitHub', 'GitLab', 'VS Code', 'Cursor', 'LazyGit', 'Postman', 'AWS'].map((skill, index) => (
                                    <span key={index} className="text-sm px-3 py-1 rounded-full bg-yellow-600/30 text-yellow-100 border border-yellow-500/50 hover:bg-yellow-500/50 transition-colors duration-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Platforms & Databases */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-red-400/50 transition-all duration-300 hover:shadow-xl hover:border-red-300">
                            <h3 className="text-xl font-semibold text-red-300 mb-4">Platforms & Databases</h3>
                            <div className="flex flex-wrap gap-2">
                                {['SQL Server', 'PostgreSQL', 'MongoDB Compass', 'MS Office'].map((skill, index) => (
                                    <span key={index} className="text-sm px-3 py-1 rounded-full bg-red-600/30 text-red-100 border border-red-500/50 hover:bg-red-500/50 transition-colors duration-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div data-aos="fade-up" data-aos-delay="300" className="mb-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">My Academic Background</h2>
                    <div className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:border-indigo-400 group">
                            <h3 className="text-xl sm:text-2xl font-medium text-indigo-300 mb-2 group-hover:text-indigo-200">
                                Bachelor’s in Computer Science, NFC Institute of Engineering & Fertilizer Research
                            </h3>
                            <p className="text-gray-300 text-lg">CGPA: 3.0/4.0 (September 2020 - November 2024)</p>
                            <p className="text-gray-300 text-lg">Sheikhupura, Pakistan</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:border-purple-400 group">
                            <h3 className="text-xl sm:text-2xl font-medium text-purple-300 mb-2 group-hover:text-purple-200">FSc in Pre-Engineering, Aspire Group of Colleges</h3>
                            <p className="text-gray-300 text-lg">Sheikhupura, Pakistan (July 2018 - February 2020)</p>
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
              <div data-aos="fade-up" data-aos-delay="500" className="mb-16 max-w-6xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">Key Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project Card: Cazvid */}
        <div data-aos="zoom-in" data-aos-delay="600"
            className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-pink-500/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-pink-400">
            <div className="absolute top-4 right-4 bg-pink-500/30 text-pink-100 text-xs px-3 py-1 rounded-full font-semibold">
                Full-Stack Platform</div>
            <h3 className="text-2xl font-semibold text-pink-300 my-4 group-hover:text-pink-200">Cazvid</h3>
            <p className="text-gray-200 text-lg">
                A professional talent acquisition platform that connects top-tier candidates with leading companies.
                Built with modern technologies to streamline the hiring process for both recruiters and job seekers.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <span
                    className="bg-pink-600/30 text-pink-100 text-xs px-2 py-1 rounded-full font-medium">Next.js</span>
                <span
                    className="bg-pink-600/30 text-pink-100 text-xs px-2 py-1 rounded-full font-medium">NestJS</span>
                <span
                    className="bg-pink-600/30 text-pink-100 text-xs px-2 py-1 rounded-full font-medium">PostgreSQL</span>
                <span
                    className="bg-pink-600/30 text-pink-100 text-xs px-2 py-1 rounded-full font-medium">TypeScript</span>
                <span
                    className="bg-pink-600/30 text-pink-100 text-xs px-2 py-1 rounded-full font-medium">Tailwind CSS</span>
                <span
                    className="bg-pink-600/30 text-pink-100 text-xs px-2 py-1 rounded-full font-medium">Redis</span>
                <span
                    className="bg-pink-600/30 text-pink-100 text-xs px-2 py-1 rounded-full font-medium">Docker</span>
            </div>
            <div className="mt-6">
                <a href="https://desktop.cazvid.com" target="_blank"
                    className="text-pink-300 hover:text-pink-200 font-semibold text-lg inline-flex items-center">
                    View Live
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path
                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                </a>
            </div>
        </div>

        {/* Project Card: Forwood Safety */}
        <div data-aos="zoom-in" data-aos-delay="700"
            className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-blue-600/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500">
            <div className="absolute top-4 right-4 bg-blue-600/30 text-blue-100 text-xs px-3 py-1 rounded-full font-semibold">
                Serverless Architecture</div>
            <h3 className="text-2xl font-semibold text-blue-300 my-4 group-hover:text-blue-200">Forwood Safety</h3>
            <p className="text-gray-200 text-lg">
                A comprehensive safety management system built entirely on serverless architecture. Utilizes AWS Lambda,
                API Gateway, and modern infrastructure-as-code practices for maximum scalability and reliability.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <span
                    className="bg-blue-700/30 text-blue-100 text-xs px-2 py-1 rounded-full font-medium">React.js</span>
                <span
                    className="bg-blue-700/30 text-blue-100 text-xs px-2 py-1 rounded-full font-medium">AWS Lambda</span>
                <span
                    className="bg-blue-700/30 text-blue-100 text-xs px-2 py-1 rounded-full font-medium">API Gateway</span>
                <span
                    className="bg-blue-700/30 text-blue-100 text-xs px-2 py-1 rounded-full font-medium">Terraform</span>
                <span
                    className="bg-blue-700/30 text-blue-100 text-xs px-2 py-1 rounded-full font-medium">DynamoDB</span>
                <span className="bg-blue-700/30 text-blue-100 text-xs px-2 py-1 rounded-full font-medium">S3</span>
                <span
                    className="bg-blue-700/30 text-blue-100 text-xs px-2 py-1 rounded-full font-medium">CloudFormation</span>
            </div>
            <div className="mt-6">
                <a href="https://id.dev.platform.forwoodsafety.com" target="_blank" rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 font-semibold text-lg inline-flex items-center">
                    View Live
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path
                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                </a>
            </div>
        </div>

        {/* Project Card: Lumaya */}
        <div data-aos="zoom-in" data-aos-delay="800"
            className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-purple-600/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-purple-500">
            <div className="absolute top-4 right-4 bg-purple-600/30 text-purple-100 text-xs px-3 py-1 rounded-full font-semibold">
                Business Acquisition Platform</div>
            <h3 className="text-2xl font-semibold text-purple-300 my-4 group-hover:text-purple-200">Lumaya</h3>
            <p className="text-gray-200 text-lg">
                A sophisticated business acquisition platform (lumaya.ch) that facilitates the buying and selling of
                businesses. Features advanced valuation tools, due diligence workflows, and secure transaction
                management.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <span
                    className="bg-purple-700/30 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">Next.js</span>
                <span
                    className="bg-purple-700/30 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">FastAPI</span>
                <span
                    className="bg-purple-700/30 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">PostgreSQL</span>
                <span
                    className="bg-purple-700/30 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">Python</span>
                <span
                    className="bg-purple-700/30 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">Stripe</span>
                <span
                    className="bg-purple-700/30 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">AWS</span>
                <span
                    className="bg-purple-700/30 text-purple-100 text-xs px-2 py-1 rounded-full font-medium">Docker</span>
            </div>
            <div className="mt-6">
                <a href="https://lumaya.ch" target="_blank" rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 font-semibold text-lg inline-flex items-center">
                    View Live
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path
                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                </a>
            </div>
        </div>

        {/* Project Card: CancerBERT */}
        <div data-aos="zoom-in" data-aos-delay="900"
            className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-green-600/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-green-500">
            <div className="absolute top-4 right-4 bg-green-600/30 text-green-100 text-xs px-3 py-1 rounded-full font-semibold">
                NLP Research</div>
            <h3 className="text-2xl font-semibold text-green-300 my-4 group-hover:text-green-200">CancerBERT</h3>
            <p className="text-gray-200 text-lg">
                Research project focused on fine-tuning BERT and LLaMA-3 models for cancer diagnosis using the Hugging
                Face library and PyTorch. Utilized the Cancer Genome Atlas (TCGA) dataset to train and evaluate the
                models.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <span
                    className="bg-green-700/30 text-green-100 text-xs px-2 py-1 rounded-full font-medium">PyTorch</span>
                <span className="bg-green-700/30 text-green-100 text-xs px-2 py-1 rounded-full font-medium">Hugging
                    Face</span>
                <span
                    className="bg-green-700/30 text-green-100 text-xs px-2 py-1 rounded-full font-medium">Transformers</span>
                <span
                    className="bg-green-700/30 text-green-100 text-xs px-2 py-1 rounded-full font-medium">LLaMA-3</span>
                <span
                    className="bg-green-700/30 text-green-100 text-xs px-2 py-1 rounded-full font-medium">BERT</span>
                <span
                    className="bg-green-700/30 text-green-100 text-xs px-2 py-1 rounded-full font-medium">TCGA</span>
            </div>
            <div className="mt-6">
                <a href="https://github.com/aliburhan/CancerBERT" target="_blank" rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-200 font-semibold text-lg inline-flex items-center">
                    View on GitHub
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.417 2.865 8.167 6.839 9.48.5.092.682-.217.682-.483 0-.237-.008-.867-.013-1.702-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.107-1.465-1.107-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.91.829.091-.645.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.68-.103-.253-.448-1.274.097-2.646 0 0 .84-.268 2.75 1.025A9.564 9.564 0 0110 4.872c.85.004 1.7.11 2.505.322 1.902-1.293 2.74-1.025 2.74-1.025.546 1.372.202 2.393.099 2.646.64.696 1.029 1.59 1.029 2.68 0 3.841-2.339 4.681-4.566 4.935.359.308.678.917.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C17.13 18.172 20 14.425 20 10.017 20 4.484 15.522 0 10 0z"
                            clipRule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
            </div>
        </div>
    );
};

export default ExperienceCustomPage;