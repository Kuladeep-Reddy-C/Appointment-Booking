import './App.css';
import Home from './pages/home/Home';
import Gmeet from './pages/Gmeet/Gmeet';
import Navbar from './pages/navbar/Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router> 
      <Navbar /> {/* ✅ Correct placement: outside of Routes */}
      
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/book-appointment" element={<Gmeet />} />
      </Routes>
    </Router>
  );
}

export default App;
