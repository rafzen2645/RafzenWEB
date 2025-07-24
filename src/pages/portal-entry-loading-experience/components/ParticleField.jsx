import React, { useEffect, useRef } from 'react';

const ParticleField = ({ isActive, onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          targetX: canvas.width / 2,
          targetY: canvas.height / 2,
          converging: false
        });
      }
    };

    initParticles();

    let startTime = Date.now();
    const convergeDuration = 2000;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / convergeDuration, 1);

      particlesRef.current.forEach(particle => {
        if (progress > 0.6) {
          // Start converging particles
          particle.converging = true;
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          particle.vx = dx * 0.02;
          particle.vy = dy * 0.02;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 64, ${particle.opacity * (1 - progress * 0.3)})`;
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff0040';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleField;