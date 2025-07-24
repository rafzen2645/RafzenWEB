import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const GalaxyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star field
    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    // Connection lines
    const connections = [];
    const numConnections = 50;

    for (let i = 0; i < numConnections; i++) {
      connections.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.3,
        speed: Math.random() * 0.2 + 0.1,
      });
    }

    let animationId;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw stars
      stars.forEach((star, index) => {
        star.x += Math.sin(time + index) * star.speed;
        star.y += Math.cos(time + index) * star.speed;

        // Wrap around edges
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Draw connection lines
      connections.forEach((connection, index) => {
        connection.x1 += Math.sin(time + index) * connection.speed;
        connection.y1 += Math.cos(time + index) * connection.speed;
        connection.x2 += Math.sin(time + index + Math.PI) * connection.speed;
        connection.y2 += Math.cos(time + index + Math.PI) * connection.speed;

        // Wrap around edges
        if (connection.x1 > canvas.width) connection.x1 = 0;
        if (connection.x1 < 0) connection.x1 = canvas.width;
        if (connection.y1 > canvas.height) connection.y1 = 0;
        if (connection.y1 < 0) connection.y1 = canvas.height;

        if (connection.x2 > canvas.width) connection.x2 = 0;
        if (connection.x2 < 0) connection.x2 = canvas.width;
        if (connection.y2 > canvas.height) connection.y2 = 0;
        if (connection.y2 < 0) connection.y2 = canvas.height;

        ctx.beginPath();
        ctx.moveTo(connection.x1, connection.y1);
        ctx.lineTo(connection.x2, connection.y2);
        ctx.strokeStyle = `rgba(255, 0, 64, ${connection.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-cyber-blue/10 via-transparent to-transparent"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full blur-sm"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GalaxyBackground;