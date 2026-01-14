import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypeOptions = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'branding', label: 'Brand Identity' },
    { value: 'consultation', label: 'Technical Consultation' },
    { value: 'other', label: 'Other' }
  ];

  const budgetOptions = [
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP' },
    { value: '1-2-months', label: '1-2 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (minimum 20 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      });
    }, 3000);
  };

  const getCharacterCount = (text, max) => {
    const count = text.length;
    const remaining = max - count;
    return {
      count,
      remaining,
      isNearLimit: remaining <= 50,
      isOverLimit: remaining < 0
    };
  };

  const messageStats = getCharacterCount(formData.message, 1000);

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="holographic-card p-8 text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-success to-cyber-blue rounded-full flex items-center justify-center mx-auto mb-6 electric-glow">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
        <h3 className="font-orbitron font-bold text-2xl text-foreground mb-4">
          Message Transmitted Successfully!
        </h3>
        <p className="text-text-secondary mb-6">
          Your project inquiry has been received and processed. I'll respond within 24 hours with next steps for your digital transformation journey.
        </p>
        <div className="flex items-center justify-center space-x-2 text-accent">
          <Icon name="Zap" size={16} />
          <span className="font-inter text-sm">Processing your request...</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="holographic-card p-8 space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="font-orbitron font-bold text-3xl text-foreground mb-4 neon-text">
          Project Transmission Portal
        </h2>
        <p className="text-text-secondary">
          Ready to build something extraordinary? Share your vision and let's create the future together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
          className="group"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          className="group"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company/Organization"
          name="company"
          type="text"
          placeholder="Your company name (optional)"
          value={formData.company}
          onChange={handleInputChange}
          className="group"
        />

        <Select
          label="Project Type"
          placeholder="Select project type"
          options={projectTypeOptions}
          value={formData.projectType}
          onChange={(value) => handleSelectChange('projectType', value)}
          error={errors.projectType}
          required
          className="group"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Project Budget"
          placeholder="Select budget range"
          options={budgetOptions}
          value={formData.budget}
          onChange={(value) => handleSelectChange('budget', value)}
          className="group"
        />

        <Select
          label="Timeline"
          placeholder="Select timeline"
          options={timelineOptions}
          value={formData.timeline}
          onChange={(value) => handleSelectChange('timeline', value)}
          className="group"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Project Details <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <textarea
            name="message"
            placeholder="Describe your project vision, goals, and requirements..."
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-text-secondary/60 resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent ${
              errors.message ? 'border-error' : 'border-border hover:border-accent/50'
            }`}
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <span className={`text-xs font-mono ${
              messageStats.isOverLimit ? 'text-error' : messageStats.isNearLimit ?'text-warning' : 'text-text-secondary'
            }`}>
              {messageStats.count}/1000
            </span>
            {messageStats.count > 0 && (
              <div className={`w-2 h-2 rounded-full ${
                messageStats.isOverLimit ? 'bg-error' : messageStats.isNearLimit ?'bg-warning' : 'bg-success'
              }`} />
            )}
          </div>
        </div>
        {errors.message && (
          <p className="text-error text-sm flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          fullWidth
          className="bg-gradient-to-r from-accent to-cyber-blue hover:from-accent/90 hover:to-cyber-blue/90 text-white font-rajdhani font-semibold text-lg electric-glow"
        >
          {isSubmitting ? 'Transmitting...' : 'Launch Project Inquiry'}
        </Button>
      </div>

      <div className="text-center pt-4 border-t border-border">
        <p className="text-text-secondary text-sm">
          <Icon name="Shield" size={14} className="inline mr-1" />
          Your information is encrypted and secure. I'll respond within 24 hours.
        </p>
      </div>
    </motion.form>
  );
};

export default ContactForm;