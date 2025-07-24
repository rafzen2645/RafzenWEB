import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationCube = () => {
  const cubeRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const faces = [
    {
      id: 'about',
      title: 'About',
      subtitle: 'My Story',
      icon: 'User',
      route: '/hero-universe-navigation-hub',
      transform: 'rotateY(0deg) translateZ(100px)',
      gradient: 'from-accent to-red-600'
    },
    {
      id: 'services',
      title: 'Services',
      subtitle: 'What I Do',
      icon: 'Zap',
      route: '/services-galaxy-exploration',
      transform: 'rotateY(90deg) translateZ(100px)',
      gradient: 'from-cyber-blue to-blue-600'
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      subtitle: 'My Work',
      icon: 'Briefcase',
      route: '/portfolio-cosmos-case-studies',
      transform: 'rotateY(180deg) translateZ(100px)',
      gradient: 'from-purple-500 to-purple-700'
    },
    {
      id: 'skills',
      title: 'Skills',
      subtitle: 'Expertise',
      icon: 'Code',
      route: '/skills-matrix-visualization',
      transform: 'rotateY(270deg) translateZ(100px)',
      gradient: 'from-green-500 to-green-700'
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: 'Get In Touch',
      icon: 'MessageCircle',
      route: '/contact-portal-communication',
      transform: 'rotateX(90deg) translateZ(100px)',
      gradient: 'from-orange-500 to-orange-700'
    },
    {
      id: 'home',
      title: 'Home',
      subtitle: 'Welcome',
      icon: 'Home',
      route: '/hero-universe-navigation-hub',
      transform: 'rotateX(-90deg) translateZ(100px)',
      gradient: 'from-accent to-red-600'
    }
  ];

  useEffect(() => {
    const autoRotate = setInterval(() => {
      if (!isDragging) {
        setRotation(prev => ({
          x: prev.x,
          y: prev.y + 0.5
        }));
      }
    }, 50);

    return () => clearInterval(autoRotate);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - rotation.y,
      y: e.clientY - rotation.x
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setRotation({
      x: (e.clientY - dragStart.y) * 0.5,
      y: (e.clientX - dragStart.x) * 0.5
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleFaceClick = (route) => {
    navigate(route);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-80 h-80 lg:w-96 lg:h-96">
        {/* Cube Container */}
        <div
          ref={cubeRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
          onMouseDown={handleMouseDown}
        >
          <motion.div
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            }}
            animate={{
              rotateX: rotation.x,
              rotateY: rotation.y
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            {faces.map((face) => (
              <motion.div
                key={face.id}
                className={`absolute w-48 h-48 lg:w-52 lg:h-52 left-1/2 top-1/2 -ml-24 -mt-24 lg:-ml-26 lg:-mt-26 bg-gradient-to-br ${face.gradient} rounded-xl border border-white/20 cursor-pointer group hover:border-white/40 transition-all duration-300`}
                style={{
                  transform: face.transform,
                  backfaceVisibility: 'hidden'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(255, 0, 64, 0.4)'
                }}
                onClick={() => handleFaceClick(face.route)}
              >
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-300">
                    <Icon 
                      name={face.icon} 
                      size={32} 
                      className="text-white"
                    />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                    {face.title}
                  </h3>
                  <p className="font-inter text-sm text-white/80">
                    {face.subtitle}
                  </p>
                </div>
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Orbital rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border border-accent/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute inset-4 border border-cyber-blue/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-8 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NavigationCube;