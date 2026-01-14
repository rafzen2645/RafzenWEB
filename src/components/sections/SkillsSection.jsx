import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from '../AppIcon';

const SkillsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      name: 'Frontend',
      icon: 'Monitor',
      color: 'from-accent to-accent/60',
      skills: [
        { name: 'React', level: 95, icon: 'Code' },
        { name: 'Vue.js', level: 90, icon: 'Code' },
        { name: 'TypeScript', level: 88, icon: 'FileCode' },
        { name: 'Tailwind CSS', level: 92, icon: 'Palette' },
        { name: 'Next.js', level: 85, icon: 'Zap' },
        { name: 'Framer Motion', level: 80, icon: 'Play' }
      ]
    },
    backend: {
      name: 'Backend',
      icon: 'Server',
      color: 'from-cyber-blue to-cyber-blue/60',
      skills: [
        { name: 'Node.js', level: 90, icon: 'Server' },
        { name: 'Python', level: 85, icon: 'Code' },
        { name: 'Express.js', level: 88, icon: 'Zap' },
        { name: 'MongoDB', level: 82, icon: 'Database' },
        { name: 'PostgreSQL', level: 78, icon: 'Database' },
        { name: 'GraphQL', level: 75, icon: 'Network' }
      ]
    },
    tools: {
      name: 'Tools & DevOps',
      icon: 'Settings',
      color: 'from-success to-success/60',
      skills: [
        { name: 'Git', level: 92, icon: 'GitBranch' },
        { name: 'Docker', level: 80, icon: 'Package' },
        { name: 'AWS', level: 75, icon: 'Cloud' },
        { name: 'Webpack', level: 78, icon: 'Box' },
        { name: 'Jest', level: 82, icon: 'CheckCircle' },
        { name: 'Figma', level: 88, icon: 'Palette' }
      ]
    },
    mobile: {
      name: 'Mobile',
      icon: 'Smartphone',
      color: 'from-warning to-warning/60',
      skills: [
        { name: 'React Native', level: 85, icon: 'Smartphone' },
        { name: 'Flutter', level: 70, icon: 'Smartphone' },
        { name: 'iOS Development', level: 65, icon: 'Apple' },
        { name: 'Android Development', level: 68, icon: 'Smartphone' },
        { name: 'Expo', level: 80, icon: 'Zap' },
        { name: 'Firebase', level: 75, icon: 'Database' }
      ]
    }
  };

  const achievements = [
    {
      title: 'React.js Specialist',
      year: '2025',
      icon: 'Code',
      description: 'Built scalable, high-performance UIs for multiple clients.'
    },
    {
      title: 'E-commerce Website Development',
      year: '2024',
      icon: 'ShoppingCart',
      description: 'Led development of an online store with React and Firebase.'
    },
    {
      title: 'Full Stack Developer',
      year: '2025',
      icon: 'Layers',
      description: 'Experienced in building modern, responsive websites and applications using React, HTML, CSS, and JavaScript.'
    },
    {
      title: 'UI/UX Innovator',
      year: '2024',
      icon: 'Palette',
      description: 'Designed and implemented user-centric interfaces with a focus on accessibility and performance.'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-surface/10">
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
              <Icon name="Code" size={16} className="text-accent" />
              <span className="font-inter text-sm text-accent">Skills & Expertise</span>
            </div>
            
            <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Technical <span className="text-accent neon-text">Arsenal</span>
            </h2>
            
            <p className="text-text-secondary font-inter text-lg lg:text-xl max-w-3xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks, constantly evolving 
              to stay at the forefront of web development innovation.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-accent text-white electric-glow' :'bg-surface/50 text-text-secondary hover:bg-accent/20 hover:text-accent border border-border'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name={category.icon} size={16} />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="holographic-card p-6 rounded-xl group hover:electric-glow transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${skillCategories[activeCategory].color} rounded-lg group-hover:electric-glow transition-all duration-300`}>
                    <Icon name={skill.icon} size={20} className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-orbitron font-bold text-foreground group-hover:neon-text transition-all duration-300">
                      {skill.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden mr-3">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                      <span className="font-inter text-sm text-text-secondary">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-orbitron font-bold text-2xl text-foreground text-center">
              Certifications & <span className="text-accent neon-text">Achievements</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="holographic-card p-6 rounded-xl text-center group hover:electric-glow transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-accent/20 to-cyber-blue/20 rounded-full group-hover:electric-glow transition-all duration-300">
                    <Icon name={achievement.icon} size={24} className="text-accent" />
                  </div>
                  <h4 className="font-orbitron font-bold text-foreground mb-2 group-hover:neon-text transition-all duration-300">
                    {achievement.title}
                  </h4>
                  <p className="font-inter text-sm text-text-secondary mb-1">
                    {achievement.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-inter rounded-full">
                    {achievement.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Summary removed as requested */}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;