import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import StarField from './components/StarField';
import NavigationCube from './components/NavigationCube';
import FloatingMetrics from './components/FloatingMetrics';
import HolographicText from './components/HolographicText';
import NavigationPods from './components/NavigationPods';
import CodeFlow from './components/CodeFlow';

const HeroUniverseNavigationHub = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading and initialization
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Header */}
      <Header />

      {/* Animated Star Field Background */}
      <StarField />

      {/* Code Flow Animation */}
      <CodeFlow />

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Hero Section */}
        <motion.section 
          className="flex-1 flex items-center justify-center relative px-4 py-20"
          variants={sectionVariants}
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Holographic Text */}
              <motion.div 
                className="order-2 lg:order-1 text-center lg:text-left"
                variants={sectionVariants}
              >
                <HolographicText />
                
                {/* Call to Action */}
                <motion.div
                  className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-accent to-red-600 text-white font-rajdhani font-semibold text-lg rounded-lg hover:from-accent/90 hover:to-red-600/90 transition-all duration-300 electric-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/portfolio-cosmos-case-studies'}
                  >
                    Explore My Universe
                  </motion.button>
                  
                  <motion.button
                    className="px-8 py-4 border-2 border-cyber-blue text-cyber-blue font-rajdhani font-semibold text-lg rounded-lg hover:bg-cyber-blue hover:text-background transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/contact-portal-communication'}
                  >
                    Start a Project
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right Side - Navigation Cube */}
              <motion.div 
                className="order-1 lg:order-2 flex justify-center"
                variants={sectionVariants}
              >
                <NavigationCube />
              </motion.div>
            </div>
          </div>

          {/* Floating Metrics */}
          <FloatingMetrics />

          {/* Navigation Pods */}
          <NavigationPods />
        </motion.section>

        {/* Mobile Navigation Cards */}
        <motion.section 
          className="lg:hidden px-4 pb-20"
          variants={sectionVariants}
        >
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="font-orbitron font-bold text-2xl text-center text-foreground mb-8">
              Navigate My Universe
            </h2>
            
            {[
              { title: 'Services Galaxy', route: '/services-galaxy-exploration', icon: '⚡', color: 'from-cyber-blue to-blue-600' },
              { title: 'Portfolio Cosmos', route: '/portfolio-cosmos-case-studies', icon: '💼', color: 'from-purple-500 to-purple-700' },
              { title: 'Skills Matrix', route: '/skills-matrix-visualization', icon: '💻', color: 'from-green-500 to-green-700' },
              { title: 'Contact Portal', route: '/contact-portal-communication', icon: '💬', color: 'from-orange-500 to-orange-700' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className={`holographic-card p-6 rounded-xl cursor-pointer bg-gradient-to-r ${item.color} hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 + index * 0.1 }}
                onClick={() => window.location.href = item.route}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="font-inter text-sm text-white/80">
                      Tap to explore
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mobile Metrics */}
        <motion.section 
          className="lg:hidden px-4 pb-20"
          variants={sectionVariants}
        >
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '150+', label: 'Projects', icon: '🚀' },
                { value: '8', label: 'Years', icon: '📅' },
                { value: '200+', label: 'Clients', icon: '👥' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="holographic-card p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5 + index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{metric.icon}</div>
                  <div className="font-orbitron font-bold text-xl text-accent neon-text">
                    {metric.value}
                  </div>
                  <div className="font-inter text-xs text-text-secondary">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Ambient Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/5 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroUniverseNavigationHub;