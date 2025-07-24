import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillDetails = ({ skill, isVisible, onClose, onViewProjects }) => {
  if (!skill) return null;

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-accent';
      case 'Advanced': return 'text-cyber-blue';
      case 'Intermediate': return 'text-yellow-400';
      case 'Beginner': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-accent/10 to-cyber-blue/10 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-cyber-blue flex items-center justify-center">
                    <Icon name={skill.icon} size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-orbitron font-bold text-foreground">
                      {skill.name}
                    </h2>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`font-inter font-medium ${getProficiencyColor(skill.proficiency)}`}>
                        {skill.proficiency}
                      </span>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary font-inter">
                        {skill.experience}
                      </span>
                      {skill.certified && (
                        <>
                          <span className="text-text-secondary">•</span>
                          <div className="flex items-center space-x-1 text-success">
                            <Icon name="Award" size={16} />
                            <span className="text-sm font-medium">Certified</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-text-secondary hover:text-foreground"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>

              {/* Proficiency Progress */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-inter text-text-secondary">Proficiency</span>
                  <span className="text-sm font-inter font-medium text-foreground">
                    {skill.proficiencyPercent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-cyber-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiencyPercent}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {/* Description */}
              <div>
                <h3 className="text-lg font-rajdhani font-semibold text-foreground mb-2">
                  About This Skill
                </h3>
                <p className="text-text-secondary font-inter leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Recent Projects */}
              {skill.recentProjects && skill.recentProjects.length > 0 && (
                <div>
                  <h3 className="text-lg font-rajdhani font-semibold text-foreground mb-3">
                    Recent Projects
                  </h3>
                  <div className="space-y-2">
                    {skill.recentProjects.map((project, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border"
                      >
                        <div>
                          <div className="font-inter font-medium text-foreground">
                            {project.name}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {project.role} • {project.year}
                          </div>
                        </div>
                        <Icon name="ExternalLink" size={16} className="text-accent" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Timeline */}
              {skill.learningTimeline && (
                <div>
                  <h3 className="text-lg font-rajdhani font-semibold text-foreground mb-3">
                    Learning Journey
                  </h3>
                  <div className="space-y-3">
                    {skill.learningTimeline.map((milestone, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <div className="font-inter font-medium text-foreground">
                            {milestone.title}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {milestone.year} • {milestone.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Technologies */}
              {skill.relatedTechnologies && skill.relatedTechnologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-rajdhani font-semibold text-foreground mb-3">
                    Related Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.relatedTechnologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-surface border border-border rounded-full text-sm font-inter text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {skill.certifications && skill.certifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-rajdhani font-semibold text-foreground mb-3">
                    Certifications
                  </h3>
                  <div className="space-y-2">
                    {skill.certifications.map((cert, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border"
                      >
                        <Icon name="Award" size={20} className="text-success" />
                        <div>
                          <div className="font-inter font-medium text-foreground">
                            {cert.name}
                          </div>
                          <div className="text-sm text-text-secondary">
                            {cert.issuer} • {cert.year}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-surface/50 border-t border-border">
              <div className="flex justify-between items-center">
                <div className="text-sm text-text-secondary font-inter">
                  Last updated: {skill.lastUpdated}
                </div>
                <Button
                  variant="default"
                  onClick={() => onViewProjects?.(skill)}
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="bg-accent hover:bg-accent/90"
                >
                  View Projects
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SkillDetails;