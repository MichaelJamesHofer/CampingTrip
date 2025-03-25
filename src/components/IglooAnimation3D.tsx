'use client';

import React, { useRef, useEffect } from 'react';

interface IglooAnimation3DProps {
  progress: number;
}

export default function IglooAnimation3D({ progress }: IglooAnimation3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    // Create scene container
    const sceneContainer = document.createElement('div');
    sceneContainer.className = 'scene';
    sceneContainer.style.width = '100%';
    sceneContainer.style.height = '100%';
    sceneContainer.style.perspective = '1000px';
    sceneContainer.style.transformStyle = 'preserve-3d';
    containerRef.current.appendChild(sceneContainer);
    
    // Create igloo dome
    const iglooDome = document.createElement('div');
    iglooDome.className = 'igloo-dome';
    iglooDome.style.position = 'absolute';
    iglooDome.style.top = '50%';
    iglooDome.style.left = '50%';
    iglooDome.style.width = '180px';
    iglooDome.style.height = '90px';
    iglooDome.style.borderRadius = '90px 90px 0 0';
    iglooDome.style.border = '2px solid rgba(255, 255, 255, 0.5)';
    iglooDome.style.borderBottom = 'none';
    iglooDome.style.transform = 'translate(-50%, -50%) rotateX(70deg)';
    iglooDome.style.transformStyle = 'preserve-3d';
    iglooDome.style.backfaceVisibility = 'hidden';
    sceneContainer.appendChild(iglooDome);
    
    // Create igloo base
    const iglooBase = document.createElement('div');
    iglooBase.className = 'igloo-base';
    iglooBase.style.position = 'absolute';
    iglooBase.style.top = '65%';
    iglooBase.style.left = '50%';
    iglooBase.style.width = '200px';
    iglooBase.style.height = '60px';
    iglooBase.style.borderRadius = '100px / 30px';
    iglooBase.style.border = '2px solid rgba(255, 255, 255, 0.3)';
    iglooBase.style.transform = 'translate(-50%, -50%) rotateX(70deg)';
    sceneContainer.appendChild(iglooBase);
    
    // Create igloo entrance
    const iglooEntrance = document.createElement('div');
    iglooEntrance.className = 'igloo-entrance';
    iglooEntrance.style.position = 'absolute';
    iglooEntrance.style.top = '65%';
    iglooEntrance.style.left = '50%';
    iglooEntrance.style.width = '60px';
    iglooEntrance.style.height = '30px';
    iglooEntrance.style.borderRadius = '30px 30px 0 0';
    iglooEntrance.style.border = '2px solid rgba(255, 255, 255, 0.4)';
    iglooEntrance.style.borderBottom = 'none';
    iglooEntrance.style.transform = 'translate(-50%, -50%) rotateX(70deg) rotateY(180deg)';
    sceneContainer.appendChild(iglooEntrance);
    
    // Create blocks based on progress
    const numBlocks = Math.max(5, Math.floor(progress / 5));
    const blockSize = 180 / numBlocks;
    
    for (let i = 0; i < numBlocks; i++) {
      // Calculate angle for this block
      const angle = (i / numBlocks) * Math.PI;
      
      // Create horizontal lines (rows of blocks)
      for (let j = 0; j < 5; j++) {
        const rowHeight = 90 - j * 18;
        if (rowHeight <= 0) continue;
        
        const rowRadius = 90;
        const x = Math.cos(angle) * rowRadius;
        const y = Math.sin(angle) * rowRadius * 0.5;
        
        const block = document.createElement('div');
        block.className = 'igloo-block';
        block.style.position = 'absolute';
        block.style.top = `calc(50% - ${y}px)`;
        block.style.left = `calc(50% + ${x}px)`;
        block.style.width = '2px';
        block.style.height = `${rowHeight}px`;
        block.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        block.style.transform = 'translate(-50%, -100%) rotateX(70deg)';
        sceneContainer.appendChild(block);
      }
      
      // Create vertical dividers
      const divider = document.createElement('div');
      divider.className = 'igloo-divider';
      divider.style.position = 'absolute';
      divider.style.top = '50%';
      divider.style.left = '50%';
      divider.style.width = '90px';
      divider.style.height = '2px';
      divider.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      divider.style.transformOrigin = 'left center';
      divider.style.transform = `translate(0, 0) rotateX(70deg) rotateZ(${angle}rad)`;
      sceneContainer.appendChild(divider);
    }
    
    // Create grid points
    for (let i = 0; i < 50; i++) {
      const point = document.createElement('div');
      point.className = 'grid-point';
      point.style.position = 'absolute';
      point.style.width = '2px';
      point.style.height = '2px';
      point.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      point.style.borderRadius = '50%';
      
      // Random position within container
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = (Math.random() - 0.5) * 100;
      
      point.style.top = `${y}%`;
      point.style.left = `${x}%`;
      point.style.transform = `translateZ(${z}px)`;
      
      sceneContainer.appendChild(point);
      
      // Add connecting lines to some points
      if (i % 3 === 0) {
        const line = document.createElement('div');
        line.className = 'grid-line';
        line.style.position = 'absolute';
        line.style.top = `${y}%`;
        line.style.left = `${x}%`;
        line.style.width = '40px';
        line.style.height = '1px';
        line.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        line.style.transformOrigin = 'left center';
        
        // Random angle
        const angle = Math.random() * Math.PI * 2;
        line.style.transform = `translateZ(${z}px) rotate(${angle}rad)`;
        
        sceneContainer.appendChild(line);
      }
    }
    
    // Create glow effect based on progress
    const glow = document.createElement('div');
    glow.className = 'glow';
    glow.style.position = 'absolute';
    glow.style.top = '50%';
    glow.style.left = '50%';
    glow.style.width = '150px';
    glow.style.height = '150px';
    glow.style.borderRadius = '50%';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.background = `radial-gradient(circle, rgba(100, 149, 237, ${progress / 200}) 0%, rgba(100, 149, 237, ${progress / 600}) 70%, rgba(100, 149, 237, 0) 100%)`;
    sceneContainer.appendChild(glow);
    
    // Add animation
    const animate = () => {
      if (!containerRef.current) return;
      
      // Rotate the entire scene slightly for a subtle 3D effect
      sceneContainer.style.transform = `rotateY(${Math.sin(Date.now() / 5000) * 10}deg) rotateX(${Math.sin(Date.now() / 7000) * 5}deg)`;
      
      // Pulse the glow
      const pulseScale = 1 + Math.sin(Date.now() / 1000) * 0.05;
      glow.style.transform = `translate(-50%, -50%) scale(${pulseScale})`;
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [progress]);
  
  return (
    <div className="relative h-64 w-full">
      <div 
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      />
      
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="text-sm text-white/70">Checklist Completion</div>
        <div className="text-2xl font-bold glow-effect">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
