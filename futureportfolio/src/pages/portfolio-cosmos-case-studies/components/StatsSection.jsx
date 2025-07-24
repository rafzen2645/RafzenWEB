import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });

  const finalValues = {
    projects: 50,
    clients: 35,
    experience: 5,
    satisfaction: 98
  };

  const stats = [
    {
      key: 'projects',
      label: 'Projects Completed',
      value: counters.projects,
      suffix: '+',
      icon: 'Briefcase',
      color: 'text-accent'
    },
    {
      key: 'clients',
      label: 'Happy Clients',
      value: counters.clients,
      suffix: '+',
      icon: 'Users',
      color: 'text-cyber-blue'
    },
    {
      key: 'experience',
      label: 'Years Experience',
      value: counters.experience,
      suffix: '+',
      icon: 'Calendar',
      color: 'text-success'
    },
    {
      key: 'satisfaction',
      label: 'Client Satisfaction',
      value: counters.satisfaction,
      suffix: '%',
      icon: 'Star',
      color: 'text-warning'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalValues).map(key => {
      const increment = finalValues[key] / steps;
      let currentValue = 0;

      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValues[key]) {
          currentValue = finalValues[key];
          clearInterval(intervals.find(interval => interval === this));
        }
        
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepDuration);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-surface/30 via-background to-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-orbitron font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Portfolio <span className="text-accent neon-text">Statistics</span>
          </h2>
          <p className="text-text-secondary font-inter text-lg max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and client satisfaction
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className="group relative bg-card border border-border rounded-xl p-6 text-center hover:electric-glow transition-all duration-500 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${stat.color.split('-')[1]}/20 to-${stat.color.split('-')[1]}/10 border border-${stat.color.split('-')[1]}/30 flex items-center justify-center group-hover:electric-glow transition-all duration-300`}>
                  <Icon 
                    name={stat.icon} 
                    size={24} 
                    className={`${stat.color} group-hover:animate-pulse`}
                  />
                </div>
              </div>

              {/* Counter */}
              <div className={`font-orbitron font-bold text-3xl lg:text-4xl ${stat.color} mb-2 group-hover:neon-text transition-all duration-300`}>
                {stat.value}{stat.suffix}
              </div>

              {/* Label */}
              <div className="font-inter font-medium text-text-secondary group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </div>

              {/* Holographic Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-surface/50 border border-border rounded-full">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="font-inter text-sm text-text-secondary">
              Growing portfolio with <span className="text-success font-semibold">100% project success rate</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;