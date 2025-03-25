
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Common questions and responses for the mock AI
const commonResponses: Record<string, string> = {
  "hello": "Hello! How can I assist you today?",
  "hi": "Hi there! How can I help you?",
  "how are you": "I'm just a program, but I'm functioning well! How can I assist you?",
  "what is your name": "I'm an AI assistant built into this application. You can call me AI Assistant.",
  "what can you do": "I can answer questions, provide information, and help with various tasks. Feel free to ask me anything!",
  "thank you": "You're welcome! Is there anything else I can help you with?",
  "thanks": "You're welcome! Let me know if you need anything else.",
  "bye": "Goodbye! Feel free to chat again whenever you need assistance.",
  "help": "I'm here to help! You can ask me questions, request information, or just chat. What would you like to know?",
};

// Generate a response based on the user's input
const generateMockResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  // Check for common greetings and questions
  for (const [key, value] of Object.entries(commonResponses)) {
    if (lowerInput.includes(key)) {
      return value;
    }
  }

  // Check for specific question patterns
  if (lowerInput.includes("weather")) {
    return "I'm sorry, I don't have access to real-time weather data. You would need to check a weather service for that information.";
  }
  
  if (lowerInput.includes("time") && (lowerInput.includes("what") || lowerInput.includes("current"))) {
    return `Based on your device, the current time is ${new Date().toLocaleTimeString()}.`;
  }
  
  if (lowerInput.includes("date") && (lowerInput.includes("what") || lowerInput.includes("current"))) {
    return `Today's date is ${new Date().toLocaleDateString()}.`;
  }
  
  if (lowerInput.includes("who are you") || lowerInput.includes("what are you")) {
    return "I'm an AI assistant integrated into this application. I can answer questions and provide information based on my programming.";
  }

  // Generate a generic response for questions
  if (lowerInput.includes("?")) {
    const responses = [
      "That's an interesting question. While I don't have access to real-time data, I can tell you that this would typically involve considering various factors.",
      "Great question! This is something that depends on context and specific details.",
      "I understand you're asking about this topic. While I have limited knowledge, I can say that this is a complex subject with multiple perspectives.",
      "That's something many people wonder about. The answer can vary depending on specific circumstances and the latest information available.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Default responses for other inputs
  const defaultResponses = [
    "That's interesting! I'd like to know more about what you're thinking.",
    "I understand what you're saying. Could you provide more details or ask a specific question?",
    "I appreciate your input. Is there something specific you'd like to know more about?",
    "Thanks for sharing that. How can I assist you further with this topic?",
    "I see what you mean. Would you like me to explain anything specific about this subject?",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Welcome! I am an AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock response
      const responseText = generateMockResponse(input);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate a response. Please try again.');
      
      // Add an error message
      setMessages(prev => [
        ...prev,
        {
          role: 'system',
          content: 'Sorry, I encountered an error. Please try again later.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-background rounded-lg border border-border">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex items-start gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {message.role === 'system' ? <Bot size={16} /> : <Bot size={16} />}
              </div>
            )}
            
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : message.role === 'system'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
            
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
