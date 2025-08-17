// src/components/Skills/Skills.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiZap, FiTrendingUp, FiAward, FiCode, FiDatabase, FiCloud, FiTool, FiLayers } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.component.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('Frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const cards = gsap.utils.toArray('.skill-card-3d');
    
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          rotateY: -30,
          opacity: 0,
          x: -50,
        },
        {
          rotateY: 0,
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });
  }, [selectedCategory]);

  const skillCategories = {
    'Frontend': {
      icon: <FiCode />,
      color: 'skill-color-1',
      description: 'Creating immersive user experiences',
      skills: [
        {
          name: 'React.js',
          level: 95,
          years: 5,
          projects: 15,
          description: 'Built 15+ enterprise apps with 40% faster load times',
          highlights: ['Redux', 'Hooks', 'Context API', 'Next.js'],
        },
        {
          name: 'Angular',
          level: 92,
          years: 4,
          projects: 12,
          description: 'Migrated systems from v7 to v14, improving performance by 35%',
          highlights: ['RxJS', 'NgRx', 'Material', 'CDK'],
        },
        {
          name: 'TypeScript',
          level: 90,
          years: 4,
          projects: 20,
          description: 'Reduced runtime errors by 60% with type safety',
          highlights: ['Generics', 'Decorators', 'Interfaces', 'Enums'],
        },
        {
          name: 'Three.js/WebGL',
          level: 75,
          years: 2,
          projects: 5,
          description: 'Creating 3D web experiences and visualizations',
          highlights: ['Shaders', 'Geometries', 'Animations', 'Post-processing'],
        },
      ]
    },
    'Backend': {
      icon: <FiDatabase />,
      color: 'skill-color-2',
      description: 'Building scalable server architectures',
      skills: [
        {
          name: 'Node.js',
          level: 93,
          years: 5,
          projects: 18,
          description: 'Handled 10K+ concurrent connections with optimized event loops',
          highlights: ['Express', 'Fastify', 'NestJS', 'Microservices'],
        },
        {
          name: 'Python',
          level: 85,
          years: 3,
          projects: 8,
          description: 'Automated 30+ processes saving 200+ hours monthly',
          highlights: ['Django', 'Flask', 'FastAPI', 'Automation'],
        },
        {
          name: 'Java Spring',
          level: 88,
          years: 3,
          projects: 10,
          description: 'Developed microservices reducing response time by 20%',
          highlights: ['Spring Boot', 'JPA', 'Security', 'Cloud'],
        },
        {
          name: 'GraphQL',
          level: 82,
          years: 2,
          projects: 6,
          description: 'Reduced over-fetching by 25% improving mobile performance',
          highlights: ['Apollo', 'Subscriptions', 'Federation', 'Caching'],
        },
      ]
    },
    'Cloud & DevOps': {
      icon: <FiCloud />,
      color: 'skill-color-3',
      description: 'Orchestrating cloud infrastructure',
      skills: [
        {
          name: 'AWS',
          level: 87,
          years: 3,
          projects: 8,
          description: 'Deployed solutions reducing infrastructure costs by 30%',
          highlights: ['EC2', 'Lambda', 'S3', 'CloudFormation'],
        },
        {
          name: 'Docker/K8s',
          level: 85,
          years: 3,
          projects: 10,
          description: 'Orchestrated 20+ services with 99.95% availability',
          highlights: ['Helm', 'Istio', 'CI/CD', 'Monitoring'],
        },
        {
          name: 'GCP',
          level: 83,
          years: 2,
          projects: 5,
          description: 'Migrated infrastructure saving $5K monthly',
          highlights: ['Cloud Run', 'BigQuery', 'Firestore', 'Cloud Functions'],
        },
        {
          name: 'Terraform',
          level: 80,
          years: 2,
          projects: 4,
          description: 'Automated infrastructure provisioning with IaC',
          highlights: ['Modules', 'State Management', 'Providers', 'Workspaces'],
        },
      ]
    },
  };

  const categories = Object.keys(skillCategories);
  const currentCategory = skillCategories[selectedCategory];

  return (
    <section ref={sectionRef} id="skills" className="skills-section section">
      <motion.div 
        className="container"
        style={{ scale, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="title-gradient">Technical Arsenal</span>
          </h2>
          <p className="section-subtitle">
            Mastering the tools that shape tomorrow's web
          </p>
        </motion.div>

        <div className="skills-container">
          <motion.div 
            className="skills-sidebar"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''} ${skillCategories[category].color}`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="category-icon">{skillCategories[category].icon}</span>
                <div className="category-info">
                  <span className="category-name">{category}</span>
                  <span className="category-desc">{skillCategories[category].description}</span>
                </div>
                <motion.div 
                  className="category-indicator"
                  layoutId="category-indicator"
                  initial={false}
                  style={{ opacity: selectedCategory === category ? 1 : 0 }}
                />
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="skills-grid"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentCategory.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card-3d"
                  initial={{ opacity: 0, rotateY: -30 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                  }}
                >
                  <div className="skill-card-inner">
                    <div className="skill-card-front">
                      <div className="skill-header">
                        <h3 className="skill-name">{skill.name}</h3>
                        <div className="skill-stats">
                          <span className="skill-years">{skill.years} years</span>
                          <span className="skill-projects">{skill.projects} projects</span>
                        </div>
                      </div>

                      <div className="skill-level-container">
                        <div className="skill-level-bg">
                          <motion.div
                            className="skill-level-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                          <span className="skill-level-text">{skill.level}%</span>
                        </div>
                      </div>

                      <p className="skill-description">{skill.description}</p>

                      <div className="skill-highlights">
                        {skill.highlights.map((highlight, i) => (
                          <span key={i} className="highlight-tag">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`skill-card-glow ${currentCategory.color}`}></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="skills-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="skills-stats">
            <div className="stat-item">
              <span className="stat-number holographic">15+</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number holographic">50+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number holographic">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;