import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CineEuropaProvider } from './context/CineEuropaContext';
import NavBar from './components/NavigationBar';
import Home from './pages/Home';
import SalaDetail from './pages/SalaDetail';

function App() {
  return (
    <CineEuropaProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sala/:idsala" element={<SalaDetail />} />
        </Routes>
      </BrowserRouter>
    </CineEuropaProvider>
  );
}

export default App;