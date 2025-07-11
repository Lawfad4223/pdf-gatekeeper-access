
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot } from "@/hooks/useHoneypot";
import HoneypotField from "./HoneypotField";
import LoadingButton from "./LoadingButton";
import companyLogo from "@/assets/company-logo.png";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { honeypot, setHoneypot, isBot } = useHoneypot();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's likely a bot
    if (isBot) {
      console.log("Bot detected via honeypot, blocking submission");
      toast({
        title: "Access Denied",
        description: "Suspicious activity detected.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
      toast({
        title: "Access granted",
        description: "Welcome! You can now view PDF attachments.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
            <img src={companyLogo} alt="Company Logo" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Document Access
          </CardTitle>
          <CardDescription className="text-gray-600">
            Access secure document viewing
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <HoneypotField value={honeypot} onChange={setHoneypot} />
            
            <LoadingButton
              isLoading={isLoading}
              loadingText="Accessing..."
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Access Documents
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
