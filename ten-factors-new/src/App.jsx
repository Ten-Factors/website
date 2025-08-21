import React from 'react';
import { Header, Footer, Hero, Comparisons, UsageProcess, CaseStudies, Testimonials, ReadFurther, CTA } from './components';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <UsageProcess />
        <Comparisons />
        <CaseStudies />
        <Testimonials />
        <CTA />
        <ReadFurther />
      </main>
      <Footer />
    </div>
  );
}

export default App
