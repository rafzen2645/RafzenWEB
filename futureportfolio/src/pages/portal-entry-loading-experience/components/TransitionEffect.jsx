import React, { useState, useEffect } from 'react';

const TransitionEffect = ({ isTriggered, onComplete }) => {
  const [particles, setParticles] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      // Create dissolving particles
      const newParticles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 60;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          size: Math.random() * 4 + 2,
          opacity: 1,
          decay: Math.random() * 0.02 + 0.01
        });
      }
      
      setParticles(newParticles);
      
      // Start fade out after particle animation begins
      setTimeout(() => {
        setFadeOut(true);
      }, 500);
      
      // Complete transition
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [isTriggered, onComplete]);

  useEffect(() => {
    if (particles.length === 0) return;

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: Math.max(0, particle.opacity - particle.decay),
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98
        })).filter(particle => particle.opacity > 0)
      );
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [particles.length]);

  if (!isTriggered) return null;

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Particle Canvas */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
              boxShadow: '0 0 4px rgba(255, 0, 64, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Radial Wipe Effect */}
      <div 
        className="absolute inset-0 bg-background"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(10, 10, 10, 0.8) 70%, #0a0a0a 100%)`,
          animation: 'radialWipe 1.5s ease-out forwards'
        }}
      />

      {/* Geometric Transition Lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-gradient-to-t from-transparent via-accent to-transparent"
            style={{
              height: '100vh',
              transform: `rotate(${i * 45}deg)`,
              animation: `lineExpand 1s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes radialWipe {
          0% {
            background: radial-gradient(circle at center, transparent 0%, transparent 0%, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0) 100%);
          }
          100% {
            background: radial-gradient(circle at center, transparent 0%, transparent 20%, rgba(10, 10, 10, 0.9) 50%, #0a0a0a 100%);
          }
        }
        
        @keyframes lineExpand {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 100vh;
            opacity: 0.8;
          }
          100% {
            height: 100vh;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default TransitionEffect;