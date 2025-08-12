import React from 'react';
import { Header, Footer, Hero, UsageProcess, CaseStudies, Testimonials, CTA, Contributors } from './components';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <UsageProcess />
        <CaseStudies />
        <Testimonials />
        <CTA />
        <Contributors />
      </main>
      <Footer />
    </div>
  );
}

export default App
