import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Trophy, Code, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { PAGINATE } from "@/lib/CONSTATS";
import { getDifficultyColor } from "@/lib/island";
import FooterComponent from "@/components/Footer";


const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [problems, setProblems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showProblems, setShowProblems] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const navigate = useNavigate();

    const filteredProblems = selectedDifficulty === 'all' 
        ? problems 
        : problems.filter(p => p.difficulty === selectedDifficulty);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         console.log('🔄 Starting data fetch...');
            
    //         try {
    //             // Test basic connectivity first
    //             const healthResponse = await fetch('http://localhost:3001/api/health');
    //             if (!healthResponse.ok) {
    //                 throw new Error('Backend server not responding');
    //             }
    //             console.log('✅ Backend server is running');
                
    //             // Fetch stats
    //             console.log('📊 Fetching stats...');
    //             const statsData = await api.getStats();
    //             console.log('Stats received:', statsData);
    //             setStats(statsData);
                
    //             // Fetch problems
    //             console.log('📝 Fetching problems...');
    //             const problemsResponse = await fetch('http://localhost:3001/api/problems');
    //             const problemsData = await problemsResponse.json();
    //             console.log('Problems received:', problemsData);
                
    //             if (problemsData.problems) {
    //                 setProblems(problemsData.problems);
    //                 console.log(`✅ Loaded ${problemsData.problems.length} problems`);
    //             } else {
    //                 console.warn('No problems array in response');
    //                 setProblems([]);
    //             }
                
    //         } catch (error) {
    //             console.error('❌ Data fetch failed:', error);
    //             setStats({ totalProblems: 0, totalUsers: 0, totalSubmissions: 0 });
    //             setProblems([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
        
    //     fetchData();
    // }, []);

    const handleProblemClick = (problem: any) => {
        localStorage.setItem("selectedProblem", JSON.stringify(problem));
        navigate("/code");
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const [statsData, problemsData] = await Promise.all([
                api.getStats(),
                api.getProblems({ page: 1, limit: 100 })
            ]);
            setStats(statsData);
            setProblems(problemsData.problems || problemsData || []);
        } catch (error) {
            console.error('Failed to refresh data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-8">
                <div className="space-y-6">
                    {!showProblems ? (
                        // Dashboard View
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                                    <p className="text-muted-foreground mt-2">Ready to solve some coding challenges?</p>
                                </div>
                                <Button onClick={() => setShowProblems(true)}>
                                    View All Problems
                                </Button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Problems</CardTitle>
                                        <Code className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats?.totalProblems || 0}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Your XP</CardTitle>
                                        <Trophy className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{user?.xp || 0}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Your Level</CardTitle>
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{user?.level || 1}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                        <User className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Activity & Quick Actions */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Start</CardTitle>
                                        <CardDescription>Jump into coding challenges</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button onClick={() => setShowProblems(true)} className="w-full">
                                            Browse Problems
                                        </Button>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button variant="outline" onClick={() => navigate('/learn')}>
                                                Learning Tracks
                                            </Button>
                                            <Button variant="outline" onClick={() => navigate('/playground')}>
                                                Playground
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                        <CardDescription>Your coding progress</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Problems Solved</span>
                                                <span className="font-medium">0</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Current Streak</span>
                                                <span className="font-medium">0 days</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Last Active</span>
                                                <span className="font-medium">Today</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </>
                    ) : (
                        // Problems List View
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Button variant="ghost" onClick={() => setShowProblems(false)} className="mb-2">
                                        ← Back to Dashboard
                                    </Button>
                                    <h1 className="text-3xl font-bold">Coding Problems</h1>
                                    <p className="text-muted-foreground mt-2">
                                        Choose from {stats?.totalProblems || 0} programming challenges
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
                                        {loading ? 'Refreshing...' : 'Refresh'}
                                    </Button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                </div>
                            </div>

                            {/* Difficulty Filter Tabs */}
                            <div className="flex gap-2 mb-4">
                                <Button 
                                    variant={selectedDifficulty === 'all' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedDifficulty('all')}
                                >
                                    All ({problems.length})
                                </Button>
                                <Button 
                                    variant={selectedDifficulty === 'easy' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedDifficulty('easy')}
                                >
                                    Beginner ({problems.filter(p => p.difficulty === 'easy').length})
                                </Button>
                                <Button 
                                    variant={selectedDifficulty === 'medium' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedDifficulty('medium')}
                                >
                                    Intermediate ({problems.filter(p => p.difficulty === 'medium').length})
                                </Button>
                                <Button 
                                    variant={selectedDifficulty === 'hard' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setSelectedDifficulty('hard')}
                                >
                                    Advanced ({problems.filter(p => p.difficulty === 'hard').length})
                                </Button>
                            </div>

                            <div className="rounded-lg border bg-card">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-16">#</TableHead>
                                            <TableHead>Problem</TableHead>
                                            <TableHead className="w-24">Difficulty</TableHead>
                                            <TableHead className="w-32">Category</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredProblems.map((problem, index) => (
                                            <TableRow
                                                key={problem.id}
                                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                                onClick={() => handleProblemClick(problem)}
                                            >
                                                <TableCell className="font-mono text-sm text-muted-foreground">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <h3 className="font-medium hover:text-primary transition-colors">
                                                        {problem.title}
                                                    </h3>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={getDifficultyColor(problem.difficulty)}>
                                                        {problem.difficulty === 'easy' ? 'Beginner' : 
                                                         problem.difficulty === 'medium' ? 'Intermediate' : 'Advanced'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{problem.category}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 py-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4 mr-1" />
                                        Previous
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <FooterComponent />
        </div>
    );
};

export default Dashboard;