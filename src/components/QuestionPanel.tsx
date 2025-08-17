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
import { Eye, EyeOff, RefreshCw, BookOpen, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SAMPLE_QUESTIONS = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "easy",
        description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation:
                    "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
        ],
        constraints: [
            "2 ≤ nums.length ≤ 10⁴",
            "-10⁹ ≤ nums[i] ≤ 10⁹",
            "-10⁹ ≤ target ≤ 10⁹",
        ],
        hint: "Try using a hash map to store the numbers you've seen and their indices.",
        category: "Array",
        acceptanceRate: "49.1%",
        submissions: "8.2M",
    },
    {
        id: 2,
        title: "Valid Parentheses",
        difficulty: "easy",
        description:
            "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
            {
                input: 's = "()"',
                output: "true",
            },
            {
                input: 's = "()[]{}"',
                output: "true",
            },
            {
                input: 's = "(]"',
                output: "false",
            },
        ],
        constraints: [
            "1 ≤ s.length ≤ 10⁴",
            "s consists of parentheses only '()[]{}'.",
        ],
        hint: "Use a stack data structure to keep track of opening brackets.",
        category: "Stack",
        acceptanceRate: "40.8%",
        submissions: "3.1M",
    },
];

export const QuestionPanel = () => {
    const [currentQuestion, setCurrentQuestion] = useState(SAMPLE_QUESTIONS[0]);
    const [showHint, setShowHint] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                return "difficulty-easy";
            case "medium":
                return "difficulty-medium";
            case "hard":
                return "difficulty-hard";
            default:
                return "difficulty-easy";
        }
    };

    const loadNewQuestion = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const randomQuestion =
            SAMPLE_QUESTIONS[
                Math.floor(Math.random() * SAMPLE_QUESTIONS.length)
            ];
        setCurrentQuestion(randomQuestion);
        setShowHint(false);
        setIsLoading(false);
    };

    useEffect(() => {
        // Check if there's a selected question from the dashboard
        const selectedQuestion = localStorage.getItem("selectedQuestion");
        if (selectedQuestion) {
            const question = JSON.parse(selectedQuestion);
            // Convert dashboard question format to QuestionPanel format
            const convertedQuestion = {
                id: parseInt(question.id.replace("q-", "")),
                title: question.title,
                difficulty: question.difficulty.toLowerCase(),
                description: question.description,
                examples: [
                    {
                        input: "Example input will be shown here",
                        output: "Expected output",
                        explanation: "Explanation of the solution approach",
                    },
                ],
                constraints: [
                    "Constraints will be loaded based on question type",
                    "Time complexity: O(n)",
                    "Space complexity: O(1)",
                ],
                hint: "Think about the optimal approach for this problem type",
                category: question.category,
                acceptanceRate: `${question.acceptanceRate}%`,
                submissions: `${Math.floor(question.submissions / 1000)}K`,
            };
            setCurrentQuestion(convertedQuestion);
            localStorage.removeItem("selectedQuestion"); // Clear after loading
        } else {
            loadNewQuestion();
        }
    }, []);

    return (
        <div className="h-full flex flex-col bg-surface">
            {/* Question Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-text-primary">
                            Problem
                        </h2>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={loadNewQuestion}
                        disabled={isLoading}
                        className="text-text-secondary hover:text-text-primary"
                    >
                        <RefreshCw
                            className={`h-4 w-4${isLoading ? " animate-spin" : ""}`}
                        />
                    </Button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                        {currentQuestion.title}
                    </h3>
                    <Badge
                        className={getDifficultyColor(
                            currentQuestion.difficulty
                        )}
                    >
                        {currentQuestion.difficulty.charAt(0).toUpperCase() +
                            currentQuestion.difficulty.slice(1)}
                    </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{currentQuestion.acceptanceRate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{currentQuestion.submissions}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                        {currentQuestion.category}
                    </Badge>
                </div>
            </div>

            {/* Question Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="animate-fade-in">
                    <p className="text-text-primary leading-relaxed">
                        {currentQuestion.description}
                    </p>
                </div>

                {/* Examples */}
                <Card className="glass-card animate-slide-up">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-text-secondary">
                            Examples
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {currentQuestion.examples.map((example, index) => (
                            <div
                                key={index}
                                className="bg-surface-elevated p-3 rounded-md"
                            >
                                <div className="space-y-1 text-sm font-mono">
                                    <div>
                                        <span className="text-text-secondary">
                                            Input:
                                        </span>{" "}
                                        <span className="text-text-primary">
                                            {example.input}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-text-secondary">
                                            Output:
                                        </span>{" "}
                                        <span className="text-primary">
                                            {example.output}
                                        </span>
                                    </div>
                                    {example.explanation && (
                                        <div className="text-text-muted pt-1">
                                            {example.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Constraints */}
                <Card className="glass-card animate-slide-up">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-text-secondary">
                            Constraints
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-1 text-sm text-text-primary">
                            {currentQuestion.constraints.map(
                                (constraint, index) => (
                                    <li key={index} className="font-mono">
                                        • {constraint}
                                    </li>
                                )
                            )}
                        </ul>
                    </CardContent>
                </Card>

                {/* Hint */}
                <Collapsible open={showHint} onOpenChange={setShowHint}>
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-between glass-card hover:bg-surface-elevated"
                        >
                            <span>💡 Show Hint</span>
                            {showHint ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                        <Card className="glass-card bg-primary/5 border-primary/20 animate-slide-up">
                            <CardContent className="pt-4">
                                <p className="text-sm text-text-primary">
                                    {currentQuestion.hint}
                                </p>
                            </CardContent>
                        </Card>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};
