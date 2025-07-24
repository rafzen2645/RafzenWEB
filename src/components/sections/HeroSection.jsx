import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const HeroSection = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const name = "RAFSAN D. FAHIM";
  const bio = "Crafting digital experiences that push the boundaries of what's possible. Specializing in cutting-edge web technologies, AI integration, and immersive user interfaces.";

  useEffect(() => {
    if (inView) {
      // Start the image zoom-out animation
      controls.start({
        scale: 1,
        x: 300,
        transition: {
          duration: 2,
          ease: [0.6, 0.05, 0.19, 0.97]
        }
      }).then(() => {
        setIsAnimationComplete(true);
        setTimeout(() => setTextVisible(true), 500);
      });
    }
  }, [inView, controls]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-surface/5 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,64,0.1)_0%,transparent_70%)]" />
      
      <div ref={ref} className="relative z-10 flex items-center justify-center min-h-screen px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative">
            {/* Left Side - Text Content */}
            <motion.div className="order-2 lg:order-1 relative z-20">
              {/* Animated Name */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: textVisible ? 1 : 0 }}
              >
                <h1 className="font-orbitron font-black text-4xl lg:text-6xl text-foreground mb-2 relative">
                  {name.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ 
                        opacity: textVisible ? 1 : 0, 
                        y: textVisible ? 0 : 50,
                        rotateX: textVisible ? 0 : -90
                      }}
                      transition={{ 
                        delay: textVisible ? 0.1 + index * 0.05 : 0,
                        duration: 0.8,
                        ease: [0.6, 0.05, 0.19, 0.97]
                      }}
                      style={{ 
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                  <motion.span
                    className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-pulse-glow"
                    initial={{ scale: 0 }}
                    animate={{ scale: textVisible ? 1 : 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  />
                </h1>
                
                <motion.div
                  className="h-1 w-32 bg-gradient-to-r from-accent to-cyber-blue rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: textVisible ? 128 : 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                />
              </motion.div>

              {/* Bio Text with Typing Effect */}
              <motion.div
                className="mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: textVisible ? 1 : 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <p className="font-inter text-lg text-text-secondary leading-relaxed">
                  {bio.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: textVisible ? 1 : 0 }}
                      transition={{ 
                        delay: textVisible ? 2 + index * 0.02 : 0,
                        duration: 0.1
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 30 }}
                transition={{ delay: 4, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Rocket"
                    iconPosition="left"
                    className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow hover:electric-glow"
                    onClick={() => scrollToSection('portfolio')}
                  >
                    Explore My Universe
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-background transition-all duration-300"
                    onClick={() => scrollToSection('contact')}
                  >
                    Start a Project
                  </Button>
                </motion.div>
                {/* Download Resume button removed as requested; only present in AboutSection */}
              </motion.div>

              {/* Floating Metrics */}
              <motion.div
                className="mt-12 grid grid-cols-3 gap-6 lg:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 20 }}
                transition={{ delay: 4.5, duration: 0.8 }}
              >
                {[
                  { value: '3+', label: 'Projects', icon: 'Briefcase' },
                  { value: '1.5', label: 'Years', icon: 'Calendar' },
                  { value: '3+', label: 'Clients', icon: 'Users' }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="text-center group"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-2 bg-gradient-to-br from-accent/20 to-cyber-blue/20 rounded-full group-hover:electric-glow transition-all duration-300">
                      <Icon name={metric.icon} size={16} className="text-accent" />
                    </div>
                    <div className="font-orbitron font-bold text-2xl text-foreground neon-text">
                      {metric.value}
                    </div>
                    <div className="font-inter text-sm text-text-secondary">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Animated Image with Background Text */}
            <motion.div className="order-1 lg:order-2 relative flex justify-center items-center">
              {/* Vertical Background Text behind image - smaller and fits section */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[3.5rem] lg:text-[5rem] font-orbitron font-black text-accent/10 select-none z-0 pointer-events-none flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: textVisible ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ lineHeight: 1, letterSpacing: '0.1em' }}
              >
                {"RAFZEN".split("").map((char, idx) => (
                  <span key={idx}>{char}</span>
                ))}
              </motion.div>
              {/* Main Image centered over vertical text, no holographic border, bigger and more left */}
              <motion.div
                className="relative z-10 -translate-x-8"
                initial={{ 
                  scale: 3.5,
                  x: 0,
                  opacity: 1
                }}
                animate={controls}
                onAnimationComplete={() => setIsAnimationComplete(true)}
              >
                <div className="w-[28rem] h-[28rem] lg:w-[32rem] lg:h-[32rem] relative flex items-center justify-center">
                  {/* Profile Image (no opacity, no border) */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                      src="/assets/images/profile.png"
                      alt="Future Developer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* Floating Particles */}
                  {isAnimationComplete && Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-accent rounded-full"
                      style={{
                        left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 200}px`,
                        top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 200}px`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 3 + i * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-accent/20 via-cyber-blue/10 to-transparent rounded-full blur-3xl z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,0,64,0.5) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  );
};

export default HeroSection;