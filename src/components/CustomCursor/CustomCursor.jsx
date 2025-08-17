import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Update cursor position
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move dot immediately
      gsap.to(cursorDot, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });
    };

    // Smooth outline animation
    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;

      gsap.set(cursorOutline, {
        x: outlineX,
        y: outlineY,
      });

      requestAnimationFrame(animateOutline);
    };

    // Handle hover states
    const handleMouseEnter = () => {
      cursorOutline.classList.add('cursor-hover');
      gsap.to(cursorOutline, {
        scale: 1.5,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      cursorOutline.classList.remove('cursor-hover');
      gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Add magnetic effect to buttons
    const magneticElements = document.querySelectorAll('.magnetic-button');
    
    magneticElements.forEach((elem) => {
      elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(elem, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      elem.addEventListener('mouseleave', () => {
        gsap.to(elem, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    
    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .clickable');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Start outline animation
    animateOutline();

    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        gsap.to([cursorDot, cursorOutline], {
          opacity: 0,
          duration: 0.3,
        });
      }
    });

    document.addEventListener('mouseenter', () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 1,
        duration: 0.3,
      });
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} id="cursor-dot" />
      <div ref={cursorOutlineRef} id="cursor-outline" />
    </>
  );
};

export default CustomCursor;