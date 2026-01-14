import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const PortfolioSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "NeuroCommerce Platform",
      category: "e-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      description: "AI-powered e-commerce platform with personalized shopping experiences and advanced analytics.",
      technologies: ["React", "Node.js", "AI/ML", "MongoDB"],
      liveUrl: "https://neurocommerce-demo.com",
      githubUrl: "https://github.com/example/neurocommerce",
      metrics: { performance: "98%", users: "50K+", rating: "4.9" },
      featured: true
    },
    {
      id: 2,
      title: "CloudSync SaaS Dashboard",
      category: "saas",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description: "Enterprise data management solution with real-time analytics and team collaboration tools.",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
      liveUrl: "https://cloudsync-demo.com",
      githubUrl: null,
      metrics: { performance: "95%", users: "25K+", rating: "4.8" },
      featured: true
    },
    {
      id: 3,
      title: "Quantum Brand Experience",
      category: "website",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop",
      description: "Immersive brand website with 3D animations and interactive storytelling elements.",
      technologies: ["Three.js", "React", "GSAP", "WebGL"],
      liveUrl: "https://quantum-brand-demo.com",
      githubUrl: "https://github.com/example/quantum-brand",
      metrics: { performance: "92%", users: "15K+", rating: "4.7" },
      featured: false
    },
    {
      id: 4,
      title: "NeuralFit Mobile App",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      description: "AI-powered fitness companion with real-time form correction and personalized workouts.",
      technologies: ["React Native", "TensorFlow", "Firebase", "Node.js"],
      liveUrl: "https://neuralfit-app.com",
      githubUrl: "https://github.com/example/neuralfit",
      metrics: { performance: "94%", users: "100K+", rating: "4.8" },
      featured: true
    },
    {
      id: 5,
      title: "CryptoTracker Dashboard",
      category: "fintech",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop",
      description: "Real-time cryptocurrency tracking dashboard with advanced charting and portfolio management.",
      technologies: ["React", "D3.js", "WebSocket", "Express"],
      liveUrl: "https://cryptotracker-demo.com",
      githubUrl: "https://github.com/example/cryptotracker",
      metrics: { performance: "96%", users: "30K+", rating: "4.6" },
      featured: false
    },
    {
      id: 6,
      title: "EduTech Learning Platform",
      category: "education",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
      description: "Interactive learning platform with video streaming, quizzes, and progress tracking.",
      technologies: ["Next.js", "Prisma", "Stripe", "AWS"],
      liveUrl: "https://edutech-demo.com",
      githubUrl: "https://github.com/example/edutech",
      metrics: { performance: "93%", users: "20K+", rating: "4.5" },
      featured: false
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'e-commerce', name: 'E-commerce', count: projects.filter(p => p.category === 'e-commerce').length },
    { id: 'saas', name: 'SaaS', count: projects.filter(p => p.category === 'saas').length },
    { id: 'website', name: 'Websites', count: projects.filter(p => p.category === 'website').length },
    { id: 'mobile', name: 'Mobile Apps', count: projects.filter(p => p.category === 'mobile').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-surface/10 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="space-y-16">
          
          {/* Section Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
              <Icon name="Briefcase" size={16} className="text-accent" />
              <span className="font-inter text-sm text-accent">Portfolio</span>
            </div>
            
            <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Featured <span className="text-accent neon-text">Projects</span>
            </h2>
            
            <p className="text-text-secondary font-inter text-lg lg:text-xl max-w-3xl mx-auto">
              A showcase of innovative digital solutions that combine cutting-edge technology 
              with exceptional user experience design.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-accent text-white electric-glow' :'bg-surface/50 text-text-secondary hover:bg-accent/20 hover:text-accent border border-border'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{filter.name}</span>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {filter.count}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openProjectModal(project)}
                  whileHover={{ y: -8 }}
                >
                  <div className="holographic-card rounded-xl overflow-hidden group-hover:electric-glow transition-all duration-300">
                    
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-inter rounded-full electric-glow">
                          Featured
                        </div>
                      )}
                      
                      {/* Quick Actions */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-3">
                          {project.liveUrl && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center electric-glow">
                                <Icon name="ExternalLink" size={16} className="text-white" />
                              </div>
                            </motion.div>
                          )}
                          
                          {project.githubUrl && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center">
                                <Icon name="Github" size={16} className="text-background" />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:neon-text transition-all duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="font-inter text-text-secondary text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-surface text-text-secondary text-xs font-inter rounded border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-inter rounded">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center space-x-4 text-xs text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Icon name="Zap" size={12} className="text-success" />
                            <span>{project.metrics.performance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Users" size={12} className="text-cyber-blue" />
                            <span>{project.metrics.users}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-warning" />
                            <span>{project.metrics.rating}</span>
                          </div>
                        </div>
                        
                        <Icon name="ArrowRight" size={16} className="text-accent group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-orbitron font-bold text-2xl text-foreground">
                    {selectedProject.title}
                  </h3>
                  
                  <p className="font-inter text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-orbitron font-bold text-foreground">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/20 text-accent text-sm font-inter rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-orbitron font-bold text-foreground">Project Metrics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="font-orbitron font-bold text-lg text-accent">
                          {selectedProject.metrics.performance}
                        </div>
                        <div className="font-inter text-xs text-text-secondary">Performance</div>
                      </div>
                      <div className="text-center">
                        <div className="font-orbitron font-bold text-lg text-cyber-blue">
                          {selectedProject.metrics.users}
                        </div>
                        <div className="font-inter text-xs text-text-secondary">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="font-orbitron font-bold text-lg text-warning">
                          {selectedProject.metrics.rating}
                        </div>
                        <div className="font-inter text-xs text-text-secondary">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                  {selectedProject.liveUrl && (
                    <Button
                      variant="default"
                      iconName="ExternalLink"
                      iconPosition="left"
                      className="bg-accent hover:bg-accent/90 text-white"
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                    >
                      View Live Project
                    </Button>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      iconName="Github"
                      iconPosition="left"
                      className="border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    >
                      View Code
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;