import { useState, useEffect } from "react";
import { BookOpen, Clock, Users, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Problem {
    id: string;
    title: string;
    difficulty: string;
    description: string;
    category: string;
    acceptanceRate?: number;
    submissions?: number;
    testCases?: string;
    hints?: string;
}

export const QuestionPanel = () => {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [showHint, setShowHint] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "medium":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "hard":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        }
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    useEffect(() => {
        const selectedProblem = localStorage.getItem("selectedProblem");
        if (selectedProblem) {
            try {
                const parsed = JSON.parse(selectedProblem);
                setProblem({
                    id: parsed.id || 'problem-1',
                    title: parsed.title || 'Coding Problem',
                    difficulty: parsed.difficulty || 'easy',
                    description: parsed.description || 'Solve this coding challenge.',
                    category: parsed.category || 'General',
                    acceptanceRate: parsed.acceptanceRate || 50,
                    submissions: parsed.submissions || 1000,
                    testCases: parsed.testCases,
                    hints: parsed.hints
                });
            } catch (error) {
                console.error('Error parsing problem:', error);
                setProblem({
                    id: 'default',
                    title: 'Welcome to Coding',
                    difficulty: 'easy',
                    description: 'Select a problem from the dashboard to start coding.',
                    category: 'General'
                });
            }
        } else {
            setProblem({
                id: 'default',
                title: 'Welcome to Coding',
                difficulty: 'easy',
                description: 'Select a problem from the dashboard to start coding.',
                category: 'General'
            });
        }
    }, []);

    if (!problem) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const examples = problem.testCases ? (() => {
        try {
            return JSON.parse(problem.testCases);
        } catch {
            return [];
        }
    })() : [];

    const hints = problem.hints ? (() => {
        try {
            const parsed = JSON.parse(problem.hints);
            return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
            return [];
        }
    })() : [];

    return (
        <div className="h-full flex flex-col bg-background">
            <div className="p-4 border-b">
                <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">Problem</h2>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{problem.title}</h3>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {problem.acceptanceRate && (
                        <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{problem.acceptanceRate}%</span>
                        </div>
                    )}
                    {problem.submissions && (
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatNumber(problem.submissions)}</span>
                        </div>
                    )}
                    <Badge variant="outline" className="text-xs">
                        {problem.category}
                    </Badge>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm text-muted-foreground">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="leading-relaxed whitespace-pre-line">{problem.description}</p>
                    </CardContent>
                </Card>

                {examples.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">Examples</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {examples.map((example: any, index: number) => (
                                <div key={index} className="bg-muted/50 p-3 rounded-md">
                                    <div className="space-y-1 text-sm font-mono">
                                        <div>
                                            <span className="text-muted-foreground">Input:</span>{" "}
                                            <span>{JSON.stringify(example.input)}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Output:</span>{" "}
                                            <span className="text-primary">{JSON.stringify(example.output)}</span>
                                        </div>
                                        {example.explanation && (
                                            <div className="text-muted-foreground pt-1">
                                                {example.explanation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {hints.length > 0 && (
                    <div>
                        <Button
                            variant="outline"
                            className="w-full justify-between"
                            onClick={() => setShowHint(!showHint)}
                        >
                            <span>💡 Show Hint</span>
                            {showHint ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        {showHint && (
                            <Card className="mt-2 bg-primary/5 border-primary/20">
                                <CardContent className="pt-4">
                                    <p className="text-sm">{hints[0]}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};