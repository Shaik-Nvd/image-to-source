
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

// Validate image quality
export const validateImageQuality = async (dataUrl: string): Promise<{ valid: boolean; message: string | null }> => {
  try {
    const img = await dataUrlToImage(dataUrl);
    
    // Check resolution
    if (img.width < 800 || img.height < 600) {
      return {
        valid: false,
        message: "Low resolution image may produce less accurate results. Consider using a higher quality image."
      };
    }
    
    // Check aspect ratio (extremely distorted images might be problematic)
    const aspectRatio = img.width / img.height;
    if (aspectRatio > 3 || aspectRatio < 0.33) {
      return {
        valid: false,
        message: "Unusual aspect ratio detected. This may affect the accuracy of generated code."
      };
    }
    
    return { valid: true, message: null };
  } catch (error) {
    console.error("Error validating image:", error);
    return { valid: false, message: "Unable to analyze image quality." };
  }
};

// Create placeholder loading state for the code output
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

// Generate framework-specific code snippets
const generateReactTailwindCode = (): string => {
  return `
import React from 'react';

export default function GeneratedComponent() {
  return (
    <div className="container mx-auto p-4">
      <header className="py-6">
        <h1 className="text-2xl font-bold">Generated React Component</h1>
      </header>
      <main>
        {/* Generated content based on your screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Feature One</h2>
            <p className="text-gray-600">Description of feature one goes here.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Feature Two</h2>
            <p className="text-gray-600">Description of feature two goes here.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
`;
};

const generateVueTailwindCode = (): string => {
  return `
<template>
  <div class="container mx-auto p-4">
    <header class="py-6">
      <h1 class="text-2xl font-bold">Generated Vue Component</h1>
    </header>
    <main>
      <!-- Generated content based on your screenshot -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Feature One</h2>
          <p class="text-gray-600">Description of feature one goes here.</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Feature Two</h2>
          <p class="text-gray-600">Description of feature two goes here.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'GeneratedComponent'
}
</script>
`;
};

const generateHtmlCssCode = (): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated HTML</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    header {
      padding: 1.5rem 0;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    .grid {
      display: grid;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 1.5rem;
    }
    .card h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 1rem;
    }
    .card p {
      color: #666;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Generated HTML</h1>
    </header>
    <main>
      <div class="grid">
        <div class="card">
          <h2>Feature One</h2>
          <p>Description of feature one goes here.</p>
        </div>
        <div class="card">
          <h2>Feature Two</h2>
          <p>Description of feature two goes here.</p>
        </div>
      </div>
    </main>
  </div>
</body>
</html>
`;
};

const generateBootstrapCode = (): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap Layout</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container py-4">
    <header class="pb-3 mb-4">
      <h1 class="fw-bold">Generated Bootstrap Layout</h1>
    </header>
    <main>
      <div class="row g-4">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title fs-4 fw-semibold mb-3">Feature One</h2>
              <p class="card-text text-secondary">Description of feature one goes here.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-body">
              <h2 class="card-title fs-4 fw-semibold mb-3">Feature Two</h2>
              <p class="card-text text-secondary">Description of feature two goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;
};

// Mock function to simulate code generation (in a real app, this would call an API)
export const simulateCodeGeneration = async (imageUrl: string, framework: string = 'react-tailwind'): Promise<string> => {
  // In a real implementation, this would make an API call to a backend service
  // that would analyze the image and generate the appropriate HTML/CSS
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return different code based on the selected framework
      switch (framework) {
        case 'react-tailwind':
          resolve(generateReactTailwindCode());
          break;
        case 'vue-tailwind':
          resolve(generateVueTailwindCode());
          break;
        case 'html-css':
          resolve(generateHtmlCssCode());
          break;
        case 'bootstrap':
          resolve(generateBootstrapCode());
          break;
        default:
          resolve(generatePlaceholderCode());
      }
    }, 2000); // Simulate a 2-second processing time
  });
};
