import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Cases from "@/pages/Cases";
import Settings from "@/pages/Settings";
import Tasks from "@/pages/Tasks";
import CaseTracking from "@/pages/CaseTracking";
import Login from "@/pages/auth/Login";
import Callback from "@/pages/auth/Callback";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/case-tracking" element={<CaseTracking />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/callback" element={<Callback />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;