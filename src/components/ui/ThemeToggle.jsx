import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
        isDark ? 'bg-accent/20' : 'bg-gray-300'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isDark ? 'bg-accent text-white' : 'bg-white text-gray-600'
        }`}
        animate={{
          x: isDark ? 24 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
      >
        <Icon 
          name={isDark ? 'Moon' : 'Sun'} 
          size={12} 
          className="transition-transform duration-300"
        />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;