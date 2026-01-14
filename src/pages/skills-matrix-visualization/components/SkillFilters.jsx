import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  proficiencyLevels,
  selectedProficiency,
  onProficiencyChange,
  viewMode,
  onViewModeChange,
  onResetFilters
}) => {
  const categoryIcons = {
    'All': 'Grid3X3',
    'Frontend': 'Monitor',
    'Backend': 'Server',
    'Design': 'Palette',
    'Tools': 'Wrench',
    'Mobile': 'Smartphone',
    'Database': 'Database'
  };

  const proficiencyColors = {
    'All': 'text-foreground',
    'Expert': 'text-accent',
    'Advanced': 'text-cyber-blue',
    'Intermediate': 'text-yellow-400',
    'Beginner': 'text-green-400'
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-rajdhani font-semibold text-foreground">
          Skill Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
          className="text-text-secondary hover:text-foreground"
        >
          Reset
        </Button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-inter font-medium text-foreground mb-3">
          Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-accent/10 border-accent text-accent' :'bg-surface border-border text-text-secondary hover:text-foreground hover:border-border/60'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center space-y-1">
                <Icon 
                  name={categoryIcons[category] || 'Circle'} 
                  size={20} 
                  className="transition-colors duration-200"
                />
                <span className="text-xs font-inter font-medium">
                  {category}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Proficiency Filter */}
      <div>
        <label className="block text-sm font-inter font-medium text-foreground mb-3">
          Proficiency Level
        </label>
        <div className="space-y-2">
          {proficiencyLevels.map((level) => (
            <motion.button
              key={level}
              onClick={() => onProficiencyChange(level)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                selectedProficiency === level
                  ? 'bg-accent/10 border-accent' :'bg-surface border-border hover:border-border/60'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-3 h-3 rounded-full ${
                    selectedProficiency === level ? 'bg-accent' : 'bg-border'
                  }`}
                />
                <span className={`font-inter font-medium ${
                  selectedProficiency === level 
                    ? 'text-accent' 
                    : proficiencyColors[level] || 'text-text-secondary'
                }`}>
                  {level}
                </span>
              </div>
              {selectedProficiency === level && (
                <Icon name="Check" size={16} className="text-accent" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div>
        <label className="block text-sm font-inter font-medium text-foreground mb-3">
          View Mode
        </label>
        <div className="flex bg-surface rounded-lg p-1 border border-border">
          {['3D', '2D'].map((mode) => (
            <motion.button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md font-inter font-medium text-sm transition-all duration-200 ${
                viewMode === mode
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-foreground'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon 
                name={mode === '3D' ? 'Box' : 'Grid3X3'} 
                size={16} 
              />
              <span>{mode} View</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-inter font-medium text-foreground mb-3">
          Current Learning Goals
        </h4>
        <div className="space-y-2">
          {[
            { name: 'Next.js 14', progress: 75, icon: 'Zap' },
            { name: 'Three.js', progress: 45, icon: 'Box' },
            { name: 'WebGL', progress: 30, icon: 'Cpu' }
          ].map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={goal.icon} size={14} className="text-accent" />
                  <span className="text-sm font-inter text-foreground">
                    {goal.name}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-cyber-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillFilters;