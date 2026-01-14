import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillTimeline = ({ 
  timelineData, 
  currentYear, 
  onYearChange, 
  isVisible 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const years = timelineData.map(item => item.year).sort((a, b) => a - b);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = maxYear - minYear;

  const getPositionFromYear = (year) => {
    return ((year - minYear) / yearRange) * 100;
  };

  const getYearFromPosition = (position) => {
    return Math.round(minYear + (position / 100) * yearRange);
  };

  const handleSliderChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;
    const year = getYearFromPosition(Math.max(0, Math.min(100, position)));
    onYearChange(year);
  };

  const currentYearData = timelineData.filter(item => item.year <= currentYear);
  const currentPosition = getPositionFromYear(currentYear);

  if (!isVisible) return null;

  return (
    <motion.div
      className="bg-card border border-border rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-rajdhani font-semibold text-foreground">
            Skill Development Timeline
          </h3>
          <p className="text-sm text-text-secondary font-inter">
            Explore how skills evolved over time
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-orbitron font-bold text-accent">
            {currentYear}
          </div>
          <div className="text-sm text-text-secondary">
            {currentYearData.length} skills acquired
          </div>
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="relative mb-8">
        <div 
          className="relative h-12 bg-surface rounded-lg border border-border cursor-pointer"
          onClick={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={isDragging ? handleSliderChange : undefined}
        >
          {/* Timeline Track */}
          <div className="absolute inset-2 bg-gradient-to-r from-accent/20 to-cyber-blue/20 rounded-md" />
          
          {/* Progress Fill */}
          <motion.div
            className="absolute left-2 top-2 bottom-2 bg-gradient-to-r from-accent to-cyber-blue rounded-md"
            style={{ width: `calc(${currentPosition}% - 8px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Year Markers */}
          {years.map((year) => (
            <div
              key={year}
              className="absolute top-0 bottom-0 flex flex-col items-center justify-center"
              style={{ left: `${getPositionFromYear(year)}%` }}
            >
              <div 
                className={`w-1 h-full rounded-full ${
                  year <= currentYear ? 'bg-accent' : 'bg-border'
                }`}
              />
              <div className="absolute -bottom-6 text-xs font-inter text-text-secondary whitespace-nowrap">
                {year}
              </div>
            </div>
          ))}

          {/* Current Year Indicator */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg cursor-grab active:cursor-grabbing"
            style={{ left: `${currentPosition}%` }}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.2 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDrag={(e, info) => {
              const rect = e.currentTarget.parentElement.getBoundingClientRect();
              const position = ((info.point.x - rect.left) / rect.width) * 100;
              const year = getYearFromPosition(Math.max(0, Math.min(100, position)));
              onYearChange(year);
            }}
          >
            <div className="absolute inset-0 bg-accent rounded-full animate-pulse-glow" />
          </motion.div>
        </div>
      </div>

      {/* Skills Acquired in Current Year */}
      <div>
        <h4 className="text-md font-rajdhani font-semibold text-foreground mb-4">
          Skills Acquired by {currentYear}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
          {currentYearData.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${skill.year}`}
              className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyber-blue flex items-center justify-center flex-shrink-0">
                <Icon name={skill.icon} size={16} className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-inter font-medium text-foreground text-sm truncate">
                  {skill.name}
                </div>
                <div className="text-xs text-text-secondary">
                  {skill.year} • {skill.category}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${
                  skill.proficiency === 'Expert' ? 'bg-accent' :
                  skill.proficiency === 'Advanced' ? 'bg-cyber-blue' :
                  skill.proficiency === 'Intermediate'? 'bg-yellow-400' : 'bg-green-400'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { 
              label: 'Total Skills', 
              value: currentYearData.length, 
              icon: 'Target',
              color: 'text-accent'
            },
            { 
              label: 'Expert Level', 
              value: currentYearData.filter(s => s.proficiency === 'Expert').length, 
              icon: 'Award',
              color: 'text-accent'
            },
            { 
              label: 'Categories', 
              value: new Set(currentYearData.map(s => s.category)).size, 
              icon: 'Grid3X3',
              color: 'text-cyber-blue'
            },
            { 
              label: 'Years Experience', 
              value: currentYear - minYear, 
              icon: 'Clock',
              color: 'text-green-400'
            }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border mb-2 ${stat.color}`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <div className="text-xl font-orbitron font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-text-secondary font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillTimeline;