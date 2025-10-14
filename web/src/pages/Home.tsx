import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoginModal } from "@/components/LoginModal";
import { useAppStore } from "@/stores/useAppStore";
import {
    Code2,
    BookOpen,
    Trophy,
    Users,
    ArrowRight,
    Play,
    Target,
    Zap,
    Star
} from "lucide-react";

const Home = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppStore();

    const features = [
        {
            icon: <Code2 className="h-8 w-8" />,
            title: "Interactive Coding",
            description: "Practice with real coding problems and instant feedback"
        },
        {
            icon: <BookOpen className="h-8 w-8" />,
            title: "Learning Tracks",
            description: "Structured learning paths from beginner to advanced"
        },
        {
            icon: <Trophy className="h-8 w-8" />,
            title: "Progress Tracking",
            description: "Track your progress with XP, levels, and achievements"
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Community",
            description: "Join thousands of developers improving their skills"
        }
    ];

    const quickActions = [
        {
            title: "Start Coding",
            description: "Jump into coding challenges",
            icon: <Target className="h-5 w-5" />,
            action: () => navigate("/dashboard"),
            primary: true
        },
        {
            title: "Learn",
            description: "Follow structured learning paths",
            icon: <BookOpen className="h-5 w-5" />,
            action: () => navigate("/learn")
        },
        {
            title: "Playground",
            description: "Experiment with code freely",
            icon: <Play className="h-5 w-5" />,
            action: () => navigate("/playground")
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            {/* Hero Section */}
            <section className="container py-10 md:py-12">
                <div className="text-center max-w-4xl mx-auto">
                    <Badge variant="outline" className="mb-4">
                        <Star className="h-3 w-3 mr-1" />
                        Free Coding Platform
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Master Coding Through
                        <span className="text-primary"> Practice</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Improve your programming skills with interactive challenges, 
                        structured learning paths, and real-time code execution.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {isAuthenticated ? (
                            <Button 
                                size="lg" 
                                onClick={() => navigate("/dashboard")}
                                className="text-lg px-8"
                            >
                                Continue Learning
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        ) : (
                            <Button 
                                size="lg" 
                                onClick={() => setShowLoginModal(true)}
                                className="text-lg px-8"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        )}
                        <Button 
                            variant="outline" 
                            size="lg"
                            onClick={() => navigate("/playground")}
                            className="text-lg px-8"
                        >
                            <Play className="mr-2 h-5 w-5" />
                            Try Playground
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container py-12 bg-muted/30">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to become a better programmer, all in one place.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader>
                                <div className="mx-auto p-3 bg-primary/10 rounded-lg text-primary w-fit">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="container py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                    <p className="text-muted-foreground">Choose your learning path</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {quickActions.map((action, index) => (
                        <Card 
                            key={index} 
                            className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                                action.primary ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={action.action}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${
                                        action.primary ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                                    }`}>
                                        {action.icon}
                                    </div>
                                    {action.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{action.description}</p>
                                <Button 
                                    variant={action.primary ? "default" : "outline"} 
                                    className="w-full"
                                >
                                    {action.primary ? "Start Now" : "Explore"}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
        </div>
    );
};

export default Home;