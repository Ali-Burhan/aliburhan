'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import * as THREE from 'three'; // No need for @ts-ignore if Three.js types are installed

export default function AboutCustomPage() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Three.js elements
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const torusRef = useRef<THREE.Mesh | null>(null);
    const particlesMeshRef = useRef<THREE.Points | null>(null);

    useEffect(() => {
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

        // Create geometric shape (Torus, like your homepage)
        const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
        const material = new THREE.MeshStandardMaterial({
            color: 0x6366f1, // Indigo, matching your homepage
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x1a1a2e,
            emissiveIntensity: 0.1
        });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);
        torusRef.current = torus;

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
            color: 0x8b5cf6, // Purple, matching your homepage
            transparent: true,
            opacity: 0.8
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        particlesMeshRef.current = particlesMesh;

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
            if (torusRef.current) {
                torusRef.current.rotation.x += 0.01;
                torusRef.current.rotation.y += 0.005;
            }
            if (particlesMeshRef.current) {
                particlesMeshRef.current.rotation.x += 0.0005;
                particlesMeshRef.current.rotation.y += 0.0005;
            }
            renderer.render(scene, camera);
        };
        animate();

        // Handle scroll and resize
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleResize = () => {
            if (cameraRef.current && rendererRef.current && mountRef.current) {
                cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
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

    const skillsData = [
        {
            title: "Web Development",
            description: "Experienced in creating responsive, user-friendly web applications using React, Next.js, and Node.js.",
            icon: "/tech2.svg",
            bgColor: "bg-blue-500",
            hoverColor: "hover:bg-blue-600"
        },
        {
            title: "Serverless & Microservices",
            description: "Designing efficient, scalable, and cost-effective cloud-native solutions.",
            icon: "/tech3.svg",
            bgColor: "bg-green-500",
            hoverColor: "hover:bg-green-600"
        },
        {
            title: "Machine Learning",
            description: "I build and deploy machine learning models with a focus on data-driven decision-making and automation.",
            icon: "/tech1.svg",
            bgColor: "bg-orange-500",
            hoverColor: "hover:bg-orange-600"
        },
    ];

    return (
        <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-16 text-white'>
            {/* Three.js Background for the entire page */}
            <div
                ref={mountRef}
                className="fixed inset-0 z-0"
                style={{ transform: `translateY(-${scrollY * 0.2}px)` }} // Parallax effect
            />

            {/* Gradient Overlay for the entire page */}
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10" />

            {/* Hero Section / About Me Intro */}
            <div className="relative z-20 flex items-center justify-center h-[60vh] px-6 sm:px-8 lg:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent" data-aos="fade-down" data-aos-duration="800">
                        My Journey, My Passion.
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        Discover the story behind my work, my expertise, and my commitment to crafting exceptional digital experiences.
                    </p>
                </div>
            </div>

            {/* Revamped "My Story" Section */}
            <section className='relative z-20 py-16 md:py-24 px-6 sm:px-8 lg:px-12'>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Abstract Tech Image */}
                    <div className='flex justify-center items-center order-2 md:order-1' data-aos="fade-right" data-aos-duration="1000">
                        <div className="relative group w-full max-w-sm md:max-w-md lg:max-w-lg aspect-square"> {/* Added aspect-square for better control */}
                            <Image
                                src='/abstract-tech-ai.png' // Placeholder for your professional tech image
                                layout='fill' // Use layout fill to make image cover the div
                                objectFit='contain' // Ensure the image scales nicely within the container
                                className='rounded-3xl shadow-2xl transition-all duration-500 ease-in-out group-hover:scale-[1.02] group-hover:shadow-indigo-500/50 transform'
                                alt="Abstract representation of technology and AI, depicting data flow and interconnected systems"
                            />
                            {/* Decorative overlay/border on hover */}
                            <div className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-indigo-500/60 transition-all duration-500 pointer-events-none"></div>
                            {/* Subtle light effect on hover */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right Column: Story Text with enhanced layout */}
                    <div className='flex flex-col gap-6 order-1 md:order-2' data-aos="fade-left" data-aos-duration="1000">
                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight'>
                            My Journey <br className="hidden sm:inline" /> as a <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Digital Innovator</span>
                        </h2>

                        <p className='text-base sm:text-lg text-gray-300 leading-relaxed border-l-4 border-indigo-500 pl-4'>
                            I am <strong>Ali Burhan</strong>, a versatile <strong>Full-Stack Developer</strong> and <strong>AI Engineer</strong> driven by a passion for building scalable web applications and crafting cutting-edge AI solutions. My expertise spans across <strong>Generative AI</strong>, <strong>Machine Learning</strong>, and <strong>Natural Language Processing</strong>.
                        </p>

                        <p className='text-base sm:text-lg text-gray-300 leading-relaxed border-l-4 border-purple-500 pl-4'>
                            My journey began in web development, where I cultivated a strong foundation with frameworks like <strong>React</strong> and <strong>Next.js</strong>. This quickly evolved into a deep dive into <strong>Python</strong> and its powerful machine learning ecosystem. Today, I am at the forefront of developing <strong>Agentic AI systems</strong>, leveraging technologies such as <strong>LangChain</strong>, <strong>Hugging Face</strong>, and intricate <strong>LLM</strong> integrations to create truly intelligent and responsive applications.
                        </p>

                        <p className='text-base sm:text-lg text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4'>
                            Whether it is architecting <strong>Serverless</strong> solutions, designing resilient <strong>Microservices</strong>, or implementing complex AI models, I am constantly exploring new challenges and refining my skills. My goal is always to deliver robust, efficient, and future-proof digital products that make a real impact.
                        </p>
                    </div>
                </div>
            </section>
            {/* Second Section: Skills Showcase (remains the same) */}
            <section className='relative z-20 py-16 md:py-24 px-6 sm:px-8 lg:px-12'>
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent" data-aos="fade-up" data-aos-duration="800">
                        My Expertise
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                        A quick glance at the core technologies and domains I specialize in, driving innovation and delivering robust solutions.
                    </p>
                </div>
                <div className='flex flex-wrap justify-center gap-6 lg:gap-8'>
                    {skillsData.map((skill, index) => (
                        <div
                            key={index}
                            className={`flex flex-col gap-4 p-6 w-72 items-center text-center rounded-xl border border-white/10 shadow-lg
                                group ${skill.hoverColor} cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:border-transparent hover:shadow-2xl`}
                            style={{ backgroundColor: `${skill.bgColor.replace('bg-', '')}1A` }} // Dynamic subtle background using hex with opacity
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay={index * 150 + 400}
                        >
                            <div className={`rounded-full ${skill.bgColor} p-3 border border-white/20 shadow-md`}>
                                <Image
                                    src={skill.icon}
                                    height={60}
                                    width={60}
                                    className='rounded-full filter drop-shadow-md'
                                    alt={skill.title}
                                />
                            </div>
                            <h3 className='font-bold text-xl text-white group-hover:text-white'>{skill.title}</h3>
                            <p className='text-sm text-gray-300 group-hover:text-gray-100'>
                                {skill.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}