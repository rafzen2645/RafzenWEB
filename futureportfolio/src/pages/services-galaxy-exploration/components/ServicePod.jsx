import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicePod = ({ service, index, onExpand, isExpanded, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x);
  const mouseY = useSpring(y);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set((mouseX / width - 0.5));
    y.set((mouseY / height - 0.5));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (isExpanded) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl p-8"
          onClick={(e) => e.stopPropagation()}
          layoutId={`service-${service.id}`}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-surface hover:bg-accent/20 transition-colors duration-300"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${service.gradient} mb-4`}>
                <Icon name={service.icon} size={32} className="text-white" />
              </div>
              <h2 className="font-orbitron font-bold text-3xl text-foreground neon-text">
                {service.title}
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                {service.expandedDescription}
              </p>
            </div>

            {/* Process Breakdown */}
            <div className="space-y-6">
              <h3 className="font-rajdhani font-semibold text-xl text-foreground">
                Our Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {service.process.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="holographic-card p-4 text-center space-y-3"
                  >
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto">
                      <span className="font-rajdhani font-semibold text-white text-sm">
                        {idx + 1}
                      </span>
                    </div>
                    <h4 className="font-inter font-medium text-foreground">
                      {step.title}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div className="space-y-6">
              <h3 className="font-rajdhani font-semibold text-xl text-foreground">
                Technology Stack
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {service.technologies.map((tech, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="holographic-card p-4 text-center space-y-2 hover:electric-glow transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center mx-auto">
                      <Icon name={tech.icon} size={24} className="text-white" />
                    </div>
                    <p className="font-inter text-sm text-foreground font-medium">
                      {tech.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Project Examples */}
            <div className="space-y-6">
              <h3 className="font-rajdhani font-semibold text-xl text-foreground">
                Recent Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="holographic-card p-6 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="font-inter font-semibold text-foreground">
                          {project.name}
                        </h4>
                        <p className="text-text-secondary text-sm">
                          {project.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-rajdhani font-semibold text-accent">
                          {project.timeline}
                        </p>
                        <p className="text-text-secondary text-xs">
                          Timeline
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="Star" size={16} className="text-warning fill-current" />
                        <span className="text-sm text-foreground">
                          {project.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} className="text-cyber-blue" />
                        <span className="text-sm text-text-secondary">
                          {project.client}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-6">
              <h3 className="font-rajdhani font-semibold text-xl text-foreground">
                Investment Range
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.pricing.map((tier, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`holographic-card p-6 text-center space-y-4 ${
                      tier.popular ? 'border-accent electric-glow' : ''
                    }`}
                  >
                    {tier.popular && (
                      <div className="inline-block px-3 py-1 bg-accent text-white text-xs font-rajdhani font-semibold rounded-full">
                        Most Popular
                      </div>
                    )}
                    <h4 className="font-rajdhani font-semibold text-lg text-foreground">
                      {tier.name}
                    </h4>
                    <div className="space-y-1">
                      <p className="font-orbitron font-bold text-2xl text-accent">
                        {tier.price}
                      </p>
                      <p className="text-text-secondary text-sm">
                        {tier.duration}
                      </p>
                    </div>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      {tier.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center space-x-2">
                          <Icon name="Check" size={14} className="text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8 border-t border-border">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow"
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExpand(service.id)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2 }}
      layoutId={`service-${service.id}`}
    >
      <motion.div
        className={`relative w-64 h-64 rounded-2xl ${service.gradient} p-8 flex flex-col items-center justify-center text-center space-y-4 ${
          isHovered ? 'electric-glow' : ''
        }`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10"
          animate={isHovered ? { rotateY: 360 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Icon name={service.icon} size={48} className="text-white" />
        </motion.div>

        <div className="relative z-10 space-y-2">
          <h3 className="font-orbitron font-bold text-xl text-white">
            {service.title}
          </h3>
          <p className="text-white/80 text-sm">
            {service.description}
          </p>
        </div>

        <motion.div
          className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
          animate={isHovered ? { scale: 1.2, rotate: 90 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon name="ArrowRight" size={16} className="text-white" />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ServicePod;