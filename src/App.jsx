import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import Admin from './pages/Admin';
import EventDetail from './pages/EventDetail';
import { usePageTracking } from './hooks/usePageTracking';
import './styles/App.css';

function AppContent() {
  usePageTracking();

  return (
    <div className="App">
      <ScrollProgress />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  console.log('App component rendering');
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  );
}

export default App;
