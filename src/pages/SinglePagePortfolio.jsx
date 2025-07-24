import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../contexts/ThemeContext';

// Components
import EnhancedHeader from '../components/ui/EnhancedHeader';
import ScrollNavigation from '../components/ScrollNavigation';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import SkillsSection from '../components/sections/SkillsSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import ContactSection from '../components/sections/ContactSection';

// Smooth scroll behavior
const SinglePagePortfolio = () => {
  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground antialiased">
        <Helmet>
          <title>Rafzen-Mastering the Art of Web Development & Digital Transformation</title>
          <meta name="description" content="Explore the digital universe of cutting-edge web development, AI integration, and immersive user experiences. Specializing in React, Node.js, and modern web technologies." />
          <meta name="keywords" content="web development, React developer, Node.js, AI integration, UI/UX design, portfolio, digital innovation, modern web technologies" />
          <meta property="og:title" content="Rafzen-Mastering the Art of Web Development & Digital Transformation" />
          <meta property="og:description" content="Crafting digital experiences that push the boundaries of what's possible" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Rafzen-Mastering the Art of Web Development & Digital Transformation" />
          <meta name="twitter:description" content="Explore cutting-edge web development and digital solutions" />
        </Helmet>

        {/* Enhanced Header */}
        <EnhancedHeader />

        {/* Scroll Navigation */}
        <ScrollNavigation />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section with Zoom Animation */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Services Section */}
          <ServicesSection />

          {/* Skills Section */}
          <SkillsSection />

          {/* Portfolio Section */}
          <PortfolioSection />

          {/* Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <motion.footer 
          className="py-12 border-t border-border bg-surface/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="font-orbitron font-bold text-foreground">RAFZEN</span>
              </div>
              
              <div className="text-text-secondary font-inter text-sm text-center md:text-left">
                © {new Date().getFullYear()} Rafzen - Web Alchemist. Transforming Ideas into Digital Masterpieces with Innovation and Precision.
              </div>
              
              <div className="flex items-center space-x-1 text-text-secondary">
                <span className="font-inter text-sm">Crafted with</span>
                <motion.span 
                  className="text-accent text-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ❤️
                </motion.span>
                <span className="font-inter text-sm">Next-Gen Technology</span>
              </div>
            </div>
          </div>
        </motion.footer>

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Ambient Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
                backgroundSize: '50px 50px'
              }} 
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SinglePagePortfolio;