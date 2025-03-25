
import React from 'react';
import { Check } from 'lucide-react';

interface Framework {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface FrameworkSelectorProps {
  selectedFramework: string;
  onSelect: (framework: string) => void;
}

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({ 
  selectedFramework, 
  onSelect 
}) => {
  const frameworks: Framework[] = [
    {
      id: 'react-tailwind',
      name: 'React + Tailwind',
      icon: '⚛️',
      description: 'Modern UI with React components and Tailwind CSS'
    },
    {
      id: 'vue-tailwind',
      name: 'Vue + Tailwind',
      icon: '💚',
      description: 'Vue.js components styled with Tailwind CSS'
    },
    {
      id: 'html-css',
      name: 'HTML/CSS',
      icon: '🌐',
      description: 'Plain HTML and CSS without any framework'
    },
    {
      id: 'bootstrap',
      name: 'Bootstrap',
      icon: '🅱️',
      description: 'HTML with Bootstrap 5 classes and components'
    }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">Select Target Framework</h3>
      <div className="grid grid-cols-2 gap-3">
        {frameworks.map((framework) => (
          <div
            key={framework.id}
            className={`
              relative border rounded-lg p-3 cursor-pointer transition-all
              ${selectedFramework === framework.id 
                ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                : 'border-border hover:border-muted-foreground'
              }
            `}
            onClick={() => onSelect(framework.id)}
          >
            <div className="flex items-start gap-2">
              <div className="text-lg">{framework.icon}</div>
              <div>
                <div className="font-medium text-sm">{framework.name}</div>
                <div className="text-xs text-muted-foreground">{framework.description}</div>
              </div>
            </div>
            {selectedFramework === framework.id && (
              <div className="absolute top-2 right-2 text-primary">
                <Check size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrameworkSelector;
