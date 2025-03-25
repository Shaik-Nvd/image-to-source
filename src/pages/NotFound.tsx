
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium button-animation hover:bg-primary/90"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
