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
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    CheckCircle,
    Circle,
    Lock,
    BookOpen,
    Code,
    Trophy,
    Star,
} from "lucide-react";
import { getDifficultyColorx } from "@/lib/island";

import { api } from "@/lib/api";

export default function PythonTracks() {
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
    const [tracks, setTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const tracksData = await api.getTracks();
                setTracks(tracksData);
            } catch (error) {
                console.error('Failed to fetch tracks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTracks();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold">
                            Python Learning Tracks
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Master Python programming from basics to advanced
                        concepts. Track your progress and unlock new challenges.
                        <br />
                        <Badge
                            variant="outline"
                            className={getDifficultyColorx("Beginner")}
                        >
                            {"NOTE"}
                        </Badge>
                        This will also increase Your XP, happy Learning.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p>Loading tracks...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {(showAll ? tracks : tracks.slice(0, 3)).map((track) => (
                        <Card
                            key={track.id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                                selectedTrack === track.id
                                    ? "ring-2 ring-primary"
                                    : ""
                            }`}
                            onClick={() =>
                                setSelectedTrack(
                                    selectedTrack === track.id ? null : track.id
                                )
                            }
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="flex items-center gap-2">
                                            <Code className="h-5 w-5 text-primary" />
                                            {track.title}
                                        </CardTitle>
                                        <Badge
                                            variant="outline"
                                            className={getDifficultyColorx(
                                                track.difficulty
                                            )}
                                        >
                                            {track.difficulty}
                                        </Badge>
                                    </div>
                                    <div className="text-right text-sm text-muted-foreground">
                                        {track.estimatedTime}
                                    </div>
                                </div>
                                <CardDescription>
                                    {track.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress</span>
                                        <span className="font-medium">
                                            {track.progress}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={track.progress}
                                        className="h-2"
                                    />
                                </div>

                                {selectedTrack === track.id && (
                                    <div className="space-y-3 pt-4 border-t">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <Trophy className="h-4 w-4 text-yellow-500" />
                                            Modules
                                        </h4>
                                        {track.modules.map((module) => (
                                            <div
                                                key={module.id}
                                                className={`flex items-center gap-3 p-2 rounded-lg ${
                                                    module.locked
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : "hover:bg-muted/50 cursor-pointer"
                                                }`}
                                            >
                                                {module.locked ? (
                                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                                ) : module.completed ? (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <Circle className="h-4 w-4 text-muted-foreground" />
                                                )}
                                                <span
                                                    className={`text-sm ${module.locked ? "text-muted-foreground" : ""}`}
                                                >
                                                    {module.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <Button
                                        className="w-full"
                                        variant={
                                            track.progress > 0
                                                ? "default"
                                                : "outline"
                                        }

                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Navigate to track learning content, not code editor
                                            console.log('Starting track:', track.id);
                                            navigate(`/learn/${track.id}`);
                                        }}
                                    >
                                        {track.progress > 0
                                            ? "Continue Learning"
                                            : "Start Track"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                            ))}
                        </div>
                        
                        {tracks.length > 3 && (
                            <div className="text-center mt-8">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowAll(!showAll)}
                                >
                                    {showAll ? 'Show Less' : `See All ${tracks.length} Tracks`}
                                </Button>
                            </div>
                        )}
                    </>
                )}

                <div className="mt-12 text-center">
                    <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 to-primary/5">
                        <div className="flex items-center gap-3 mb-3">
                            <Star className="h-6 w-6 text-primary" />
                            <h3 className="text-lg font-semibold">
                                Ready for Challenges?
                            </h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Test your skills with coding challenges and compete
                            with others
                        </p>
                        <Link to="/">
                            <Button>Go to Challenges</Button>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
}
