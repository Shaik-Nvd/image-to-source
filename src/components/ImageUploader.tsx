
import React, { useState, useCallback, useRef } from 'react';
import { Image, Upload, X, AlertCircle } from 'lucide-react';
import { fileToDataUrl, isImageFile, validateImageQuality } from '../utils/imageHelpers';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageWarning, setImageWarning] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, []);
  
  const handleFiles = useCallback(async (files: FileList) => {
    const file = files[0];
    setImageWarning(null);
    
    if (!isImageFile(file)) {
      toast.error('Please upload an image file');
      return;
    }
    
    try {
      setIsUploading(true);
      const dataUrl = await fileToDataUrl(file);
      
      // Validate image quality
      const qualityCheck = await validateImageQuality(dataUrl);
      
      if (!qualityCheck.valid) {
        setImageWarning(qualityCheck.message);
        toast.warning(qualityCheck.message);
      }
      
      setPreview(dataUrl);
      onImageUploaded(dataUrl);
    } catch (error) {
      toast.error('Failed to process the image');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }, [onImageUploaded]);
  
  const clearImage = useCallback(() => {
    setPreview(null);
    setImageWarning(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);
  
  return (
    <section id="upload" className="py-16 px-6 animate-fade-in opacity-0 animation-delay-300">
      <div className="container mx-auto max-w-3xl">
        <div 
          className={`
            relative rounded-xl overflow-hidden transition-all duration-300 
            ${isDragging ? 'border-primary ring-2 ring-primary/20 scale-[1.01]' : 'border-dashed border-2 border-border'} 
            ${!preview ? 'h-72' : 'h-auto'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!preview ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-secondary flex items-center justify-center animate-pulse-soft">
                <Upload size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Drag and drop your screenshot</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Upload a screenshot of any website or UI design to convert it to code
              </p>
              <button
                className="button-animation px-5 py-2.5 bg-secondary text-foreground hover:bg-secondary/80 rounded-lg font-medium flex items-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image size={16} className="mr-2" />
                Select Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>
          ) : (
            <div className="relative">
              <img 
                src={preview} 
                alt="Uploaded screenshot" 
                className="w-full h-auto rounded-xl animate-scale-in"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-foreground/10 hover:bg-foreground/20 backdrop-blur-sm rounded-full text-white transition-colors"
                onClick={clearImage}
              >
                <X size={16} />
              </button>
              
              {imageWarning && (
                <div className="absolute bottom-0 left-0 right-0 bg-amber-500/90 text-white p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle size={16} />
                    <p>{imageWarning}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {isUploading && (
          <div className="mt-4 p-4 rounded-lg bg-secondary animate-pulse">
            <p className="text-center text-sm">Processing your image...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageUploader;
