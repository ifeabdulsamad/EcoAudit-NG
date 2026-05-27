import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuditProvider } from "./context/AuditContext.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Audit from "./pages/Audit.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuditProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuditProvider>
    </BrowserRouter>
  );
}
