import React from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import AmbientLightMesh from './components/AmbientLightMesh';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import ShowcaseBanner from './components/ShowcaseBanner';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#07080c] text-white selection:bg-cyan-500/20 selection:text-white">
      {/* 1. Interactive 3D WebGL Space Particles Galaxy & Holographic Torus Mesh */}
      <ThreeCanvas />

      {/* 2. Dynamic Moving White Volumetric Light & Mouse Follower Layer */}
      <AmbientLightMesh />

      {/* 3. Smooth Magnetic Follower Cursor */}
      <CustomCursor />

      {/* 4. Navigation Header */}
      <Navbar />

      {/* 5. Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <ShowcaseBanner />
        <Contact />
      </main>

      {/* 6. Footer with Gigantic Name & Architecture Specs */}
      <Footer />
    </div>
  );
}
