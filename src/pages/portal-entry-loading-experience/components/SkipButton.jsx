import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SkipButton = ({ onSkip, isVisible }) => {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 2 seconds for return visitors
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !showSkip) return null;

  return (
    <div className="absolute top-6 right-6 z-50">
      <button
        onClick={onSkip}
        className="group flex items-center space-x-2 px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border rounded-lg text-text-secondary hover:text-foreground hover:border-accent/50 transition-all duration-300"
        aria-label="Skip loading animation"
      >
        <span className="font-inter text-sm">Skip</span>
        <Icon 
          name="ChevronRight" 
          size={16} 
          className="group-hover:translate-x-1 transition-transform duration-300" 
        />
      </button>
    </div>
  );
};

export default SkipButton;