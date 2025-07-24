import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SkillNode from './SkillNode';
import SkillConnection from './SkillConnection';

const SkillNetwork3D = ({ 
  skills, 
  selectedSkill, 
  onSkillSelect, 
  onSkillHover, 
  onSkillLeave,
  viewMode = '3D',
  containerWidth = 800,
  containerHeight = 600
}) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Generate 3D positions for skills
  const skillPositions = useMemo(() => {
    const positions = {};
    const categories = [...new Set(skills.map(skill => skill.category))];
    const categoryAngles = categories.map((_, index) => (index / categories.length) * 2 * Math.PI);
    
    skills.forEach((skill, index) => {
      const categoryIndex = categories.indexOf(skill.category);
      const categoryAngle = categoryAngles[categoryIndex];
      const skillsInCategory = skills.filter(s => s.category === skill.category);
      const skillIndexInCategory = skillsInCategory.indexOf(skill);
      
      // Create layered circular arrangement
      const radius = 150 + (skill.proficiencyPercent / 100) * 100;
      const angleOffset = (skillIndexInCategory / skillsInCategory.length) * (Math.PI / 3);
      const angle = categoryAngle + angleOffset;
      
      const x = containerWidth / 2 + Math.cos(angle) * radius;
      const y = containerHeight / 2 + Math.sin(angle) * radius;
      const z = (skill.proficiencyPercent / 100) * 50; // Depth based on proficiency
      
      positions[skill.id] = { x, y, z, angle, radius };
    });
    
    return positions;
  }, [skills, containerWidth, containerHeight]);

  // Generate connections between related skills
  const connections = useMemo(() => {
    const conns = [];
    skills.forEach(skill => {
      if (skill.relatedTechnologies) {
        skill.relatedTechnologies.forEach(relatedTech => {
          const relatedSkill = skills.find(s => s.name.toLowerCase().includes(relatedTech.toLowerCase()));
          if (relatedSkill && relatedSkill.id !== skill.id) {
            conns.push({
              from: skill.id,
              to: relatedSkill.id,
              strength: 0.6,
              type: 'related'
            });
          }
        });
      }
    });
    return conns;
  }, [skills]);

  // Handle mouse interactions
  const handleMouseDown = (e) => {
    if (viewMode !== '3D') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || viewMode !== '3D') return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(2, prev * delta)));
  };

  const handleSkillHover = (skill) => {
    setHoveredSkill(skill);
    onSkillHover?.(skill);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
    onSkillLeave?.();
  };

  // Apply 3D transformations
  const apply3DTransform = (position) => {
    if (viewMode === '2D') return position;
    
    const { x, y, z } = position;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    
    // Translate to origin
    const translatedX = x - centerX;
    const translatedY = y - centerY;
    const translatedZ = z;
    
    // Apply rotations
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);
    
    // Rotate around Y axis
    const rotatedX = translatedX * cosY - translatedZ * sinY;
    const rotatedZ1 = translatedX * sinY + translatedZ * cosY;
    
    // Rotate around X axis
    const rotatedY = translatedY * cosX - rotatedZ1 * sinX;
    const rotatedZ2 = translatedY * sinX + rotatedZ1 * cosX;
    
    // Apply perspective and translate back
    const perspective = 1000;
    const scale = perspective / (perspective + rotatedZ2);
    
    return {
      x: centerX + rotatedX * scale * zoom,
      y: centerY + rotatedY * scale * zoom,
      z: rotatedZ2,
      scale: scale * zoom
    };
  };

  // Get connected skills
  const getConnectedSkills = (skillId) => {
    const connected = new Set();
    connections.forEach(conn => {
      if (conn.from === skillId) connected.add(conn.to);
      if (conn.to === skillId) connected.add(conn.from);
    });
    return connected;
  };

  const connectedSkills = selectedSkill ? getConnectedSkills(selectedSkill.id) : new Set();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isDragging, dragStart, viewMode]);

  return (
    <div className="relative bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-rajdhani font-semibold text-foreground">
              Skills Network
            </h3>
            <p className="text-sm text-text-secondary font-inter">
              {viewMode === '3D' ? 'Drag to rotate • Scroll to zoom' : 'Interactive 2D view'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-text-secondary">
              {skills.length} skills
            </div>
            {viewMode === '3D' && (
              <div className="text-xs text-text-secondary bg-surface px-2 py-1 rounded">
                Zoom: {Math.round(zoom * 100)}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Network Container */}
      <motion.div
        ref={containerRef}
        className={`relative bg-gradient-to-br from-background via-surface/20 to-background overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ 
          width: containerWidth, 
          height: containerHeight,
          background: viewMode === '3D' ?'radial-gradient(circle at center, rgba(255, 0, 64, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%)' :'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(26, 26, 26, 0.9) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Connections */}
        {connections.map((connection, index) => {
          const fromPos = skillPositions[connection.from];
          const toPos = skillPositions[connection.to];
          
          if (!fromPos || !toPos) return null;
          
          const transformedFromPos = apply3DTransform(fromPos);
          const transformedToPos = apply3DTransform(toPos);
          
          const isActive = selectedSkill && 
            (connection.from === selectedSkill.id || connection.to === selectedSkill.id);
          
          return (
            <SkillConnection
              key={`${connection.from}-${connection.to}-${index}`}
              startPos={transformedFromPos}
              endPos={transformedToPos}
              strength={connection.strength}
              isActive={isActive}
              connectionType={connection.type}
            />
          );
        })}

        {/* Skill Nodes */}
        {skills.map((skill) => {
          const position = skillPositions[skill.id];
          if (!position) return null;
          
          const transformedPosition = apply3DTransform(position);
          const isSelected = selectedSkill?.id === skill.id;
          const isConnected = connectedSkills.has(skill.id);
          
          return (
            <SkillNode
              key={skill.id}
              skill={skill}
              position={transformedPosition}
              isSelected={isSelected}
              isConnected={isConnected}
              onSelect={onSkillSelect}
              onHover={handleSkillHover}
              onLeave={handleSkillLeave}
              scale={transformedPosition.scale || 1}
            />
          );
        })}

        {/* Ambient Particles */}
        {viewMode === '3D' && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 bg-accent/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Center Glow Effect */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 64, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-surface/30">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Expert</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-cyber-blue rounded-full" />
              <span>Advanced</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span>Intermediate</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Beginner</span>
            </div>
          </div>
          <div className="text-text-secondary">
            {hoveredSkill ? `Hovering: ${hoveredSkill.name}` : 'Hover over skills to explore'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillNetwork3D;