
import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium hover:opacity-80 transition-opacity duration-200"
        >
          <span className="text-gradient font-bold">Screenshot</span>
          <span className="font-light">to</span>
          <span className="font-bold">Code</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <a 
            href="#features" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} className="mr-1" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
