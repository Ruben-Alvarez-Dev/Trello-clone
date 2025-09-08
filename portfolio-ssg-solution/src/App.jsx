import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <SEOHead />
        
        {/* Header con navegación */}
        <Header />
        
        {/* Secciones principales */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Experience />
          <Projects />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;