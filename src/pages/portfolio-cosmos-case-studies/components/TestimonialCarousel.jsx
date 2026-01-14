import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      quote: `Working with this team was an absolute game-changer for our business. The attention to detail and innovative approach exceeded all our expectations. The final product not only looked stunning but performed flawlessly across all devices.`,
      author: "Sarah Chen",
      position: "CEO, TechFlow Solutions",
      company: "TechFlow",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "E-commerce Platform"
    },
    {
      id: 2,
      quote: `The level of professionalism and technical expertise demonstrated throughout our project was remarkable. They transformed our complex requirements into an elegant, user-friendly solution that our customers absolutely love.`,
      author: "Michael Rodriguez",
      position: "Product Manager, InnovateLab",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "SaaS Dashboard"
    },
    {
      id: 3,
      quote: `From concept to deployment, every phase was handled with precision and creativity. The team's ability to understand our vision and translate it into a powerful digital experience was truly impressive.`,
      author: "Emily Watson",
      position: "Marketing Director, BrandForge",
      company: "BrandForge",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Brand Website"
    },
    {
      id: 4,
      quote: `The mobile app they developed for us has been a tremendous success. The user interface is intuitive, the performance is exceptional, and our user engagement has increased by 300% since launch.`,
      author: "David Kim",
      position: "Founder, AppVenture",
      company: "AppVenture",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      project: "Mobile Application"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-surface/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-orbitron font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Client <span className="text-accent neon-text">Testimonials</span>
          </h2>
          <p className="text-text-secondary font-inter text-lg max-w-2xl mx-auto">
            Hear what our clients say about their experience working with us
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 holographic-card">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-12 h-12 bg-accent/20 border border-accent/30 rounded-full flex items-center justify-center">
                        <Icon name="Quote" size={24} className="text-accent" />
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex justify-center space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Icon key={index} name="Star" size={20} className="text-warning fill-current" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-center text-text-secondary font-inter text-lg lg:text-xl leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                      />
                      <div className="text-center sm:text-left">
                        <div className="font-rajdhani font-bold text-foreground text-lg">
                          {testimonial.author}
                        </div>
                        <div className="text-text-secondary font-inter text-sm">
                          {testimonial.position}
                        </div>
                        <div className="text-accent font-inter text-sm font-medium">
                          {testimonial.company}
                        </div>
                      </div>
                      <div className="hidden sm:block w-px h-12 bg-border"></div>
                      <div className="text-center">
                        <div className="text-xs font-inter text-text-secondary mb-1">Project</div>
                        <div className="font-rajdhani font-semibold text-foreground text-sm">
                          {testimonial.project}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-3 bg-background/80 border border-border rounded-full text-foreground hover:bg-surface hover:electric-glow transition-all duration-300"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-3 bg-background/80 border border-border rounded-full text-foreground hover:bg-surface hover:electric-glow transition-all duration-300"
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent electric-glow' :'bg-border hover:bg-text-secondary'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-text-secondary text-xs font-inter">
              <Icon 
                name={isAutoPlaying ? "Play" : "Pause"} 
                size={12} 
                className={isAutoPlaying ? "text-success" : "text-warning"}
              />
              <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;