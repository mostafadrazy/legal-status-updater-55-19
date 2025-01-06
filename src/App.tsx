import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Cases from "@/pages/Cases";
import Settings from "@/pages/Settings";
import Tasks from "@/pages/Tasks";
import CaseTracking from "@/pages/CaseTracking";
import Login from "@/pages/auth/Login";
import Callback from "@/pages/auth/Callback";

function App() {
  return (
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
  );
}

export default App;