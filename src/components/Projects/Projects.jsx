import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiArrowUpRight, FiCode, FiGlobe, FiLayers, FiStar } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.component.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      id: 'role-based-access',
      title: 'Role-Based Access Control',
      shortDesc: 'Enterprise authentication system with OAuth 2.0',
      category: 'Full Stack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'GCP', 'OAuth 2.0', 'Nginx'],
      liveUrl: 'https://acquarius.vosyn.ai',
      githubUrl: null,
      image: '/project-images/vosyn.png', // Add project screenshots
      metrics: {
        performance: '95%',
        users: '10K+',
        uptime: '99.9%'
      },
      featured: true
    },
    {
      id: 'coles-mobile',
      title: 'Coles Mobile Platform',
      shortDesc: 'Telecommunications platform serving 100K+ users',
      category: 'Enterprise',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'Jenkins', 'AWS'],
      liveUrl: 'https://www.colesmobile.com.au',
      githubUrl: null,
      image: '/project-images/coles.png',
      metrics: {
        performance: '92%',
        scale: '100K+',
        reduction: '25%'
      },
      featured: true
    },
    {
      id: 'catch-connect',
      title: 'Catch Connect Platform',
      shortDesc: 'Modern telco solution with microservices',
      category: 'Enterprise',
      technologies: ['Angular 14', 'Microservices', 'Jenkins', 'Docker'],
      liveUrl: 'https://www.catchconnect.com.au',
      githubUrl: null,
      image: '/project-images/catch.png',
      metrics: {
        improvement: '35%',
        defects: '-30%',
        speed: '2x'
      },
      featured: true
    },
    {
      id: 'vpn-config',
      title: 'VPN Configuration System',
      shortDesc: 'Secure network management platform',
      category: 'Security',
      technologies: ['Next.js', 'Python', 'Docker', 'PostgreSQL'],
      liveUrl: null,
      githubUrl: null,
      image: '/project-images/vpn.png',
      metrics: {
        security: '100%',
        uptime: '99.9%'
      }
    },
    {
      id: 'data-viz',
      title: 'Data Visualization Dashboard',
      shortDesc: 'Real-time analytics with D3.js',
      category: 'Frontend',
      technologies: ['React', 'D3.js', 'WebSocket', 'Node.js'],
      liveUrl: null,
      githubUrl: null,
      image: '/project-images/dashboard.png',
      metrics: {
        dataPoints: '10K/s',
        charts: '20+'
      }
    },
    {
      id: 'automation',
      title: 'Process Automation Suite',
      shortDesc: 'Python RPA solution for enterprise',
      category: 'Automation',
      technologies: ['Python', 'Selenium', 'Docker', 'PostgreSQL'],
      liveUrl: null,
      githubUrl: null,
      image: '/project-images/automation.png',
      metrics: {
        automated: '30+',
        saved: '200h/mo'
      }
    }
  ];

  const categories = ['All', 'Full Stack', 'Enterprise', 'Frontend', 'Security', 'Automation'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section ref={sectionRef} id="projects" className="projects-section section">
      <motion.div 
        className="container"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="projects-header"
        >
          <h2 className="section-title">
            <span className="title-main">Featured Projects</span>
            <span className="title-sub">Crafting digital excellence</span>
          </h2>
        </motion.div>

        <motion.div 
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span>{category}</span>
              {selectedCategory === category && (
                <motion.div 
                  className="tab-indicator"
                  layoutId="tab-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="projects-grid"
            key={selectedCategory}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-image-container">
                  <div className="project-image-wrapper">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="project-image" />
                    ) : (
                      <div className="project-image-placeholder">
                        <FiLayers />
                      </div>
                    )}
                    <div className="project-overlay">
                      <div className="project-actions">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-action-btn"
                            aria-label="View live project"
                          >
                            <FiGlobe />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-action-btn"
                            aria-label="View source code"
                          >
                            <FiGithub />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {project.featured && (
                    <div className="project-badge">
                      <FiStar /> Featured
                    </div>
                  )}
                </div>

                <div className="project-content">
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    {project.liveUrl && (
                      <span className="project-status">Live</span>
                    )}
                  </div>

                  <h3 className="project-title">
                    {project.title}
                    {project.liveUrl && (
                      <FiArrowUpRight className="project-arrow" />
                    )}
                  </h3>

                  <p className="project-description">{project.shortDesc}</p>

                  <div className="project-metrics">
                    {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="metric-item">
                        <span className="metric-value">{value}</span>
                        <span className="metric-label">{key}</span>
                      </div>
                    ))}
                  </div>

                  <div className="project-tech-stack">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-cta"
                    >
                      View Project
                      <FiArrowUpRight />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;