
import React from "react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  loadingText: string;
  className?: string;
}

const LoadingButton = ({ 
  isLoading, 
  disabled = false, 
  children, 
  loadingText, 
  className 
}: LoadingButtonProps) => {
  return (
    <Button
      type="submit"
      className={className}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
