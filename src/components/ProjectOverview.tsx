import React, { useState } from "react";
import Layout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Search,
  Filter,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";

// Enhanced mock data with more projects
const projects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Main customer-facing shopping platform",
    compliance: 85,
    lastScan: "2 hours ago",
    status: "healthy",
    criticalIssues: 2,
    warningIssues: 5,
    team: "Frontend Team",
    repository: "github.com/company/ecommerce",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "2",
    name: "Mobile Banking App",
    description: "iOS and Android banking application",
    compliance: 72,
    lastScan: "5 hours ago",
    status: "warning",
    criticalIssues: 8,
    warningIssues: 12,
    team: "Mobile Team",
    repository: "github.com/company/mobile-banking",
    technology: "React Native",
    lastUpdated: "2025-01-25",
    trend: "down",
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    description: "Internal business intelligence dashboard",
    compliance: 91,
    lastScan: "1 day ago",
    status: "healthy",
    criticalIssues: 1,
    warningIssues: 3,
    team: "Data Team",
    repository: "github.com/company/analytics",
    technology: "Vue.js",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "4",
    name: "Customer Portal",
    description: "Self-service customer support portal",
    compliance: 68,
    lastScan: "3 hours ago",
    status: "critical",
    criticalIssues: 12,
    warningIssues: 8,
    team: "Backend Team",
    repository: "github.com/company/customer-portal",
    technology: "Angular",
    lastUpdated: "2025-01-24",
    trend: "down",
  },
  {
    id: "5",
    name: "Marketing Website",
    description: "Company marketing and landing pages",
    compliance: 94,
    lastScan: "6 hours ago",
    status: "healthy",
    criticalIssues: 0,
    warningIssues: 2,
    team: "Marketing Team",
    repository: "github.com/company/marketing-site",
    technology: "Next.js",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "6",
    name: "Admin Console",
    description: "Internal administration and management tools",
    compliance: 76,
    lastScan: "4 hours ago",
    status: "warning",
    criticalIssues: 5,
    warningIssues: 9,
    team: "DevOps Team",
    repository: "github.com/company/admin-console",
    technology: "React",
    lastUpdated: "2025-01-25",
    trend: "stable",
  },
  {
    id: "7",
    name: "API Gateway",
    description: "Microservices API gateway and documentation",
    compliance: 82,
    lastScan: "8 hours ago",
    status: "healthy",
    criticalIssues: 3,
    warningIssues: 6,
    team: "Backend Team",
    repository: "github.com/company/api-gateway",
    technology: "Node.js",
    lastUpdated: "2025-01-25",
    trend: "up",
  },
  {
    id: "8",
    name: "Payment Processing",
    description: "Secure payment processing system",
    compliance: 89,
    lastScan: "1 hour ago",
    status: "healthy",
    criticalIssues: 1,
    warningIssues: 4,
    team: "Security Team",
    repository: "github.com/company/payments",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "9",
    name: "Inventory Management",
    description: "Warehouse and inventory tracking system",
    compliance: 71,
    lastScan: "12 hours ago",
    status: "warning",
    criticalIssues: 7,
    warningIssues: 11,
    team: "Operations Team",
    repository: "github.com/company/inventory",
    technology: "Angular",
    lastUpdated: "2025-01-24",
    trend: "down",
  },
  {
    id: "10",
    name: "HR Portal",
    description: "Employee self-service and HR management",
    compliance: 78,
    lastScan: "6 hours ago",
    status: "warning",
    criticalIssues: 4,
    warningIssues: 7,
    team: "HR Tech Team",
    repository: "github.com/company/hr-portal",
    technology: "Vue.js",
    lastUpdated: "2025-01-25",
    trend: "stable",
  },
  {
    id: "11",
    name: "Learning Platform",
    description: "Employee training and development platform",
    compliance: 86,
    lastScan: "4 hours ago",
    status: "healthy",
    criticalIssues: 2,
    warningIssues: 5,
    team: "Learning Team",
    repository: "github.com/company/learning",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "12",
    name: "Support Ticketing",
    description: "Customer support and ticketing system",
    compliance: 73,
    lastScan: "7 hours ago",
    status: "warning",
    criticalIssues: 6,
    warningIssues: 10,
    team: "Support Team",
    repository: "github.com/company/support",
    technology: "Next.js",
    lastUpdated: "2025-01-25",
    trend: "stable",
  },
  {
    id: "13",
    name: "Design System",
    description: "Core component library for all products",
    compliance: 98,
    lastScan: "1 day ago",
    status: "healthy",
    criticalIssues: 0,
    warningIssues: 1,
    team: "Design Team",
    repository: "github.com/company/design-system",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "14",
    name: "Data Warehouse",
    description: "Centralized data storage and processing",
    compliance: 79,
    lastScan: "9 hours ago",
    status: "warning",
    criticalIssues: 4,
    warningIssues: 8,
    team: "Data Team",
    repository: "github.com/company/data-warehouse",
    technology: "Node.js",
    lastUpdated: "2025-01-25",
    trend: "stable",
  },
  {
    id: "15",
    name: "CI/CD Pipeline",
    description: "Automated build, test, and deployment pipeline",
    compliance: 92,
    lastScan: "3 hours ago",
    status: "healthy",
    criticalIssues: 1,
    warningIssues: 2,
    team: "DevOps Team",
    repository: "github.com/company/cicd-pipeline",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "16",
    name: "Internal Wiki",
    description: "Company-wide knowledge base",
    compliance: 88,
    lastScan: "10 hours ago",
    status: "healthy",
    criticalIssues: 2,
    warningIssues: 4,
    team: "Internal Tools",
    repository: "github.com/company/wiki",
    technology: "Vue.js",
    lastUpdated: "2025-01-25",
    trend: "up",
  },
  {
    id: "17",
    name: "Real-time Chat",
    description: "Customer support real-time chat service",
    compliance: 65,
    lastScan: "2 hours ago",
    status: "critical",
    criticalIssues: 15,
    warningIssues: 10,
    team: "Backend Team",
    repository: "github.com/company/realtime-chat",
    technology: "Node.js",
    lastUpdated: "2025-01-24",
    trend: "down",
  },
  {
    id: "18",
    name: "A/B Testing Service",
    description: "Service for running A/B tests on products",
    compliance: 81,
    lastScan: "5 hours ago",
    status: "healthy",
    criticalIssues: 3,
    warningIssues: 7,
    team: "Marketing Team",
    repository: "github.com/company/ab-testing",
    technology: "Next.js",
    lastUpdated: "2025-01-26",
    trend: "stable",
  },
  {
    id: "19",
    name: "Localization Service",
    description: "Manages translations for all applications",
    compliance: 95,
    lastScan: "1 day ago",
    status: "healthy",
    criticalIssues: 0,
    warningIssues: 3,
    team: "Frontend Team",
    repository: "github.com/company/localization",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "20",
    name: "Mobile SDK",
    description: "SDK for integrating our services into mobile apps",
    compliance: 74,
    lastScan: "6 hours ago",
    status: "warning",
    criticalIssues: 6,
    warningIssues: 9,
    team: "Mobile Team",
    repository: "github.com/company/mobile-sdk",
    technology: "React Native",
    lastUpdated: "2025-01-25",
    trend: "down",
  },
  {
    id: "21",
    name: "Search Service",
    description: "Powers search functionality across all products",
    compliance: 83,
    lastScan: "7 hours ago",
    status: "healthy",
    criticalIssues: 2,
    warningIssues: 6,
    team: "Backend Team",
    repository: "github.com/company/search-service",
    technology: "Node.js",
    lastUpdated: "2025-01-25",
    trend: "up",
  },
  {
    id: "22",
    name: "User Authentication",
    description: "Handles user login, registration, and sessions",
    compliance: 90,
    lastScan: "2 hours ago",
    status: "healthy",
    criticalIssues: 1,
    warningIssues: 3,
    team: "Security Team",
    repository: "github.com/company/auth-service",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "23",
    name: "Email Service",
    description: "Sends transactional emails to users",
    compliance: 77,
    lastScan: "11 hours ago",
    status: "warning",
    criticalIssues: 5,
    warningIssues: 8,
    team: "DevOps Team",
    repository: "github.com/company/email-service",
    technology: "Node.js",
    lastUpdated: "2025-01-24",
    trend: "stable",
  },
  {
    id: "24",
    name: "Billing System",
    description: "Manages subscriptions and billing",
    compliance: 88,
    lastScan: "4 hours ago",
    status: "healthy",
    criticalIssues: 2,
    warningIssues: 5,
    team: "Backend Team",
    repository: "github.com/company/billing-system",
    technology: "React",
    lastUpdated: "2025-01-26",
    trend: "up",
  },
  {
    id: "25",
    name: "Image Processing",
    description: "Handles image uploads, resizing, and optimization",
    compliance: 80,
    lastScan: "9 hours ago",
    status: "healthy",
    criticalIssues: 4,
    warningIssues: 6,
    team: "Backend Team",
    repository: "github.com/company/image-processing",
    technology: "Node.js",
    lastUpdated: "2025-01-25",
    trend: "stable",
  },
  {
    id: "26",
    name: "Video Streaming",
    description: "Handles video encoding and streaming",
    compliance: 69,
    lastScan: "3 hours ago",
    status: "critical",
    criticalIssues: 11,
    warningIssues: 14,
    team: "Mobile Team",
    repository: "github.com/company/video-streaming",
    technology: "React Native",
    lastUpdated: "2025-01-24",
    trend: "down",
  },
];

