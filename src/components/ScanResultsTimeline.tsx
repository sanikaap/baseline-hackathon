import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface RiskyFeature {
  featureName: string;
  status: "Limited" | "New";
  severity: "low" | "medium" | "high";
}

interface Scan {
  scanId: string;
  date: string;
  complianceScore: number;
  riskyFeatures: RiskyFeature[];
}

interface ScanResultsTimelineProps {
  projectId?: string;
  scans?: Scan[];
}

// Mock data for development
const mockScans: Scan[] = [
  {
    scanId: "1",
    date: "2025-09-20",
    complianceScore: 82,
    riskyFeatures: [
      { featureName: "CSS Subgrid", status: "Limited", severity: "high" },
      { featureName: "WebGPU API", status: "New", severity: "high" },
    ],
  },
  {
    scanId: "2",
    date: "2025-09-15",
    complianceScore: 75,
    riskyFeatures: [
      { featureName: "CSS Subgrid", status: "Limited", severity: "high" },
      { featureName: "WebGPU API", status: "New", severity: "high" },
      {
        featureName: "Container Queries",
        status: "Limited",
        severity: "medium",
      },
    ],
  },
  {
    scanId: "3",
    date: "2025-09-10",
    complianceScore: 68,
    riskyFeatures: [
      { featureName: "CSS Subgrid", status: "Limited", severity: "high" },
      { featureName: "WebGPU API", status: "New", severity: "high" },
      {
        featureName: "Container Queries",
        status: "Limited",
        severity: "medium",
      },
      {
        featureName: "View Transitions API",
        status: "New",
        severity: "medium",
      },
    ],
  },
  {
    scanId: "4",
    date: "2025-09-05",
    complianceScore: 60,
    riskyFeatures: [
      { featureName: "CSS Subgrid", status: "Limited", severity: "high" },
      { featureName: "WebGPU API", status: "New", severity: "high" },
      {
        featureName: "Container Queries",
        status: "Limited",
        severity: "medium",
      },
      {
        featureName: "View Transitions API",
        status: "New",
        severity: "medium",
      },
      {
        featureName: "Scroll-driven Animations",
        status: "New",
        severity: "low",
      },
    ],
  },
];

const ScanResultsTimeline = ({
  projectId = "1",
  scans = mockScans,
}: ScanResultsTimelineProps) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("timeline");

  // Filter features based on severity and search query
  const filteredScans = scans.map((scan) => ({
    ...scan,
    riskyFeatures: scan.riskyFeatures.filter((feature) => {
      const matchesSeverity =
        selectedSeverity === "all" || feature.severity === selectedSeverity;
      const matchesSearch = feature.featureName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSeverity && matchesSearch;
    }),
  }));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getStatusColor = (status: string) => {
    return status === "Limited" ? "default" : "secondary";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Scan Results Timeline</span>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {scans.length > 0
                  ? `Last scan: ${new Date(scans[0].date).toLocaleDateString()}`
                  : "No scans available"}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="features">Risky Features</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <div className="relative">
                {/* Timeline visualization */}
                <div className="w-full h-[200px] bg-muted/20 rounded-lg mb-6 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {scans.map((scan, index) => (
                      <div
                        key={scan.scanId}
                        className={`w-8 mx-1 ${getScoreColor(scan.complianceScore)} bg-current rounded-t-md absolute bottom-0 transition-all duration-500`}
                        style={{
                          left: `${(index / scans.length) * 100}%`,
                          height: `${scan.complianceScore}%`,
                          maxHeight: "90%",
                        }}
                      >
                        <div className="absolute -top-6 -left-4 text-xs">
                          {scan.complianceScore}%
                        </div>
                      </div>
                    ))}
                    <div className="absolute bottom-0 w-full h-[1px] bg-border"></div>
                  </div>
                </div>

                {/* Timeline points */}
                <div className="flex justify-between items-center mb-8">
                  {scans.map((scan) => (
                    <div
                      key={scan.scanId}
                      className="flex flex-col items-center"
                    >
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(scan.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scans table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Compliance Score</TableHead>
                    <TableHead>Risky Features</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scans.map((scan) => (
                    <TableRow key={scan.scanId}>
                      <TableCell>
                        {new Date(scan.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${getScoreColor(scan.complianceScore)}`}
                        >
                          {scan.complianceScore}%
                        </span>
                      </TableCell>
                      <TableCell>{scan.riskyFeatures.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="features">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Select
                    value={selectedSeverity}
                    onValueChange={setSelectedSeverity}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Search features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                <Button variant="outline" size="sm">
                  Export Results
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>First Detected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScans.flatMap((scan) =>
                    scan.riskyFeatures.map((feature, index) => (
                      <TableRow key={`${scan.scanId}-${index}`}>
                        <TableCell className="font-medium">
                          {feature.featureName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusColor(feature.status) as any}
                          >
                            {feature.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getSeverityColor(feature.severity) as any}
                          >
                            {feature.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(scan.date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanResultsTimeline;