import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Icon from '../../../components/AppIcon';

const ServiceStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    experience: 0,
  });

  const stats = [
    {
      id: 'projects',
      icon: 'Briefcase',
      value: 150,
      suffix: '+',
      label: 'Projects Completed',
      color: 'text-accent',
      gradient: 'from-accent to-accent/60',
    },
    {
      id: 'clients',
      icon: 'Users',
      value: 80,
      suffix: '+',
      label: 'Happy Clients',
      color: 'text-cyber-blue',
      gradient: 'from-cyber-blue to-cyber-blue/60',
    },
    {
      id: 'satisfaction',
      icon: 'Star',
      value: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      color: 'text-success',
      gradient: 'from-success to-success/60',
    },
    {
      id: 'experience',
      icon: 'Award',
      value: 5,
      suffix: '+',
      label: 'Years Experience',
      color: 'text-warning',
      gradient: 'from-warning to-warning/60',
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const animateCounters = () => {
      stats.forEach((stat) => {
        let current = 0;
        const increment = stat.value / 60; // 60 frames for smooth animation
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [stat.id]: Math.floor(current)
          }));
        }, 16); // ~60fps
      });
    };

    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20"
    >
      <div className="text-center mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="font-orbitron font-bold text-3xl lg:text-4xl text-foreground neon-text"
        >
          Proven Excellence
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-text-secondary text-lg max-w-2xl mx-auto"
        >
          Numbers that speak to our commitment to delivering exceptional digital experiences
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="relative group"
          >
            <div className="holographic-card p-8 text-center space-y-6 hover:electric-glow transition-all duration-500">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-2xl`} />
              
              {/* Icon */}
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} relative`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon name={stat.icon} size={28} className="text-white" />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [-5, 5, -5],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Counter */}
              <div className="space-y-2">
                <motion.div
                  className={`font-orbitron font-bold text-4xl ${stat.color}`}
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ delay: index * 0.1 + 1, duration: 0.5 }}
                >
                  {counters[stat.id]}{stat.suffix}
                </motion.div>
                <p className="font-inter font-medium text-foreground">
                  {stat.label}
                </p>
              </div>

              {/* Progress bar */}
              <div className="relative">
                <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ delay: index * 0.1 + 0.8, duration: 1.5 }}
                  />
                </div>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </div>

            {/* Floating glow effect */}
            <motion.div
              className={`absolute -inset-4 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-500`}
              initial={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom decorative elements */}
      <div className="relative mt-16 flex justify-center">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceStats;