import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:electric-glow ${
        index % 2 === 0 ? 'animate-float' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
        
        {/* Project Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold ${project.categoryColor} backdrop-blur-sm`}>
            {project.category}
          </span>
        </div>

        {/* Project Status */}
        {project.isNew && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 px-2 py-1 bg-success/20 border border-success/30 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-inter font-medium text-success">New</span>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-accent/20 backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="left"
                className="bg-background/80 border-accent/50 text-accent hover:bg-accent hover:text-white"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                Live Demo
              </Button>
              {project.githubUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Github"
                  className="bg-background/80 text-foreground hover:bg-foreground hover:text-background"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:neon-text transition-all duration-300">
            {project.title}
          </h3>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Calendar" size={14} />
            <span className="text-xs font-inter">{project.year}</span>
          </div>
        </div>

        <p className="text-text-secondary font-inter text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-surface/50 border border-border rounded text-xs font-jetbrains text-text-secondary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-surface/50 border border-border rounded text-xs font-jetbrains text-text-secondary">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Project Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-orbitron font-bold text-accent">{project.metrics.performance}</div>
            <div className="text-xs font-inter text-text-secondary">Performance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-orbitron font-bold text-cyber-blue">{project.metrics.users}</div>
            <div className="text-xs font-inter text-text-secondary">Users</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-orbitron font-bold text-success">{project.metrics.rating}</div>
            <div className="text-xs font-inter text-text-secondary">Rating</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            fullWidth
            className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold"
          >
            View Case Study
          </Button>
        </div>
      </div>

      {/* Holographic Border Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProjectCard;