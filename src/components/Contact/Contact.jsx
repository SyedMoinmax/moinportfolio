import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';
import './Contact.component.css';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    // In production, you would integrate with EmailJS or your backend
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      value: 'moindev1996@gmail.com',
      link: 'mailto:moindev1996@gmail.com',
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      value: '+1 (647) 786-9691',
      link: 'tel:+16477869691',
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      value: 'Oshawa, Ontario, Canada',
      link: null,
    },
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      value: 'syed-moin-ud-din',
      link: 'https://www.linkedin.com/in/syed-moin-ud-din/',
    },
    {
      icon: <FiGithub />,
      title: 'GitHub',
      value: 'SyedMoinMax',
      link: 'https://github.com/SyedMoinMax',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="contact-content">
            <motion.div className="contact-info" variants={itemVariants}>
              <h3>Let's Connect</h3>
              <p className="contact-description">
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="info-cards">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="info-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h4>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link} target="_blank" rel="noopener noreferrer">
                          {info.value}
                        </a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div className="contact-form-wrapper" variants={itemVariants}>
              <form className="contact-form glass-morphism" onSubmit={handleSubmit}>
                <h3>Send Me a Message</h3>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="form-input"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>
                
                {submitMessage && (
                  <motion.div
                    className="submit-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;