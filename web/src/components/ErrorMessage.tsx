import { AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorMessageProps {
    title?: string;
    message: string;
    type?: "network" | "auth" | "server" | "generic";
    onRetry?: () => void;
    showRetry?: boolean;
}

export const ErrorMessage = ({ 
    title, 
    message, 
    type = "generic", 
    onRetry, 
    showRetry = true 
}: ErrorMessageProps) => {
    const getIcon = () => {
        switch (type) {
            case "network":
                return <WifiOff className="h-8 w-8 text-red-500" />;
            case "auth":
                return <AlertCircle className="h-8 w-8 text-yellow-500" />;
            case "server":
                return <AlertCircle className="h-8 w-8 text-red-500" />;
            default:
                return <AlertCircle className="h-8 w-8 text-red-500" />;
        }
    };

    const getDefaultTitle = () => {
        switch (type) {
            case "network":
                return "Connection Error";
            case "auth":
                return "Authentication Required";
            case "server":
                return "Server Error";
            default:
                return "Error";
        }
    };

    const getHelpText = () => {
        switch (type) {
            case "network":
                return "Please check your internet connection and try again.";
            case "auth":
                return "Please sign in to continue.";
            case "server":
                return "Our servers are experiencing issues. Please try again later.";
            default:
                return "Something went wrong. Please try again.";
        }
    };

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                    {getIcon()}
                </div>
                <CardTitle className="text-lg">
                    {title || getDefaultTitle()}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">{message}</p>
                <p className="text-sm text-muted-foreground">{getHelpText()}</p>
                {showRetry && onRetry && (
                    <Button onClick={onRetry} variant="outline" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};