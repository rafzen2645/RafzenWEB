import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const AboutSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const experiences = [
    {
      year: '2024',
      title: 'Full-Stack Developer',
      company: 'RAFZEN',
      description: 'Leading development of cutting-edge web applications using React, Node.js, and AI integration.',
      technologies: ['React', 'Node.js']
    },
    {
      year: '2024',
      title: 'Frontend Architect',
      company: 'RAFZEN',
      description: 'Architected scalable frontend solutions for enterprise clients with focus on performance and UX.',
      technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS']
    },
    {
      year: '2024',
      title: 'Web Developer',
      company: 'RAFZEN',
      description: 'Built responsive web applications and e-commerce platforms for various startup clients.',
      technologies: ['React', 'MongoDB', 'HTML', 'CSS', 'JavaScript', 'TypeScript']
    }
  ];

  const skills = [
    { name: 'Frontend Development', level: 95, color: 'from-accent to-accent/60' },
    { name: 'Backend Development', level: 90, color: 'from-cyber-blue to-cyber-blue/60' },
    { name: 'UI/UX Design', level: 85, color: 'from-success to-success/60' },
    { name: 'Mobile Development', level: 80, color: 'from-warning to-warning/60' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-surface/10">
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
              <Icon name="User" size={16} className="text-accent" />
              <span className="font-inter text-sm text-accent">About Me</span>
            </div>
            
            <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Crafting Digital <span className="text-accent neon-text">Experiences</span>
            </h2>
            
            <p className="text-text-secondary font-inter text-lg lg:text-xl max-w-3xl mx-auto">
              With over 1.5 years of experience in web development, I specialize in creating innovative digital solutions 
              that combine cutting-edge technology with exceptional user experience design.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Story */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6">
                <h3 className="font-orbitron font-bold text-2xl text-foreground">
                  My Journey in Tech
                </h3>
                
                <div className="space-y-4 text-text-secondary font-inter">
                  <p>
                    My passion for technology began during my computer science studies, where I discovered 
                    the power of code to transform ideas into reality. Since then, I've been on a continuous 
                    journey of learning and innovation.
                  </p>
                  
                  <p>
                    I believe in the perfect balance between technical excellence and creative design. 
                    Every project I work on is an opportunity to push boundaries and create something 
                    that not only functions flawlessly but also inspires and delights users.
                  </p>
                  
                  <p>
                    When I'm not coding, you'll find me exploring new technologies, contributing to 
                    open-source projects, or mentoring upcoming developers in the community.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h4 className="font-orbitron font-bold text-xl text-foreground">Core Competencies</h4>
                
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-inter text-sm text-foreground">{skill.name}</span>
                        <span className="font-inter text-sm text-text-secondary">{skill.level}%</span>
                      </div>
                      
                      <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.6 + index * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Download Resume button removed as requested */}
            </motion.div>

            {/* Right Side - Experience Timeline */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-orbitron font-bold text-2xl text-foreground mb-8">
                Professional Journey
              </h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-cyber-blue to-success" />
                
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="relative flex items-start space-x-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    >
                      {/* Timeline Dot */}
                      <div className="relative">
                        <div className="w-4 h-4 bg-accent rounded-full electric-glow" />
                        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-30" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-inter rounded-full">
                            {exp.year}
                          </span>
                          <h4 className="font-orbitron font-bold text-lg text-foreground">
                            {exp.title}
                          </h4>
                        </div>
                        
                        <p className="font-inter text-cyber-blue font-medium">
                          {exp.company}
                        </p>
                        
                        <p className="font-inter text-text-secondary">
                          {exp.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-surface text-text-secondary text-xs font-inter rounded border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;