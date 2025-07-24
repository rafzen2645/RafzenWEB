import React from 'react';
import { motion } from 'framer-motion';

const SkillConnection = ({ 
  startPos, 
  endPos, 
  strength = 0.5, 
  isActive = false,
  connectionType = 'related' 
}) => {
  const getConnectionColor = () => {
    switch (connectionType) {
      case 'prerequisite': return '#ff0040';
      case 'complementary': return '#00d4ff';
      case 'related': return '#ffffff';
      default: return '#ffffff';
    }
  };

  const getConnectionWidth = () => {
    return Math.max(1, strength * 3);
  };

  const distance = Math.sqrt(
    Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)
  );

  const angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x) * 180 / Math.PI;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: startPos.x,
        top: startPos.y,
        width: distance,
        height: getConnectionWidth(),
        transformOrigin: '0 50%',
        transform: `rotate(${angle}deg)`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ 
        scaleX: 1, 
        opacity: isActive ? 0.8 : 0.3,
      }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {/* Connection Line */}
      <div 
        className="w-full h-full relative"
        style={{
          background: `linear-gradient(90deg, ${getConnectionColor()}40, ${getConnectionColor()}80, ${getConnectionColor()}40)`,
          filter: isActive ? 'drop-shadow(0 0 4px currentColor)' : 'none'
        }}
      >
        {/* Animated Flow Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${getConnectionColor()}, transparent)`,
              backgroundSize: '20% 100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </div>

      {/* Connection Strength Indicator */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          backgroundColor: getConnectionColor(),
          opacity: strength,
          filter: isActive ? 'drop-shadow(0 0 2px currentColor)' : 'none'
        }}
      />
    </motion.div>
  );
};

export default SkillConnection;