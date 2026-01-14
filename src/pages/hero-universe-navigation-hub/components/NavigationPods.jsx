import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationPods = () => {
  const navigate = useNavigate();

  const pods = [
    {
      id: 'services',
      title: 'Services Galaxy',
      description: 'Explore my capabilities',
      icon: 'Zap',
      route: '/services-galaxy-exploration',
      position: { top: '15%', right: '10%' },
      color: 'from-cyber-blue to-blue-600',
      delay: 0.5
    },
    {
      id: 'portfolio',
      title: 'Portfolio Cosmos',
      description: 'View my projects',
      icon: 'Briefcase',
      route: '/portfolio-cosmos-case-studies',
      position: { top: '45%', left: '8%' },
      color: 'from-purple-500 to-purple-700',
      delay: 0.7
    },
    {
      id: 'skills',
      title: 'Skills Matrix',
      description: 'Technical expertise',
      icon: 'Code',
      route: '/skills-matrix-visualization',
      position: { bottom: '20%', right: '15%' },
      color: 'from-green-500 to-green-700',
      delay: 0.9
    },
    {
      id: 'contact',
      title: 'Contact Portal',
      description: 'Let\'s connect',
      icon: 'MessageCircle',
      route: '/contact-portal-communication',
      position: { bottom: '35%', left: '12%' },
      color: 'from-orange-500 to-orange-700',
      delay: 1.1
    }
  ];

  const handlePodClick = (route) => {
    navigate(route);
  };

  return (
    <>
      {pods.map((pod) => (
        <motion.div
          key={pod.id}
          className="absolute z-30 hidden lg:block"
          style={pod.position}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: pod.delay,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div
            className={`relative cursor-pointer group`}
            whileHover={{ 
              scale: 1.1,
              rotate: 5
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePodClick(pod.route)}
          >
            {/* Main pod */}
            <div className={`w-20 h-20 bg-gradient-to-br ${pod.color} rounded-full flex items-center justify-center border-2 border-white/20 group-hover:border-white/40 transition-all duration-300 shadow-lg`}>
              <Icon 
                name={pod.icon} 
                size={28} 
                className="text-white"
              />
            </div>

            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${pod.color} rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 -z-10`}></div>

            {/* Orbital ring */}
            <motion.div
              className="absolute inset-0 border border-white/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ 
                width: '120%', 
                height: '120%',
                left: '-10%',
                top: '-10%'
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
            </motion.div>

            {/* Tooltip */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full -top-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
            >
              <div className="bg-background/90 backdrop-blur-md border border-accent/20 rounded-lg px-3 py-2 text-center min-w-max">
                <p className="font-orbitron font-semibold text-sm text-foreground whitespace-nowrap">
                  {pod.title}
                </p>
                <p className="font-inter text-xs text-text-secondary whitespace-nowrap">
                  {pod.description}
                </p>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-background/90"></div>
            </motion.div>

            {/* Floating particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-60"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${20 + i * 30}%`
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

export default NavigationPods;