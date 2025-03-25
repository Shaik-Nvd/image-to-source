
import React from 'react';
import { ArrowRight, Code2, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="container mx-auto text-center max-w-3xl">
        <div className="inline-flex items-center px-3 py-1.5 mb-8 bg-secondary rounded-full border border-border animate-fade-in opacity-0">
          <Zap size={14} className="text-primary mr-1.5" />
          <span className="text-xs font-medium">Turn screenshots into code instantly</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in opacity-0 animation-delay-100">
          Transform <span className="text-gradient">screenshots</span> into 
          <br />
          clean, functioning code
        </h1>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in opacity-0 animation-delay-200">
          Upload a screenshot of any website or UI design, and get clean HTML/CSS code that matches what you see. No more tedious recreation from scratch.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in opacity-0 animation-delay-300">
          <a 
            href="#upload"
            className="button-animation inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-primary/90"
          >
            Try It Now
            <ArrowRight size={16} className="ml-2" />
          </a>
          
          <a 
            href="#how-it-works"
            className="button-animation inline-flex items-center px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80"
          >
            <Code2 size={16} className="mr-2" />
            How It Works
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
