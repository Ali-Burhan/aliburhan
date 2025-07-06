'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as THREE from 'three';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // For user interaction
//@ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
//@ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
//@ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
//@ts-ignore
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'; // Optional, for a dynamic glitch effect
//@ts-ignore
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { VignetteShader } from 'three/examples/jsm/Addons.js';

export default function ServiceCustomPage() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Three.js elements
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const composerRef = useRef<EffectComposer | null>(null); // For post-processing
    const controlsRef = useRef<OrbitControls | null>(null); // For user controls

    const mainObjectRef = useRef<THREE.Group | null>(null); // Group to hold multiple objects
    const particlesMeshRef = useRef<THREE.Points | null>(null);
    const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
    const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
    const pointLightRef = useRef<THREE.PointLight | null>(null);


    const animateRef = useRef<FrameRequestCallback | null>(null); // Ref for animation loop

    const initThreeJs = useCallback(() => {
        if (!mountRef.current) return;

        // Cleanup any existing scene
        if (rendererRef.current) {
            mountRef.current.removeChild(rendererRef.current.domElement);
            rendererRef.current.dispose();
            sceneRef.current?.clear();
        }

        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 6);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0); // Transparent background
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controlsRef.current = controls;

        // Main Objects (Group for easier manipulation)
        const mainObjectGroup = new THREE.Group();
        scene.add(mainObjectGroup);
        mainObjectRef.current = mainObjectGroup;

        // Torus
        const torusGeometry = new THREE.TorusGeometry(1, 0.3, 32, 100);
        const torusMaterial = new THREE.MeshStandardMaterial({
            color: 0x6366f1, // Indigo
            metalness: 0.8,
            roughness: 0.3,
            emissive: 0x1a1a2e,
            emissiveIntensity: 0.1
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        mainObjectGroup.add(torus);

        // Dodecahedron
        const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.8);
        const dodecahedronMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6, // Purple
            metalness: 0.6,
            roughness: 0.4,
            flatShading: true
        });
        const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
        dodecahedron.position.set(2.5, 0, 0);
        mainObjectGroup.add(dodecahedron);

        // Icosahedron
        const icosahedronGeometry = new THREE.IcosahedronGeometry(0.7);
        const icosahedronMaterial = new THREE.MeshStandardMaterial({
            color: 0x3b82f6, // Blue
            metalness: 0.7,
            roughness: 0.2,
            flatShading: true
        });
        const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
        icosahedron.position.set(-2.5, 0, 0);
        mainObjectGroup.add(icosahedron);


        // Floating Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        const particleColors = new Float32Array(particlesCount * 3); // For varied particle colors

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Distribute particles in a larger sphere
            const radius = 5 + Math.random() * 5; // Varying radius
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = radius * Math.cos(phi);

            // Assign colors
            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.7, 0.5); // Random hue, fixed saturation/lightness
            particleColors[i] = color.r;
            particleColors[i + 1] = color.g;
            particleColors[i + 2] = color.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true, // Use vertex colors
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending // For brighter particles
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        particlesMeshRef.current = particlesMesh;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambientLight);
        ambientLightRef.current = ambientLight;

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        directionalLightRef.current = directionalLight;

        const pointLight = new THREE.PointLight(0x6366f1, 1.5, 100);
        pointLight.position.set(-5, -5, 5);
        scene.add(pointLight);
        pointLightRef.current = pointLight;

        // Post-processing
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0;
        bloomPass.strength = 0.5; // Adjust strength for desired bloom effect
        bloomPass.radius = 0.5;
        composer.addPass(bloomPass);

        // Optional: Glitch Pass for a subtle, dynamic effect
        const glitchPass = new GlitchPass();
        glitchPass.goWild = false; // Set to true for more aggressive glitches
        glitchPass.curF = 0; // Control frequency manually or let it be random
        // composer.addPass(glitchPass); // Uncomment to enable glitch effect

        const vignettePass : any = new ShaderPass(VignetteShader);
        vignettePass.uniforms["darkness"].value = 1.0; // Adjust for more or less darkness
        vignettePass.uniforms["offset"].value = 1.0;
        composer.addPass(vignettePass);

        composerRef.current = composer;


        // Animation loop
        const animate: FrameRequestCallback = () => {
            requestAnimationFrame(animate);

            if (mainObjectRef.current) {
                mainObjectRef.current.rotation.x += 0.005;
                mainObjectRef.current.rotation.y += 0.003;
                mainObjectGroup.children[0].rotation.z += 0.002; // Torus
                mainObjectGroup.children[1].rotation.x += 0.007; // Dodecahedron
                mainObjectGroup.children[2].rotation.y += 0.004; // Icosahedron
            }

            if (particlesMeshRef.current) {
                particlesMeshRef.current.rotation.x += 0.0001;
                particlesMeshRef.current.rotation.y += 0.0002;
            }

            // Animate lights (optional)
            if (pointLightRef.current) {
                pointLightRef.current.position.x = 10 * Math.sin(Date.now() * 0.0005);
                pointLightRef.current.position.y = 10 * Math.cos(Date.now() * 0.0005);
            }

            controls.update(); // Update controls for damping
            composer.render(); // Render with post-processing
        };
        animateRef.current = animate;
        //@ts-ignore
        animate();

        return () => {
            controls.dispose();
            renderer.dispose();
            scene.clear();
        };

    }, []);


    useEffect(() => {
        initThreeJs();

        const handleScroll = () => {
            setScrollY(window.scrollY);
            // Parallax effect on camera position
            if (cameraRef.current) {
                cameraRef.current.position.y = -window.scrollY * 0.002; // Adjust scroll speed
            }
        };

        const handleResize = () => {
            if (cameraRef.current && rendererRef.current && composerRef.current && mountRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
                composerRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Initial camera position adjustment
        if (cameraRef.current) {
            cameraRef.current.position.y = -window.scrollY * 0.002;
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            // Cleanup in initThreeJs now handles removal of renderer.domElement
        };
    }, [initThreeJs]); // Dependency on initThreeJs to re-run on remount


    const serviceData = [
        {
            title: "Web Design & Development",
            description: "Crafting modern, responsive, and visually stunning websites to elevate your brand.",
            longDescription: "I specialize in building scalable, user-friendly web solutions that stand out in the digital landscape. Whether it's a business site or a custom application, I ensure it’s visually stunning and functionally flawless. Let’s collaborate to create something extraordinary.",
            icon: "/tech2.svg",
            bgColor: "bg-blue-600",
            textColor: "text-blue-300",
            buttonColor: "text-blue-700",
            link: "/projects"
        },
        {
            title: "Serverless & Microservices Architecture",
            description: "Designing efficient, scalable, and cost-effective cloud-native solutions.",
            longDescription: "Leverage the power of serverless and microservices to build robust and highly available applications. I architect systems that are agile, reduce operational overhead, and scale seamlessly with your business demands, ensuring optimal performance and cost efficiency.",
            icon: "/tech3.svg", // Ensure you have this icon
            bgColor: "bg-green-600",
            textColor: "text-green-300",
            buttonColor: "text-green-700",
            link: "/projects"
        },
        {
            title: "AI/ML & Data Science Engineering",
            description: "Empowering businesses with AI-driven insights and automation.",
            longDescription: "With expertise in AI, machine learning, and data science, I provide predictive modeling, natural language processing solutions, and intelligent automation that help you stay ahead in the competitive landscape. Unlock the full potential of your data with my custom solutions, from data analysis to deploying advanced AI models.",
            icon: "/tech1.svg",
            bgColor: "bg-orange-500",
            textColor: "text-orange-300",
            buttonColor: "text-orange-700",
            link: "/projects"
        },
    ];

    return (
        <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-16'>
            {/* Three.js Background for the entire page */}
            <div
                ref={mountRef}
                className="fixed inset-0 z-0"
                // Parallax is now handled directly by camera position in Three.js,
                // so this style attribute is no longer strictly necessary for the div itself.
                // It can be removed or kept for potential future CSS-based parallax layers.
                style={{ transform: `translateY(-${scrollY * 0.0}px)` }}
            />

            {/* Gradient Overlay for the entire page */}
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10" />

            {/* Hero Section */}
            <div className="relative z-20 h-[50vh] lg:py-24 lg:px-44 md:py-20 md:px-20 sm:px-10 px-10 py-10 text-white flex flex-col justify-center">
                <h1 className="text-5xl font-bold tracking-tight leading-tight" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
                    Explore My Services.
                </h1>
                <h2 className="text-5xl font-semibold mt-3" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1000">
                    Tailored for Your Unique Needs.
                </h2>
            </div>

            {/* Services Section - Content that scrolls over the Three.js background */}
            <div className="relative z-20 service-section">
                {serviceData.map((service, index) => (
                    <div
                        key={service.title}
                        className={`min-h-[100vh] flex items-center justify-center lg:px-40 lg:gap-10 md:px-20 md:gap-5 gap-5 sm:flex-col md:flex-row sm:px-5 px-5 sm:py-5 flex-col py-5`}
                        style={{ paddingTop: index === 0 ? '5vh' : '0' }}
                    >
                        <div className="md:flex-1 flex justify-center">
                            <div className='flex flex-col gap-5'>
                                <Image src={service.icon} height={80} width={80} alt={`${service.title} Icon`} className="filter drop-shadow-lg" />
                                <h1 className='text-white lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-bold'>
                                    {service.title}
                                </h1>
                                <p className={`lg:text-xl md:text-lg sm:text-base text-base ${service.textColor}`}>
                                    {service.description}
                                </p>
                            </div>
                        </div>
                        <div className="md:flex-1">
                            <div className='flex flex-col gap-3 justify-end'>
                                <p className='text-white tracking-tight'>
                                    {service.longDescription}
                                </p>
                                <Link href={service.link} className={`w-full py-4 grid place-items-center bg-white ${service.buttonColor} font-semibold hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl`}>
                                    VIEW PROJECTS
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}