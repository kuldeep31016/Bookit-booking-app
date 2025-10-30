import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExperienceDetailPage from './pages/ExperienceDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;


