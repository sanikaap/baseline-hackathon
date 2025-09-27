import React, { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DisclaimerModal } from "./DisclaimerModal";
import {
  Shield,
  BarChart3,
  GitPullRequest,
  TrendingUp,
  Zap,
  Users,
  Globe,
  ArrowRight,
  Play,
  Code,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import ErrorBoundary from "./ErrorBoundary";

const LandingPage = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const features = [
    {
      icon: Shield,
      title: "Real-time Compatibility Scanning",
      description: "Automatically detect browser compatibility issues across your entire codebase with advanced static analysis.",
    },
    {
      icon: BarChart3,
      title: "Interactive Analytics Dashboard",
      description: "Visualize compliance trends, track improvements, and identify patterns with beautiful, interactive charts.",
    },
    {
      icon: GitPullRequest,
      title: "Pull Request Integration",
      description: "Get instant compatibility feedback on every PR before code reaches production environments.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Risk Analysis",
      description: "AI-powered insights help predict compatibility issues and suggest optimal solutions.",
    },
    {
      icon: Code,
      title: "Multi-Framework Support",
      description: "Works seamlessly with React, Vue, Angular, and vanilla JavaScript projects.",
    },
    {
      icon: Activity,
      title: "Continuous Monitoring",
      description: "24/7 monitoring with instant alerts when new compatibility risks are detected.",
    },
  ];

  const stats = [
    { label: "Active Projects", value: "12", icon: Globe },
    { label: "Issues Prevented", value: "1,247", icon: Shield },
    { label: "Development Teams", value: "8", icon: Users },
    { label: "Avg Compliance", value: "94%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-white">
      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onClose={() => setShowDisclaimer(false)} 
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-black via-blue-900 to-blue-600 bg-clip-text text-transparent tracking-tight">
                Serverbase
              </span>
            </Link>


            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-black">
                Documentation
              </Button>
              <Link to="/dashboard">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  <Play className="mr-2 h-4 w-4" />
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D Background */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* 3D Spline Background */}
        <div className="absolute inset-0 z-0">
          <ErrorBoundary fallback={<div className="w-full h-full bg-gray-100" />}>
            <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100" />}>
              <Spline 
                scene="https://prod.spline.design/3ff7b617-2fe9-46c7-8e06-b6d7c382f4db/scene.splinecode"
                className="w-full h-full opacity-30"
              />
            </Suspense>
          </ErrorBoundary>
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-8 bg-gray-100 text-black border-gray-200 hover:bg-gray-100 text-sm font-medium">
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Developer Dashboard for Web Feature Compliance
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-black mb-8 leading-[0.9] tracking-tight">
              Ship with
              <span className="block text-gray-500">
                confidence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Track browser compatibility across your projects. Identify risky features before they break user experiences.
              <span className="block mt-3 text-black font-medium">
                Built for teams that ship fast and break nothing.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4 bg-black hover:bg-gray-800 text-white font-medium">
                  <Play className="mr-2 h-5 w-5" />
                  Explore Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                View Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl mb-4 shadow-sm">
                    <stat.icon className="h-6 w-6 text-black" />
                  </div>
                  <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight tracking-tight">
              Everything you need for
              <span className="block text-gray-500">compatibility confidence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Comprehensive tools that integrate seamlessly into your development workflow, 
              helping you catch compatibility issues before they impact users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl mb-6">
                    <feature.icon className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            Ready to ship with confidence?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Join thousands of developers who trust our platform to keep their applications compatible across all browsers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-100 font-medium">
                <Play className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-900 font-medium">
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-xl font-semibold text-black">Serverbase</span>
          </div>
          <div className="text-sm text-gray-500">
            Created for Baseline Hackathon 2025
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;