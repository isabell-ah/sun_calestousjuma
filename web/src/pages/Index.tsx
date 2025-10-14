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

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoginModal } from "@/components/LoginModal";
import { useAppStore } from "@/stores/useAppStore";
import {
    Code,
    Play,
    FileText,
    Lightbulb,
    Zap,
    BookOpen,
    Terminal
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const [mounted, setMounted] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const playgroundOptions = [
        {
            title: "Quick Code Test",
            description: "Test small code snippets quickly",
            icon: <Zap className="h-6 w-6" />,
            action: () => {
                localStorage.setItem("selectedProblem", JSON.stringify({
                    id: "playground-quick",
                    title: "Quick Code Test",
                    description: "Test your code snippets here",
                    starterCode: "# Write your code here\nprint('Hello, Playground!')"
                }));
                navigate("/code");
            }
        },
        {
            title: "Algorithm Practice",
            description: "Practice algorithms without constraints",
            icon: <Code className="h-6 w-6" />,
            action: () => {
                localStorage.setItem("selectedProblem", JSON.stringify({
                    id: "playground-algorithm",
                    title: "Algorithm Practice",
                    description: "Practice algorithms and data structures",
                    starterCode: "# Algorithm practice\n# Try implementing sorting, searching, or other algorithms\n\ndef my_algorithm():\n    pass\n\nmy_algorithm()"
                }));
                navigate("/code");
            }
        },
        {
            title: "Learning Experiments",
            description: "Experiment with new concepts",
            icon: <Lightbulb className="h-6 w-6" />,
            action: () => {
                localStorage.setItem("selectedProblem", JSON.stringify({
                    id: "playground-experiment",
                    title: "Learning Experiments",
                    description: "Experiment with new programming concepts",
                    starterCode: "# Experiment with new concepts\n# Try out new libraries, patterns, or techniques\n\n# Example: Working with lists\nmy_list = [1, 2, 3, 4, 5]\nprint(my_list)"
                }));
                navigate("/code");
            }
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-6 py-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Terminal className="h-10 w-10 text-primary" />
                        <h1 className="text-4xl font-bold">Code Playground</h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A free-form coding environment where you can experiment, test ideas,
                        and practice without any constraints or specific problems.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {playgroundOptions.map((option, index) => (
                        <Card
                            key={index}
                            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                            onClick={option.action}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        {option.icon}
                                    </div>
                                    {option.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {option.description}
                                </p>
                                <Button className="w-full">
                                    <Play className="h-4 w-4 mr-2" />
                                    Start Coding
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                Need Structure?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                If you prefer guided learning with structured lessons and exercises,
                                check out our learning tracks.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/learn")}
                                className="border-blue-200 hover:bg-blue-50"
                            >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Browse Learning Tracks
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-green-600" />
                                Want Challenges?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Ready for coding challenges and problems?
                                Head to our problem dashboard for structured practice.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/")}
                                className="border-green-200 hover:bg-green-50"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                View Problems
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Login Section */}
                {!isAuthenticated && (
                    <div className="mt-12 text-center">
                        <Card className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-800">
                                    🚀 Ready to Start Learning?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">
                                    Sign in to track your progress, earn XP, and unlock achievements!
                                </p>
                                <Button
                                    onClick={() => setShowLoginModal(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    Get Started - Sign In
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* User Welcome */}
                {isAuthenticated && user && (
                    <div className="mt-12 text-center">
                        <Card className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                            <CardContent className="pt-6">
                                <h3 className="text-xl font-bold text-green-800 mb-2">
                                    Welcome back, {user.name}! 👋
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Level {user.level} • {user.xp} XP
                                </p>
                                <Button
                                    onClick={() => navigate("/tracks")}
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    Continue Learning
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Badge variant="outline" className="text-sm px-4 py-2">
                        💡 Tip: Use the playground to test concepts before applying them in challenges
                    </Badge>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                open={showLoginModal}
                onOpenChange={setShowLoginModal}
            />
        </div>
    );
};

export default Index;
