import React, { useEffect } from 'react';
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
  // Dismiss the splash screen once the app has mounted (min display 1800ms)
  useEffect(() => {
    // Always open at the top of the page (disable browser scroll restoration)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const splash = document.getElementById('splash');
    if (!splash) return;
    const t = setTimeout(() => {
      splash.classList.add('splash-hide');
      setTimeout(() => splash.remove(), 700);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppContent />
    </Router>
  );
}

export default App;
