import React, { useState } from "react";
import Layout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Download,
  Calendar,
  Filter,
} from "lucide-react";

// Enhanced mock data for charts
const complianceOverTime = [
  { month: "Jan", score: 72, projects: 8, issues: 45 },
  { month: "Feb", score: 75, projects: 9, issues: 38 },
  { month: "Mar", score: 73, projects: 10, issues: 42 },
  { month: "Apr", score: 78, projects: 11, issues: 35 },
  { month: "May", score: 81, projects: 12, issues: 28 },
  { month: "Jun", score: 79, projects: 12, issues: 31 },
  { month: "Jul", score: 83, projects: 12, issues: 24 },
  { month: "Aug", score: 85, projects: 12, issues: 20 },
  { month: "Sep", score: 82, projects: 12, issues: 23 },
];

const projectCompliance = [
  { name: "E-commerce Platform", compliance: 85, issues: 7, trend: "up" },
  { name: "Mobile Banking App", compliance: 72, issues: 20, trend: "down" },
  { name: "Analytics Dashboard", compliance: 91, issues: 4, trend: "up" },
  { name: "Customer Portal", compliance: 68, issues: 20, trend: "down" },
  { name: "Marketing Website", compliance: 94, issues: 2, trend: "up" },
  { name: "Admin Console", compliance: 76, issues: 14, trend: "stable" },
  { name: "API Gateway", compliance: 82, issues: 9, trend: "up" },
  { name: "Payment Processing", compliance: 89, issues: 5, trend: "up" },
];

const featureRiskDistribution = [
  { name: "CSS Grid", count: 15, severity: "medium", color: "#f59e0b" },
  { name: "WebGPU API", count: 8, severity: "high", color: "#ef4444" },
  { name: "Container Queries", count: 12, severity: "medium", color: "#f59e0b" },
  { name: "View Transitions", count: 6, severity: "high", color: "#ef4444" },
  { name: "Scroll Animations", count: 9, severity: "low", color: "#10b981" },
  { name: "CSS Subgrid", count: 4, severity: "high", color: "#ef4444" },
  { name: "Web Locks API", count: 3, severity: "high", color: "#ef4444" },
  { name: "Popover API", count: 7, severity: "medium", color: "#f59e0b" },
];

const teamPerformance = [
  { team: "Frontend Team", compliance: 85, projects: 3, avgIssues: 8 },
  { team: "Mobile Team", compliance: 72, projects: 2, avgIssues: 15 },
  { team: "Data Team", compliance: 91, projects: 1, avgIssues: 4 },
  { team: "Backend Team", compliance: 75, projects: 2, avgIssues: 12 },
  { team: "Marketing Team", compliance: 94, projects: 1, avgIssues: 2 },
  { team: "DevOps Team", compliance: 76, projects: 1, avgIssues: 14 },
  { team: "Security Team", compliance: 89, projects: 1, avgIssues: 5 },
  { team: "Operations Team", compliance: 71, projects: 1, avgIssues: 18 },
];

const issueResolutionTrend = [
  { week: "Week 1", opened: 12, resolved: 8, backlog: 45 },
  { week: "Week 2", opened: 15, resolved: 11, backlog: 49 },
  { week: "Week 3", opened: 9, resolved: 14, backlog: 44 },
  { week: "Week 4", opened: 18, resolved: 16, backlog: 46 },
  { week: "Week 5", opened: 11, resolved: 19, backlog: 38 },
  { week: "Week 6", opened: 14, resolved: 17, backlog: 35 },
  { week: "Week 7", opened: 8, resolved: 15, backlog: 28 },
  { week: "Week 8", opened: 13, resolved: 18, backlog: 23 },
];

interface ComplianceChartsProps {
  complianceData?: typeof complianceOverTime;
  projectData?: typeof projectCompliance;
  featureData?: typeof featureRiskDistribution;
  teamData?: typeof teamPerformance;
}

const ComplianceCharts = ({
  complianceData = complianceOverTime,
  projectData = projectCompliance,
  featureData = featureRiskDistribution,
  teamData = teamPerformance,
}: ComplianceChartsProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("compliance");

  const currentScore = complianceData[complianceData.length - 1]?.score || 0;
  const previousScore = complianceData[complianceData.length - 2]?.score || 0;
  const scoreChange = currentScore - previousScore;

  const totalIssues = projectData.reduce((sum, project) => sum + project.issues, 0);
  const avgCompliance = Math.round(projectData.reduce((sum, project) => sum + project.compliance, 0) / projectData.length);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Trends</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into browser compatibility trends
            </p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Compliance</p>
                  <p className="text-3xl font-bold text-green-600">{currentScore}%</p>
                  <div className="flex items-center mt-2">
                    {scoreChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${scoreChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {scoreChange > 0 ? '+' : ''}{scoreChange}% from last month
                    </span>
                  </div>
                </div>
                <BarChart3 className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-3xl font-bold text-red-600">{totalIssues}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Across all projects
                  </p>
                </div>
                <Activity className="h-12 w-12 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Compliance</p>
                  <p className="text-3xl font-bold text-yellow-600">{avgCompliance}%</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Team average
                  </p>
                </div>
                <PieChartIcon className="h-12 w-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-3xl font-bold text-blue-600">{projectData.length}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Being monitored
                  </p>
                </div>
                <Calendar className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Score Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={complianceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Issue Resolution Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Issue Resolution Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={issueResolutionTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="opened" 
                        stackId="1" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="resolved" 
                        stackId="2" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Compliance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={projectData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="compliance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Feature Risk Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Risky Features Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={featureData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, count }) => `${name}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {featureData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Feature Usage Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage by Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={featureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="compliance" fill="#3b82f6" name="Compliance %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ComplianceCharts;