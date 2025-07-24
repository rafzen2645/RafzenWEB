import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Icon from './AppIcon';

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: 'hero', name: 'Home', icon: 'Home' },
    { id: 'about', name: 'About', icon: 'User' },
    { id: 'services', name: 'Services', icon: 'Zap' },
    { id: 'skills', name: 'Skills', icon: 'Code' },
    { id: 'portfolio', name: 'Portfolio', icon: 'Briefcase' },
    { id: 'contact', name: 'Contact', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      
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
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        >
          <div className="space-y-3">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-accent text-white electric-glow' :'bg-surface/50 text-text-secondary hover:bg-accent/20 hover:text-accent backdrop-blur-md border border-border'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={section.name}
              >
                <Icon name={section.icon} size={16} />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {section.name}
                </div>
                
                {/* Active indicator */}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-accent rounded-full -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollNavigation;