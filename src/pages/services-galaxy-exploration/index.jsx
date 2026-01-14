import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ServicePod from './components/ServicePod';
import GalaxyBackground from './components/GalaxyBackground';
import FloatingContactCTA from './components/FloatingContactCTA';
import ServiceStats from './components/ServiceStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ServicesGalaxyExploration = () => {
  const [expandedService, setExpandedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Full-stack solutions with cutting-edge technologies',
      expandedDescription: `Transform your digital presence with our comprehensive web development services. We craft scalable, performant, and user-centric applications using the latest technologies and best practices. From concept to deployment, we ensure your web application stands out in the digital landscape.`,
      icon: 'Code',
      gradient: 'bg-gradient-to-br from-accent to-accent/60',
      process: [
        {
          title: 'Discovery',
          description: 'Understanding your vision and requirements through detailed consultation'
        },
        {
          title: 'Architecture',
          description: 'Designing scalable system architecture and technical specifications'
        },
        {
          title: 'Development',
          description: 'Building with modern frameworks and agile methodologies'
        },
        {
          title: 'Deployment',
          description: 'Launching with CI/CD pipelines and performance optimization'
        }
      ],
      technologies: [
        { name: 'React', icon: 'Code' },
        { name: 'Next.js', icon: 'Zap' },
        { name: 'Node.js', icon: 'Server' },
        { name: 'TypeScript', icon: 'FileCode' },
        { name: 'MongoDB', icon: 'Database' },
        { name: 'AWS', icon: 'Cloud' }
      ],
      projects: [
        {
          name: 'E-commerce Platform',
          description: 'Full-featured online store with payment integration',
          timeline: '8 weeks',
          rating: '4.9',
          client: 'TechCorp'
        },
        {
          name: 'SaaS Dashboard',
          description: 'Analytics platform with real-time data visualization',
          timeline: '12 weeks',
          rating: '5.0',
          client: 'DataFlow Inc'
        }
      ],
      pricing: [
        {
          name: 'Starter',
          price: '$5,000',
          duration: '4-6 weeks',
          features: ['Responsive Design', 'Basic SEO', 'Contact Forms', '3 Revisions'],
          popular: false
        },
        {
          name: 'Professional',
          price: '$12,000',
          duration: '8-10 weeks',
          features: ['Custom Development', 'CMS Integration', 'Advanced SEO', 'E-commerce Ready', 'Unlimited Revisions'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$25,000+',
          duration: '12+ weeks',
          features: ['Full-Stack Solution', 'Custom Backend', 'Third-party Integrations', 'Performance Optimization', 'Ongoing Support'],
          popular: false
        }
      ]
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-centered design that converts and delights',
      expandedDescription: `Create exceptional user experiences that drive engagement and conversions. Our design process combines user research, psychology, and aesthetic excellence to deliver interfaces that are both beautiful and functional. Every pixel is crafted with purpose.`,
      icon: 'Palette',
      gradient: 'bg-gradient-to-br from-cyber-blue to-cyber-blue/60',
      process: [
        {
          title: 'Research',
          description: 'User interviews, competitor analysis, and market research'
        },
        {
          title: 'Wireframing',
          description: 'Information architecture and user flow mapping'
        },
        {
          title: 'Prototyping',
          description: 'Interactive prototypes and usability testing'
        },
        {
          title: 'Design System',
          description: 'Comprehensive style guides and component libraries'
        }
      ],
      technologies: [
        { name: 'Figma', icon: 'Figma' },
        { name: 'Adobe XD', icon: 'Layers' },
        { name: 'Sketch', icon: 'PenTool' },
        { name: 'Principle', icon: 'Play' },
        { name: 'InVision', icon: 'Eye' },
        { name: 'Framer', icon: 'Frame' }
      ],
      projects: [
        {
          name: 'Mobile Banking App',
          description: 'Intuitive financial management interface',
          timeline: '6 weeks',
          rating: '4.8',
          client: 'FinanceFirst'
        },
        {
          name: 'Healthcare Portal',
          description: 'Patient management system redesign',
          timeline: '10 weeks',
          rating: '4.9',
          client: 'MedTech Solutions'
        }
      ],
      pricing: [
        {
          name: 'Basic',
          price: '$3,000',
          duration: '3-4 weeks',
          features: ['User Research', 'Wireframes', 'Visual Design', '2 Revisions'],
          popular: false
        },
        {
          name: 'Complete',
          price: '$8,000',
          duration: '6-8 weeks',
          features: ['Full UX Process', 'Interactive Prototypes', 'Design System', 'Usability Testing', 'Developer Handoff'],
          popular: true
        },
        {
          name: 'Premium',
          price: '$15,000+',
          duration: '10+ weeks',
          features: ['Comprehensive Research', 'Multiple Concepts', 'A/B Testing', 'Animation Design', 'Ongoing Consultation'],
          popular: false
        }
      ]
    },
    {
      id: 'brand-identity',
      title: 'Brand Identity',
      description: 'Memorable brands that resonate with your audience',
      expandedDescription: `Build a powerful brand identity that tells your story and connects with your audience. From logo design to comprehensive brand guidelines, we create cohesive visual systems that establish trust and recognition in your market.`,
      icon: 'Sparkles',
      gradient: 'bg-gradient-to-br from-success to-success/60',
      process: [
        {
          title: 'Strategy',
          description: 'Brand positioning, values, and personality definition'
        },
        {
          title: 'Identity',
          description: 'Logo design, typography, and color palette creation'
        },
        {
          title: 'Applications',
          description: 'Business cards, letterheads, and marketing materials'
        },
        {
          title: 'Guidelines',
          description: 'Comprehensive brand manual and usage standards'
        }
      ],
      technologies: [
        { name: 'Illustrator', icon: 'PenTool' },
        { name: 'Photoshop', icon: 'Image' },
        { name: 'InDesign', icon: 'FileText' },
        { name: 'After Effects', icon: 'Film' },
        { name: 'Procreate', icon: 'Brush' },
        { name: 'Cinema 4D', icon: 'Box' }
      ],
      projects: [
        {
          name: 'Tech Startup Rebrand',
          description: 'Complete visual identity transformation',
          timeline: '8 weeks',
          rating: '5.0',
          client: 'InnovateLab'
        },
        {
          name: 'Restaurant Chain Identity',
          description: 'Multi-location brand consistency system',
          timeline: '12 weeks',
          rating: '4.9',
          client: 'Gourmet Group'
        }
      ],
      pricing: [
        {
          name: 'Essential',
          price: '$2,500',
          duration: '2-3 weeks',
          features: ['Logo Design', 'Color Palette', 'Typography', 'Basic Guidelines'],
          popular: false
        },
        {
          name: 'Professional',
          price: '$6,000',
          duration: '4-6 weeks',
          features: ['Complete Identity', 'Brand Strategy', 'Marketing Materials', 'Digital Assets', 'Brand Manual'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$12,000+',
          duration: '8+ weeks',
          features: ['Comprehensive System', 'Multiple Concepts', 'Animation Package', 'Packaging Design', 'Brand Consultation'],
          popular: false
        }
      ]
    },
    {
      id: 'digital-strategy',
      title: 'Digital Strategy',
      description: 'Data-driven strategies for digital transformation',
      expandedDescription: `Navigate the digital landscape with confidence through our strategic consulting services. We analyze your market position, identify opportunities, and create actionable roadmaps that drive growth and competitive advantage in the digital age.`,
      icon: 'TrendingUp',
      gradient: 'bg-gradient-to-br from-warning to-warning/60',
      process: [
        {
          title: 'Analysis',
          description: 'Market research, competitor analysis, and SWOT assessment'
        },
        {
          title: 'Strategy',
          description: 'Goal setting, KPI definition, and roadmap creation'
        },
        {
          title: 'Implementation',
          description: 'Execution planning and resource allocation'
        },
        {
          title: 'Optimization',
          description: 'Performance monitoring and continuous improvement'
        }
      ],
      technologies: [
        { name: 'Analytics', icon: 'BarChart3' },
        { name: 'SEO Tools', icon: 'Search' },
        { name: 'CRM', icon: 'Users' },
        { name: 'Automation', icon: 'Zap' },
        { name: 'Social Media', icon: 'Share2' },
        { name: 'Email Marketing', icon: 'Mail' }
      ],
      projects: [
        {
          name: 'E-commerce Growth',
          description: 'Digital transformation increasing revenue by 300%',
          timeline: '16 weeks',
          rating: '5.0',
          client: 'RetailPro'
        },
        {
          name: 'B2B Lead Generation',
          description: 'Marketing automation system implementation',
          timeline: '12 weeks',
          rating: '4.8',
          client: 'ServiceCorp'
        }
      ],
      pricing: [
        {
          name: 'Consultation',
          price: '$1,500',
          duration: '1-2 weeks',
          features: ['Strategy Session', 'Market Analysis', 'Recommendations', 'Action Plan'],
          popular: false
        },
        {
          name: 'Implementation',
          price: '$5,000',
          duration: '6-8 weeks',
          features: ['Full Strategy', 'Tool Setup', 'Team Training', 'Performance Tracking', 'Monthly Reviews'],
          popular: true
        },
        {
          name: 'Partnership',
          price: '$10,000+',
          duration: 'Ongoing',
          features: ['Dedicated Strategist', 'Continuous Optimization', 'Advanced Analytics', 'Priority Support', 'Quarterly Planning'],
          popular: false
        }
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleExpandService = (serviceId) => {
    setExpandedService(serviceId);
  };

  const handleCloseExpanded = () => {
    setExpandedService(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="font-orbitron text-foreground text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Initializing Galaxy...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Services Galaxy - FuturePortfolio | Digital Solutions & Web Development</title>
        <meta name="description" content="Explore our comprehensive digital services including web development, UI/UX design, brand identity, and digital strategy. Interactive 3D service exploration with detailed case studies." />
        <meta name="keywords" content="web development, UI UX design, brand identity, digital strategy, React development, Next.js, responsive design" />
        <meta property="og:title" content="Services Galaxy - FuturePortfolio" />
        <meta property="og:description" content="Immersive 3D exploration of our digital services and solutions" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Header />
        <GalaxyBackground />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h1 className="font-orbitron font-bold text-4xl lg:text-6xl text-foreground neon-text">
                Services Galaxy
              </h1>
              <p className="text-text-secondary text-lg lg:text-xl max-w-3xl mx-auto">
                Navigate through our constellation of digital services. Each pod represents a specialized domain where technology meets creativity to deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center space-x-4"
            >
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="MousePointer" size={16} />
                <span className="text-sm">Click to explore</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Move3D" size={16} />
                <span className="text-sm">Hover for details</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Galaxy */}
        <section className="relative py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 place-items-center">
              {services.map((service, index) => (
                <ServicePod
                  key={service.id}
                  service={service}
                  index={index}
                  onExpand={handleExpandService}
                  isExpanded={expandedService === service.id}
                  onClose={handleCloseExpanded}
                />
              ))}
            </div>
          </div>

          {/* Connecting Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 0, 64, 0.3)" />
                  <stop offset="50%" stopColor="rgba(0, 212, 255, 0.3)" />
                  <stop offset="100%" stopColor="rgba(255, 0, 64, 0.3)" />
                </linearGradient>
              </defs>
              
              {/* Animated connection lines */}
              <motion.path
                d="M 200 300 Q 400 200 600 300 Q 800 400 1000 300"
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 3, delay: 1 }}
              />
              
              <motion.path
                d="M 300 500 Q 500 400 700 500 Q 900 600 1100 500"
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="3,7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 4, delay: 1.5 }}
              />
            </svg>
          </div>
        </section>

        {/* Service Stats */}
        <section className="relative px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ServiceStats />
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-20 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="font-orbitron font-bold text-3xl lg:text-4xl text-foreground neon-text">
                Ready to Launch Your Project?
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Let's transform your vision into a digital reality. Our team is ready to guide you through every step of your journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                variant="default"
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow"
                onClick={() => window.location.href = '/contact-portal-communication'}
              >
                Start Your Project
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-300"
                onClick={() => window.location.href = '/contact-portal-communication'}
              >
                Schedule Consultation
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center space-x-8 text-sm text-text-secondary"
            >
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-cyber-blue" />
                <span>24h Response Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-warning" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </motion.div>
          </div>
        </section>

        <FloatingContactCTA />

        {/* Expanded Service Modal */}
        <AnimatePresence>
          {expandedService && (
            <ServicePod
              service={services.find(s => s.id === expandedService)}
              index={0}
              onExpand={handleExpandService}
              isExpanded={true}
              onClose={handleCloseExpanded}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ServicesGalaxyExploration;