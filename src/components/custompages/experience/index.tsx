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

                {/* Experience Timeline Section */}
                <div data-aos="fade-up" data-aos-delay="200" className="mb-16 max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">My Professional Journey</h2>
                    <div className="relative wrap overflow-hidden p-10 h-full">
                        {/* Increased opacity and changed color for better visibility */}
                        <div className="border-2-2 absolute border-opacity-60 border-blue-600 h-full border" style={{ left: '50%' }}></div>

                        {/* Experience 1: Hashlogics */}
                        <div data-aos="fade-right" data-aos-offset="150" className="mb-8 flex justify-between items-center w-full right-timeline">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-gradient-to-br from-blue-500 to-indigo-500 shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto font-semibold text-lg text-white">💼</h1>
                            </div>
                            <div className="order-1 w-5/12 px-6 py-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-blue-300">Hashlogics</h3>
                                <p className="text-md sm:text-lg font-medium text-blue-200 mb-4">MERN Stack Developer | October 2024 - Present</p>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:border-blue-400">
                                    <ul className="space-y-4 text-gray-200 text-base">
                                        <li><strong className="font-semibold text-white">Project Lumaya:</strong> Developed responsive and feature-rich frontend applications using Next.js, with a focus on performance and accessibility.</li>
                                        <li><strong className="font-semibold text-white">Backend Development:</strong> Designed and implemented a robust backend using FastAPI, enabling efficient data handling and secure API integrations.</li>
                                        <li><strong className="font-semibold text-white">Full-Stack Delivery:</strong> Delivered a complete and scalable solution as a single-handed developer, showcasing expertise in both frontend and backend technologies.</li>
                                        <li><strong className="font-semibold text-white">Version Control:</strong> Managed the project lifecycle using Git and GitLab for version control and collaborative development.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Experience 2: Techling */}
                        <div data-aos="fade-left" data-aos-offset="150" className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                            <div className="order-1 w-5/12"></div>
                            <div className="z-20 flex items-center order-1 bg-gradient-to-br from-green-500 to-teal-500 shadow-xl w-8 h-8 rounded-full">
                                <h1 className="mx-auto font-semibold text-lg text-white">💻</h1>
                            </div>
                            <div className="order-1 w-5/12 px-6 py-4 text-right">
                                <h3 className="text-xl sm:text-2xl font-bold text-green-300">Techling</h3>
                                <p className="text-md sm:text-lg font-medium text-green-200 mb-4">Junior Web Developer | May 2024 - October 2024</p>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:border-green-400">
                                    <ul className="space-y-4 text-gray-200 text-base">
                                        <li><strong className="font-semibold text-white">Project CazVid:</strong> Developed frontend applications focusing on creating responsive and high-performance web experiences using Next.js, with an emphasis on user experience and interface design.</li>
                                        <li><strong className="font-semibold text-white">Full-Stack Contribution:</strong> Engaged in full-stack development projects, applying both frontend and backend skills to create comprehensive and scalable solutions.</li>
                                        <li><strong className="font-semibold text-white">Collaboration & Version Control:</strong> Utilized Git for version control and collaborated with the team through GitHub and GitLab, ensuring smooth code management and team synchronization.</li>
                                    </ul>
                                </div>
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

                {/* Projects Section */}
                <div data-aos="fade-up" data-aos-delay="500" className="mb-16 max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">Key Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Project Card: CazVid */}
                        <div data-aos="zoom-in" data-aos-delay="600" className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-pink-500/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-pink-400">
                            <div className="absolute top-4 right-4 bg-pink-500/30 text-pink-100 text-xs px-3 py-1 rounded-full font-semibold">Web Development</div>
                            <h3 className="text-2xl font-semibold text-pink-300 mb-4 group-hover:text-pink-200">CazVid</h3>
                            <p className="text-gray-200 text-lg">
                                Developed responsive and high-performance web applications using **Next.js**, with a focus on user experience and interface design. Contributed to both frontend and full-stack development at **Techling**.
                            </p>
                        </div>
                        {/* Project Card: TAHMS */}
                        <div data-aos="zoom-in" data-aos-delay="700" className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-blue-600/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500">
                            <div className="absolute top-4 right-4 bg-blue-600/30 text-blue-100 text-xs px-3 py-1 rounded-full font-semibold">System Integration</div>
                            <h3 className="text-2xl font-semibold text-blue-300 mb-4 group-hover:text-blue-200">TAHMS (Tourism & Hospitality Management System)</h3>
                            <p className="text-gray-200 text-lg">
                                Contributed to a complete solution for the **Tourism and Hospitality Management System**, showcasing expertise in web development and robust systems integration.
                            </p>
                        </div>
                        {/* Project Card: Lumaya */}
                        <div data-aos="zoom-in" data-aos-delay="800" className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-purple-600/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-purple-500">
                            <div className="absolute top-4 right-4 bg-purple-600/30 text-purple-100 text-xs px-3 py-1 rounded-full font-semibold">Full-Stack</div>
                            <h3 className="text-2xl font-semibold text-purple-300 mb-4 group-hover:text-purple-200">Lumaya</h3>
                            <p className="text-gray-200 text-lg">
                                Built the frontend and backend, demonstrating full-stack development, performance optimization, and secure API integrations using **Next.js** and **FastAPI**.
                            </p>
                        </div>
                        {/* Project Card: FileCrawl */}
                        <div data-aos="zoom-in" data-aos-delay="900" className="group bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl border border-green-600/50 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-green-500">
                            <div className="absolute top-4 right-4 bg-green-600/30 text-green-100 text-xs px-3 py-1 rounded-full font-semibold">AI/ML</div>
                            <h3 className="text-2xl font-semibold text-green-300 mb-4 group-hover:text-green-200">FileCrawl</h3>
                            <p className="text-gray-200 text-lg">
                                Created an **AI-driven file processing tool**, leveraging technologies like **LangChain** and **Hugging Face** for seamless **AI workflows** and intelligent automation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceCustomPage;