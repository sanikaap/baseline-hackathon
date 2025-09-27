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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GitBranch,
  Search,
  Filter,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  GitMerge,
  Eye,
  MessageSquare,
  Calendar,
  Code,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Enhanced mock data with more PRs
const pullRequests = [
  {
    id: "pr-1",
    number: 1247,
    title: "Add CSS Grid support for product listings",
    description: "Implementing CSS Grid layout for better responsive product displays",
    project: "E-commerce Platform",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      username: "sarahc",
    },
    status: "needs_review",
    complianceImpact: "medium",
    riskyFeatures: ["CSS Grid", "Container Queries"],
    createdAt: "2 hours ago",
    updatedAt: "1 hour ago",
    reviewers: ["mike.j", "alex.r"],
    comments: 8,
    commits: 12,
    filesChanged: 15,
    additions: 245,
    deletions: 89,
    branch: "feature/css-grid-products",
    baseBranch: "main",
  },
  {
    id: "pr-2",
    number: 1246,
    title: "Implement WebGPU for 3D visualizations",
    description: "Adding WebGPU support for enhanced 3D product visualization",
    project: "Analytics Dashboard",
    author: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      username: "mikej",
    },
    status: "approved",
    complianceImpact: "high",
    riskyFeatures: ["WebGPU API", "WebGL 2.0", "SharedArrayBuffer"],
    createdAt: "5 hours ago",
    updatedAt: "2 hours ago",
    reviewers: ["sarah.c", "emma.w"],
    comments: 15,
    commits: 8,
    filesChanged: 22,
    additions: 567,
    deletions: 123,
    branch: "feature/webgpu-3d",
    baseBranch: "develop",
  },
  {
    id: "pr-3",
    number: 1245,
    title: "Update form validation with new HTML attributes",
    description: "Leveraging modern HTML form validation features",
    project: "Customer Portal",
    author: {
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      username: "alexr",
    },
    status: "merged",
    complianceImpact: "low",
    riskyFeatures: ["HTML Form Validation", "Custom Elements"],
    createdAt: "1 day ago",
    updatedAt: "6 hours ago",
    reviewers: ["sarah.c"],
    comments: 5,
    commits: 4,
    filesChanged: 8,
    additions: 89,
    deletions: 34,
    branch: "feature/html-validation",
    baseBranch: "main",
  },
  {
    id: "pr-4",
    number: 1244,
    title: "Add scroll-driven animations to landing page",
    description: "Implementing modern scroll-driven animations for better UX",
    project: "Marketing Website",
    author: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      username: "emmaw",
    },
    status: "needs_review",
    complianceImpact: "medium",
    riskyFeatures: ["Scroll-driven Animations", "View Transitions API"],
    createdAt: "3 hours ago",
    updatedAt: "1 hour ago",
    reviewers: ["mike.j", "david.k"],
    comments: 12,
    commits: 6,
    filesChanged: 11,
    additions: 178,
    deletions: 45,
    branch: "feature/scroll-animations",
    baseBranch: "main",
  },
  {
    id: "pr-5",
    number: 1243,
    title: "Implement CSS Subgrid for complex layouts",
    description: "Using CSS Subgrid for better nested grid layouts",
    project: "Admin Console",
    author: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      username: "davidk",
    },
    status: "changes_requested",
    complianceImpact: "high",
    riskyFeatures: ["CSS Subgrid", "CSS Grid Level 2"],
    createdAt: "6 hours ago",
    updatedAt: "3 hours ago",
    reviewers: ["sarah.c", "alex.r"],
    comments: 18,
    commits: 9,
    filesChanged: 14,
    additions: 234,
    deletions: 67,
    branch: "feature/css-subgrid",
    baseBranch: "develop",
  },
  {
    id: "pr-6",
    number: 1242,
    title: "Add Web Locks API for resource management",
    description: "Implementing Web Locks API for better resource coordination",
    project: "Payment Processing",
    author: {
      name: "Lisa Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      username: "lisap",
    },
    status: "draft",
    complianceImpact: "high",
    riskyFeatures: ["Web Locks API", "SharedWorker"],
    createdAt: "8 hours ago",
    updatedAt: "4 hours ago",
    reviewers: [],
    comments: 3,
    commits: 15,
    filesChanged: 19,
    additions: 456,
    deletions: 78,
    branch: "feature/web-locks",
    baseBranch: "main",
  },
  {
    id: "pr-7",
    number: 1241,
    title: "Implement Container Queries for responsive components",
    description: "Using Container Queries for truly responsive component design",
    project: "HR Portal",
    author: {
      name: "Tom Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom",
      username: "toma",
    },
    status: "needs_review",
    complianceImpact: "medium",
    riskyFeatures: ["Container Queries", "CSS Containment"],
    createdAt: "4 hours ago",
    updatedAt: "2 hours ago",
    reviewers: ["emma.w", "lisa.p"],
    comments: 7,
    commits: 5,
    filesChanged: 9,
    additions: 167,
    deletions: 23,
    branch: "feature/container-queries",
    baseBranch: "main",
  },
  {
    id: "pr-8",
    number: 1240,
    title: "Add Popover API for better modal management",
    description: "Implementing native Popover API for accessible modals",
    project: "Learning Platform",
    author: {
      name: "Rachel Green",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
      username: "rachelg",
    },
    status: "approved",
    complianceImpact: "medium",
    riskyFeatures: ["Popover API", "Dialog Element"],
    createdAt: "7 hours ago",
    updatedAt: "1 hour ago",
    reviewers: ["tom.a", "david.k"],
    comments: 9,
    commits: 7,
    filesChanged: 12,
    additions: 198,
    deletions: 56,
    branch: "feature/popover-api",
    baseBranch: "develop",
  },
  {
    id: "pr-9",
    number: 1239,
    title: "Refactor state management with Redux Toolkit",
    description: "Migrating from legacy Redux to modern Redux Toolkit",
    project: "E-commerce Platform",
    author: {
      name: "Chris Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris",
      username: "chrisl",
    },
    status: "needs_review",
    complianceImpact: "low",
    riskyFeatures: [],
    createdAt: "1 day ago",
    updatedAt: "2 hours ago",
    reviewers: ["sarah.c", "mike.j"],
    comments: 22,
    commits: 18,
    filesChanged: 45,
    additions: 1234,
    deletions: 876,
    branch: "refactor/redux-toolkit",
    baseBranch: "main",
  },
  {
    id: "pr-10",
    number: 1238,
    title: "Add support for AVIF image format",
    description: "Implementing AVIF for better image compression",
    project: "Marketing Website",
    author: {
      name: "Jessica Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      username: "jessicab",
    },
    status: "approved",
    complianceImpact: "medium",
    riskyFeatures: ["AVIF"],
    createdAt: "2 days ago",
    updatedAt: "8 hours ago",
    reviewers: ["emma.w"],
    comments: 10,
    commits: 5,
    filesChanged: 12,
    additions: 345,
    deletions: 56,
    branch: "feature/avif-support",
    baseBranch: "main",
  },
  {
    id: "pr-11",
    number: 1237,
    title: "Fix accessibility issues in main navigation",
    description: "Improving keyboard navigation and screen reader support",
    project: "Customer Portal",
    author: {
      name: "Alex Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      username: "alexr",
    },
    status: "merged",
    complianceImpact: "low",
    riskyFeatures: [],
    createdAt: "3 days ago",
    updatedAt: "1 day ago",
    reviewers: ["sarah.c"],
    comments: 8,
    commits: 3,
    filesChanged: 5,
    additions: 78,
    deletions: 23,
    branch: "fix/nav-a11y",
    baseBranch: "main",
  },
  {
    id: "pr-12",
    number: 1236,
    title: "Integrate new payment provider",
    description: "Adding support for a new payment gateway",
    project: "Payment Processing",
    author: {
      name: "Lisa Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      username: "lisap",
    },
    status: "changes_requested",
    complianceImpact: "high",
    riskyFeatures: ["Payment Request API"],
    createdAt: "2 days ago",
    updatedAt: "4 hours ago",
    reviewers: ["david.k", "mike.j"],
    comments: 25,
    commits: 11,
    filesChanged: 33,
    additions: 876,
    deletions: 234,
    branch: "feature/new-payment-provider",
    baseBranch: "main",
  },
  {
    id: "pr-13",
    number: 1235,
    title: "Add dark mode support",
    description: "Implementing dark mode for the entire application",
    project: "Admin Console",
    author: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      username: "davidk",
    },
    status: "draft",
    complianceImpact: "low",
    riskyFeatures: ["prefers-color-scheme"],
    createdAt: "1 day ago",
    updatedAt: "3 hours ago",
    reviewers: [],
    comments: 5,
    commits: 2,
    filesChanged: 88,
    additions: 1234,
    deletions: 12,
    branch: "feature/dark-mode",
    baseBranch: "develop",
  },
  {
    id: "pr-14",
    number: 1234,
    title: "Upgrade to React 19",
    description: "Upgrading React and other dependencies to the latest versions",
    project: "E-commerce Platform",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      username: "sarahc",
    },
    status: "needs_review",
    complianceImpact: "high",
    riskyFeatures: ["React 19"],
    createdAt: "4 hours ago",
    updatedAt: "1 hour ago",
    reviewers: ["mike.j", "chris.l"],
    comments: 15,
    commits: 25,
    filesChanged: 123,
    additions: 2345,
    deletions: 1876,
    branch: "chore/upgrade-react-19",
    baseBranch: "main",
  },
  {
    id: "pr-15",
    number: 1233,
    title: "Add Web Share API for product sharing",
    description: "Implementing native sharing functionality",
    project: "Mobile Banking App",
    author: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      username: "mikej",
    },
    status: "approved",
    complianceImpact: "medium",
    riskyFeatures: ["Web Share API"],
    createdAt: "3 days ago",
    updatedAt: "1 day ago",
    reviewers: ["jessica.b"],
    comments: 6,
    commits: 4,
    filesChanged: 8,
    additions: 123,
    deletions: 45,
    branch: "feature/web-share",
    baseBranch: "develop",
  },
  {
    id: "pr-16",
    number: 1232,
    title: "Optimize bundle size with code splitting",
    description: "Implementing route-based code splitting",
    project: "Analytics Dashboard",
    author: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      username: "emmaw",
    },
    status: "merged",
    complianceImpact: "low",
    riskyFeatures: [],
    createdAt: "4 days ago",
    updatedAt: "2 days ago",
    reviewers: ["chris.l"],
    comments: 11,
    commits: 7,
    filesChanged: 21,
    additions: 56,
    deletions: 89,
    branch: "perf/code-splitting",
    baseBranch: "main",
  },
  // ... adding 12 more ...
];

