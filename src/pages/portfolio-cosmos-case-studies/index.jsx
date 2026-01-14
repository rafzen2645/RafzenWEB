import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import CategoryFilter from './components/CategoryFilter';
import ProjectModal from './components/ProjectModal';
import StatsSection from './components/StatsSection';
import TestimonialCarousel from './components/TestimonialCarousel';

const PortfolioCosmosCaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "NeuroCommerce Platform",
      subtitle: "AI-Powered E-commerce Revolution",
      category: "E-commerce",
      categoryColor: "bg-accent/20 text-accent border border-accent/30",
      description: "A next-generation e-commerce platform that uses AI to personalize shopping experiences and optimize conversion rates through advanced machine learning algorithms.",
      fullDescription: `NeuroCommerce represents the future of online retail, combining cutting-edge artificial intelligence with intuitive user experience design. This platform revolutionizes how customers discover, evaluate, and purchase products by creating personalized shopping journeys that adapt in real-time to user behavior and preferences.\n\nThe system employs advanced machine learning algorithms to analyze customer interactions, predict preferences, and optimize the entire shopping funnel. From personalized product recommendations to dynamic pricing strategies, every aspect of the platform is designed to maximize both customer satisfaction and business performance.`,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "Redis", "AWS"],
      year: "2024",
      liveUrl: "https://neurocommerce-demo.com",
      githubUrl: "https://github.com/example/neurocommerce",
      isNew: true,
      metrics: {
        performance: "98%",
        users: "50K+",
        rating: "4.9"
      },
      features: [
        "AI-powered product recommendations",
        "Real-time inventory management",
        "Advanced analytics dashboard",
        "Multi-currency support",
        "Mobile-first responsive design",
        "Integrated payment gateway"
      ],
      testimonial: {
        quote: "The NeuroCommerce platform transformed our online business completely. Sales increased by 300% within the first quarter.",
        author: "Sarah Johnson",
        position: "CEO, RetailTech Solutions",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      process: [
        {
          title: "Discovery & Research",
          description: "Conducted comprehensive market research and user interviews to understand pain points in current e-commerce solutions."
        },
        {
          title: "AI Model Development",
          description: "Developed and trained custom machine learning models for product recommendations and user behavior prediction."
        },
        {
          title: "UI/UX Design",
          description: "Created intuitive interfaces that seamlessly integrate AI features without overwhelming the user experience."
        },
        {
          title: "Development & Testing",
          description: "Built the platform using modern technologies with extensive testing for performance and reliability."
        },
        {
          title: "Deployment & Optimization",
          description: "Deployed to cloud infrastructure with continuous monitoring and optimization based on real user data."
        }
      ],
      techStack: {
        frontend: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
        backend: ["Node.js", "Express", "TensorFlow.js", "MongoDB", "Redis"],
        tools: ["AWS", "Docker", "GitHub Actions", "Figma", "Analytics"]
      },
      results: {
        conversionRate: "45%",
        pageLoadTime: "1.2s",
        userEngagement: "85%",
        customerSatisfaction: "4.9/5"
      },
      achievements: [
        "Increased conversion rates by 45% compared to previous platform",
        "Reduced page load times by 60% through optimization",
        "Achieved 99.9% uptime with robust infrastructure",
        "Won \'Best E-commerce Innovation\' award at TechCrunch Disrupt"
      ]
    },
    {
      id: 2,
      title: "CloudSync SaaS Dashboard",
      subtitle: "Enterprise Data Management Solution",
      category: "SaaS",
      categoryColor: "bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30",
      description: "A comprehensive SaaS platform for enterprise data management with real-time analytics, team collaboration tools, and advanced security features.",
      fullDescription: `CloudSync represents the pinnacle of enterprise data management, offering a unified platform that seamlessly integrates data from multiple sources while providing powerful analytics and collaboration tools. Built for modern enterprises that need to make data-driven decisions quickly and securely.\n\nThe platform features advanced data visualization capabilities, real-time collaboration tools, and enterprise-grade security measures. With its intuitive interface and powerful backend, CloudSync enables teams to work more efficiently while maintaining complete control over their data assets.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker", "Kubernetes", "GCP"],
      year: "2024",
      liveUrl: "https://cloudsync-demo.com",
      githubUrl: null,
      isNew: false,
      metrics: {
        performance: "95%",
        users: "25K+",
        rating: "4.8"
      },
      features: [
        "Real-time data synchronization",
        "Advanced analytics dashboard",
        "Team collaboration tools",
        "Enterprise security compliance",
        "API integration capabilities",
        "Custom reporting system"
      ],
      testimonial: {
        quote: "CloudSync has revolutionized how we handle enterprise data. The real-time analytics have been game-changing for our decision-making process.",
        author: "Michael Chen",
        position: "CTO, DataFlow Corp",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      process: [
        {
          title: "Requirements Analysis",
          description: "Analyzed complex enterprise data management requirements and compliance needs."
        },
        {
          title: "Architecture Design",
          description: "Designed scalable microservices architecture to handle large-scale data processing."
        },
        {
          title: "Security Implementation",
          description: "Implemented enterprise-grade security measures including encryption and access controls."
        },
        {
          title: "Dashboard Development",
          description: "Created intuitive dashboards with advanced data visualization capabilities."
        },
        {
          title: "Testing & Deployment",
          description: "Conducted extensive testing and deployed using containerized infrastructure."
        }
      ],
      techStack: {
        frontend: ["Vue.js 3", "TypeScript", "D3.js", "Vuetify"],
        backend: ["Python", "FastAPI", "PostgreSQL", "Redis", "Celery"],
        tools: ["Docker", "Kubernetes", "GCP", "GitLab CI", "Grafana"]
      },
      results: {
        dataProcessing: "10TB/day",
        responseTime: "200ms",
        uptime: "99.9%",
        userAdoption: "92%"
      },
      achievements: [
        "Successfully migrated 500+ enterprise clients to the new platform",
        "Achieved SOC 2 Type II compliance certification",
        "Reduced data processing time by 70%",
        "Maintained 99.9% uptime throughout the migration period"
      ]
    },
    {
      id: 3,
      title: "Quantum Brand Experience",
      subtitle: "Immersive Digital Brand Platform",
      category: "Brand Website",
      categoryColor: "bg-success/20 text-success border border-success/30",
      description: "A cutting-edge brand website that combines 3D animations, interactive storytelling, and immersive user experiences to create a memorable digital presence.",
      fullDescription: `Quantum Brand Experience pushes the boundaries of what's possible in web design, creating an immersive digital environment that tells the brand story through interactive 3D elements, smooth animations, and engaging user interactions.\n\nThis project showcases the perfect blend of artistic vision and technical excellence, featuring WebGL-powered 3D graphics, physics-based animations, and responsive design that works seamlessly across all devices. The result is a digital experience that not only looks stunning but also drives meaningful engagement and conversions.`,
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
      ],
      technologies: ["Three.js", "React", "GSAP", "WebGL", "Blender", "Netlify"],
      year: "2023",
      liveUrl: "https://quantum-brand-demo.com",
      githubUrl: "https://github.com/example/quantum-brand",
      isNew: false,
      metrics: {
        performance: "92%",
        users: "15K+",
        rating: "4.7"
      },
      features: [
        "3D interactive elements",
        "Physics-based animations",
        "Immersive storytelling",
        "Responsive 3D design",
        "Performance optimization",
        "Cross-browser compatibility"
      ],
      testimonial: {
        quote: "The Quantum Brand Experience exceeded all our expectations. It's not just a website, it's a digital art piece that perfectly represents our brand.",author: "Emily Rodriguez",position: "Creative Director, Quantum Studios",avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      process: [
        {
          title: "Creative Concept",description: "Developed the creative vision and 3D design concepts that would bring the brand to life."
        },
        {
          title: "3D Asset Creation",description: "Created custom 3D models and animations using Blender and optimized them for web performance."
        },
        {
          title: "WebGL Development",description: "Implemented interactive 3D scenes using Three.js with custom shaders and lighting."
        },
        {
          title: "Animation System",description: "Built sophisticated animation system using GSAP for smooth, performant interactions."
        },
        {
          title: "Optimization & Launch",description: "Optimized for performance across devices and deployed with global CDN distribution."
        }
      ],
      techStack: {
        frontend: ["React", "Three.js", "GSAP", "WebGL", "CSS3"],
        backend: ["Node.js", "Express", "MongoDB"],
        tools: ["Blender", "Figma", "Webpack", "Netlify", "Google Analytics"]
      },
      results: {
        engagement: "300%",bounceRate: "25%",loadTime: "2.1s",mobileScore: "89/100"
      },
      achievements: [
        "Featured in Awwwards Site of the Day","Increased brand engagement by 300%","Achieved 89/100 mobile performance score","Won CSS Design Awards for innovation"
      ]
    },
    {
      id: 4,
      title: "NeuralFit Mobile App",subtitle: "AI-Powered Fitness Companion",category: "Mobile App",categoryColor: "bg-warning/20 text-warning border border-warning/30",description: "An intelligent fitness mobile application that uses AI to create personalized workout plans, track progress, and provide real-time form corrections.",
      fullDescription: `NeuralFit represents the future of personal fitness, combining artificial intelligence with mobile technology to create a truly personalized fitness experience. The app uses advanced computer vision and machine learning to analyze user movements, provide real-time feedback, and adapt workout plans based on progress and preferences.\n\nWith features like AI-powered form correction, personalized nutrition recommendations, and social challenges, NeuralFit makes fitness accessible, engaging, and effective for users of all fitness levels.`,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1434596922112-19c563067271?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop"
      ],
      technologies: ["React Native", "TensorFlow", "Firebase", "Node.js", "MongoDB", "AWS"],
      year: "2023",liveUrl: "https://neuralfit-app.com",githubUrl: "https://github.com/example/neuralfit",
      isNew: true,
      metrics: {
        performance: "94%",users: "100K+",rating: "4.8"
      },
      features: [
        "AI-powered form correction","Personalized workout plans","Real-time progress tracking","Social fitness challenges","Nutrition recommendations","Wearable device integration"
      ],
      testimonial: {
        quote: "NeuralFit has completely transformed my fitness journey. The AI form correction is incredibly accurate and has helped me avoid injuries.",author: "David Park",position: "Fitness Enthusiast",avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      process: [
        {
          title: "Market Research",description: "Conducted extensive research on fitness app market and user pain points."
        },
        {
          title: "AI Model Training",description: "Developed and trained computer vision models for exercise form recognition."
        },
        {
          title: "Mobile Development",description: "Built cross-platform mobile app with native performance and smooth animations."
        },
        {
          title: "Backend Integration",description: "Implemented robust backend system for user data, AI processing, and social features."
        },
        {
          title: "Testing & Launch",description: "Conducted beta testing with fitness professionals and launched on app stores."
        }
      ],
      techStack: {
        frontend: ["React Native", "TypeScript", "Redux", "React Navigation"],
        backend: ["Node.js", "Express", "MongoDB", "TensorFlow", "Socket.io"],
        tools: ["Firebase", "AWS", "Xcode", "Android Studio", "Figma"]
      },
      results: {
        downloads: "100K+",retention: "78%",rating: "4.8/5",engagement: "45min/day"
      },
      achievements: [
        "Reached 100K+ downloads within 6 months of launch","Achieved 78% user retention rate after 30 days","Featured in App Store \'Apps We Love\' section","Won \'Best Health & Fitness App\' at Mobile App Awards"
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: 'Grid3X3', count: projects.length },
    { id: 'E-commerce', name: 'E-commerce', icon: 'ShoppingCart', count: projects.filter(p => p.category === 'E-commerce').length },
    { id: 'SaaS', name: 'SaaS', icon: 'Cloud', count: projects.filter(p => p.category === 'SaaS').length },
    { id: 'Brand Website', name: 'Brand Sites', icon: 'Palette', count: projects.filter(p => p.category === 'Brand Website').length },
    { id: 'Mobile App', name: 'Mobile Apps', icon: 'Smartphone', count: projects.filter(p => p.category === 'Mobile App').length }
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (activeCategory === 'all') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(project => project.category === activeCategory));
      }
      setIsLoading(false);
    }, 300);
  }, [activeCategory]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Helmet>
        <title>Portfolio Cosmos - Case Studies | FuturePortfolio</title>
        <meta name="description" content="Explore our immersive portfolio of cutting-edge projects including e-commerce platforms, SaaS solutions, brand websites, and mobile applications." />
        <meta name="keywords" content="portfolio, case studies, web development, mobile apps, e-commerce, SaaS, brand websites" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-background via-surface/10 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                <Icon name="Briefcase" size={16} className="text-accent" />
                <span className="font-inter text-sm text-accent">Portfolio Showcase</span>
              </div>
              
              <h1 className="font-orbitron font-bold text-4xl lg:text-6xl text-foreground mb-6">
                Portfolio <span className="text-accent neon-text">Cosmos</span>
              </h1>
              
              <p className="text-text-secondary font-inter text-lg lg:text-xl max-w-3xl mx-auto mb-8">
                Journey through our digital universe of innovative projects. Each case study represents a unique exploration into the future of web technology, where creativity meets cutting-edge development.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Rocket"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow"
                >
                  Explore Projects
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="border-accent/30 text-accent hover:bg-accent hover:text-white"
                >
                  Start Your Project
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                    <div className="h-48 bg-surface/50 rounded-lg mb-4"></div>
                    <div className="h-4 bg-surface/50 rounded mb-2"></div>
                    <div className="h-3 bg-surface/30 rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 w-16 bg-surface/30 rounded"></div>
                      <div className="h-6 w-16 bg-surface/30 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div key={project.id} onClick={() => handleProjectClick(project)}>
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </div>
            )}

            {filteredProjects.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-xl text-foreground mb-2">
                  No Projects Found
                </h3>
                <p className="text-text-secondary font-inter">
                  Try selecting a different category to explore more projects.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials */}
        <TestimonialCarousel />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-accent/10 via-background to-cyber-blue/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-orbitron font-bold text-3xl lg:text-4xl text-foreground mb-6">
              Ready to Create Your <span className="text-accent neon-text">Digital Masterpiece</span>?
            </h2>
            <p className="text-text-secondary font-inter text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with cutting-edge technology and innovative design solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-white font-rajdhani font-semibold electric-glow"
              >
                Start Your Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-background"
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />

        {/* Footer */}
        <footer className="py-12 border-t border-border bg-surface/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-cyber-blue rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" size={16} className="text-white" />
                </div>
                <span className="font-orbitron font-bold text-foreground">Portfolio Cosmos</span>
              </div>
              <div className="text-text-secondary font-inter text-sm">
                © {new Date().getFullYear()} FuturePortfolio. Crafting digital experiences that inspire.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PortfolioCosmosCaseStudies;