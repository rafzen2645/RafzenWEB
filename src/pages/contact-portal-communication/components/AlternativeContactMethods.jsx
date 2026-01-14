import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AlternativeContactMethods = () => {
  const [hoveredMethod, setHoveredMethod] = useState(null);

  const contactMethods = [
    {
      id: 'email',
      title: 'Direct Email',
      description: 'Send me an email directly',
      icon: 'Mail',
      action: 'hello@futureportfolio.com',
      color: 'from-accent to-red-600',
      delay: 0.1
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Connect',
      description: 'Professional networking',
      icon: 'Linkedin',
      action: 'Connect on LinkedIn',
      color: 'from-blue-500 to-blue-600',
      delay: 0.2
    },
    {
      id: 'calendar',
      title: 'Schedule Call',
      description: 'Book a consultation',
      icon: 'Calendar',
      action: 'Book 30min call',
      color: 'from-green-500 to-emerald-600',
      delay: 0.3
    },
    {
      id: 'phone',
      title: 'Phone Consultation',
      description: 'Direct phone discussion',
      icon: 'Phone',
      action: '+1 (555) 123-4567',
      color: 'from-purple-500 to-purple-600',
      delay: 0.4
    }
  ];

  const handleMethodClick = (method) => {
    switch (method.id) {
      case 'email':
        window.location.href = `mailto:${method.action}`;
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/futureportfolio', '_blank');
        break;
      case 'calendar':
        window.open('https://calendly.com/futureportfolio/consultation', '_blank');
        break;
      case 'phone':
        window.location.href = `tel:${method.action}`;
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-orbitron font-bold text-2xl text-foreground mb-2">
          Alternative Contact Methods
        </h3>
        <p className="text-text-secondary">
          Choose your preferred way to connect and start the conversation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactMethods.map((method) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: method.delay }}
            onHoverStart={() => setHoveredMethod(method.id)}
            onHoverEnd={() => setHoveredMethod(null)}
            className="relative group cursor-pointer"
            onClick={() => handleMethodClick(method)}
          >
            <div className={`holographic-card p-6 transition-all duration-300 ${
              hoveredMethod === method.id ? 'floating-element' : ''
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center group-hover:electric-glow transition-all duration-300`}>
                  <Icon 
                    name={method.icon} 
                    size={24} 
                    className="text-white" 
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-rajdhani font-semibold text-lg text-foreground mb-1">
                    {method.title}
                  </h4>
                  <p className="text-text-secondary text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent text-sm font-mono">
                      {method.action}
                    </span>
                    <Icon 
                      name="ExternalLink" 
                      size={14} 
                      className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="holographic-card p-6"
      >
        <h4 className="font-rajdhani font-semibold text-lg text-foreground mb-4 text-center">
          Quick Actions
        </h4>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            className="flex-1 border-accent/30 text-accent hover:bg-accent hover:text-white"
            onClick={() => window.open('/assets/resume.pdf', '_blank')}
          >
            Download Resume
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            className="flex-1 border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-white"
            onClick={() => window.open('/portfolio-cosmos-case-studies', '_self')}
          >
            View Portfolio
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Users"
            iconPosition="left"
            className="flex-1 border-success/30 text-success hover:bg-success hover:text-white"
            onClick={() => window.open('/services-galaxy-exploration', '_self')}
          >
            Our Services
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AlternativeContactMethods;