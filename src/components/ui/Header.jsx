import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Universe Hub', path: '/hero-universe-navigation-hub', icon: 'Home' },
    { name: 'Services Galaxy', path: '/services-galaxy-exploration', icon: 'Zap' },
    { name: 'Portfolio Cosmos', path: '/portfolio-cosmos-case-studies', icon: 'Briefcase' },
    { name: 'Skills Matrix', path: '/skills-matrix-visualization', icon: 'Code' },
    { name: 'Contact Portal', path: '/contact-portal-communication', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-90 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-holographic border-b border-border' :'bg-transparent'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo Section */}
          <Link 
            to="/hero-universe-navigation-hub" 
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center group-hover:electric-glow transition-all duration-300">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-cyber-blue rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-orbitron font-bold text-xl text-foreground group-hover:neon-text transition-all duration-300">
                RAFZEN
              </h1>
              <p className="font-inter text-xs text-text-secondary -mt-1">
                Web Alchemist
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg font-inter font-medium text-sm transition-all duration-300 group ${
                  isActivePath(item.path)
                    ? 'text-accent bg-accent/10 border border-accent/20' :'text-text-secondary hover:text-foreground hover:bg-surface/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item.icon} 
                    size={16} 
                    className={`transition-colors duration-300 ${
                      isActivePath(item.path) ? 'text-accent' : 'text-current'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {isActivePath(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse-glow"></div>
                )}
              </Link>
            ))}
            
            {/* Contact CTA */}
            <div className="ml-4">
              <Button
                variant="outline"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
                className="border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-300 hover:electric-glow"
                onClick={() => window.location.href = '/contact-portal-communication'}
              >
                Contact
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface/50 transition-all duration-300"
            aria-label="Toggle navigation menu"
          >
            <Icon 
              name={isMenuOpen ? "X" : "Menu"} 
              size={24} 
              className="transition-transform duration-300"
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 border-b border-border' :'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 bg-background/95 backdrop-blur-holographic">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-inter font-medium transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'text-accent bg-accent/10 border border-accent/20' :'text-text-secondary hover:text-foreground hover:bg-surface/50'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={`transition-colors duration-300 ${
                      isActivePath(item.path) ? 'text-accent' : 'text-current'
                    }`}
                  />
                  <span>{item.name}</span>
                  {isActivePath(item.path) && (
                    <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
                  )}
                </Link>
              ))}
            </nav>
            
            {/* Mobile Contact CTA */}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant="default"
                size="sm"
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold"
                onClick={() => {
                  closeMenu();
                  window.location.href = '/contact-portal-communication';
                }}
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1200 pointer-events-none"></div>
    </header>
  );
};

export default Header;