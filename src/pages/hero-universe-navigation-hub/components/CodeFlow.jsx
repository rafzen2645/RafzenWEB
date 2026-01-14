import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeFlow = () => {
  const [activeSnippets, setActiveSnippets] = useState([]);

  const codeSnippets = [
    "const innovation = () => creativity + technology;",
    "function buildFuture() { return dreams.map(idea => reality); }",
    "class DigitalArtist extends Developer { create() { return magic; } }",
    "const portfolio = projects.filter(p => p.impact > 0);",
    "async function transformIdeas() { return await inspiration(); }",
    "const skills = ['React', 'Node.js', 'Design', 'Innovation'];",
    "export default function Vision() { return <Future />; }",
    "const experience = years.reduce((acc, year) => acc + learning, 0);"
  ];

  const designElements = [
    "{ color: '#ff0040', animation: 'glow 2s infinite' }",
    ".holographic { backdrop-filter: blur(10px); }",
    "@keyframes float { 0% { transform: translateY(0); } }",
    "grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));",
    "background: linear-gradient(45deg, #ff0040, #00d4ff);",
    "box-shadow: 0 0 20px rgba(255, 0, 64, 0.5);",
    "transform: perspective(1000px) rotateX(10deg);",
    "filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));"
  ];

  useEffect(() => {
    const createSnippet = () => {
      const isCode = Math.random() > 0.4;
      const content = isCode 
        ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        : designElements[Math.floor(Math.random() * designElements.length)];
      
      const snippet = {
        id: Date.now() + Math.random(),
        content,
        type: isCode ? 'code' : 'design',
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * window.innerHeight,
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.3 + Math.random() * 0.4
      };

      setActiveSnippets(prev => [...prev, snippet]);

      // Remove snippet after animation
      setTimeout(() => {
        setActiveSnippets(prev => prev.filter(s => s.id !== snippet.id));
      }, 8000);
    };

    const interval = setInterval(createSnippet, 2000);
    
    // Create initial snippets
    setTimeout(createSnippet, 1000);
    setTimeout(createSnippet, 3000);
    setTimeout(createSnippet, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      <AnimatePresence>
        {activeSnippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            className={`absolute font-jetbrains text-xs ${
              snippet.type === 'code' ?'text-cyber-blue/40' :'text-accent/30'
            } whitespace-nowrap select-none`}
            initial={{ 
              x: snippet.x,
              y: snippet.y,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              x: snippet.x + (snippet.direction * 200),
              y: snippet.y - 100,
              opacity: snippet.opacity,
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              scale: 0.6,
              y: snippet.y - 200
            }}
            transition={{ 
              duration: 8,
              ease: "linear"
            }}
            style={{
              textShadow: snippet.type === 'code' ?'0 0 10px rgba(0, 212, 255, 0.3)' :'0 0 10px rgba(255, 0, 64, 0.3)'
            }}
          >
            {snippet.content}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Static background elements */}
      <div className="absolute top-1/4 left-1/4 font-jetbrains text-xs text-white/10 transform -rotate-12">
        &lt;div className="future-portfolio"&gt;
      </div>
      
      <div className="absolute bottom-1/3 right-1/4 font-jetbrains text-xs text-white/10 transform rotate-12">
        &lt;/innovation&gt;
      </div>

      <div className="absolute top-1/2 left-1/6 font-jetbrains text-xs text-accent/20">
        // Building tomorrow's web
      </div>

      <div className="absolute bottom-1/4 left-1/3 font-jetbrains text-xs text-cyber-blue/20">
        /* Where creativity meets code */
      </div>

      {/* Floating geometric shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute w-2 h-2 border border-white/10"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
            transform: `rotate(${i * 45}deg)`
          }}
          animate={{
            rotate: [i * 45, i * 45 + 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default CodeFlow;