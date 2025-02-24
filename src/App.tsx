import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ChatHistoryProvider } from "./contexts/ChatHistoryContext";
import { useAuth } from "./contexts/AuthContext";
import { BackToTop } from "./components/BackToTop";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Login";
import Callback from "./pages/auth/Callback";
import CaseTracking from "./pages/CaseTracking";
import Cases from "./pages/Cases";
import NextSession from "./pages/NextSession";
import Settings from "./pages/Settings";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import LegalAssistant from "./pages/LegalAssistant";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  
  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

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
      <LanguageProvider>
        <ChatHistoryProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-br from-[#111] to-[#1A1A1A]">
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<DashboardRoute />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/case-tracking" element={<CaseTracking />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup view="sign_up" />} />
                <Route path="/auth/callback" element={<Callback />} />

                {/* Protected routes */}
                <Route path="/cases" element={<ProtectedRoute><Cases /></ProtectedRoute>} />
                <Route path="/next-session" element={<ProtectedRoute><NextSession /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/legal-assistant" element={<ProtectedRoute><LegalAssistant /></ProtectedRoute>} />
              </Routes>
              <BackToTop />
            </div>
          </TooltipProvider>
        </ChatHistoryProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;