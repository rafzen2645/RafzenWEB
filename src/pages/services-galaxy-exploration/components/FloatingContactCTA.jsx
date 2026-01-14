import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingContactCTA = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide when near bottom of page
      const isNearBottom = scrollY + windowHeight > documentHeight - 200;
      setIsVisible(!isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    navigate('/contact-portal-communication');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.div
            className="relative"
            onHoverStart={() => setIsExpanded(true)}
            onHoverEnd={() => setIsExpanded(false)}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Expanded content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  className="absolute right-16 bottom-0 mb-2"
                >
                  <div className="holographic-card p-4 min-w-64 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center">
                        <Icon name="Rocket" size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-rajdhani font-semibold text-foreground">
                          Ready to Launch?
                        </h4>
                        <p className="text-text-secondary text-sm">
                          Let's build something amazing together
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="MessageCircle"
                        iconPosition="left"
                        fullWidth
                        className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold"
                        onClick={handleContactClick}
                      >
                        Start Project
                      </Button>
                      
                      <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>24h Response</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Shield" size={12} />
                          <span>Free Consultation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main floating button */}
            <motion.button
              className="relative w-16 h-16 bg-gradient-to-br from-accent to-cyber-blue rounded-full flex items-center justify-center electric-glow shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyber-blue/30"
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />

              {/* Icon */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon 
                  name={isExpanded ? "X" : "MessageCircle"} 
                  size={24} 
                  className="text-white" 
                />
              </motion.div>

              {/* Notification dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            </motion.button>

            {/* Floating particles around button */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent/60 rounded-full"
                  style={{
                    left: `${30 + Math.cos(i * 60 * Math.PI / 180) * 40}px`,
                    top: `${30 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactCTA;