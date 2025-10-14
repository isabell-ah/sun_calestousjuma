import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { User, Trophy, Calendar, Code, Target } from "lucide-react";
import FooterComponent from "@/components/Footer";

const Profile = () => {
    const { user } = useAuth();
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const submissionsData = await api.getMySubmissions();
                setSubmissions(submissionsData || []);
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    const solvedProblems = submissions.filter(s => s.status === 'accepted').length;
    const totalSubmissions = submissions.length;
    const successRate = totalSubmissions > 0 ? Math.round((solvedProblems / totalSubmissions) * 100) : 0;
    const nextLevelXP = (user?.level || 1) * 100;
    const currentLevelXP = ((user?.level || 1) - 1) * 100;
    const progressToNextLevel = ((user?.xp || 0) - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-8">
                <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
                            ) : (
                                <User className="w-10 h-10 text-primary" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user?.name}</h1>
                            <p className="text-muted-foreground">{user?.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <Badge variant="secondary">Level {user?.level || 1}</Badge>
                                <span className="text-sm text-muted-foreground">{user?.xp || 0} XP</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                                <Code className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{solvedProblems}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                                <Target className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalSubmissions}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <Trophy className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{successRate}%</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{user?.streak || 0} days</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Progress to Next Level */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Level Progress</CardTitle>
                            <CardDescription>
                                {user?.xp || 0} / {nextLevelXP} XP to reach Level {(user?.level || 1) + 1}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={progressToNextLevel} className="w-full" />
                            <p className="text-sm text-muted-foreground mt-2">
                                {nextLevelXP - (user?.xp || 0)} XP remaining
                            </p>
                        </CardContent>
                    </Card>

                    {/* Recent Submissions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Submissions</CardTitle>
                            <CardDescription>Your latest coding attempts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submissions.length > 0 ? (
                                <div className="space-y-3">
                                    {submissions.slice(0, 5).map((submission, index) => (
                                        <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">{submission.problem?.title || 'Unknown Problem'}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {submission.language} • {new Date(submission.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Badge 
                                                variant={submission.status === 'accepted' ? 'default' : 'destructive'}
                                            >
                                                {submission.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No submissions yet. Start solving problems!</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <FooterComponent />
        </div>
    );
};

export default Profile;