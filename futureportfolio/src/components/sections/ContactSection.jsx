import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import Input from '../ui/Input';

const ContactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const contactInfo = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'rafsanisonfire420@gmail.com',
      link: 'mailto:rafsanisonfire420@gmail.com'
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+880 1687847722',
      link: 'tel:+8801687847722'
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: 'Dhanmondi, Dhaka, Bangladesh',
      link: null
    },
    {
      icon: 'Clock',
      label: 'Response Time',
      value: 'Within 7 hours',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: 'Github',
      label: 'GitHub',
      url: 'https://github.com/rafzen2645',
      color: 'hover:text-foreground'
    },
    {
      icon: 'Linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rafsan-d-fahim-9132b92b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      color: 'hover:text-cyber-blue'
    },
    {
      icon: 'Twitter',
      label: 'Twitter',
      url: 'https://x.com/rxfds2645',
      color: 'hover:text-accent'
    },
    {
      icon: 'Instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/rxf_ds?igsh=MTNtaG15aDNxYzJ4Nw==',
      color: 'hover:text-warning'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Replace these with your actual EmailJS service/template/user IDs
      const SERVICE_ID = 'service_cn6g0xl';
      const TEMPLATE_ID = 'template_7cjhn8s';
      const USER_ID = '4rUpl-kE0gJtz569Z';

      const templateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || '',
        projectType: data.projectType,
        budget: data.budget || '',
        message: data.message
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-surface/10">
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
              <Icon name="MessageCircle" size={16} className="text-accent" />
              <span className="font-inter text-sm text-accent">Get In Touch</span>
            </div>
            
            <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Let's Create Something <span className="text-accent neon-text">Amazing</span>
            </h2>
            
            <p className="text-text-secondary font-inter text-lg lg:text-xl max-w-3xl mx-auto">
              Ready to bring your digital vision to life? Let's discuss your project and explore 
              how we can create an exceptional solution together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="holographic-card p-8 rounded-xl">
                <h3 className="font-orbitron font-bold text-2xl text-foreground mb-6">
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-inter text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input
                        {...register('firstName', { required: 'First name is required' })}
                        placeholder="Rafsan"
                        error={errors.firstName?.message}
                      />
                    </div>
                    
                    <div>
                      <label className="block font-inter text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input
                        {...register('lastName', { required: 'Last name is required' })}
                        placeholder="Fahim"
                        error={errors.lastName?.message}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="rafsanisonfire420@gmail.com"
                      error={errors.email?.message}
                    />
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      {...register('phone')}
                      placeholder="+8801687847722"
                    />
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-foreground mb-2">
                      Project Type
                    </label>
                    <select
                      {...register('projectType', { required: 'Please select a project type' })}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select project type</option>
                      <option value="web-development">Web Development</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="ai-integration">AI Integration</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-400">{errors.projectType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-foreground mb-2">
                      Project Budget
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg font-inter text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under ৳5,000</option>
                      <option value="5k-10k">৳5,000 - ৳10,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-foreground mb-2">
                      Project Details *
                    </label>
                    <textarea
                      {...register('message', { required: 'Project details are required' })}
                      rows={5}
                      placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg font-inter text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-vertical"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Status */}
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        submitStatus === 'success' ?'bg-success/20 text-success border border-success/30' :'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={submitStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                          size={16} 
                        />
                        <span className="font-inter text-sm">
                          {submitStatus === 'success' ?'Message sent successfully! I\'ll get back to you within 24 hours.' :'Something went wrong. Please try again or email me directly.'
                          }
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    iconName={isSubmitting ? 'Loader2' : 'Send'}
                    iconPosition="left"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Contact Information */}
              <div className="holographic-card p-8 rounded-xl">
                <h3 className="font-orbitron font-bold text-2xl text-foreground mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      className="flex items-center space-x-4 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent/20 to-cyber-blue/20 rounded-full flex items-center justify-center group-hover:electric-glow transition-all duration-300">
                        <Icon name={info.icon} size={20} className="text-accent" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-inter font-semibold text-foreground">
                          {info.label}
                        </h4>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="font-inter text-text-secondary hover:text-accent transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-inter text-text-secondary">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="holographic-card p-8 rounded-xl">
                <h3 className="font-orbitron font-bold text-2xl text-foreground mb-6">
                  Follow Me
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-4 bg-surface/50 rounded-lg border border-border hover:electric-glow transition-all duration-300 group ${social.color}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <Icon name={social.icon} size={20} className="text-text-secondary group-hover:text-current transition-colors duration-200" />
                      <span className="font-inter text-sm text-text-secondary group-hover:text-current transition-colors duration-200">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="holographic-card p-8 rounded-xl text-center">
                <motion.div
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-success/20 text-success rounded-full mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="font-inter text-sm font-medium">Available for new projects</span>
                </motion.div>
                
                <h3 className="font-orbitron font-bold text-xl text-foreground mb-2">
                  Let's Work Together
                </h3>
                
                <p className="font-inter text-text-secondary text-sm mb-6">
                  I'm currently accepting new projects and would love to hear about yours. Let's create something amazing together!
                </p>
                
                <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-success" />
                    <span>Quick Response</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} className="text-cyber-blue" />
                    <span>NDA Available</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Award" size={12} className="text-warning" />
                    <span>Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;