interface PullRequestDashboardProps {
  pullRequests?: typeof pullRequests;
}

const PullRequestDashboard = ({ pullRequests: propPRs = pullRequests }: PullRequestDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("all");

  // Get unique projects for filter
  const projects = [...new Set(propPRs.map(pr => pr.project))];

  // Filter PRs
  const filteredPRs = propPRs.filter((pr) => {
    const matchesSearch = pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pr.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pr.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || pr.status === statusFilter;
    const matchesImpact = impactFilter === "all" || pr.complianceImpact === impactFilter;
    const matchesProject = projectFilter === "all" || pr.project === projectFilter;
    
    return matchesSearch && matchesStatus && matchesImpact && matchesProject;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "needs_review":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "changes_requested":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "merged":
        return <GitMerge className="h-4 w-4 text-purple-500" />;
      case "draft":
        return <Eye className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "needs_review":
        return "secondary";
      case "changes_requested":
        return "destructive";
      case "merged":
        return "outline";
      case "draft":
        return "secondary";
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

  const stats = {
    total: propPRs.length,
    needsReview: propPRs.filter(pr => pr.status === "needs_review").length,
    approved: propPRs.filter(pr => pr.status === "approved").length,
    merged: propPRs.filter(pr => pr.status === "merged").length,
    highImpact: propPRs.filter(pr => pr.complianceImpact === "high").length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pull Requests</h1>
            <p className="text-gray-600 mt-1">
              Review compatibility impact of code changes
            </p>
          </div>
          <Button>
            <GitBranch className="mr-2 h-4 w-4" />
            Create PR
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total PRs</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <GitBranch className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Needs Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.needsReview}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Merged</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.merged}</p>
                </div>
                <GitMerge className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Impact</p>
                  <p className="text-2xl font-bold text-red-600">{stats.highImpact}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
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
                  placeholder="Search pull requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="needs_review">Needs Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="changes_requested">Changes Requested</SelectItem>
                  <SelectItem value="merged">Merged</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={impactFilter} onValueChange={setImpactFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
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

        {/* Pull Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Pull Requests ({filteredPRs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pull Request</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Risky Features</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPRs.map((pr) => (
                  <TableRow key={pr.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-start space-x-3">
                        <GitBranch className="h-4 w-4 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <p className="font-medium">#{pr.number} {pr.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {pr.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                            <span>{pr.branch} → {pr.baseBranch}</span>
                            <span>•</span>
                            <span>{pr.commits} commits</span>
                            <span>•</span>
                            <span>{pr.filesChanged} files</span>
                            <span>•</span>
                            <span className="text-green-600">+{pr.additions}</span>
                            <span className="text-red-600">-{pr.deletions}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={pr.author.avatar} />
                          <AvatarFallback>{pr.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{pr.author.name}</p>
                          <p className="text-xs text-muted-foreground">@{pr.author.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{pr.project}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(pr.status)}
                        <Badge variant={getStatusColor(pr.status)}>
                          {pr.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getImpactColor(pr.complianceImpact)}>
                        {pr.complianceImpact} impact
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {pr.riskyFeatures.slice(0, 2).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {pr.riskyFeatures.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{pr.riskyFeatures.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{pr.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{pr.updatedAt}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          Review
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Code className="mr-1 h-3 w-3" />
                          View Code
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

export default PullRequestDashboard;