interface ProjectOverviewProps {
  projects?: typeof projects;
}

const ProjectOverview = ({ projects: propProjects = projects }: ProjectOverviewProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [technologyFilter, setTechnologyFilter] = useState("all");

  // Get unique teams and technologies for filters
  const teams = [...new Set(propProjects.map(p => p.team))];
  const technologies = [...new Set(propProjects.map(p => p.technology))];

  // Filter projects
  const filteredProjects = propProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesTeam = teamFilter === "all" || project.team === teamFilter;
    const matchesTechnology = technologyFilter === "all" || project.technology === technologyFilter;
    
    return matchesSearch && matchesStatus && matchesTeam && matchesTechnology;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getComplianceBadge = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const stats = {
    total: propProjects.length,
    healthy: propProjects.filter(p => p.status === "healthy").length,
    warning: propProjects.filter(p => p.status === "warning").length,
    critical: propProjects.filter(p => p.status === "critical").length,
    averageCompliance: Math.round(propProjects.reduce((acc, p) => acc + p.compliance, 0) / propProjects.length),
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">
              Monitor browser compatibility across all your projects
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Healthy</p>
                  <p className="text-2xl font-bold text-green-600">{stats.healthy}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warning</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.warning}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Compliance</p>
                  <p className={`text-2xl font-bold ${getComplianceColor(stats.averageCompliance)}`}>
                    {stats.averageCompliance}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={technologyFilter} onValueChange={setTechnologyFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Technology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tech</SelectItem>
                  {technologies.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Projects ({filteredProjects.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Technology</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(project.status)}
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{project.team}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.technology}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getComplianceBadge(project.compliance)}>
                        {project.compliance}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {project.criticalIssues > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {project.criticalIssues} critical
                          </Badge>
                        )}
                        {project.warningIssues > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {project.warningIssues} warning
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{project.lastScan}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTrendIcon(project.trend)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/projects/${project.id}/scans`}>
                          <Button variant="outline" size="sm">
                            View Scans
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          Scan Now
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectOverview;