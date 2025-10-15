import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, User } from "lucide-react";
import { api } from "@/lib/api";

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
  score: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">🏆 Leaderboard</h1>
            <p className="text-muted-foreground">Top performers at CJLF Resource Center</p>
          </div>

          <div className="space-y-4">
            {leaderboard.map((user) => (
              <Card key={user.rank} className={`transition-all hover:shadow-lg ${
                user.rank === 1 ? 'ring-2 ring-yellow-500/20 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950' :
                user.rank === 2 ? 'ring-2 ring-gray-400/20 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950' :
                user.rank === 3 ? 'ring-2 ring-amber-600/20 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950' :
                ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                        {getRankIcon(user.rank)}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Level {user.level}</span>
                          <span>{user.streak} day streak</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{user.xp.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">XP</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {leaderboard.length === 0 && (
            <Card>
              <CardContent className="py-16 text-center">
                <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No users yet</h3>
                <p className="text-muted-foreground">Be the first to start coding and earn XP!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;