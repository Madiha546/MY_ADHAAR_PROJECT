import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Enrollment from './pages/Enrollment';
import Update from './pages/Update';
import Status from './pages/Status';
import AadhaarStory from './pages/AadhaarStory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-white via-soft-pink/20 to-sky-blue/20 bg-chakra-pattern">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-20"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/update" element={<Update />} />
            <Route path="/status" element={<Status />} />
            <Route path="/story" element={<AadhaarStory />} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;