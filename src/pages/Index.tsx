
import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ImageUploader from '../components/ImageUploader';
import ScreenshotProcessor from '../components/ScreenshotProcessor';
import Footer from '../components/Footer';
import HelpSection from '../components/HelpSection';
import { Code, Eye, Zap } from 'lucide-react';

const Index: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const handleImageUploaded = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <div className="container mx-auto py-16 px-6">
          <div id="features" className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Use ScreenshotToCode?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered tool makes converting designs into code faster and more accurate than ever.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-xl border border-border hover-lift">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Instant Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Convert any UI screenshot into clean, responsive code in seconds.
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-border hover-lift">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Code size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Clean Output</h3>
                <p className="text-sm text-muted-foreground">
                  Get production-ready HTML and CSS code that's optimized and easy to customize.
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-border hover-lift">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Eye size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Pixel-Perfect</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI ensures the generated code matches your design with high accuracy.
                </p>
              </div>
            </div>
          </div>
          
          <div id="how-it-works" className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
            <div className="space-y-12 mt-12">
              <div className="flex flex-col md:flex-row items-center gap-6 animate-fade-in opacity-0">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Upload Your Screenshot</h3>
                  <p className="text-muted-foreground">
                    Drag and drop or select a screenshot of any website, UI design, or mockup.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 animate-fade-in opacity-0 animation-delay-100">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">AI Processes the Image</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes the design, identifying layouts, components, styles, and interactions.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 animate-fade-in opacity-0 animation-delay-200">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Get Your Code</h3>
                  <p className="text-muted-foreground">
                    Receive clean, well-structured HTML and CSS code that you can immediately use in your projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ImageUploader onImageUploaded={handleImageUploaded} />
        
        <ScreenshotProcessor imageUrl={uploadedImage} />
      </main>
      
      <HelpSection />
      <Footer />
    </div>
  );
};

export default Index;
