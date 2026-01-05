import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModuleFederationDemo from './pages/ModuleFederationDemo';

function App() {
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
