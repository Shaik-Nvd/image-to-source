
import React from 'react';
import { ArrowLeft, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIChat from '../components/AIChat';

const AIAssistant: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <header className="mb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="text-primary" size={24} />
              <h1 className="text-xl font-bold">AI Assistant</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto max-w-6xl">
        <div className="bg-background rounded-lg border border-border shadow-sm p-4 md:p-6 h-[calc(100vh-200px)]">
          <AIChat />
        </div>
      </main>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Powered by Perplexity AI</p>
      </footer>
    </div>
  );
};

export default AIAssistant;
