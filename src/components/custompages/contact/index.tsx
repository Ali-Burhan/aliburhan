'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as THREE from 'three'
import { Mail, Phone, Github, Linkedin, Building, Globe, Send, User, X } from 'lucide-react'
//@ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
//@ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
//@ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
//@ts-ignore
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
//@ts-ignore
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Custom GLSL Shaders
const crystalVertexShader = `
  uniform float time;
  uniform float noiseScale;
  uniform float distortionStrength;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Classic Perlin 3D Noise by Stefan Gustavson
  //
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixyz0 = permute(ixy + iz0);
    vec4 ixyz1 = permute(ixy + iz1);

    vec4 gx = fract(ixyz0 * (1.0 / 7.0)) - 0.5;
    vec4 gy = fract(floor(ixyz0 * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5;
    vec4 gz = fract(floor(floor(ixyz0 * (1.0 / 7.0)) * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5;
    vec4 sz = 1.79284291400159 - 0.85373472095314 * (gx * gx + gy * gy + gz * gz);
    vec4 g000 = vec4(gx.x,gy.x,gz.x,0.0);
    vec4 g100 = vec4(gx.y,gy.y,gz.y,0.0);
    vec4 g010 = vec4(gx.z,gy.z,gz.z,0.0);
    vec4 g110 = vec4(gx.w,gy.w,gz.w,0.0);

    vec4 g001 = vec4(fract(ixyz1.x * (1.0 / 7.0)) - 0.5, fract(floor(ixyz1.x * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5, fract(floor(floor(ixyz1.x * (1.0 / 7.0)) * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5,0.0);
    vec4 g101 = vec4(fract(ixyz1.y * (1.0 / 7.0)) - 0.5, fract(floor(ixyz1.y * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5, fract(floor(floor(ixyz1.y * (1.0 / 7.0)) * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5,0.0);
    vec4 g011 = vec4(fract(ixyz1.z * (1.0 / 7.0)) - 0.5, fract(floor(ixyz1.z * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5, fract(floor(floor(ixyz1.z * (1.0 / 7.0)) * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5,0.0);
    vec4 g111 = vec4(fract(ixyz1.w * (1.0 / 7.0)) - 0.5, fract(floor(ixyz1.w * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5, fract(floor(floor(ixyz1.w * (1.0 / 7.0)) * (1.0 / 7.0)) * (1.0 / 7.0)) - 0.5,0.0);

    vec3 L000 = vec3(Pf0.x,Pf0.y,Pf0.z);
    vec3 L100 = vec3(Pf1.x,Pf0.y,Pf0.z);
    vec3 L010 = vec3(Pf0.x,Pf1.y,Pf0.z);
    vec3 L110 = vec3(Pf1.x,Pf1.y,Pf0.z);
    vec3 L001 = vec3(Pf0.x,Pf0.y,Pf1.z);
    vec3 L101 = vec3(Pf1.x,Pf0.y,Pf1.z);
    vec3 L011 = vec3(Pf0.x,Pf1.y,Pf1.z);
    vec3 L111 = vec3(Pf1.x,Pf1.y,Pf1.z);

    vec4 Px = vec4(dot(L000, g000.xyz), dot(L100, g100.xyz), dot(L010, g010.xyz), dot(L110, g110.xyz));
    vec4 Py = vec4(dot(L001, g001.xyz), dot(L101, g101.xyz), dot(L011, g011.xyz), dot(L111, g111.xyz));

    vec4 r = taylorInvSqrt(vec4(dot(g000.xyz, g000.xyz), dot(g100.xyz, g100.xyz),
                       dot(g010.xyz, g010.xyz), dot(g110.xyz, g110.xyz)));
    vec4 r2 = taylorInvSqrt(vec4(dot(g001.xyz, g001.xyz), dot(g101.xyz, g101.xyz),
                        dot(g011.xyz, g011.xyz), dot(g111.xyz, g111.xyz)));

    Px *= r.xxyz;
    Py *= r2.xxyz;

    vec4 C = vec4(Px.x, Px.y, Py.x, Py.y);
    vec3 v = fade(Pf0);
    return 2.0 * dot(C, vec4(1.0 - v.x, v.x, 1.0 - v.x, v.x)) * (1.0 - v.y) * (1.0 - v.z) +
           2.0 * dot(C, vec4(1.0 - v.x, v.x, 1.0 - v.x, v.x)) * v.y * (1.0 - v.z) +
           2.0 * dot(C, vec4(1.0 - v.x, v.x, 1.0 - v.x, v.x)) * (1.0 - v.y) * v.z +
           2.0 * dot(C, vec4(1.0 - v.x, v.x, 1.0 - v.x, v.x)) * v.y * v.z;
  }

  void main() {
    vNormal = normal;
    vPosition = position;

    vec3 distortedPosition = position;
    float noise = cnoise(position * noiseScale + time * 0.5);
    distortedPosition += normal * noise * distortionStrength;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
  }
`;

