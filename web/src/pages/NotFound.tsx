/*
 * CJLF LICENSE (c) 2025
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Code, BookOpen } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container py-16 flex items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="text-6xl mb-4">404</div>
                        <CardTitle className="text-2xl mb-2">Oops! Page not found</CardTitle>
                        <p className="text-muted-foreground">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button 
                            onClick={() => navigate('/')}
                            className="w-full"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Return to Home
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                            <Button 
                                variant="outline"
                                onClick={() => navigate('/dashboard')}
                                size="sm"
                            >
                                <Code className="mr-1 h-4 w-4" />
                                Problems
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => navigate('/learn')}
                                size="sm"
                            >
                                <BookOpen className="mr-1 h-4 w-4" />
                                Learn
                            </Button>
                        </div>
                        <Button 
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="w-full"
                            size="sm"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NotFound;
