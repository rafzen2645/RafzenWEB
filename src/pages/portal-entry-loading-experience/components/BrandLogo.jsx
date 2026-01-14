import React, { useState, useEffect } from 'react';

const BrandLogo = ({ progress, isComplete }) => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoScale, setLogoScale] = useState(0);

  useEffect(() => {
    if (progress > 0.3) {
      setLogoVisible(true);
      const scaleProgress = Math.min((progress - 0.3) / 0.4, 1);
      setLogoScale(scaleProgress);
    }
  }, [progress]);

  const logoOpacity = isComplete ? 0 : Math.min(progress * 2, 1);
  const glowIntensity = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
        logoVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `scale(${logoScale})`,
        opacity: logoOpacity
      }}
    >
      {/* Logo Container */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-accent animate-spin"
          style={{
            width: '120px',
            height: '120px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${20 * glowIntensity}px rgba(255, 0, 64, 0.6)`,
            animationDuration: '8s'
          }}
        />
        
        {/* Inner Glow Ring */}
        <div 
          className="absolute inset-0 rounded-full border border-cyber-blue animate-spin"
          style={{
            width: '80px',
            height: '80px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${15 * glowIntensity}px rgba(0, 212, 255, 0.4)`,
            animationDuration: '6s',
            animationDirection: 'reverse'
          }}
        />

        {/* Central Logo */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-white"
            fill="currentColor"
            style={{
              filter: `drop-shadow(0 0 ${10 * glowIntensity}px rgba(255, 255, 255, 0.8))`
            }}
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          
          {/* Pulsing Core */}
          <div 
            className="absolute inset-0 bg-white rounded-lg opacity-20 animate-pulse"
            style={{
              animationDuration: '2s'
            }}
          />
        </div>

        {/* Brand Text */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="font-orbitron font-bold text-2xl md:text-3xl text-foreground neon-text">
            FuturePortfolio
          </h1>
          <p className="font-inter text-sm text-text-secondary mt-1 opacity-80">
            Digital Futurist
          </p>
        </div>

        {/* Orbiting Particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-60px)`,
                animation: `orbit 4s linear infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 4px rgba(255, 0, 64, 0.8)'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-60px);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-60px);
          }
        }
      `}</style>
    </div>
  );
};

export default BrandLogo;