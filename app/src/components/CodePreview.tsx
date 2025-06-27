
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Play, Eye } from 'lucide-react';

const CodePreview = () => {
  const [activeTab, setActiveTab] = useState('component');
  
  const codeExamples = {
    component: `import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const WelcomeCard = () => {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to Lovable
        </h2>
        <p className="text-muted-foreground mb-4">
          Start building amazing apps with AI assistance
        </p>
        <Button className="w-full">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};`,
    
    hook: `import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const useApiData = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};`,

    utility: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};`
  };

  const tabs = [
    { id: 'component', label: 'React Component', language: 'tsx' },
    { id: 'hook', label: 'Custom Hook', language: 'tsx' },
    { id: 'utility', label: 'Utility Functions', language: 'ts' }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Interactive Code Examples</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {tab.label}
                <Badge className="ml-2 text-xs" variant="secondary">
                  {tabs.find(t => t.id === tab.id)?.language}
                </Badge>
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <pre className="bg-slate-900/80 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-slate-300 font-mono leading-relaxed">
              {codeExamples[activeTab as keyof typeof codeExamples]}
            </code>
          </pre>
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="border-slate-600 text-slate-400">
              {tabs.find(t => t.id === activeTab)?.language.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodePreview;
