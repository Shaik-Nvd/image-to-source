import React, { useState } from 'react';
import { HelpCircle, Lightbulb, AlertCircle, Star, ArrowRight, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHelp = () => setIsOpen(!isOpen);

  const faqs = [
    {
      question: "How accurate is the generated code?",
      answer: "The tool provides approximately 85-95% accuracy for standard web designs. Complex UI elements, custom animations, or very intricate layouts may require some manual adjustments after generation."
    },
    {
      question: "What image formats are supported?",
      answer: "We support PNG, JPG, JPEG, and WebP formats. For best results, use high-resolution images (at least 1024×768 pixels) with clear visual elements."
    },
    {
      question: "Can I use this for mobile app designs?",
      answer: "Yes! The generated code is responsive and works well for both web and mobile interfaces. You can select your target framework during the generation process."
    },
    {
      question: "How do I fix inaccuracies in the generated code?",
      answer: "The code editor allows you to make manual adjustments to the generated code. You can also regenerate specific sections or components."
    },
    {
      question: "Is there an offline version available?",
      answer: "Currently, we require an internet connection for full functionality, but basic code generation can work offline for previously cached elements."
    }
  ];

  const tips = [
    "Use high-resolution screenshots for better accuracy",
    "Crop images to include only the UI you want to convert",
    "Simple designs convert more accurately than complex ones",
    "Light mode designs generally convert better than dark mode",
    "Frame your screenshot to clearly show all UI elements"
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={toggleHelp}
        className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
        aria-label="Help and tips"
      >
        <HelpCircle size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-background border border-border rounded-lg shadow-xl p-4 animate-in slide-in-from-right-10 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Help & Tips</h3>
            <button onClick={toggleHelp} className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Lightbulb size={18} />
              <h4 className="font-medium">Quick Tips</h4>
            </div>
            <ul className="space-y-2 pl-7 text-sm list-disc text-muted-foreground">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <AlertCircle size={18} />
              <h4 className="font-medium">FAQs</h4>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm font-medium py-2">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <a href="#" className="text-sm flex items-center gap-1 text-primary hover:underline">
              View full documentation <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSection;
