import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export function PaymentFailurePage() {
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-rose-600 p-5">
      <div className="bg-white rounded-xl p-10 sm:p-14 text-center max-w-md shadow-2xl">
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </div>

        <h1 className="text-foreground text-2xl sm:text-3xl font-bold mb-4">
          Payment Failed
        </h1>
        
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          Unfortunately, your payment could not be processed. Please check your 
          payment details and try again. If the problem persists, please contact 
          our support team.
        </p>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={handleRetry} 
            disabled={retrying}
            className="w-full"
          >
            {retrying ? "Redirecting..." : "Try Again"}
          </Button>
          
          <Link to="/dashboard" className="w-full">
            <Button variant="secondary" className="w-full">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
