
import React, { useState, useEffect } from 'react';
import { Code, Copy, ExternalLink, AlertTriangle, Check, Edit, Download } from 'lucide-react';
import { simulateCodeGeneration } from '../utils/imageHelpers';
import { toast } from 'sonner';
import FrameworkSelector from './FrameworkSelector';

interface ScreenshotProcessorProps {
  imageUrl: string | null;
}

const ScreenshotProcessor: React.FC<ScreenshotProcessorProps> = ({ imageUrl }) => {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [editableCode, setEditableCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('react-tailwind');
  const [isEditing, setIsEditing] = useState(false);
  const [accuracyMetrics, setAccuracyMetrics] = useState({
    layout: 90,
    style: 85,
    components: 95
  });
  
  useEffect(() => {
    let isMounted = true;
    
    const generateCode = async () => {
      if (!imageUrl) return;
      
      setIsGenerating(true);
      try {
        const code = await simulateCodeGeneration(imageUrl, selectedFramework);
        if (isMounted) {
          setGeneratedCode(code);
          setEditableCode(code);
          // Simulate different accuracy based on framework
          setAccuracyMetrics({
            layout: Math.floor(85 + Math.random() * 10),
            style: Math.floor(80 + Math.random() * 15),
            components: Math.floor(90 + Math.random() * 10)
          });
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
      setEditableCode('');
    }
    
    return () => {
      isMounted = false;
    };
  }, [imageUrl, selectedFramework]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(isEditing ? editableCode : generatedCode);
    toast.success('Code copied to clipboard');
  };

  const handleFrameworkChange = (framework: string) => {
    setSelectedFramework(framework);
    // This will trigger the useEffect to regenerate code
    toast.info(`Regenerating code with ${framework}`);
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes
      setGeneratedCode(editableCode);
      toast.success('Code changes saved');
    }
    setIsEditing(!isEditing);
  };

  const handleCodeEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableCode(e.target.value);
  };

  const downloadCode = () => {
    const codeToDownload = isEditing ? editableCode : generatedCode;
    const blob = new Blob([codeToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code-${selectedFramework}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded successfully');
  };
  
  if (!imageUrl) return null;
  
  return (
    <section className="py-12 px-6 animate-fade-in animation-delay-100">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border">
          <FrameworkSelector 
            selectedFramework={selectedFramework} 
            onSelect={handleFrameworkChange} 
          />
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium flex items-center">
              <Code size={20} className="mr-2 text-primary" />
              Generated Code {isEditing && '(Editing)'}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleEditMode}
                className="p-2 hover:bg-secondary rounded-md transition-colors"
                title={isEditing ? "Save changes" : "Edit code"}
              >
                {isEditing ? <Check size={16} /> : <Edit size={16} />}
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-secondary rounded-md transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={16} />
              </button>
              <button
                onClick={downloadCode}
                className="p-2 hover:bg-secondary rounded-md transition-colors"
                title="Download code"
              >
                <Download size={16} />
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
            ) : isEditing ? (
              <textarea
                className="bg-black/90 text-white font-mono text-sm rounded-lg p-4 w-full h-64 focus:outline-none focus:ring-2 focus:ring-primary"
                value={editableCode}
                onChange={handleCodeEdit}
              />
            ) : (
              <pre className="bg-black/90 text-white font-mono text-sm rounded-lg p-4 overflow-x-auto animate-blur-in min-h-[16rem] max-h-64">
                <code>{generatedCode}</code>
              </pre>
            )}
          </div>
          
          {!isGenerating && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background rounded-lg p-4 border border-border">
                <h3 className="text-sm font-medium mb-2">Demo Preview</h3>
                <div className="bg-white h-40 rounded border border-border flex items-center justify-center">
                  {/* In a real implementation, we would render the generated code here */}
                  <p className="text-sm text-muted-foreground">Preview would appear here</p>
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-4 border border-border">
                <h3 className="text-sm font-medium mb-2 flex items-center justify-between">
                  <span>Accuracy Analysis</span>
                  {(accuracyMetrics.layout < 85 || accuracyMetrics.style < 80 || accuracyMetrics.components < 90) && (
                    <div className="flex items-center text-amber-500 text-xs gap-1">
                      <AlertTriangle size={14} />
                      <span>May need manual adjustments</span>
                    </div>
                  )}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Layout Accuracy</span>
                    <div className="w-2/3 bg-secondary rounded-full h-2">
                      <div 
                        className={`h-full rounded-full ${accuracyMetrics.layout >= 90 ? 'bg-emerald-500' : accuracyMetrics.layout >= 80 ? 'bg-primary' : 'bg-amber-500'}`} 
                        style={{ width: `${accuracyMetrics.layout}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Style Accuracy</span>
                    <div className="w-2/3 bg-secondary rounded-full h-2">
                      <div 
                        className={`h-full rounded-full ${accuracyMetrics.style >= 90 ? 'bg-emerald-500' : accuracyMetrics.style >= 80 ? 'bg-primary' : 'bg-amber-500'}`} 
                        style={{ width: `${accuracyMetrics.style}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Component Detection</span>
                    <div className="w-2/3 bg-secondary rounded-full h-2">
                      <div 
                        className={`h-full rounded-full ${accuracyMetrics.components >= 90 ? 'bg-emerald-500' : accuracyMetrics.components >= 80 ? 'bg-primary' : 'bg-amber-500'}`} 
                        style={{ width: `${accuracyMetrics.components}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotProcessor;