const crystalFragmentShader = `
  uniform vec3 color;
  uniform vec3 emissive;
  uniform float time;
  uniform float fresnelPower;
  uniform float fresnelBias;
  uniform float opacity;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(fresnelBias + (1.0 - fresnelBias) * abs(dot(viewDirection, vNormal)), fresnelPower);

    // Dynamic color shifting
    vec3 dynamicColor = color;
    dynamicColor.r += sin(time * 0.5 + vPosition.x * 0.1) * 0.1;
    dynamicColor.g += cos(time * 0.5 + vPosition.y * 0.1) * 0.1;
    dynamicColor.b += sin(time * 0.5 + vPosition.z * 0.1) * 0.1;
    dynamicColor = mix(dynamicColor, emissive, fresnel * 0.5); // Blend with emissive based on fresnel

    gl_FragColor = vec4(dynamicColor + emissive * fresnel * 2.0, opacity);
  }
`;

const particlesVertexShader = `
  uniform float time;
  uniform float speed;
  uniform float turbulence;
  uniform float maxParticleSize;
  attribute float size;
  attribute vec3 customColor;
  attribute float velocity;
  varying vec3 vColor;

  void main() {
    vColor = customColor;
    vec3 newPosition = position;
    newPosition.y += sin(position.x * 0.5 + time * speed) * turbulence;
    newPosition.x += cos(position.y * 0.5 + time * speed) * turbulence;
    newPosition.z += sin(position.z * 0.5 + time * speed) * turbulence;

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = size * (maxParticleSize / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particlesFragmentShader = `
  uniform sampler2D pointTexture;
  uniform float opacity;
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, opacity * texture2D(pointTexture, gl_PointCoord).a);
  }
