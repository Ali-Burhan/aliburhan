'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const ThreeBackground = () => {
  const mountRef = useRef<any>(null);
  const animationRef = useRef<any>(null);

  const createScene:any = useCallback(() => {
    if (!mountRef.current) return;
    const mount : any = mountRef.current;

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

    const mouse = new THREE.Vector2(-10, -10);
    const handleMouseMove = (event:any) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Lighting
    const pointLight = new THREE.PointLight(0x6366f1, 200, 0);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Crystalline Shapes - Enhanced
    const shapes:any = [];
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
    const octahedronGeometry = new THREE.OctahedronGeometry(0.7, 0);
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.6, 0);

    const material1 = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.1,
      metalness: 0.5,
      flatShading: true
    });
    const material2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true
    });
    const material3 = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.3,
      metalness: 0.6,
      flatShading: true
    });

    const shape1 = new THREE.Mesh(icosahedronGeometry, material1);
    shape1.position.set(-2.5, 1, -2);
    shapes.push(shape1);

    const shape2 = new THREE.Mesh(octahedronGeometry, material2);
    shape2.position.set(2.5, -1, -1);
    shapes.push(shape2);

    const shape3 = new THREE.Mesh(tetrahedronGeometry, material3);
    shape3.position.set(0, 2, -3);
    shapes.push(shape3);

    const shape4 = new THREE.Mesh(icosahedronGeometry, material2);
    shape4.position.set(-4, -2, -4);
    shapes.push(shape4);

    const shape5 = new THREE.Mesh(octahedronGeometry, material1);
    shape5.position.set(4, 3, -5);
    shapes.push(shape5);

    shapes.forEach((shape:any) => scene.add(shape));

    // Particle System - Enhanced
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 10000; // Increased particle count
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30; // Wider spread
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005, // Smaller particles
      transparent: true,
      color: 0x818cf8,
      blending: THREE.AdditiveBlending // For brighter particles
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Post-processing for Bloom Effect
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(mount.clientWidth, mount.clientHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 0.8; // Increased bloom strength
    bloomPass.radius = 0.7;
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Animation Loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      shapes.forEach((shape:any) => {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.002;
        shape.position.y += Math.sin(Date.now() * 0.0005 + shape.uuid.charCodeAt(0)) * 0.001; // Subtle floating
      });

      particlesMesh.rotation.y += 0.0002;
      particlesMesh.rotation.x += 0.0001;

      pointLight.position.x += (mouse.x * 5 - pointLight.position.x) * 0.05;
      pointLight.position.y += (mouse.y * 5 - pointLight.position.y) * 0.05;

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

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
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

  useEffect(() => {
    createScene();
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

export default ThreeBackground;
