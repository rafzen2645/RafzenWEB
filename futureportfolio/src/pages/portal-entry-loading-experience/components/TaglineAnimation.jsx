import React, { useState, useEffect } from 'react';

const TaglineAnimation = ({ progress, isComplete }) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  
  const tagline = "Building Tomorrow's Digital Experiences Today";
  const words = tagline.split(' ');

  useEffect(() => {
    if (progress > 0.4) {
      setShowTagline(true);
      const charDelay = 50;
      const totalChars = tagline.length;
      
      const interval = setInterval(() => {
        setVisibleChars(prev => {
          if (prev < totalChars) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, charDelay);

      return () => clearInterval(interval);
    }
  }, [progress, tagline.length]);

  if (!showTagline) return null;

  return (
    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
      isComplete ? 'opacity-0 transform translate-y-8' : 'opacity-100'
    }`}>
      <div className="text-center px-4 max-w-4xl">
        {/* Main Tagline */}
        <div className="relative">
          <h2 className="font-inter text-lg md:text-2xl lg:text-3xl text-foreground font-light leading-relaxed">
            {words.map((word, wordIndex) => {
              const wordStart = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0);
              const wordEnd = wordStart + word.length;
              
              return (
                <span key={wordIndex} className="inline-block mr-2 md:mr-3">
                  {word.split('').map((char, charIndex) => {
                    const globalCharIndex = wordStart + charIndex;
                    const isVisible = globalCharIndex < visibleChars;
                    
                    return (
                      <span
                        key={charIndex}
                        className={`inline-block transition-all duration-300 ${
                          isVisible 
                            ? 'opacity-100 transform translate-y-0' 
                            : 'opacity-0 transform translate-y-4'
                        }`}
                        style={{
                          transitionDelay: `${globalCharIndex * 50}ms`,
                          color: ['Tomorrow\'s', 'Digital', 'Today'].some(highlight => 
                            word === highlight
                          ) ? '#ff0040' : '#ffffff'
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h2>

          {/* Typing Cursor */}
          <span 
            className={`inline-block w-0.5 h-6 md:h-8 bg-accent ml-1 transition-opacity duration-300 ${
              visibleChars >= tagline.length ? 'animate-pulse' : 'opacity-100'
            }`}
          />
        </div>

        {/* Subtitle */}
        <div className={`mt-4 transition-all duration-1000 delay-1000 ${
          visibleChars >= tagline.length ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <p className="font-inter text-sm md:text-base text-text-secondary tracking-wide">
            Immersive Portfolio Experience
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -inset-4 pointer-events-none">
          {/* Left Accent */}
          <div 
            className={`absolute left-0 top-1/2 w-8 h-0.5 bg-gradient-to-r from-accent to-transparent transition-all duration-1000 delay-500 ${
              showTagline ? 'opacity-100 transform -translate-x-0' : 'opacity-0 transform -translate-x-4'
            }`}
          />
          
          {/* Right Accent */}
          <div 
            className={`absolute right-0 top-1/2 w-8 h-0.5 bg-gradient-to-l from-cyber-blue to-transparent transition-all duration-1000 delay-700 ${
              showTagline ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
            }`}
          />

          {/* Corner Brackets */}
          <div 
            className={`absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent transition-all duration-1000 delay-1200 ${
              visibleChars >= tagline.length ? 'opacity-60 transform translate-x-0 translate-y-0' : 'opacity-0 transform -translate-x-2 -translate-y-2'
            }`}
          />
          <div 
            className={`absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyber-blue transition-all duration-1000 delay-1400 ${
              visibleChars >= tagline.length ? 'opacity-60 transform translate-x-0 translate-y-0' : 'opacity-0 transform translate-x-2 -translate-y-2'
            }`}
          />
          <div 
            className={`absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyber-blue transition-all duration-1000 delay-1600 ${
              visibleChars >= tagline.length ? 'opacity-60 transform translate-x-0 translate-y-0' : 'opacity-0 transform -translate-x-2 translate-y-2'
            }`}
          />
          <div 
            className={`absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent transition-all duration-1000 delay-1800 ${
              visibleChars >= tagline.length ? 'opacity-60 transform translate-x-0 translate-y-0' : 'opacity-0 transform translate-x-2 translate-y-2'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default TaglineAnimation;