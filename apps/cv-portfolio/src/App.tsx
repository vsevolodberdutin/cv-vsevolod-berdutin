import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModuleFederationDemo from './pages/ModuleFederationDemo';

function App() {
  const location = useLocation();

  // Scroll to top on route change or page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/module-federation-demo" element={<ModuleFederationDemo />} />
      </Routes>
    </div>
  );
}

export default App;
