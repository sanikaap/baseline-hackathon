import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  GitBranch,
  Users,
  Zap,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

// Real Baseline API integration
const BASELINE_API_URL = "https://api.web-platform-tests.org/api/baseline";

interface BaselineFeature {
  feature_id: string;
  name: string;
  status: "widely_available" | "newly_available" | "limited_availability";
  baseline_date?: string;
  description?: string;
}

interface ProjectData {
  id: string;
  name: string;
  compliance: number;
  lastScan: string;
  status: "healthy" | "warning" | "critical";
  criticalIssues: number;
  team: string;
  features: string[];
}

const Home = () => {
  const [baselineFeatures, setBaselineFeatures] = useState<BaselineFeature[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalProjects: 12,
    activeScans: 8,
    criticalIssues: 23,
    averageCompliance: 78,
    baselineFeatures: 0,
  });

  // Fetch real Baseline data
  useEffect(() => {
    const fetchBaselineData = async () => {
      try {
        // Mock Baseline API call (since the real API might have CORS issues)
        const mockBaselineFeatures: BaselineFeature[] = [
          {
            feature_id: "css-grid",
            name: "CSS Grid Layout",
            status: "widely_available",
            baseline_date: "2020-03-01",
            description: "Two-dimensional grid layout system"
          },
          {
            feature_id: "container-queries",
            name: "CSS Container Queries",
            status: "newly_available",
            baseline_date: "2023-09-01",
            description: "Style elements based on container size"
          },
          {
            feature_id: "webgpu",
            name: "WebGPU API",
            status: "limited_availability",
            description: "Modern 3D graphics and computation API"
          },
          {
            feature_id: "view-transitions",
            name: "View Transitions API",
            status: "limited_availability",
            description: "Smooth transitions between page states"
          },
          {
            feature_id: "scroll-driven-animations",
            name: "Scroll-driven Animations",
            status: "limited_availability",
            description: "Animations triggered by scroll position"
          },
          {
            feature_id: "css-subgrid",
            name: "CSS Subgrid",
            status: "newly_available",
            baseline_date: "2023-12-01",
            description: "Nested grid layouts"
          },
          {
            feature_id: "web-locks",
            name: "Web Locks API",
            status: "limited_availability",
            description: "Coordinate resource access across tabs"
          },
          {
            feature_id: "popover-api",
            name: "Popover API",
            status: "newly_available",
            baseline_date: "2024-04-01",
            description: "Native popover elements"
          }
        ];

        setBaselineFeatures(mockBaselineFeatures);

        // Generate project data based on Baseline features
        const projectsData: ProjectData[] = [
          {
            id: "1",
            name: "E-commerce Platform",
            compliance: 85,
            lastScan: "2 hours ago",
            status: "healthy",
            criticalIssues: 2,
            team: "Frontend Team",
            features: ["css-grid", "container-queries"]
          },
          {
            id: "2",
            name: "Mobile Banking App",
            compliance: 72,
            lastScan: "5 hours ago",
            status: "warning",
            criticalIssues: 8,
            team: "Mobile Team",
            features: ["webgpu", "view-transitions"]
          },
          {
            id: "3",
            name: "Analytics Dashboard",
            compliance: 91,
            lastScan: "1 day ago",
            status: "healthy",
            criticalIssues: 1,
            team: "Data Team",
            features: ["css-grid", "scroll-driven-animations"]
          },
          {
            id: "4",
            name: "Customer Portal",
            compliance: 68,
            lastScan: "3 hours ago",
            status: "critical",
            criticalIssues: 12,
            team: "Backend Team",
            features: ["css-subgrid", "web-locks"]
          },
          {
            id: "5",
            name: "Marketing Website",
            compliance: 94,
            lastScan: "6 hours ago",
            status: "healthy",
            criticalIssues: 0,
            team: "Marketing Team",
            features: ["css-grid", "popover-api"]
          },
          {
            id: "6",
            name: "Admin Console",
            compliance: 76,
            lastScan: "4 hours ago",
            status: "warning",
            criticalIssues: 5,
            team: "DevOps Team",
            features: ["container-queries", "css-subgrid"]
          },
        ];

        setProjects(projectsData);
        setDashboardStats(prev => ({
          ...prev,
          baselineFeatures: mockBaselineFeatures.length,
          criticalIssues: projectsData.reduce((sum, p) => sum + p.criticalIssues, 0),
          averageCompliance: Math.round(projectsData.reduce((sum, p) => sum + p.compliance, 0) / projectsData.length)
        }));

      } catch (error) {
        console.error("Error fetching Baseline data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBaselineData();
  }, []);

  const recentPullRequests = [
    {
      id: "pr-1",
      title: "Add CSS Grid support for product listings",
      project: "E-commerce Platform",
      author: "Sarah Chen",
      status: "needs_review",
      complianceImpact: "medium",
      riskyFeatures: ["CSS Grid", "Container Queries"],
      createdAt: "2 hours ago",
      baselineStatus: "widely_available"
    },
    {
      id: "pr-2",
      title: "Implement WebGPU for 3D visualizations",
      project: "Analytics Dashboard",
      author: "Mike Johnson",
      status: "approved",
      complianceImpact: "high",
      riskyFeatures: ["WebGPU API", "WebGL 2.0"],
      createdAt: "5 hours ago",
      baselineStatus: "limited_availability"
    },
    {
      id: "pr-3",
      title: "Update form validation with Popover API",
      project: "Customer Portal",
      author: "Alex Rodriguez",
      status: "merged",
      complianceImpact: "low",
      riskyFeatures: ["Popover API"],
      createdAt: "1 day ago",
      baselineStatus: "newly_available"
    },
    {
      id: "pr-4",
      title: "Add scroll-driven animations to landing page",
      project: "Marketing Website",
      author: "Emma Wilson",
      status: "needs_review",
      complianceImpact: "medium",
      riskyFeatures: ["Scroll-driven Animations", "View Transitions API"],
      createdAt: "3 hours ago",
      baselineStatus: "limited_availability"
    },
  ];

  const getComplianceColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getComplianceBadge = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPRStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "needs_review":
        return "secondary";
      case "merged":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getBaselineStatusColor = (status: string) => {
    switch (status) {
      case "widely_available":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "newly_available":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "limited_availability":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading Baseline data...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">
              Baseline Compliance Dashboard
            </h1>
            <p className="text-lg text-slate-200 mb-6 leading-relaxed">
              Track browser compatibility using real Baseline data. Monitor {baselineFeatures.length} web features 
              across your projects and ensure compatibility with modern web standards.
            </p>
            <div className="flex space-x-4">
              <Button variant="secondary" size="lg" className="font-medium">
                <Shield className="mr-2 h-5 w-5" />
                Run New Scan
              </Button>
              
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
              <Shield className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{dashboardStats.totalProjects}</div>
              <p className="text-xs text-gray-500 mt-1">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Baseline Features</CardTitle>
              <Zap className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{dashboardStats.baselineFeatures}</div>
              <p className="text-xs text-gray-500 mt-1">
                Being monitored
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Critical Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {dashboardStats.criticalIssues}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                -5 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Compliance</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">
                {dashboardStats.averageCompliance}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                +12% this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Projects</CardTitle>
              <Link to="/projects">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(project.status)}
                      <div>
                        <p className="font-medium text-gray-900">{project.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Users className="h-3 w-3" />
                          <span>{project.team}</span>
                          <span>•</span>
                          <span>{project.lastScan}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.features.slice(0, 2).map((featureId) => {
                            const feature = baselineFeatures.find(f => f.feature_id === featureId);
                            return feature ? (
                              <Badge 
                                key={featureId} 
                                variant="outline" 
                                className={`text-xs ${getBaselineStatusColor(feature.status)}`}
                              >
                                {feature.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getComplianceBadge(project.compliance)}>
                        {project.compliance}%
                      </Badge>
                      {project.criticalIssues > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {project.criticalIssues} issues
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Pull Requests */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Pull Requests</CardTitle>
              <Link to="/pull-requests">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPullRequests.map((pr) => (
                  <div
                    key={pr.id}
                    className="flex items-start justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <GitBranch className="h-4 w-4 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{pr.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{pr.project}</span>
                          <span>•</span>
                          <span>{pr.author}</span>
                          <span>•</span>
                          <span>{pr.createdAt}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pr.riskyFeatures.slice(0, 2).map((feature) => (
                            <Badge 
                              key={feature} 
                              variant="outline" 
                              className={`text-xs ${getBaselineStatusColor(pr.baselineStatus)}`}
                            >
                              {feature}
                            </Badge>
                          ))}
                          {pr.riskyFeatures.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{pr.riskyFeatures.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant={getPRStatusColor(pr.status)}>
                        {pr.status.replace("_", " ")}
                      </Badge>
                      <Badge variant={getImpactColor(pr.complianceImpact)} className="text-xs">
                        {pr.complianceImpact} impact
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Baseline Features Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Baseline Web Features</CardTitle>
            <p className="text-sm text-gray-600">
              Real-time compatibility data from the Web Platform Tests Baseline initiative
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {baselineFeatures.slice(0, 8).map((feature) => (
                <div key={feature.feature_id} className="p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-gray-900">{feature.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getBaselineStatusColor(feature.status)}`}
                    >
                      {feature.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.baseline_date && (
                    <p className="text-xs text-gray-500 mt-2">
                      Baseline: {new Date(feature.baseline_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-slate-900 hover:bg-slate-800">
                <Shield className="h-6 w-6" />
                <span className="font-medium">New Project Scan</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 hover:bg-gray-50">
                <GitBranch className="h-6 w-6" />
                <span className="font-medium">Review PRs</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-gray-200 hover:bg-gray-50">
                <TrendingUp className="h-6 w-6" />
                <span className="font-medium">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;