import React from 'react';
import { motion } from 'framer-motion';

const HolographicText = () => {
  const mainText = "Digital Architect of Tomorrow";
  const subText = "Where Technical Mastery Meets Creative Vision";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const glitchVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, -2, 2, 0],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="text-center z-10 relative px-4">
      {/* Main Title */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <div className="relative">
          <motion.h1 
            className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-cyber-blue leading-tight"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
          >
            {mainText.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                style={{ 
                  textShadow: '0 0 20px rgba(255, 0, 64, 0.5), 0 0 40px rgba(255, 0, 64, 0.3)',
                  filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Holographic overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 animate-holographic-reveal"></div>
          
          {/* Glitch effect layers */}
          <motion.div 
            className="absolute inset-0 font-orbitron font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-accent opacity-20 leading-tight"
            animate={{
              x: [0, 2, -2, 0],
              opacity: [0.2, 0.1, 0.3, 0.2]
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut"
            }}
          >
            {mainText}
          </motion.div>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative"
      >
        <p className="font-inter font-medium text-lg md:text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
          {subText}
        </p>
        
        {/* Animated underline */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mt-4 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: '60%' }}
          transition={{ delay: 2, duration: 1 }}
        />
      </motion.div>

      {/* Floating particles around text */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Code snippet animation */}
      <motion.div
        className="absolute -right-10 top-1/2 transform -translate-y-1/2 font-jetbrains text-xs text-cyber-blue/30 hidden xl:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="space-y-1">
          <div>const future = () =&gt; &#123;</div>
          <div className="ml-4">return innovation;</div>
          <div>&#125;;</div>
        </div>
      </motion.div>

      {/* Design elements */}
      <motion.div
        className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-accent/20 hidden xl:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className="space-y-2">
          <div className="w-8 h-0.5 bg-accent/40"></div>
          <div className="w-12 h-0.5 bg-cyber-blue/40"></div>
          <div className="w-6 h-0.5 bg-white/40"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HolographicText;