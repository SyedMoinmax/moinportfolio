import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.component.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const cards = gsap.utils.toArray('.experience-card');
    
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: isMobile ? 20 : 50,
          x: isMobile ? 0 : -30,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: isMobile ? 0.4 : 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: isMobile ? 'top 95%' : 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: isMobile ? 0 : index * 0.1,
        }
      );
    });
  }, []);

  const experiences = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'Vosyn',
      location: 'Etobicoke, Canada',
      period: 'August 2024 – March 2025',
      type: 'Full-time',
      achievements: [
        { text: 'Built secure user management system with React/Node.js', metric: '35% faster' },
        { text: 'Integrated GraphQL replacing REST', metric: '25% reduction' },
        { text: 'Migrated from AWS to GCP with Kubernetes', metric: '15% cost savings' },
        { text: 'Achieved comprehensive test coverage', metric: '85% coverage' }
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'GCP', 'Kubernetes']
    },
    {
      id: 2,
      title: 'Software Developer',
      company: 'Codesaaz',
      location: 'Islamabad, Pakistan',
      period: 'July 2020 – October 2023',
      type: 'Full-time',
      achievements: [
        { text: 'Upgraded Angular application from v7 to v14', metric: '35% faster' },
        { text: 'Built CI/CD pipelines with Jenkins', metric: '30% fewer errors' },
        { text: 'Optimized database queries', metric: '20% faster' },
        { text: 'Enhanced WCAG 2.1 accessibility', metric: '100% compliant' }
      ],
      technologies: ['Angular', 'Java Spring Boot', 'Jenkins', 'MySQL', 'Material UI']
    },
    {
      id: 3,
      title: 'Junior Software Developer',
      company: 'Mercurial Minds',
      location: 'Islamabad, Pakistan',
      period: 'June 2019 – September 2019',
      type: 'Internship',
      achievements: [
        { text: 'Created responsive Angular components', metric: 'Optimized' },
        { text: 'Developed Python RPA scripts', metric: 'Automated' },
        { text: 'Built React Native applications', metric: 'Cross-platform' }
      ],
      technologies: ['Angular', 'React Native', 'Python', 'Redux']
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="experience-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Professional Journey</h2>
          <p className="section-subtitle">Building impactful solutions across industries</p>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="experience-dot">
                <FiBriefcase />
              </div>
              
              <div className="experience-content">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">{exp.title}</h3>
                    <h4 className="experience-company">{exp.company}</h4>
                  </div>
                  <span className="experience-type">{exp.type}</span>
                </div>

                <div className="experience-meta">
                  <span className="meta-item">
                    <FiCalendar /> {exp.period}
                  </span>
                  <span className="meta-item">
                    <FiMapPin /> {exp.location}
                  </span>
                </div>

                <div className="experience-achievements">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="achievement">
                      <FiArrowRight className="achievement-icon" />
                      <span className="achievement-text">{achievement.text}</span>
                      <span className="achievement-metric">{achievement.metric}</span>
                    </div>
                  ))}
                </div>

                <div className="experience-tech">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;