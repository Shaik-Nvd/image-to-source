
import React, { useState, useEffect } from 'react';
import { Code, Copy, ExternalLink } from 'lucide-react';
import { simulateCodeGeneration } from '../utils/imageHelpers';
import { toast } from 'sonner';

interface ScreenshotProcessorProps {
  imageUrl: string | null;
}

const ScreenshotProcessor: React.FC<ScreenshotProcessorProps> = ({ imageUrl }) => {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    
    const generateCode = async () => {
      if (!imageUrl) return;
      
      setIsGenerating(true);
      try {
        const code = await simulateCodeGeneration(imageUrl);
        if (isMounted) {
          setGeneratedCode(code);
        }
      } catch (error) {
        console.error('Error generating code:', error);
        toast.error('Failed to generate code');
      } finally {
        if (isMounted) {
          setIsGenerating(false);
        }
      }
    };
    
    if (imageUrl) {
      generateCode();
    } else {
      setGeneratedCode('');
    }
    
    return () => {
      isMounted = false;
    };
  }, [imageUrl]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('Code copied to clipboard');
  };
  
  if (!imageUrl) return null;
  
  return (
    <section className="py-12 px-6 animate-fade-in animation-delay-100">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center">
              <Code size={20} className="mr-2 text-primary" />
              Generated Code
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-secondary rounded-md transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
              <a
                href="#"
                className="p-2 hover:bg-secondary rounded-md transition-colors"
                title="Open in editor"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
          
          <div className="relative">
            {isGenerating ? (
              <div className="bg-black/90 text-white font-mono text-sm rounded-lg h-64 p-4 overflow-hidden">
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="shimmer-effect h-4 w-3/4 rounded mb-2"></div>
                  <div className="shimmer-effect h-4 w-2/3 rounded mb-2"></div>
                  <div className="shimmer-effect h-4 w-1/2 rounded"></div>
                </div>
              </div>
            ) : (
              <pre className="bg-black/90 text-white font-mono text-sm rounded-lg p-4 overflow-x-auto animate-blur-in">
                <code>{generatedCode}</code>
              </pre>
            )}
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium mb-2">Demo Preview</h3>
              <div className="bg-white h-40 rounded border border-border flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Preview would appear here</p>
              </div>
            </div>
            
            <div className="bg-background rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium mb-2">Accuracy Analysis</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Layout Accuracy</span>
                  <div className="w-2/3 bg-secondary rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Style Accuracy</span>
                  <div className="w-2/3 bg-secondary rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Component Detection</span>
                  <div className="w-2/3 bg-secondary rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotProcessor;
