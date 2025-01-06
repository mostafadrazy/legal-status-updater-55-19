import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import { BackToTop } from "./components/BackToTop";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Callback from "./pages/auth/Callback";
import CaseTracking from "./pages/CaseTracking";
import Cases from "./pages/Cases";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

// Dashboard route that requires authentication
const DashboardRoute = () => {
  const { session } = useAuth();
  if (!session) {
    return <Index />;
  }
  return <ProtectedRoute><Index /></ProtectedRoute>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-[#111] to-[#1A1A1A]">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<DashboardRoute />} />
              <Route path="/case-tracking" element={<CaseTracking />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/callback" element={<Callback />} />

              {/* Protected routes */}
              <Route path="/cases" element={<ProtectedRoute><Cases /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
            <BackToTop />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;