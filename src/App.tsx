import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/home";
import ProjectOverview from "./components/ProjectOverview";
import ScanResultsTimeline from "./components/ScanResultsTimeline";
import PullRequestDashboard from "./components/PullRequestDashboard";
import ComplianceCharts from "./components/ComplianceCharts";

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/projects" element={<ProjectOverview />} />
        <Route path="/projects/:id/scans" element={<ScanResultsTimeline />} />
        <Route path="/pull-requests" element={<PullRequestDashboard />} />
        <Route path="/analytics" element={<ComplianceCharts />} />
        <Route path="/trends" element={<ComplianceCharts />} />
      </Routes>
    </Suspense>
  );
}

export default App;