import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/lib/CONSTATS";

export const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Bestie</CardTitle>
          <CardDescription>
            Sign in with Google to start coding challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleGoogleLogin}
            className="w-full"
            size="lg"
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};