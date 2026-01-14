import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What\'s your typical project timeline?",
      answer: `Project timelines vary based on scope and complexity:\n\n• Simple websites: 2-4 weeks\n• Complex web applications: 6-12 weeks\n• Mobile applications: 8-16 weeks\n• Full brand identity: 4-8 weeks\n\nI provide detailed timelines during our initial consultation, including key milestones and delivery dates.`
    },
    {
      id: 2,
      question: "How do you handle project communication?",
      answer: `I believe in transparent, consistent communication:\n\n• Weekly progress updates via email\n• Slack/Discord for real-time collaboration\n• Video calls for major milestones\n• Shared project dashboard for tracking\n• 24-48 hour response time guarantee\n\nYou'll never wonder about your project's status.`
    },
    {
      id: 3,
      question: "What\'s included in your development process?",
      answer: `My comprehensive development process includes:\n\n• Discovery & strategy session\n• User experience design\n• Interactive prototyping\n• Agile development cycles\n• Quality assurance testing\n• Performance optimization\n• Launch support & training\n• 30-day post-launch support\n\nEvery project follows this proven methodology.`
    },
    {
      id: 4,
      question: "Do you work with international clients?",
      answer: `Absolutely! I work with clients worldwide:\n\n• Experience across 15+ countries\n• Flexible timezone accommodation\n• Multi-currency project pricing\n• Cultural design considerations\n• Remote collaboration expertise\n• Legal compliance awareness\n\nDistance is never a barrier to great work.`
    },
    {
      id: 5,
      question: "What technologies do you specialize in?",
      answer: `I specialize in cutting-edge technologies:\n\n• Frontend: React, Next.js, Vue.js, TypeScript\n• Backend: Node.js, Python, PostgreSQL\n• Mobile: React Native, Flutter\n• Design: Figma, Adobe Creative Suite\n• Cloud: AWS, Vercel, Netlify\n• Tools: Git, Docker, CI/CD pipelines\n\nI stay current with the latest industry trends.`
    },
    {
      id: 6,
      question: "How do you price your projects?",
      answer: `I offer flexible pricing models:\n\n• Fixed-price for defined scope projects\n• Hourly rates for ongoing work\n• Retainer agreements for long-term partnerships\n• Value-based pricing for strategic projects\n\nPricing depends on complexity, timeline, and value delivered. I provide detailed proposals with transparent breakdowns.`
    },
    {
      id: 7,
      question: "What happens after project completion?",
      answer: `Your success continues beyond launch:\n\n• 30-day warranty on all work\n• Comprehensive documentation\n• Training for your team\n• Ongoing maintenance options\n• Performance monitoring setup\n• Future enhancement planning\n\nI'm invested in your long-term success.`
    },
    {
      id: 8,
      question: "Can you help with existing projects?",
      answer: `Yes, I can assist with existing projects:\n\n• Code audits and optimization\n• Bug fixes and troubleshooting\n• Feature additions and enhancements\n• Performance improvements\n• Security updates\n• Technology migrations\n• Team augmentation\n\nI'll assess your current situation and provide the best path forward.`
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="font-orbitron font-bold text-2xl text-foreground mb-2">
          Frequently Asked Questions
        </h3>
        <p className="text-text-secondary">
          Everything you need to know about working together
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="holographic-card overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface/30 transition-colors duration-300"
            >
              <h4 className="font-rajdhani font-semibold text-lg text-foreground pr-4">
                {faq.question}
              </h4>
              <div className={`transition-transform duration-300 ${
                openFAQ === faq.id ? 'rotate-180' : ''
              }`}>
                <Icon 
                  name="ChevronDown" 
                  size={20} 
                  className="text-accent" 
                />
              </div>
            </button>

            <AnimatePresence>
              {openFAQ === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 border-t border-border">
                    <div className="pt-4">
                      <div className="text-text-secondary whitespace-pre-line leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="holographic-card p-6 text-center"
      >
        <div className="space-y-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-cyber-blue rounded-full flex items-center justify-center mx-auto electric-glow">
            <Icon name="MessageCircle" size={24} className="text-white" />
          </div>
          <div>
            <h4 className="font-rajdhani font-semibold text-lg text-foreground mb-2">
              Still have questions?
            </h4>
            <p className="text-text-secondary mb-4">
              I'm here to help clarify anything about the collaboration process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.href = 'mailto:hello@futureportfolio.com'}
                className="px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="Mail" size={16} />
                <span>Email Me</span>
              </button>
              <button
                onClick={() => window.open('https://calendly.com/futureportfolio/consultation', '_blank')}
                className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-white rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="Calendar" size={16} />
                <span>Schedule Call</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQSection;