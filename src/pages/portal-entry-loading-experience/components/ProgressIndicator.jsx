import React, { useState, useEffect } from 'react';

const ProgressIndicator = ({ progress, isComplete }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [geometricPattern, setGeometricPattern] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        const target = Math.floor(progress * 100);
        if (prev < target) {
          return prev + 1;
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    const patternInterval = setInterval(() => {
      setGeometricPattern(prev => (prev + 1) % 4);
    }, 200);

    return () => clearInterval(patternInterval);
  }, []);

  const progressWidth = `${progress * 100}%`;
  const glowIntensity = Math.sin(Date.now() * 0.005) * 0.5 + 0.5;

  return (
    <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-1000 ${
      isComplete ? 'opacity-0 transform translate-y-4' : 'opacity-100'
    }`}>
      {/* Progress Counter */}
      <div className="text-center mb-6">
        <div className="font-jetbrains text-4xl md:text-6xl text-accent font-bold tracking-wider">
          {displayProgress.toString().padStart(2, '0')}
          <span className="text-text-secondary">%</span>
        </div>
        <div className="font-inter text-sm text-text-secondary mt-2 tracking-wide">
          INITIALIZING DIGITAL UNIVERSE
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="max-w-md mx-auto">
        {/* Main Progress Bar */}
        <div className="relative h-1 bg-surface rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-cyber-blue transition-all duration-300 ease-out"
            style={{
              width: progressWidth,
              boxShadow: `0 0 ${10 * glowIntensity}px rgba(255, 0, 64, 0.6)`
            }}
          />
          
          {/* Animated Glow Effect */}
          <div 
            className="absolute top-0 left-0 h-full bg-white opacity-30 animate-pulse"
            style={{
              width: progressWidth,
              animationDuration: '1.5s'
            }}
          />
        </div>

        {/* Geometric Pattern Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 transition-all duration-300 ${
                i <= geometricPattern 
                  ? 'bg-accent rotate-45 scale-110' :'bg-surface rotate-0 scale-100'
              }`}
              style={{
                clipPath: i % 2 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                boxShadow: i <= geometricPattern ? '0 0 8px rgba(255, 0, 64, 0.6)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Status Text */}
        <div className="text-center mt-4">
          <div className="font-inter text-xs text-text-secondary uppercase tracking-widest">
            {progress < 0.3 && "Loading Assets..."}
            {progress >= 0.3 && progress < 0.6 && "Rendering Universe..."}
            {progress >= 0.6 && progress < 0.9 && "Calibrating Systems..."}
            {progress >= 0.9 && "Ready for Launch..."}
          </div>
        </div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full opacity-60"
            style={{
              left: `${20 + (i * 10)}%`,
              bottom: `${Math.sin(Date.now() * 0.002 + i) * 20 + 40}px`,
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: '0 0 4px rgba(255, 0, 64, 0.8)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;