
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import PDFViewer from "@/components/PDFViewer";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uploadedPDF, setUploadedPDF] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    console.log("handleLogin called with:", email, password);
    // Mock authentication - in real app, you'd validate against your backend
    if (email && password) {
      console.log("Setting authentication to true");
      setIsAuthenticated(true);
      console.log("User authenticated successfully");
    } else {
      console.log("Login failed - missing email or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUploadedPDF(null);
    console.log("User logged out");
  };

  const handlePDFUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedPDF(url);
    console.log("PDF uploaded:", file.name);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <PDFViewer 
      pdfUrl={uploadedPDF} 
      onLogout={handleLogout}
      onPDFUpload={handlePDFUpload}
    />
  );
};

export default Index;
