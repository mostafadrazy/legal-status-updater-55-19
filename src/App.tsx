import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load routes
const Cases = lazy(() => import('./pages/Cases'));
const CaseTracking = lazy(() => import('./pages/CaseTracking'));
const Settings = lazy(() => import('./pages/Settings'));
const Index = lazy(() => import('./pages/Index'));
const Login = lazy(() => import('./pages/auth/Login'));
const Callback = lazy(() => import('./pages/auth/Callback'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#111] to-[#1A1A1A]">
    <div className="animate-pulse text-[#4CD6B4]">جاري التحميل...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/case-tracking" element={<CaseTracking />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<Callback />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;