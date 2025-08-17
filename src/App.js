// src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Background3D from './components/Background3D/Background3D';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const appRef = useRef();

  useEffect(() => {
    // Option 1: COMPLETELY REMOVE Lenis for natural, fast scrolling
    // Just use native browser scrolling which is much faster
    
    // Initialize GSAP ScrollTrigger without Lenis
    ScrollTrigger.refresh();
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      ScrollTrigger.kill();
    };
    
    /* 
    // Option 2: If you want to keep smooth scrolling, use these FAST settings:
    const lenis = new Lenis({
      duration: 0.4, // Very fast
      easing: (t) => t, // Linear for immediate response
      smoothWheel: true,
      wheelMultiplier: 2, // Double speed
      smoothTouch: false, // Disable smooth touch for natural trackpad feel
      normalizeWheel: false,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
    */
  }, []);

  useEffect(() => {
    if (!loading) {
      const isMobile = window.innerWidth <= 768;
      
      // Initialize GSAP animations after loading with mobile optimization
      const sections = gsap.utils.toArray('.section');
      
      sections.forEach((section, i) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: isMobile ? 20 : 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: isMobile ? 'top 95%' : 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [loading]);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="App"
            ref={appRef}
          >
            {/* 3D Background */}
            <div className="canvas-container">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{ 
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance"
                }}
              >
                <Preload all />
                <Background3D />
              </Canvas>
            </div>

            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main className="main-content" data-scroll-container>
              <Home />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>

            {/* Footer */}
            <footer className="footer glass">
              <div className="container">
                <div className="footer-content">
                  <p className="holographic">© 2026 Syed Moin Ud Din</p>
                  <p>Crafted with passion and cutting-edge tech</p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;

// // src/App.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { ThemeProvider } from './context/ThemeContext';
// import { Canvas } from '@react-three/fiber';
// import { Preload } from '@react-three/drei';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { AnimatePresence, motion } from 'framer-motion';

// // Components
// import Navigation from './components/Navigation/Navigation';
// import Home from './components/Home/Home';
// import About from './components/About/About';
// import Skills from './components/Skills/Skills';
// import Experience from './components/Experience/Experience';
// import Projects from './components/Projects/Projects';
// import Contact from './components/Contact/Contact';
// import Background3D from './components/Background3D/Background3D';
// import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// import './App.css';

// // Register GSAP plugins
// gsap.registerPlugin(ScrollTrigger);

// function App() {
//   const [loading, setLoading] = useState(true);
//   const appRef = useRef();

//   useEffect(() => {
//     // Option 1: COMPLETELY REMOVE Lenis for natural, fast scrolling
//     // Just use native browser scrolling which is much faster
    
//     // Initialize GSAP ScrollTrigger without Lenis
//     ScrollTrigger.refresh();
    
//     // Simulate loading
//     setTimeout(() => {
//       setLoading(false);
//     }, 2500);

//     return () => {
//       ScrollTrigger.killAll();
//     };
    
//     /* 
//     // Option 2: If you want to keep smooth scrolling, use these FAST settings:
//     const lenis = new Lenis({
//       duration: 0.4, // Very fast
//       easing: (t) => t, // Linear for immediate response
//       smoothWheel: true,
//       wheelMultiplier: 2, // Double speed
//       smoothTouch: false, // Disable smooth touch for natural trackpad feel
//       normalizeWheel: false,
//       syncTouch: true,
//     });

//     lenisRef.current = lenis;

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//     */
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       // Initialize GSAP animations after loading
//       const sections = gsap.utils.toArray('.section');
      
//       sections.forEach((section, i) => {
//         gsap.fromTo(
//           section,
//           {
//             opacity: 0,
//             y: 50,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: section,
//               start: 'top 80%',
//               end: 'top 20%',
//               toggleActions: 'play none none reverse',
//             },
//           }
//         );
//       });
//     }
//   }, [loading]);

//   return (
//     <ThemeProvider>
//       <AnimatePresence mode="wait">
//         {loading ? (
//           <LoadingScreen key="loading" />
//         ) : (
//           <motion.div
//             key="app"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="App"
//             ref={appRef}
//           >
//             {/* 3D Background */}
//             <div className="canvas-container">
//               <Canvas
//                 camera={{ position: [0, 0, 5], fov: 75 }}
//                 dpr={[1, 2]}
//                 gl={{ 
//                   antialias: true,
//                   alpha: true,
//                   powerPreference: "high-performance"
//                 }}
//               >
//                 <Preload all />
//                 <Background3D />
//               </Canvas>
//             </div>

//             {/* Navigation */}
//             <Navigation />

//             {/* Main Content */}
//             <main className="main-content" data-scroll-container>
//               <Home />
//               <About />
//               <Skills />
//               <Experience />
//               <Projects />
//               <Contact />
//             </main>

//             {/* Footer */}
//             <footer className="footer glass">
//               <div className="container">
//                 <div className="footer-content">
//                   <p className="holographic">© 2026 Syed Moin Ud Din</p>
//                   <p>Crafted with passion and cutting-edge tech</p>
//                 </div>
//               </div>
//             </footer>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </ThemeProvider>
//   );
// }

// export default App;