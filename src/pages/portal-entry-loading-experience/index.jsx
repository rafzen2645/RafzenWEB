import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleField from './components/ParticleField';
import BrandLogo from './components/BrandLogo';
import ProgressIndicator from './components/ProgressIndicator';
import TaglineAnimation from './components/TaglineAnimation';
import SkipButton from './components/SkipButton';
import TransitionEffect from './components/TransitionEffect';

const PortalEntryLoadingExperience = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('futurePortfolioVisited');
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem('futurePortfolioVisited', 'true');
    }

    // Simulate loading progress
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            handleLoadingComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, []);

  const handleLoadingComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      setShowTransition(true);
    }, 300);
  };

  const handleSkip = () => {
    setProgress(100);
    handleLoadingComplete();
  };

  const handleTransitionComplete = () => {
    navigate('/hero-universe-navigation-hub');
  };

  const normalizedProgress = progress / 100;

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-infinite-depth via-background to-background" />
      
      {/* Particle Field Animation */}
      <ParticleField 
        isActive={!isComplete} 
        onComplete={() => {}} 
      />

      {/* Brand Logo */}
      <BrandLogo 
        progress={normalizedProgress} 
        isComplete={isComplete} 
      />

      {/* Tagline Animation */}
      <TaglineAnimation 
        progress={normalizedProgress} 
        isComplete={isComplete} 
      />

      {/* Progress Indicator */}
      <ProgressIndicator 
        progress={normalizedProgress} 
        isComplete={isComplete} 
      />

      {/* Skip Button for Return Visitors */}
      <SkipButton 
        onSkip={handleSkip} 
        isVisible={!isFirstVisit && !isComplete} 
      />

      {/* Transition Effect */}
      <TransitionEffect 
        isTriggered={showTransition} 
        onComplete={handleTransitionComplete} 
      />

      {/* Ambient Sound Toggle (Optional) */}
      <div className="absolute bottom-6 left-6">
        <button
          className="group flex items-center space-x-2 px-3 py-2 bg-surface/50 backdrop-blur-sm border border-border rounded-lg text-text-secondary hover:text-foreground hover:border-accent/30 transition-all duration-300"
          aria-label="Toggle ambient sound"
        >
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-inter text-xs">AUDIO</span>
        </button>
      </div>

      {/* Loading Status Indicator */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center space-x-2 px-3 py-2 bg-surface/50 backdrop-blur-sm border border-border rounded-lg">
          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" />
          <span className="font-jetbrains text-xs text-text-secondary tracking-wider">
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* Version Info */}
      <div className="absolute bottom-6 right-6">
        <div className="text-right">
          <div className="font-jetbrains text-xs text-text-secondary opacity-60">
            v2.0.1
          </div>
          <div className="font-inter text-xs text-text-secondary opacity-40">
            {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Holographic Scan Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-accent to-transparent"
          style={{
            height: '2px',
            animation: 'scanLine 3s linear infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scanLine {
          0% {
            top: -2px;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PortalEntryLoadingExperience;