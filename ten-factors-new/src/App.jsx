import React from 'react';
import { Header, Footer, Hero } from './components';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {/* Additional sections will be added here */}
      </main>
      <Footer />
    </div>
  );
}

export default App
