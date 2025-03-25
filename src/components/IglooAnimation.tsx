'use client';

import React, { useRef, useEffect } from 'react';

interface IglooAnimationProps {
  progress: number;
}

export default function IglooAnimation({ progress }: IglooAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw background grid
      drawGrid(ctx, canvas.width, canvas.height);
      
      // Draw igloo dome
      drawIglooDome(ctx, centerX, centerY, progress);
      
      // Draw progress indicator
      drawProgressIndicator(ctx, centerX, centerY + 60, progress);
      
      // Request next frame
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [progress]);
  
  // Draw grid
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Add some random dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  // Draw igloo dome
  const drawIglooDome = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) => {
    // Draw base
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    
    // Draw dome
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, Math.PI, 0, false);
    ctx.stroke();
    
    // Draw base
    ctx.beginPath();
    ctx.moveTo(centerX - 70, centerY);
    ctx.lineTo(centerX + 70, centerY);
    ctx.stroke();
    
    // Draw blocks based on progress
    const numBlocks = Math.max(5, Math.floor(progress / 5));
    const blockAngle = Math.PI / numBlocks;
    
    for (let i = 0; i <= numBlocks; i++) {
      const angle = Math.PI + i * blockAngle;
      const x = centerX + Math.cos(angle) * 60;
      const y = centerY + Math.sin(angle) * 60;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    // Draw entrance
    ctx.beginPath();
    ctx.arc(centerX, centerY + 10, 15, Math.PI, 0, false);
    ctx.stroke();
    
    // Draw glow based on progress
    const glowAlpha = progress / 200;
    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 80);
    gradient.addColorStop(0, `rgba(100, 149, 237, ${glowAlpha})`);
    gradient.addColorStop(1, 'rgba(100, 149, 237, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Draw progress indicator
  const drawProgressIndicator = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, progress: number) => {
    const width = 120;
    const height = 10;
    
    // Draw background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(centerX - width / 2, centerY, width, height, 5);
    ctx.fill();
    
    // Draw progress
    const progressWidth = (progress / 100) * width;
    ctx.fillStyle = 'rgba(100, 149, 237, 0.7)';
    ctx.beginPath();
    ctx.roundRect(centerX - width / 2, centerY, progressWidth, height, 5);
    ctx.fill();
    
    // Draw percentage text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(progress)}%`, centerX, centerY + 30);
  };
  
  return (
    <div className="relative h-64 w-full">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
