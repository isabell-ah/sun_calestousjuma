import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const Playground = () => {
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

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
                                onClick={() => navigate("/dashboard")}
                                className="border-green-200 hover:bg-green-50"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                View Problems
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 text-center">
                    <Badge variant="outline" className="text-sm px-4 py-2">
                        💡 Tip: Use the playground to test concepts before applying them in challenges
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default Playground;