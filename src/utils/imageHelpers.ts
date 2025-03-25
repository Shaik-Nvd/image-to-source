
/**
 * Utility functions for handling image uploads and processing
 */

// Check if the file is an image
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

// Convert a File object to a data URL
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      resolve(reader.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

// Convert a data URL to an image element
export const dataUrlToImage = (dataUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = dataUrl;
  });
};

// Create a placeholder loading state for the code output
export const generatePlaceholderCode = (): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
  <style>
    /* Styles will appear here */
  </style>
</head>
<body>
  <!-- Content will appear here -->
</body>
</html>
`;
};

// Mock function to simulate code generation (in a real app, this would call an API)
export const simulateCodeGeneration = async (imageUrl: string): Promise<string> => {
  // In a real implementation, this would make an API call to a backend service
  // that would analyze the image and generate the appropriate HTML/CSS
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generatePlaceholderCode());
    }, 2000); // Simulate a 2-second processing time
  });
};
