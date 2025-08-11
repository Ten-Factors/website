import React from 'react';
import { Header, Footer, Hero, UsageProcess, CaseStudies } from './components';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <UsageProcess />
        <CaseStudies />
      </main>
      <Footer />
    </div>
  );
}

export default App
