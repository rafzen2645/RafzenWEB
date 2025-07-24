import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Eye' },
    { id: 'process', name: 'Process', icon: 'Workflow' },
    { id: 'technology', name: 'Technology', icon: 'Code' },
    { id: 'results', name: 'Results', icon: 'TrendingUp' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden holographic-card">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 border border-border rounded-lg text-text-secondary hover:text-foreground hover:bg-surface transition-all duration-300"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Gallery Section */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-64 lg:h-full">
              <Image
                src={project.gallery[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 border border-border rounded-lg text-foreground hover:bg-surface transition-all duration-300"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 border border-border rounded-lg text-foreground hover:bg-surface transition-all duration-300"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {project.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-accent' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-orbitron font-bold text-2xl text-foreground mb-2">
                    {project.title}
                  </h2>
                  <p className="text-text-secondary font-inter">{project.subtitle}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold ${project.categoryColor}`}>
                  {project.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 text-white"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                >
                  Live Demo
                </Button>
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Github"
                    iconPosition="left"
                    className="border-accent/30 text-accent hover:bg-accent hover:text-white"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    GitHub
                  </Button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 font-rajdhani font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-text-secondary hover:text-foreground hover:bg-surface/30'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-foreground mb-3">Project Overview</h3>
                    <p className="text-text-secondary font-inter leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary font-inter text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground mb-3">Client Testimonial</h4>
                    <div className="bg-surface/30 border border-border rounded-lg p-4">
                      <p className="text-text-secondary font-inter italic mb-3">
                        "{project.testimonial.quote}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={project.testimonial.avatar}
                          alt={project.testimonial.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-rajdhani font-semibold text-foreground text-sm">
                            {project.testimonial.author}
                          </div>
                          <div className="text-text-secondary text-xs">
                            {project.testimonial.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div className="space-y-6">
                  <h3 className="font-orbitron font-bold text-lg text-foreground mb-4">Development Process</h3>
                  {project.process.map((step, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-rajdhani font-bold text-sm">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-rajdhani font-semibold text-foreground mb-2">{step.title}</h4>
                        <p className="text-text-secondary font-inter text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'technology' && (
                <div className="space-y-6">
                  <h3 className="font-orbitron font-bold text-lg text-foreground mb-4">Technology Stack</h3>
                  
                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground mb-3">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.frontend.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyber-blue/20 border border-cyber-blue/30 rounded-full text-xs font-jetbrains text-cyber-blue"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground mb-3">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.backend.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-success/20 border border-success/30 rounded-full text-xs font-jetbrains text-success"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground mb-3">Tools & Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-warning/20 border border-warning/30 rounded-full text-xs font-jetbrains text-warning"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="space-y-6">
                  <h3 className="font-orbitron font-bold text-lg text-foreground mb-4">Project Results</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(project.results).map(([key, value]) => (
                      <div key={key} className="bg-surface/30 border border-border rounded-lg p-4 text-center">
                        <div className="text-2xl font-orbitron font-bold text-accent mb-1">{value}</div>
                        <div className="text-xs font-inter text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-rajdhani font-semibold text-foreground mb-3">Impact & Achievements</h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Award" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary font-inter text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;