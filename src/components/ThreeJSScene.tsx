'use client';

import React, { useRef, useEffect } from 'react';

interface ThreeJSSceneProps {
  progress: number;
}

export default function ThreeJSScene({ progress }: ThreeJSSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script.async = true;
    
    script.onload = () => {
      // Now Three.js is available as window.THREE
      const THREE = (window as any).THREE;
      
      // Initialize Three.js scene
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Create scene
      const scene = new THREE.Scene();
      
      // Create camera
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.z = 5;
      
      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true,
        alpha: true 
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setClearColor(0x000000, 0);
      
      // Create wireframe sphere (igloo dome)
      const sphereGeometry = new THREE.SphereGeometry(2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const wireframeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const iglooDome = new THREE.Mesh(sphereGeometry, wireframeMaterial);
      iglooDome.position.y = -0.5;
      scene.add(iglooDome);
      
      // Create wireframe cylinder (igloo base)
      const cylinderGeometry = new THREE.CylinderGeometry(2, 2.2, 0.5, 16, 1, true);
      const iglooBase = new THREE.Mesh(cylinderGeometry, wireframeMaterial);
      iglooBase.position.y = -1.25;
      scene.add(iglooBase);
      
      // Create grid
      const gridHelper = new THREE.GridHelper(10, 20, 0x444444, 0x222222);
      gridHelper.position.y = -1.5;
      scene.add(gridHelper);
      
      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 200;
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.4
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Create lines connecting some particles
      const linesMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.1
      });
      
      for (let i = 0; i < 30; i++) {
        const linesGeometry = new THREE.BufferGeometry();
        const points = [];
        
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        
        points.push(new THREE.Vector3(x, y, z));
        points.push(new THREE.Vector3(
          x + (Math.random() - 0.5) * 2,
          y + (Math.random() - 0.5) * 2,
          z + (Math.random() - 0.5) * 2
        ));
        
        linesGeometry.setFromPoints(points);
        const line = new THREE.Line(linesGeometry, linesMaterial);
        scene.add(line);
      }
      
      // Create progress indicator
      const progressGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100, Math.PI * 2 * (progress / 100));
      const progressMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4a9eff,
        transparent: true,
        opacity: 0.7
      });
      const progressRing = new THREE.Mesh(progressGeometry, progressMaterial);
      progressRing.rotation.x = Math.PI / 2;
      progressRing.position.y = -0.5;
      scene.add(progressRing);
      
      // Create glow effect
      const glowGeometry = new THREE.SphereGeometry(1.8, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(0x4a9eff) },
          intensity: { value: progress / 100 }
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float intensity;
          varying vec3 vNormal;
          void main() {
            float glow = pow(0.4 - dot(vNormal, vec3(0, 0, 1.0)), 2.0) * intensity;
            gl_FragColor = vec4(glowColor, glow * 0.6);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
      glowSphere.position.y = -0.5;
      scene.add(glowSphere);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate scene slightly
        scene.rotation.y += 0.002;
        particlesMesh.rotation.y += 0.001;
        
        // Pulse glow effect
        const time = Date.now() * 0.001;
        const pulse = Math.sin(time) * 0.1 + 0.9;
        glowSphere.scale.set(pulse, pulse, pulse);
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        if (!canvas) return;
        
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        scene.clear();
        renderer.dispose();
      };
    };
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [progress]);
  
  return (
    <div className="relative h-64 w-full">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="text-sm text-white/70">Checklist Completion</div>
        <div className="text-2xl font-bold glow-effect">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
