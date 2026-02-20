import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentUpload from "@/components/DocumentUpload";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DocumentUploadPage = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleUploadComplete = () => {
    setIsUploaded(true);
    // Here you could save the upload status to localStorage or context
    localStorage.setItem('documentsUploaded', 'true');
  };

  const handleContinue = () => {
    navigate('/run-check');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Upload Your Documents
            </h1>
            <p className="text-muted-foreground">
              Please upload the required documents to proceed with verification.
            </p>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-blue-800 text-center">
                💡 <strong>Note:</strong> Document upload is free. Login is required only to generate verification reports.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Upload your identification documents securely. All files are encrypted and stored safely.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentUpload onFilesChange={() => handleUploadComplete()} />

              {isUploaded && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800">Documents uploaded successfully!</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleContinue}
                  disabled={!isUploaded}
                  className="flex items-center gap-2"
                >
                  Continue to Verification
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadPage;