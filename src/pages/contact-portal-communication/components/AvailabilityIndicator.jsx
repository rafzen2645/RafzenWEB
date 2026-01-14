import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AvailabilityIndicator = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [availability, setAvailability] = useState({
    status: 'available',
    message: 'Available for new projects',
    responseTime: '24 hours',
    capacity: 85
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate dynamic availability based on time
    const hour = currentTime.getHours();
    const day = currentTime.getDay();
    
    if (day === 0 || day === 6) {
      // Weekend
      setAvailability({
        status: 'limited',
        message: 'Weekend - Limited availability',
        responseTime: '48 hours',
        capacity: 60
      });
    } else if (hour >= 9 && hour <= 17) {
      // Business hours
      setAvailability({
        status: 'available',
        message: 'Online and ready to collaborate',
        responseTime: '2-4 hours',
        capacity: 90
      });
    } else if (hour >= 18 && hour <= 22) {
      // Evening
      setAvailability({
        status: 'available',
        message: 'Available for new projects',
        responseTime: '24 hours',
        capacity: 85
      });
    } else {
      // Night time
      setAvailability({
        status: 'away',
        message: 'Currently offline',
        responseTime: '24 hours',
        capacity: 75
      });
    }
  }, [currentTime]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'limited':
        return 'text-warning';
      case 'away':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'limited':
        return 'Clock';
      case 'away':
        return 'Moon';
      default:
        return 'Circle';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="holographic-card p-6 space-y-6"
    >
      <div className="text-center">
        <h3 className="font-orbitron font-bold text-xl text-foreground mb-2">
          Real-Time Availability
        </h3>
        <p className="text-text-secondary text-sm">
          Current status and project capacity
        </p>
      </div>

      {/* Current Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon 
                name={getStatusIcon(availability.status)} 
                size={20} 
                className={getStatusColor(availability.status)}
              />
              {availability.status === 'available' && (
                <div className="absolute -inset-1 bg-success/30 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <p className="font-rajdhani font-semibold text-foreground">
                {availability.message}
              </p>
              <p className="text-text-secondary text-sm">
                Response time: {availability.responseTime}
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-mono ${
            availability.status === 'available' ? 'bg-success/20 text-success' :
            availability.status === 'limited'? 'bg-warning/20 text-warning' : 'bg-text-secondary/20 text-text-secondary'
          }`}>
            {availability.status.toUpperCase()}
          </div>
        </div>

        {/* Project Capacity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground font-medium">Project Capacity</span>
            <span className="text-accent font-mono">{availability.capacity}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${availability.capacity}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-accent to-cyber-blue h-2 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-cyber-blue rounded-full animate-pulse-glow" />
            </motion.div>
          </div>
          <p className="text-text-secondary text-sm">
            {availability.capacity >= 80 ? 'Actively taking on new projects' :
             availability.capacity >= 60 ? 'Limited availability for new projects': 'Currently at capacity, accepting waitlist inquiries'}
          </p>
        </div>
      </div>

      {/* Current Time */}
      <div className="border-t border-border pt-4">
        <div className="text-center space-y-2">
          <div className="font-jetbrains text-2xl text-foreground">
            {formatTime(currentTime)}
          </div>
          <div className="text-text-secondary text-sm">
            {formatDate(currentTime)}
          </div>
          <div className="flex items-center justify-center space-x-2 text-accent text-sm">
            <Icon name="MapPin" size={14} />
            <span>Eastern Time (ET)</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="font-orbitron font-bold text-xl text-foreground">24h</div>
          <div className="text-text-secondary text-sm">Avg Response</div>
        </div>
        <div className="text-center">
          <div className="font-orbitron font-bold text-xl text-foreground">98%</div>
          <div className="text-text-secondary text-sm">Client Satisfaction</div>
        </div>
      </div>

      {/* Timezone Notice */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">Global Collaboration</p>
            <p className="text-text-secondary">
              I work with clients across all timezones. Response times may vary based on your location and project urgency.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AvailabilityIndicator;