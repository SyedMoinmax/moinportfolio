import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheckCircle, FiAward, FiUsers, FiTarget } from 'react-icons/fi';
import './About.component.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const highlights = [
    {
      icon: <FiAward />,
      title: '5+ Years',
      description: 'Professional Experience',
    },
    {
      icon: <FiTarget />,
      title: '20+ Projects',
      description: 'Successfully Delivered',
    },
    {
      icon: <FiUsers />,
      title: 'Team Player',
      description: 'Collaborative Approach',
    },
    {
      icon: <FiCheckCircle />,
      title: 'ICAS Verified',
      description: 'Canadian Equivalency',
    },
  ];

  const expertise = [
    'Building scalable web applications with modern frameworks',
    'Implementing microservices architecture and distributed systems',
    'Optimizing application performance and reducing load times',
    'Mentoring teams and conducting collaborative code reviews',
    'Integrating cloud solutions with AWS and GCP',
    'Developing responsive and accessible user interfaces',
  ];

  return (
    <section id="about" className="about-section section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="section-title">About Me</h2>
          
          <div className="about-content">
            <motion.div className="about-text" variants={itemVariants}>
              <p className="about-intro">
                I'm a passionate Full Stack Software Developer with over 5 years of experience 
                in crafting innovative web solutions. Specializing in Angular, React, and Node.js, 
                I transform complex business requirements into elegant, scalable applications.
              </p>
              
              <p className="about-description">
                My journey spans from building enterprise-level telecommunications platforms to 
                developing cutting-edge VPN configuration systems. I thrive in Agile environments, 
                leading cross-functional teams and driving technical excellence through best practices 
                and continuous improvement.
              </p>

              <div className="expertise-list">
                <h3>What I Bring to the Table:</h3>
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    className="expertise-item"
                    variants={itemVariants}
                    custom={index}
                  >
                    <FiCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="about-highlights" variants={itemVariants}>
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="highlight-card glass-morphism"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="highlight-icon">{highlight.icon}</div>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="education-section" variants={itemVariants}>
            <h3 className="subsection-title">Education</h3>
            <div className="education-card glass-morphism">
              <div className="education-header">
                <h4>Bachelor of Science in Information Technology</h4>
                <span className="education-date">September 2016</span>
              </div>
              <p className="education-institution">Bahria University, Islamabad</p>
              <div className="education-badge">
                <FiAward />
                <span>ICAS Canada Verified - Equivalent to Canadian Bachelor's Degree</span>
              </div>
              <p className="education-description">
                Comprehensive program covering Software Engineering, Database Management, 
                Data Structures & Algorithms, and Web Development, providing practical 
                skills for real-world technology challenges.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;