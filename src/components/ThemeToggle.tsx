
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={16} className="text-foreground" />
      ) : (
        <Sun size={16} className="text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
