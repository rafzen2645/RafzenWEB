import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FloatingMetrics = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    experience: 0,
    clients: 0
  });

  const targetValues = {
    projects: 150,
    experience: 8,
    clients: 200
  };

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounters({
          projects: Math.floor(targetValues.projects * easeOut),
          experience: Math.floor(targetValues.experience * easeOut),
          clients: Math.floor(targetValues.clients * easeOut)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targetValues);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    const timeout = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const metrics = [
    {
      id: 'projects',
      value: counters.projects,
      suffix: '+',
      label: 'Projects Completed',
      icon: 'Briefcase',
      position: { top: '20%', left: '15%' },
      delay: 0
    },
    {
      id: 'experience',
      value: counters.experience,
      suffix: '',
      label: 'Years Experience',
      icon: 'Calendar',
      position: { top: '60%', right: '20%' },
      delay: 0.2
    },
    {
      id: 'clients',
      value: counters.clients,
      suffix: '+',
      label: 'Happy Clients',
      icon: 'Users',
      position: { bottom: '25%', left: '20%' },
      delay: 0.4
    }
  ];

  return (
    <>
      {metrics.map((metric) => (
        <motion.div
          key={metric.id}
          className="absolute z-20 hidden lg:block"
          style={metric.position}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: metric.delay,
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="holographic-card p-6 rounded-xl backdrop-blur-md bg-surface/20 border border-accent/20 hover:border-accent/40 transition-all duration-300 group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center group-hover:electric-glow transition-all duration-300">
                <Icon 
                  name={metric.icon} 
                  size={24} 
                  className="text-white"
                />
              </div>
              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="font-orbitron font-bold text-3xl text-foreground neon-text">
                    {metric.value}
                  </span>
                  <span className="font-orbitron font-bold text-2xl text-accent">
                    {metric.suffix}
                  </span>
                </div>
                <p className="font-inter text-sm text-text-secondary mt-1">
                  {metric.label}
                </p>
              </div>
            </div>
            
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-cyber-blue/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default FloatingMetrics;