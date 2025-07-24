import React, { useState } from 'react';
  // Scroll to contact section
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offsetTop = el.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const ServicesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'web-development',
      icon: 'Code',
      title: 'Web Development',
      description: 'Full-stack solutions with cutting-edge technologies including React, Node.js, and modern frameworks.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Ready', 'Modern Architecture'],
      gradient: 'from-accent to-accent/60',
      price: 'From ৳5,000'
    },
    {
      id: 'ui-ux-design',
      icon: 'Palette',
      title: 'UI/UX Design',
      description: 'User-centered design that converts and delights, focusing on intuitive interfaces and seamless experiences.',
      features: ['User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      gradient: 'from-cyber-blue to-cyber-blue/60',
      price: 'From ৳3,000'
    },
    {
      id: 'mobile-development',
      icon: 'Smartphone',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications with superior performance and user experience.',
      features: ['iOS & Android', 'React Native', 'App Store Optimization', 'Push Notifications'],
      gradient: 'from-success to-success/60',
      price: 'From ৳8,000'
    },
    {
      id: 'ai-integration',
      icon: 'Brain',
      title: 'AI Integration',
      description: 'Integrate artificial intelligence and machine learning capabilities into your applications.',
      features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      gradient: 'from-warning to-warning/60',
      price: 'From ৳10,000'
    }
  ];

  const stats = [
    { value: '3+', label: 'Projects Completed', icon: 'CheckCircle' },
    { value: '98%', label: 'Client Satisfaction', icon: 'Star' },
    { value: '24/7', label: 'Support Available', icon: 'Clock' },
    { value: '1.5+', label: 'Years Experience', icon: 'Award' }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-surface/10 to-background">
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
              <Icon name="Zap" size={16} className="text-accent" />
              <span className="font-inter text-sm text-accent">Services</span>
            </div>
            
            <h2 className="font-orbitron font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Digital Solutions That <span className="text-accent neon-text">Scale</span>
            </h2>
            
            <p className="text-text-secondary font-inter text-lg lg:text-xl max-w-3xl mx-auto">
              From concept to deployment, I provide end-to-end digital solutions that drive growth 
              and deliver exceptional user experiences.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-full holographic-card p-8 rounded-xl relative overflow-hidden transition-all duration-300 group-hover:electric-glow">
                  
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl group-hover:electric-glow transition-all duration-300`}>
                      <Icon name={service.icon} size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:neon-text transition-all duration-300">
                        {service.title}
                      </h3>
                      <span className="font-inter text-sm text-accent font-semibold">
                        {service.price}
                      </span>
                    </div>
                    
                    <p className="font-inter text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-inter font-semibold text-foreground text-sm">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <Icon name="Check" size={14} className="text-success" />
                            <span className="font-inter text-sm text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="w-full mt-6 border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                      onClick={() => setSelectedService(service)}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-accent/20 to-cyber-blue/20 rounded-full group-hover:electric-glow transition-all duration-300">
                  <Icon name={stat.icon} size={20} className="text-accent" />
                </div>
                
                <motion.div
                  className="font-orbitron font-bold text-3xl text-foreground neon-text mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="font-inter text-sm text-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center bg-gradient-to-r from-accent/10 via-background to-cyber-blue/10 rounded-2xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-orbitron font-bold text-2xl lg:text-3xl text-foreground mb-4">
              Ready to Start Your Project?
            </h3>
            
            <p className="font-inter text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create something extraordinary together. 
              Get a free consultation and project estimate.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow"
                onClick={scrollToContact}
              >
                Get Free Consultation
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-background transition-all duration-300"
                onClick={scrollToContact}
              >
                Schedule Call
              </Button>
      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setSelectedService(null)}>
          <div className="bg-card rounded-xl max-w-lg w-full p-8 relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-2xl text-accent hover:text-cyber-blue" onClick={() => setSelectedService(null)}>&times;</button>
            <div className="flex items-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${selectedService.gradient} rounded-xl mr-4`}>
                <Icon name={selectedService.icon} size={32} className="text-white" />
              </div>
              <h3 className="font-orbitron font-bold text-2xl text-foreground">{selectedService.title}</h3>
            </div>
            <p className="font-inter text-text-secondary mb-4">{selectedService.description}</p>
            <h4 className="font-inter font-semibold text-foreground mb-2">Key Features:</h4>
            <ul className="list-disc list-inside mb-4 text-text-secondary">
              {selectedService.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <div className="mb-4">
              <span className="font-inter text-accent font-semibold">Starting at: {selectedService.price}</span>
            </div>
            <div className="mb-4">
              <h4 className="font-inter font-semibold text-foreground mb-2">Why Choose This Service?</h4>
              <ul className="list-disc list-inside text-text-secondary">
                <li>Personalized approach tailored to your business needs</li>
                <li>Cutting-edge technology and best practices</li>
                <li>Transparent communication and regular updates</li>
                <li>Post-launch support and maintenance</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="font-inter font-semibold text-foreground mb-2">How It Works:</h4>
              <ol className="list-decimal list-inside text-text-secondary">
                <li>Initial consultation to understand your goals</li>
                <li>Project planning and proposal</li>
                <li>Design, development, and regular feedback</li>
                <li>Testing, launch, and ongoing support</li>
              </ol>
            </div>
            <div className="text-sm text-text-secondary">Contact for a custom solution or more details!</div>
          </div>
        </div>
      )}
            </div>
            
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-cyber-blue" />
                <span>24h Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-warning" />
                <span>Quality Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;