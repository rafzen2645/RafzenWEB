import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSidebar = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CEO, TechVision Startup",
      company: "TechVision",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Working with this team transformed our digital presence completely. The attention to detail and innovative approach exceeded all expectations. Our user engagement increased by 300% post-launch.`,
      rating: 5,
      project: "E-commerce Platform",
      date: "2025-01-15"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "Design Studios Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `The level of creativity and technical expertise is unmatched. They didn't just build our website; they crafted a digital experience that tells our story beautifully. Absolutely phenomenal work.`,
      rating: 5,
      project: "Brand Website Redesign",
      date: "2025-01-08"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Product Manager",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `From concept to launch, the collaboration was seamless. The team's ability to translate complex ideas into intuitive user experiences is remarkable. Our app now leads the market in user satisfaction.`,
      rating: 5,
      project: "Mobile App Development",
      date: "2024-12-22"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder",
      company: "StartupFlow",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The strategic approach to our digital transformation was exactly what we needed. Not only did they deliver exceptional results, but they also educated our team throughout the process.`,
      rating: 5,
      project: "Digital Transformation",
      date: "2024-12-10"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "GrowthCorp",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      content: `The results speak for themselves - 250% increase in conversions and countless compliments on our new digital presence. This investment has paid for itself many times over.`,
      rating: 5,
      project: "Conversion Optimization",
      date: "2024-11-28"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={`${i < rating ? 'text-warning fill-current' : 'text-text-secondary'}`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="font-orbitron font-bold text-xl text-foreground mb-2">
          Client Testimonials
        </h3>
        <p className="text-text-secondary text-sm">
          What clients say about our collaboration
        </p>
      </div>

      {/* Main Testimonial Display */}
      <div className="holographic-card p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Client Info */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-cyber-blue rounded-full opacity-60 blur-sm" />
              </div>
              <div className="flex-1">
                <h4 className="font-rajdhani font-semibold text-foreground">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-text-secondary text-sm">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-accent text-sm font-medium">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              <span className="text-text-secondary text-sm">
                ({testimonials[currentTestimonial].rating}.0)
              </span>
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-text-secondary leading-relaxed italic">
              "{testimonials[currentTestimonial].content}"
            </blockquote>

            {/* Project Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Briefcase" size={14} className="text-accent" />
                <span className="text-accent text-sm font-medium">
                  {testimonials[currentTestimonial].project}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-text-secondary" />
                <span className="text-text-secondary text-sm">
                  {formatDate(testimonials[currentTestimonial].date)}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevTestimonial}
            className="p-2 rounded-lg bg-surface/50 hover:bg-surface text-text-secondary hover:text-foreground transition-colors duration-300"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentTestimonial ? 'bg-accent' : 'bg-text-secondary/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-2 rounded-lg bg-surface/50 hover:bg-surface text-text-secondary hover:text-foreground transition-colors duration-300"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="holographic-card p-6">
        <h4 className="font-rajdhani font-semibold text-lg text-foreground mb-4 text-center">
          Client Success Metrics
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="font-orbitron font-bold text-2xl text-accent mb-1">98%</div>
            <div className="text-text-secondary text-sm">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="font-orbitron font-bold text-2xl text-cyber-blue mb-1">150+</div>
            <div className="text-text-secondary text-sm">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="font-orbitron font-bold text-2xl text-success mb-1">24h</div>
            <div className="text-text-secondary text-sm">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="font-orbitron font-bold text-2xl text-warning mb-1">5.0</div>
            <div className="text-text-secondary text-sm">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="holographic-card p-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-text-secondary text-sm">Verified Reviews</span>
          </div>
          <div className="w-1 h-4 bg-border" />
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-warning" />
            <span className="text-text-secondary text-sm">Top Rated</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsSidebar;