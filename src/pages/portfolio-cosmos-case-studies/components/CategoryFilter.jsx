import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`group relative px-6 py-3 rounded-xl font-rajdhani font-semibold text-sm transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-accent text-white electric-glow' :'bg-surface/50 text-text-secondary hover:bg-surface hover:text-foreground border border-border hover:border-accent/30'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Icon 
              name={category.icon} 
              size={16} 
              className={`transition-colors duration-300 ${
                activeCategory === category.id ? 'text-white' : 'text-current'
              }`}
            />
            <span>{category.name}</span>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeCategory === category.id
                ? 'bg-white/20 text-white' :'bg-accent/20 text-accent'
            }`}>
              {category.count}
            </span>
          </div>
          
          {/* Active Indicator */}
          {activeCategory === category.id && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse-glow"></div>
          )}
          
          {/* Hover Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;