import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiCode, FiDatabase, FiCloud } from 'react-icons/fi';
import gsap from 'gsap';
import SplitType from 'split-type';
import './Home.component.css';

const Home = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Split text animations - simpler on mobile
    const splitTitle = new SplitType(titleRef.current, { 
      types: 'chars, words',
      tagName: 'span'
    });

    const splitSubtitle = new SplitType(subtitleRef.current, { 
      types: 'words',
      tagName: 'span'
    });

    // Animate title characters - reduced animation on mobile
    gsap.fromTo(
      splitTitle.chars,
      {
        y: isMobile ? 20 : 100,
        opacity: 0,
        rotateZ: isMobile ? 0 : 10,
      },
      {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        duration: isMobile ? 0.4 : 0.8,
        ease: 'power4.out',
        stagger: {
          amount: isMobile ? 0.2 : 0.5,
          from: isMobile ? 'start' : 'random',
        },
      }
    );

    // Animate subtitle words
    gsap.fromTo(
      splitSubtitle.words,
      {
        y: isMobile ? 15 : 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.3 : 0.6,
        ease: 'power3.out',
        delay: isMobile ? 0.3 : 0.8,
        stagger: isMobile ? 0.02 : 0.05,
      }
    );

    return () => {
      splitTitle.revert();
      splitSubtitle.revert();
    };
  }, []);

  const stats = [
    { label: 'Years Experience', value: '5+', icon: <FiCode /> },
    { label: 'Projects Delivered', value: '20+', icon: <FiDatabase /> },
    { label: 'Technologies', value: '15+', icon: <FiCloud /> },
  ];

  return (
    <section ref={sectionRef} id="home" className="home-section section">
      <motion.div 
        className="home-container"
        style={{ y, opacity }}
      >
        <div className="home-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="home-badge"
          >
            <span className="badge-text">Available for opportunities</span>
            <span className="badge-dot"></span>
          </motion.div>

          <h1 ref={titleRef} className="home-title">
            Syed Moin Ud Din
          </h1>

          <h2 ref={subtitleRef} className="home-subtitle">
            Full Stack Developer crafting next-gen digital experiences
          </h2>

          <motion.p
            className="home-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Specializing in React, Angular, Node.js, and cloud architectures. 
            Building scalable solutions that push the boundaries of web technology.
          </motion.p>

          <motion.div
            className="home-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <a href="#contact" className="btn-primary">
              <span>Let's Connect</span>
              <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20">
                <path d="M5 10h10m0 0l-3.5-3.5M15 10l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#projects" className="btn-outline">
              <span>View Projects</span>
            </a>
          </motion.div>

          <motion.div
            className="home-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <a href="https://github.com/SyedMoinMax" target="_blank" rel="noopener noreferrer" className="social-link">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/syed-moin-ud-din/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FiLinkedin />
            </a>
            <a href="mailto:moindev1996@gmail.com" className="social-link">
              <FiMail />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="home-bento"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="bento-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bento-item glass"
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bento-icon">{stat.icon}</div>
                <div className="bento-value holographic">{stat.value}</div>
                <div className="bento-label">{stat.label}</div>
              </motion.div>
            ))}
            
            <motion.div
              className="bento-item bento-special glass"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bento-special-content">
                <span className="special-label">Currently Building</span>
                <h3 className="special-title">AI-Powered Solutions</h3>
                <p className="special-desc">Integrating cutting-edge AI into web experiences</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiArrowDown />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Home;