import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

const EnhancedHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navigationItems = [
    { name: 'Home', id: 'hero', icon: 'Home' },
    { name: 'About', id: 'about', icon: 'User' },
    { name: 'Services', id: 'services', icon: 'Zap' },
    { name: 'Skills', id: 'skills', icon: 'Code' },
    { name: 'Portfolio', id: 'portfolio', icon: 'Briefcase' },
    { name: 'Contact', id: 'contact', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'services', 'skills', 'portfolio', 'contact'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-holographic border-b border-border shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center group-hover:electric-glow transition-all duration-300"
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </motion.div>
              
              {/* Floating Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-cyber-blue rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse-glow"></div>
            </div>
            
            <div className="hidden sm:block">
              <h1 className="font-orbitron font-bold text-xl text-foreground group-hover:neon-text transition-all duration-300">
                RAFZEN
              </h1>
              <p className="font-inter text-xs text-text-secondary -mt-1">
                Web Alchemist
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-lg font-inter font-medium text-sm transition-all duration-300 group ${
                  activeSection === item.id
                    ? 'text-accent bg-accent/10 border border-accent/20' :'text-text-secondary hover:text-foreground hover:bg-surface/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item.icon} 
                    size={16} 
                    className={`transition-colors duration-300 ${
                      activeSection === item.id ? 'text-accent' : 'text-current'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                
                {/* Active Indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse-glow"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
                className="border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:electric-glow"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle navigation menu"
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon 
                  name={isMenuOpen ? "X" : "Menu"} 
                  size={24} 
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-6 bg-background/95 backdrop-blur-holographic space-y-4">
                <nav className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-inter font-medium transition-all duration-300 ${
                        activeSection === item.id
                          ? 'text-accent bg-accent/10 border border-accent/20' :'text-text-secondary hover:text-foreground hover:bg-surface/50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className={`transition-colors duration-300 ${
                          activeSection === item.id ? 'text-accent' : 'text-current'
                        }`}
                      />
                      <span className="flex-1 text-left">{item.name}</span>
                      
                      {activeSection === item.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>
                
                {/* Mobile Contact CTA */}
                <div className="pt-4 border-t border-border">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow"
                    onClick={() => scrollToSection('contact')}
                  >
                    Start Your Project
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
    </motion.header>
  );
};

export default EnhancedHeader;