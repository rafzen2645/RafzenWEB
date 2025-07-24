import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillNode = ({ 
  skill, 
  position, 
  isSelected, 
  isConnected, 
  onSelect, 
  onHover, 
  onLeave,
  scale = 1 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(skill);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave?.();
  };

  const handleClick = () => {
    onSelect?.(skill);
  };

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert': return 'from-accent to-red-400';
      case 'Advanced': return 'from-cyber-blue to-blue-400';
      case 'Intermediate': return 'from-yellow-400 to-orange-400';
      case 'Beginner': return 'from-green-400 to-emerald-400';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getNodeSize = () => {
    const baseSize = {
      Expert: 80,
      Advanced: 70,
      Intermediate: 60,
      Beginner: 50
    };
    return (baseSize[skill.proficiency] || 50) * scale;
  };

  const nodeSize = getNodeSize();

  return (
    <motion.div
      ref={nodeRef}
      className="absolute cursor-pointer select-none"
      style={{
        left: position.x - nodeSize / 2,
        top: position.y - nodeSize / 2,
        width: nodeSize,
        height: nodeSize,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
        opacity: 1,
        filter: isConnected ? 'brightness(1.3)' : 'brightness(1)'
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        opacity: { duration: 0.3 }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-full blur-lg transition-all duration-300 ${
          isSelected || isHovered 
            ? 'opacity-60 scale-110' 
            : isConnected 
            ? 'opacity-40' :'opacity-20'
        }`}
        style={{
          background: `linear-gradient(135deg, ${getProficiencyColor(skill.proficiency).replace('from-', '').replace(' to-', ', ')})`,
        }}
      />

      {/* Main Node */}
      <div 
        className={`relative w-full h-full rounded-full border-2 transition-all duration-300 ${
          isSelected 
            ? 'border-accent shadow-lg shadow-accent/50' 
            : isConnected
            ? 'border-cyber-blue/60' :'border-white/20'
        }`}
        style={{
          background: `linear-gradient(135deg, ${getProficiencyColor(skill.proficiency).replace('from-', '').replace(' to-', ', ')})`,
        }}
      >
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon 
            name={skill.icon} 
            size={nodeSize * 0.4} 
            className="text-white drop-shadow-lg"
          />
        </div>

        {/* Proficiency Ring */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ 
              strokeDashoffset: 2 * Math.PI * 45 * (1 - skill.proficiencyPercent / 100)
            }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </svg>

        {/* Pulse Animation for Selected */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Skill Label */}
      <motion.div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300 ${
          isHovered || isSelected
            ? 'opacity-100 translate-y-0' :'opacity-0 translate-y-2'
        }`}
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="text-white font-inter">{skill.name}</div>
        <div className="text-text-secondary text-xs">
          {skill.proficiency} • {skill.experience}
        </div>
      </motion.div>

      {/* Experience Badge */}
      <div 
        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center transition-all duration-300 ${
          isHovered || isSelected ? 'opacity-100 scale-110' : 'opacity-80'
        }`}
      >
        <span className="text-xs font-bold text-accent">
          {skill.experienceYears}
        </span>
      </div>

      {/* Certification Indicator */}
      {skill.certified && (
        <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-success flex items-center justify-center">
          <Icon name="Award" size={12} className="text-black" />
        </div>
      )}
    </motion.div>
  );
};

export default SkillNode;