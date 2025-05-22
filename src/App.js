import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Advantages from './pages/Advantages';
import BestPractices from './pages/BestPractices';
import SuccessStories from './pages/SuccessStories';
import GetStarted from './pages/GetStarted';
import Footer from './components/Footer';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  // Get the base URL from the environment or default to '/ten-factors-website' for GitHub Pages
  const basename = process.env.PUBLIC_URL || '/ten-factors-website';

  return (
    <Router basename={basename}>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advantages" element={<Advantages />} />
          <Route path="/best-practices" element={<BestPractices />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
