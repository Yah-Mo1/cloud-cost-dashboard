
import { Brain, Code2, Eye, Wrench, Zap, Shield, TestTube, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CapabilityCard from '@/components/CapabilityCard';
import CodePreview from '@/components/CodePreview';
import StatusIndicator from '@/components/StatusIndicator';

const Index = () => {
  const capabilities = [
    {
      icon: Code2,
      title: "Live Code Editing",
      description: "Real-time code modifications using advanced lov-* tags",
      status: "active" as const,
      features: ["Instant updates", "Syntax highlighting", "Error detection"]
    },
    {
      icon: Eye,
      title: "Live Preview",
      description: "Instant preview changes in iframe with /preview endpoint",
      status: "active" as const,
      features: ["Real-time rendering", "Mobile responsive", "Cross-browser"]
    },
    {
      icon: Wrench,
      title: "Debug Support",
      description: "Comprehensive debugging with /console log viewing",
      status: "monitoring" as const,
      features: ["Console logs", "Error tracking", "Performance metrics"]
    },
    {
      icon: Shield,
      title: "Security & Validation",
      description: "Built-in security best practices and input validation",
      status: "secure" as const,
      features: ["Input sanitization", "OWASP protection", "Auth flows"]
    }
  ];

  const techStack = [
    "React", "TypeScript", "TailwindCSS", "shadcn/ui", "React Query", "Vite"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-teal-600/20 backdrop-blur-sm border-b border-blue-500/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-16 w-16 text-blue-400 mr-4" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                AI Developer Assistant
              </h1>
            </div>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Full-stack software engineering AI that works in the Lovable editor. 
              Building apps through natural language requests with real-time code editing.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                  {tech}
                </Badge>
              ))}
            </div>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
              <Zap className="mr-2 h-5 w-5" />
              Start Building
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Status Dashboard */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatusIndicator 
              label="Code Editor" 
              status="operational" 
              uptime="99.9%" 
            />
            <StatusIndicator 
              label="Live Preview" 
              status="operational" 
              uptime="99.8%" 
            />
            <StatusIndicator 
              label="Debug Console" 
              status="monitoring" 
              uptime="99.5%" 
            />
            <StatusIndicator 
              label="Asset Pipeline" 
              status="operational" 
              uptime="100%" 
            />
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <CapabilityCard key={index} {...capability} />
            ))}
          </div>
        </div>

        {/* Code Quality Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Code Quality Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code2 className="mr-2 h-5 w-5 text-blue-400" />
                  Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-2">
                <div>• Atomic design principles</div>
                <div>• One component per file</div>
                <div>• Shared UI components</div>
                <div>• Composable architecture</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-teal-400" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-2">
                <div>• React.memo optimization</div>
                <div>• Code splitting</div>
                <div>• Image optimization</div>
                <div>• Debounced updates</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TestTube className="mr-2 h-5 w-5 text-green-400" />
                  Testing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-2">
                <div>• Unit test coverage</div>
                <div>• Integration testing</div>
                <div>• Error state testing</div>
                <div>• Responsive testing</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Preview Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Live Code Examples</h2>
          <CodePreview />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-700 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-slate-400">
            <p className="mb-2">Built with ❤️ using modern web technologies</p>
            <p className="text-sm">Ready to transform your development workflow</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