`;

// Reusable Input Component
const Input = ({ name, label, type = 'text', register, required, Icon }:any) => (
    <div className="relative group">
        <input
            id={name}
            type={type}
            className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-purple-500 text-white placeholder-transparent pt-4 pb-2 outline-none transition-colors duration-300"
            placeholder={label}
            {...register(name, { required })}
        />
        <label
            htmlFor={name}
            className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:text-purple-400 peer-focus:text-sm"
        >
            {label}
        </label>
        {Icon && <Icon className="absolute right-2 top-5 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-300" size={20} />}
    </div>
);

const ContactCustomPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const mountRef = useRef(null);
    const controlsRef = useRef<any>(null); // Ref for OrbitControls

    // Three.js Scene Setup
    useEffect(() => {
        if (!mountRef.current) return;
        const mount:any = mountRef.current;
        let animationFrameId:any;
        let composer:any;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 7); // Slightly further back
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // Modern tone mapping
        renderer.toneMappingExposure = 1.2; // Adjust exposure
        mount.appendChild(renderer.domElement);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 3;
        controls.maxDistance = 15;
        controlsRef.current = controls;


        // Central Icosahedron (Crystal)
        const crystalGeometry = new THREE.IcosahedronGeometry(1.5, 3); // Higher detail
        const crystalMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0x8A2BE2) }, // Brighter purple
                emissive: { value: new THREE.Color(0x4B0082) }, // Darker complementary purple
                time: { value: 0 },
                fresnelPower: { value: 2.0 }, // Control fresnel intensity
                fresnelBias: { value: 0.1 },
                noiseScale: { value: 1.5 }, // Adjust for more or less distortion
                distortionStrength: { value: 0.1 }, // How much noise distorts
                opacity: { value: 0.9 }
            },
            vertexShader: crystalVertexShader,
            fragmentShader: crystalFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending, // Additive blending for glow
        });
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        scene.add(crystal);

        // Particle System
        const particlesCount = 20000; // Increased particle count
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);
        const colors = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount);

        const colorPalette = [
            new THREE.Color(0xDA70D6), // Lighter purple
            new THREE.Color(0x9932CC), // Medium orchid
            new THREE.Color(0xBA55D3), // Medium orchid darker
            new THREE.Color(0x00FFFF), // Cyan
            new THREE.Color(0x7FFFD4)  // Aquamarine
        ];

        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            posArray[i3] = (Math.random() - 0.5) * 40; // Wider distribution
            posArray[i3 + 1] = (Math.random() - 0.5) * 40;
            posArray[i3 + 2] = (Math.random() - 0.5) * 40;

            sizes[i] = Math.random() * 0.8 + 0.2; // Vary particle sizes
            velocities[i] = Math.random() * 0.1 + 0.05; // Vary particle velocities

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        particlesGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
        particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

        const particlesMaterial = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: new THREE.TextureLoader().load('/path/to/spark.png') }, // Replace with a soft dot or spark texture
                opacity: { value: 0.8 },
                time: { value: 0 },
                speed: { value: 0.05 },
                turbulence: { value: 0.5 },
                maxParticleSize: { value: 200.0 }
            },
            vertexShader: particlesVertexShader,
            fragmentShader: particlesFragmentShader,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Additional Orbiting Shapes
        const numOrbits = 3;
        const orbitingObjects:any = [];
        const baseOrbitRadius = 3.5;
        const shapes = [
            new THREE.TorusGeometry(0.5, 0.2, 16, 50),
            new THREE.SphereGeometry(0.4, 32, 32),
            new THREE.OctahedronGeometry(0.6, 0)
        ];
        const shapeColors = [0xFF6347, 0x00CED1, 0xFFD700]; // Tomato, DarkTurquoise, Gold

        for (let i = 0; i < numOrbits; i++) {
            const orbitGeometry = shapes[i % shapes.length];
            const orbitMaterial = new THREE.MeshStandardMaterial({
                color: shapeColors[i % shapeColors.length],
                emissive: shapeColors[i % shapeColors.length],
                emissiveIntensity: 0.5,
                roughness: 0.4,
                metalness: 0.8,
                transparent: true,
                opacity: 0.7
            });
            const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);

            const angle = (i / numOrbits) * Math.PI * 2;
            const radius = baseOrbitRadius + Math.random() * 1.5;
            orbitMesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
            scene.add(orbitMesh);
            orbitingObjects.push({ mesh: orbitMesh, radius: radius, angle: angle, speed: (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1) });
        }


        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft ambient light
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xEE82EE, 5, 50); // Violet, stronger intensity
        pointLight1.position.set(7, 7, 7);
        pointLight1.castShadow = true;
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xADD8E6, 5, 50); // Light Blue, stronger intensity
        pointLight2.position.set(-7, -7, -7);
        pointLight2.castShadow = true;
        scene.add(pointLight2);

        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Post-processing
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(mount.clientWidth, mount.clientHeight), 1.5, 0.4, 0.85); // Intensity, radius, threshold
        bloomPass.threshold = 0.1;
        bloomPass.strength = 1.2; // Stronger bloom
        bloomPass.radius = 0.5;
        composer.addPass(bloomPass);

        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.material.uniforms['resolution'].value.set(1 / mount.clientWidth, 1 / mount.clientHeight);
        composer.addPass(fxaaPass);

        // Animation Loop
        const clock = new THREE.Clock();
        const animate = () => {
            animationFrameId = window.requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Update crystal shader time
            crystalMaterial.uniforms.time.value = elapsedTime;
            crystal.rotation.y = 0.1 * elapsedTime;
            crystal.rotation.x = 0.08 * elapsedTime;

            // Update particles shader time
            particlesMaterial.uniforms.time.value = elapsedTime;
            particlesMesh.rotation.y = -0.01 * elapsedTime;

            // Animate orbiting objects
            orbitingObjects.forEach((obj:any) => {
                obj.angle += obj.speed;
                obj.mesh.position.x = Math.cos(obj.angle) * obj.radius;
                obj.mesh.position.z = Math.sin(obj.angle) * obj.radius;
                obj.mesh.rotation.x += 0.01;
                obj.mesh.rotation.y += 0.005;
            });

            // Animate lights
            pointLight1.position.x = Math.sin(elapsedTime * 0.3) * 8;
            pointLight1.position.y = Math.cos(elapsedTime * 0.4) * 8;
            pointLight2.position.x = Math.cos(elapsedTime * 0.3) * 8;
            pointLight2.position.y = Math.sin(elapsedTime * 0.4) * 8;

            controls.update(); // Update orbit controls
            composer.render(); // Use composer for rendering
        };
        animate();

        // Handle Resize
        const handleResize = () => {
            if (mount) {
                camera.aspect = mount.clientWidth / mount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(mount.clientWidth, mount.clientHeight);
                composer.setSize(mount.clientWidth, mount.clientHeight); // Update composer size
                fxaaPass.material.uniforms['resolution'].value.set(1 / mount.clientWidth, 1 / mount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
            if (controlsRef.current) {
                controlsRef.current.dispose();
            }
            renderer.dispose();
            crystalGeometry.dispose();
            crystalMaterial.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            shapes.forEach(shape => shape.dispose());
            // Dispose of other materials and geometries if they were created separately
        };
    }, []);

    async function onSubmitHandler(data:any) {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request
        try {
            const simulatedSuccess = true; // Change to 'false' to test error state
            if (simulatedSuccess) {
                setIsSuccess(true);
                reset();
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {(isSuccess || isError) && (
                <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-xl flex items-center text-white transition-transform duration-500 transform ${isSuccess ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-red-600 to-orange-500'} ${isSuccess || isError ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    {isSuccess ? 'Message sent successfully!' : 'An error occurred. Please try again.'}
                    <button onClick={() => { setIsSuccess(false); setIsError(false); }} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"><X size={18} /></button>
                </div>
            )}

            <section className="relative w-full min-h-screen bg-gray-950 text-white flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div ref={mountRef} className="absolute inset-0 z-0 opacity-60" /> {/* Slightly increased opacity for better visibility of complexity */}

                <div className="relative z-10 w-full max-w-6xl mx-auto bg-slate-900/90 rounded-3xl shadow-2xl border border-white/15 overflow-hidden animate-fade-in-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Side: Info Panel */}
                        <div className="p-8 sm:p-12 bg-black/30 relative flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                                    Let&apos;s Connect
                                </h1>
                                <p className="text-gray-300 text-lg mb-8 max-w-md">
                                    Have a project in mind or just want to say hello? Fill out the form or reach out via the links below.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <a href="mailto:aliburhandev@gmail.com" className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                                    <Mail className="text-purple-400 group-hover:text-cyan-300 transition-colors" size={24} />
                                    <span className="font-medium text-lg">aliburhandev@gmail.com</span>
                                </a>
                                <a href="tel:+923161499488" className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                                    <Phone className="text-purple-400 group-hover:text-cyan-300 transition-colors" size={24} />
                                    <span className="font-medium text-lg">+92 316 1499488</span>
                                </a>
                                <a href="https://github.com/Ali-Burhan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                                    <Github className="text-purple-400 group-hover:text-cyan-300 transition-colors" size={24} />
                                    <span className="font-medium text-lg">github.com/Ali-Burhan</span>
                                </a>
                                <a href="https://www.linkedin.com/in/ali-burhan-9076b42b6/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                                    <Linkedin className="text-purple-400 group-hover:text-cyan-300 transition-colors" size={24} />
                                    <span className="font-medium text-lg">linkedin.com/in/ali-burhan</span>
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="p-8 sm:p-12">
                            <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <Input name="name" label="Full Name" register={register} required Icon={User} />
                                    <Input name="email" label="Email Address" type="email" register={register} required Icon={Mail} />
                                </div>
                                <Input name="company" label="Company (Optional)" register={register} Icon={Building} />
                                <div className="relative group">
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="peer w-full bg-transparent border-b-2 border-gray-600 focus:border-purple-500 text-white placeholder-transparent pt-4 pb-2 outline-none transition-colors resize-y"
                                        placeholder="Your Message"
                                        {...register('message', { required: true })}
                                    ></textarea>
                                    <label htmlFor="message" className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:-top-3.5 peer-focus:text-purple-400 peer-focus:text-sm">
                                        Your Message
                                    </label>
                                </div>

                                <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-600/40 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed">
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes slide-in-right {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default ContactCustomPage;