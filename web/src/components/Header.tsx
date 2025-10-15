import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, Trophy, Home, Code, BookOpen, Play, Menu, X } from "lucide-react";

export const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="h-full px-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            📚 Bestie 📚
                        </h1>
                    </Link>

                    <nav className="hidden md:flex items-center gap-2">
                        <Button
                            variant={location.pathname === "/" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => navigate("/")}
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Button>
                        <Button
                            variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => navigate("/dashboard")}
                        >
                            <Code className="h-4 w-4 mr-1" />
                            Dashboard
                        </Button>
                        <Button
                            variant={location.pathname.startsWith("/learn") ? "default" : "ghost"}
                            size="sm"
                            onClick={() => navigate("/learn")}
                        >
                            <BookOpen className="h-4 w-4 mr-1" />
                            Learn
                        </Button>
                        <Button
                            variant={location.pathname === "/playground" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => navigate("/playground")}
                        >
                            <Play className="h-4 w-4 mr-1" />
                            Playground
                        </Button>
                        <Button
                            variant={location.pathname === "/leaderboard" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => navigate("/leaderboard")}
                        >
                            <Trophy className="h-4 w-4 mr-1" />
                            Leaderboard
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-yellow-500" />
                                    <span>{user.xp} XP</span>
                                </div>
                                <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <User className="h-4 w-4" />
                                    <span>{user.name}</span>
                                    <span className="text-muted-foreground">Level {user.level}</span>
                                </Link>
                            </div>
                            <ThemeToggle />
                            <Button variant="ghost" size="sm" onClick={logout}>
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <ThemeToggle />
                            <Button size="sm" onClick={() => setShowLoginModal(true)}>
                                Sign In
                            </Button>
                        </>
                    )}
                </div>
            </div>
            
           
            {showMobileMenu && (
                <div className="md:hidden absolute top-16 left-0 right-0 z-50">
                    <div className="mx-4 mt-2 rounded-xl bg-card border border-border shadow-xl">
                        <div className="p-4 space-y-1">
                            <Button
                                variant={location.pathname === "/" ? "default" : "ghost"}
                                size="sm"
                                className={`w-full justify-start h-10 px-3 rounded-lg transition-all text-sm ${
                                    location.pathname === "/" 
                                        ? "bg-primary text-primary-foreground shadow-sm" 
                                        : "hover:bg-muted text-foreground"
                                }`}
                                onClick={() => { navigate("/"); setShowMobileMenu(false); }}
                            >
                                <Home className="h-4 w-4 mr-3" />
                                Home
                            </Button>
                            <Button
                                variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                                size="sm"
                                className={`w-full justify-start h-10 px-3 rounded-lg transition-all text-sm ${
                                    location.pathname === "/dashboard" 
                                        ? "bg-primary text-primary-foreground shadow-sm" 
                                        : "hover:bg-muted text-foreground"
                                }`}
                                onClick={() => { navigate("/dashboard"); setShowMobileMenu(false); }}
                            >
                                <Code className="h-4 w-4 mr-3" />
                                Dashboard
                            </Button>
                            <Button
                                variant={location.pathname.startsWith("/learn") ? "default" : "ghost"}
                                size="sm"
                                className={`w-full justify-start h-10 px-3 rounded-lg transition-all text-sm ${
                                    location.pathname.startsWith("/learn") 
                                        ? "bg-primary text-primary-foreground shadow-sm" 
                                        : "hover:bg-muted text-foreground"
                                }`}
                                onClick={() => { navigate("/learn"); setShowMobileMenu(false); }}
                            >
                                <BookOpen className="h-4 w-4 mr-3" />
                                Learn
                            </Button>
                            <Button
                                variant={location.pathname === "/playground" ? "default" : "ghost"}
                                size="sm"
                                className={`w-full justify-start h-10 px-3 rounded-lg transition-all text-sm ${
                                    location.pathname === "/playground" 
                                        ? "bg-primary text-primary-foreground shadow-sm" 
                                        : "hover:bg-muted text-foreground"
                                }`}
                                onClick={() => { navigate("/playground"); setShowMobileMenu(false); }}
                            >
                                <Play className="h-4 w-4 mr-3" />
                                Playground
                            </Button>
                            <Button
                                variant={location.pathname === "/leaderboard" ? "default" : "ghost"}
                                size="sm"
                                className={`w-full justify-start h-10 px-3 rounded-lg transition-all text-sm ${
                                    location.pathname === "/leaderboard" 
                                        ? "bg-primary text-primary-foreground shadow-sm" 
                                        : "hover:bg-muted text-foreground"
                                }`}
                                onClick={() => { navigate("/leaderboard"); setShowMobileMenu(false); }}
                            >
                                <Trophy className="h-4 w-4 mr-3" />
                                Leaderboard
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            
            <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
        </header>
    );
};