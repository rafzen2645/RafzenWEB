import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactForm from './components/ContactForm';
import AlternativeContactMethods from './components/AlternativeContactMethods';
import AvailabilityIndicator from './components/AvailabilityIndicator';
import FAQSection from './components/FAQSection';
import TestimonialsSidebar from './components/TestimonialsSidebar';
import ParticleBackground from './components/ParticleBackground';
import Icon from '../../components/AppIcon';

const ContactPortalCommunication = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Helmet>
        <title>Contact Portal - FuturePortfolio | Let's Build Something Amazing</title>
        <meta name="description" content="Ready to transform your digital presence? Connect with our team through our interactive contact portal. Multiple ways to reach us, real-time availability, and instant responses." />
        <meta name="keywords" content="contact, consultation, project inquiry, digital transformation, web development, collaboration" />
        <meta property="og:title" content="Contact Portal - FuturePortfolio" />
        <meta property="og:description" content="Start your digital transformation journey. Multiple contact methods, real-time availability, and expert consultation." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="py-16 px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
                <Icon name="Zap" size={16} className="text-accent" />
                <span className="text-accent text-sm font-medium">Ready to Collaborate</span>
              </div>
              <h1 className="font-orbitron font-bold text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
                Contact Portal
                <span className="block text-transparent bg-gradient-to-r from-accent to-cyber-blue bg-clip-text">
                  Communication Hub
                </span>
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Transform your vision into reality. Multiple communication channels, real-time availability, 
                and expert consultation to kickstart your digital transformation journey.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm">24h Response Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-cyber-blue">
                <Icon name="Globe" size={16} />
                <span className="text-sm">Global Collaboration</span>
              </div>
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="Award" size={16} />
                <span className="text-sm">98% Client Satisfaction</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Contact Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <ContactForm />
              </motion.div>

              {/* Right Column - Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <AvailabilityIndicator />
                <TestimonialsSidebar />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="py-16 px-6 lg:px-8 bg-surface/20">
          <div className="max-w-4xl mx-auto">
            <AlternativeContactMethods />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FAQSection />
          </div>
        </section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-16 px-6 lg:px-8 bg-gradient-to-r from-accent/10 to-cyber-blue/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="holographic-card p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-cyber-blue rounded-full flex items-center justify-center mx-auto mb-6 electric-glow">
                <Icon name="Rocket" size={32} className="text-white" />
              </div>
              <h2 className="font-orbitron font-bold text-3xl text-foreground mb-4">
                Ready to Launch Your Project?
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Join 150+ satisfied clients who have transformed their digital presence. 
                Let's discuss how we can bring your vision to life with cutting-edge technology and creative excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.querySelector('form').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-rajdhani font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2 electric-glow"
                >
                  <Icon name="MessageCircle" size={20} />
                  <span>Start Your Project</span>
                </button>
                <button
                  onClick={() => window.open('/portfolio-cosmos-case-studies', '_self')}
                  className="px-8 py-3 border border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white rounded-lg font-rajdhani font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Icon name="Eye" size={20} />
                  <span>View Our Work</span>
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-xl text-foreground">FuturePortfolio</h3>
                  <p className="text-text-secondary text-sm">Digital Futurist</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4 max-w-md">
                Crafting tomorrow's digital experiences today. Where technical mastery meets creative vision.
              </p>
              <div className="flex space-x-4">
                <Icon name="Mail" size={20} className="text-accent" />
                <Icon name="Linkedin" size={20} className="text-cyber-blue" />
                <Icon name="Github" size={20} className="text-success" />
                <Icon name="Twitter" size={20} className="text-warning" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-rajdhani font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/hero-universe-navigation-hub" className="text-text-secondary hover:text-accent transition-colors">Home</a></li>
                <li><a href="/services-galaxy-exploration" className="text-text-secondary hover:text-accent transition-colors">Services</a></li>
                <li><a href="/portfolio-cosmos-case-studies" className="text-text-secondary hover:text-accent transition-colors">Portfolio</a></li>
                <li><a href="/skills-matrix-visualization" className="text-text-secondary hover:text-accent transition-colors">Skills</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-rajdhani font-semibold text-foreground mb-4">Get in Touch</h4>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} />
                  <span className="text-sm">hello@futureportfolio.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} />
                  <span className="text-sm">Eastern Time (ET)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} />
                  <span className="text-sm">24h Response Time</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} FuturePortfolio. All rights reserved. Built with passion for the future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPortalCommunication;