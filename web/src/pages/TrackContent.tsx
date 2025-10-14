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
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    CheckCircle,
    Circle,
    Lock,
    BookOpen,
    Code,
    ArrowLeft,
    Play,
    Trophy,
} from "lucide-react";
import { api } from "@/lib/api";
import { getDifficultyColorx } from "@/lib/island";

export default function TrackContent() {
    const { trackId } = useParams();
    const navigate = useNavigate();
    const [track, setTrack] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const tracksData = await api.getTracks();
                const foundTrack = tracksData.find((t: any) => t.id === trackId);
                setTrack(foundTrack);
            } catch (error) {
                console.error('Failed to fetch track:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrack();
    }, [trackId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-6 py-8">
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p>Loading track content...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!track) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-6 py-8">
                    <div className="text-center py-8">
                        <h1 className="text-2xl font-bold mb-4">Track Not Found</h1>
                        <Link to="/learn">
                            <Button>Back to Learning Tracks</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="mb-4"
                        onClick={() => navigate("/learn")}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Learning Tracks
                    </Button>

                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold">{track.title}</h1>
                        <Badge
                            variant="outline"
                            className={getDifficultyColorx(track.difficulty)}
                        >
                            {track.difficulty}
                        </Badge>
                    </div>

                    <p className="text-muted-foreground text-lg mb-4">
                        {track.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>📅 {track.estimatedTime}</span>
                        <span>📊 {track.progress}% Complete</span>
                        <span>🎯 {track.modules.length} Modules</span>
                    </div>

                    <div className="mt-4">
                        <Progress value={track.progress} className="h-3" />
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {track.modules.map((module: any, index: number) => (
                        <Card
                            key={module.id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                                module.locked
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:scale-105"
                            }`}
                            onClick={() => {
                                if (!module.locked) {
                                    navigate(`/learn/${trackId}/${module.id}`);
                                }
                            }}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            {module.locked ? (
                                                <Lock className="h-5 w-5 text-muted-foreground" />
                                            ) : module.completed ? (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <Circle className="h-5 w-5 text-primary" />
                                            )}
                                            <span className="text-sm">
                                                Module {index + 1}
                                            </span>
                                        </CardTitle>
                                        <h3 className="font-semibold">
                                            {module.title}
                                        </h3>
                                    </div>
                                    {module.completed && (
                                        <Trophy className="h-5 w-5 text-yellow-500" />
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        {module.locked
                                            ? "Complete previous modules to unlock"
                                            : module.completed
                                            ? "Module completed! Click to review"
                                            : "Click to start learning"}
                                    </p>

                                    <Button
                                        className="w-full"
                                        variant={
                                            module.completed
                                                ? "outline"
                                                : module.locked
                                                ? "secondary"
                                                : "default"
                                        }
                                        disabled={module.locked}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!module.locked) {
                                                navigate(`/learn/${trackId}/${module.id}`);
                                            }
                                        }}
                                    >
                                        {module.completed ? (
                                            <>
                                                <BookOpen className="h-4 w-4 mr-2" />
                                                Review
                                            </>
                                        ) : module.locked ? (
                                            <>
                                                <Lock className="h-4 w-4 mr-2" />
                                                Locked
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-4 w-4 mr-2" />
                                                Start Learning
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Practice Problems Section */}
                <div className="mt-12">
                    <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code className="h-6 w-6 text-primary" />
                                Practice Problems
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Ready to test your knowledge? Try these coding challenges
                                related to {track.title}.
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => {
                                        // Navigate to code editor with track problems
                                        const firstProblem = track.problems?.[0];
                                        if (firstProblem) {
                                            localStorage.setItem("selectedProblem", JSON.stringify(firstProblem));
                                            navigate("/code");
                                        }
                                    }}
                                >
                                    <Code className="h-4 w-4 mr-2" />
                                    Start Coding
                                </Button>
                                <Button variant="outline">
                                    View All Problems ({track.problems?.length || 0})
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
