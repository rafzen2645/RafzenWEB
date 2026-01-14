import React, { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars = [];
      const numStars = 200;

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * Math.PI * 2
        });
      }
      starsRef.current = stars;
    };

    const updateStars = () => {
      starsRef.current.forEach(star => {
        // Move stars based on mouse position for parallax effect
        const parallaxX = (mouseX - canvas.width / 2) * 0.0001 * star.z;
        const parallaxY = (mouseY - canvas.height / 2) * 0.0001 * star.z;
        
        star.x += star.speed + parallaxX;
        star.y += parallaxY * 0.5;
        star.twinkle += 0.02;

        // Wrap around screen
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
      });
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        const twinkleOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinkle));
        const size = star.size * (0.8 + 0.2 * Math.sin(star.twinkle * 1.5));
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${twinkleOpacity})`);
        gradient.addColorStop(0.5, `rgba(255, 0, 64, ${twinkleOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      updateStars();
      drawStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    // Initialize
    resizeCanvas();
    createStars();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)' }}
    />
  );
};

export default StarField;