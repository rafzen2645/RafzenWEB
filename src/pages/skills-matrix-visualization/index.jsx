import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SkillNetwork3D from './components/SkillNetwork3D';
import SkillFilters from './components/SkillFilters';
import SkillDetails from './components/SkillDetails';
import SkillTimeline from './components/SkillTimeline';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SkillsMatrixVisualization = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProficiency, setSelectedProficiency] = useState('All');
  const [viewMode, setViewMode] = useState('3D');
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);
  const [showDetails, setShowDetails] = useState(false);

  // Mock Skills Data
  const allSkills = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      proficiency: 'Expert',
      proficiencyPercent: 95,
      experience: '5+ years',
      experienceYears: 5,
      icon: 'Zap',
      certified: true,
      description: `Advanced React development with deep expertise in hooks, context, performance optimization, and modern patterns. Extensive experience building scalable applications with complex state management and real-time features.`,
      recentProjects: [
        { name: 'E-commerce Platform', role: 'Lead Developer', year: '2024' },
        { name: 'Dashboard Analytics', role: 'Frontend Architect', year: '2023' },
        { name: 'Social Media App', role: 'Senior Developer', year: '2023' }
      ],
      relatedTechnologies: ['JavaScript', 'TypeScript', 'Redux', 'Next.js'],
      certifications: [
        { name: 'React Developer Certification', issuer: 'Meta', year: '2023' }
      ],
      learningTimeline: [
        { year: 2019, title: 'Started with React', description: 'First React project - Todo App' },
        { year: 2020, title: 'Hooks Mastery', description: 'Deep dive into React Hooks' },
        { year: 2021, title: 'Performance Optimization', description: 'Advanced optimization techniques' },
        { year: 2022, title: 'Context & State Management', description: 'Complex state patterns' },
        { year: 2023, title: 'React 18 Features', description: 'Concurrent features and Suspense' }
      ],
      lastUpdated: 'December 2024'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend',
      proficiency: 'Expert',
      proficiencyPercent: 90,
      experience: '4+ years',
      experienceYears: 4,
      icon: 'Code',
      certified: false,
      description: `Expert-level TypeScript development with advanced type system knowledge, generic programming, and enterprise-scale application architecture. Proficient in complex type definitions and utility types.`,
      recentProjects: [
        { name: 'Banking System', role: 'TypeScript Lead', year: '2024' },
        { name: 'API Gateway', role: 'Backend Developer', year: '2023' }
      ],
      relatedTechnologies: ['JavaScript', 'React', 'Node.js', 'Express'],
      learningTimeline: [
        { year: 2020, title: 'TypeScript Basics', description: 'Type annotations and interfaces' },
        { year: 2021, title: 'Advanced Types', description: 'Generics and utility types' },
        { year: 2022, title: 'Enterprise Patterns', description: 'Large-scale TypeScript architecture' },
        { year: 2023, title: 'Latest Features', description: 'TypeScript 5.0 features' }
      ],
      lastUpdated: 'November 2024'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      proficiency: 'Advanced',
      proficiencyPercent: 85,
      experience: '4+ years',
      experienceYears: 4,
      icon: 'Server',
      certified: true,
      description: `Advanced Node.js development with expertise in building scalable APIs, microservices, and real-time applications. Strong knowledge of async programming, streams, and performance optimization.`,
      recentProjects: [
        { name: 'Microservices Architecture', role: 'Backend Lead', year: '2024' },
        { name: 'Real-time Chat System', role: 'Full-stack Developer', year: '2023' }
      ],
      relatedTechnologies: ['Express', 'MongoDB', 'PostgreSQL', 'Redis'],
      certifications: [
        { name: 'Node.js Application Developer', issuer: 'OpenJS Foundation', year: '2023' }
      ],
      learningTimeline: [
        { year: 2020, title: 'Node.js Fundamentals', description: 'Basic server development' },
        { year: 2021, title: 'Express Framework', description: 'RESTful API development' },
        { year: 2022, title: 'Database Integration', description: 'MongoDB and PostgreSQL' },
        { year: 2023, title: 'Microservices', description: 'Distributed system architecture' }
      ],
      lastUpdated: 'December 2024'
    },
    {
      id: 'figma',
      name: 'Figma',
      category: 'Design',
      proficiency: 'Advanced',
      proficiencyPercent: 80,
      experience: '3+ years',
      experienceYears: 3,
      icon: 'Palette',
      certified: false,
      description: `Advanced Figma proficiency with expertise in design systems, prototyping, and collaborative design workflows. Experienced in creating complex interactive prototypes and maintaining design consistency.`,
      recentProjects: [
        { name: 'Design System', role: 'UI/UX Designer', year: '2024' },
        { name: 'Mobile App Prototype', role: 'Product Designer', year: '2023' }
      ],
      relatedTechnologies: ['Adobe XD', 'Sketch', 'Principle', 'Framer'],
      learningTimeline: [
        { year: 2021, title: 'Figma Basics', description: 'Interface design fundamentals' },
        { year: 2022, title: 'Advanced Prototyping', description: 'Interactive prototypes' },
        { year: 2023, title: 'Design Systems', description: 'Component libraries and tokens' }
      ],
      lastUpdated: 'October 2024'
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Backend',
      proficiency: 'Intermediate',
      proficiencyPercent: 70,
      experience: '2+ years',
      experienceYears: 2,
      icon: 'Code2',
      certified: false,
      description: `Intermediate Python development with focus on web development, data analysis, and automation. Experience with Django, Flask, and various Python libraries for different use cases.`,
      recentProjects: [
        { name: 'Data Analysis Tool', role: 'Python Developer', year: '2024' },
        { name: 'Automation Scripts', role: 'DevOps Engineer', year: '2023' }
      ],
      relatedTechnologies: ['Django', 'Flask', 'Pandas', 'NumPy'],
      learningTimeline: [
        { year: 2022, title: 'Python Fundamentals', description: 'Basic syntax and concepts' },
        { year: 2023, title: 'Web Frameworks', description: 'Django and Flask development' },
        { year: 2024, title: 'Data Science', description: 'Pandas and data analysis' }
      ],
      lastUpdated: 'September 2024'
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'Tools',
      proficiency: 'Advanced',
      proficiencyPercent: 82,
      experience: '3+ years',
      experienceYears: 3,
      icon: 'Package',
      certified: true,
      description: `Advanced Docker containerization with expertise in multi-stage builds, orchestration, and production deployments. Experience with Docker Compose, Kubernetes integration, and container optimization.`,
      recentProjects: [
        { name: 'Containerized Microservices', role: 'DevOps Engineer', year: '2024' },
        { name: 'CI/CD Pipeline', role: 'Infrastructure Lead', year: '2023' }
      ],
      relatedTechnologies: ['Kubernetes', 'Docker Compose', 'AWS ECS', 'Jenkins'],
      certifications: [
        { name: 'Docker Certified Associate', issuer: 'Docker Inc.', year: '2023' }
      ],
      learningTimeline: [
        { year: 2021, title: 'Docker Basics', description: 'Container fundamentals' },
        { year: 2022, title: 'Docker Compose', description: 'Multi-container applications' },
        { year: 2023, title: 'Production Deployment', description: 'Orchestration and scaling' }
      ],
      lastUpdated: 'November 2024'
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'Tools',
      proficiency: 'Intermediate',
      proficiencyPercent: 65,
      experience: '2+ years',
      experienceYears: 2,
      icon: 'Cloud',
      certified: true,
      description: `Intermediate AWS cloud services with experience in EC2, S3, Lambda, and RDS. Knowledge of cloud architecture patterns, serverless computing, and basic DevOps practices on AWS platform.`,
      recentProjects: [
        { name: 'Serverless API', role: 'Cloud Developer', year: '2024' },
        { name: 'Static Website Hosting', role: 'DevOps Engineer', year: '2023' }
      ],
      relatedTechnologies: ['Terraform', 'CloudFormation', 'Lambda', 'S3'],
      certifications: [
        { name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', year: '2023' }
      ],
      learningTimeline: [
        { year: 2022, title: 'AWS Fundamentals', description: 'Core services overview' },
        { year: 2023, title: 'Serverless Architecture', description: 'Lambda and API Gateway' },
        { year: 2024, title: 'Infrastructure as Code', description: 'Terraform and CloudFormation' }
      ],
      lastUpdated: 'December 2024'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Database',
      proficiency: 'Advanced',
      proficiencyPercent: 78,
      experience: '3+ years',
      experienceYears: 3,
      icon: 'Database',
      certified: false,
      description: `Advanced MongoDB database design and optimization with expertise in aggregation pipelines, indexing strategies, and replica sets. Experience with both traditional and modern MongoDB features.`,
      recentProjects: [
        { name: 'E-commerce Database', role: 'Database Developer', year: '2024' },
        { name: 'Analytics Platform', role: 'Backend Developer', year: '2023' }
      ],
      relatedTechnologies: ['Mongoose', 'Node.js', 'Express', 'Redis'],
      learningTimeline: [
        { year: 2021, title: 'MongoDB Basics', description: 'Document database concepts' },
        { year: 2022, title: 'Advanced Queries', description: 'Aggregation and indexing' },
        { year: 2023, title: 'Performance Optimization', description: 'Scaling and optimization' }
      ],
      lastUpdated: 'October 2024'
    },
    {
      id: 'flutter',
      name: 'Flutter',
      category: 'Mobile',
      proficiency: 'Beginner',
      proficiencyPercent: 45,
      experience: '1 year',
      experienceYears: 1,
      icon: 'Smartphone',
      certified: false,
      description: `Beginning Flutter development with basic understanding of Dart language and widget system. Currently learning mobile app development patterns and state management in Flutter.`,
      recentProjects: [
        { name: 'Todo Mobile App', role: 'Mobile Developer', year: '2024' }
      ],
      relatedTechnologies: ['Dart', 'Firebase', 'Provider', 'Bloc'],
      learningTimeline: [
        { year: 2024, title: 'Flutter Basics', description: 'Widget system and Dart language' }
      ],
      lastUpdated: 'August 2024'
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      category: 'Backend',
      proficiency: 'Intermediate',
      proficiencyPercent: 68,
      experience: '2+ years',
      experienceYears: 2,
      icon: 'Network',
      certified: false,
      description: `Intermediate GraphQL development with experience in schema design, resolvers, and client-side integration. Knowledge of Apollo Server, subscriptions, and performance optimization techniques.`,
      recentProjects: [
        { name: 'Social Media API', role: 'GraphQL Developer', year: '2024' },
        { name: 'Content Management System', role: 'Backend Developer', year: '2023' }
      ],
      relatedTechnologies: ['Apollo Server', 'Apollo Client', 'Node.js', 'React'],
      learningTimeline: [
        { year: 2022, title: 'GraphQL Fundamentals', description: 'Schema and resolvers' },
        { year: 2023, title: 'Advanced Features', description: 'Subscriptions and caching' }
      ],
      lastUpdated: 'September 2024'
    }
  ];

  // Timeline data for skill development
  const timelineData = allSkills.flatMap(skill => 
    skill.learningTimeline.map(milestone => ({
      ...milestone,
      skillName: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon
    }))
  );

  // Filter skills based on selected filters
  const filteredSkills = allSkills.filter(skill => {
    const categoryMatch = selectedCategory === 'All' || skill.category === selectedCategory;
    const proficiencyMatch = selectedProficiency === 'All' || skill.proficiency === selectedProficiency;
    return categoryMatch && proficiencyMatch;
  });

  // Get unique categories and proficiency levels
  const categories = ['All', ...new Set(allSkills.map(skill => skill.category))];
  const proficiencyLevels = ['All', 'Expert', 'Advanced', 'Intermediate', 'Beginner'];

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setShowDetails(true);
  };

  const handleSkillHover = (skill) => {
    setHoveredSkill(skill);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedProficiency('All');
    setSelectedSkill(null);
    setShowDetails(false);
  };

  const handleViewProjects = (skill) => {
    // Navigate to portfolio with skill filter
    window.location.href = `/portfolio-cosmos-case-studies?skill=${skill.name}`;
  };

  // Calculate stats
  const stats = {
    totalSkills: allSkills.length,
    expertSkills: allSkills.filter(s => s.proficiency === 'Expert').length,
    categories: categories.length - 1, // Exclude 'All'
    certifications: allSkills.filter(s => s.certified).length,
    averageProficiency: Math.round(
      allSkills.reduce((sum, skill) => sum + skill.proficiencyPercent, 0) / allSkills.length
    )
  };

  return (
    <>
      <Helmet>
        <title>Skills Matrix Visualization - FuturePortfolio</title>
        <meta name="description" content="Interactive 3D visualization of technical skills and competencies with detailed proficiency tracking and learning timeline." />
        <meta name="keywords" content="skills, visualization, 3D, interactive, proficiency, technology, development" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-cyber-blue/5" />
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-1 h-1 bg-accent/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
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

            <div className="relative max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-foreground mb-6">
                  Skills
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyber-blue ml-4">
                    Matrix
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary font-inter max-w-3xl mx-auto mb-8">
                  Navigate through an interactive 3D visualization of technical competencies, 
                  learning journeys, and skill interconnections in the digital universe.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {[
                  { label: 'Total Skills', value: stats.totalSkills, icon: 'Target', color: 'text-accent' },
                  { label: 'Expert Level', value: stats.expertSkills, icon: 'Award', color: 'text-accent' },
                  { label: 'Categories', value: stats.categories, icon: 'Grid3X3', color: 'text-cyber-blue' },
                  { label: 'Certified', value: stats.certifications, icon: 'Shield', color: 'text-success' },
                  { label: 'Avg Proficiency', value: `${stats.averageProficiency}%`, icon: 'TrendingUp', color: 'text-warning' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface border border-border mb-3 ${stat.color}`}>
                      <Icon name={stat.icon} size={24} />
                    </div>
                    <div className="text-2xl font-orbitron font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-secondary font-inter">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setShowTimeline(!showTimeline)}
                  iconName="Clock"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 font-rajdhani font-semibold"
                >
                  {showTimeline ? 'Hide' : 'Show'} Learning Timeline
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setViewMode(viewMode === '3D' ? '2D' : '3D')}
                  iconName={viewMode === '3D' ? 'Grid3X3' : 'Box'}
                  iconPosition="left"
                  className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-white"
                >
                  Switch to {viewMode === '3D' ? '2D' : '3D'} View
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Skills Visualization Section */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <SkillFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    proficiencyLevels={proficiencyLevels}
                    selectedProficiency={selectedProficiency}
                    onProficiencyChange={setSelectedProficiency}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onResetFilters={handleResetFilters}
                  />
                </motion.div>

                {/* Main Visualization */}
                <motion.div
                  className="lg:col-span-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <SkillNetwork3D
                    skills={filteredSkills}
                    selectedSkill={selectedSkill}
                    onSkillSelect={handleSkillSelect}
                    onSkillHover={handleSkillHover}
                    onSkillLeave={handleSkillLeave}
                    viewMode={viewMode}
                    containerWidth={800}
                    containerHeight={600}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          {showTimeline && (
            <section className="py-20 px-6 lg:px-8 bg-surface/20">
              <div className="max-w-7xl mx-auto">
                <SkillTimeline
                  timelineData={timelineData}
                  currentYear={currentYear}
                  onYearChange={setCurrentYear}
                  isVisible={showTimeline}
                />
              </div>
            </section>
          )}

          {/* Current Focus Section */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-foreground mb-6">
                  Current Learning
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyber-blue ml-3">
                    Focus
                  </span>
                </h2>
                <p className="text-lg text-text-secondary font-inter mb-12">
                  Continuously evolving and expanding the skill matrix with cutting-edge technologies
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Next.js 14',
                    description: 'Advanced React framework with App Router and Server Components',
                    progress: 75,
                    icon: 'Zap',
                    category: 'Frontend',
                    timeline: 'Q1 2024'
                  },
                  {
                    name: 'Three.js',
                    description: '3D graphics and WebGL for immersive web experiences',
                    progress: 45,
                    icon: 'Box',
                    category: 'Frontend',
                    timeline: 'Q2 2024'
                  },
                  {
                    name: 'Kubernetes',
                    description: 'Container orchestration and cloud-native deployment',
                    progress: 30,
                    icon: 'Cloud',
                    category: 'DevOps',
                    timeline: 'Q3 2024'
                  }
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-cyber-blue flex items-center justify-center mb-4 mx-auto">
                      <Icon name={skill.icon} size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-rajdhani font-semibold text-foreground mb-2">
                      {skill.name}
                    </h3>
                    <p className="text-text-secondary font-inter text-sm mb-4">
                      {skill.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-inter text-text-secondary">Progress</span>
                        <span className="text-sm font-inter font-medium text-foreground">
                          {skill.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-cyber-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-xs text-text-secondary">
                        <span>{skill.category}</span>
                        <span>{skill.timeline}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Skill Details Modal */}
        <SkillDetails
          skill={selectedSkill}
          isVisible={showDetails}
          onClose={() => {
            setShowDetails(false);
            setSelectedSkill(null);
          }}
          onViewProjects={handleViewProjects}
        />
      </div>
    </>
  );
};

export default SkillsMatrixVisualization;