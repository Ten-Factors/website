import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Advantages from './pages/Advantages';
import Process from './pages/Process';
import BestPractices from './pages/BestPractices';
import UseCases from './pages/UseCases';
import GetStarted from './pages/GetStarted';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advantages" element={<Advantages />} />
          <Route path="/process" element={<Process />} />
          <Route path="/best-practices" element={<BestPractices />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
