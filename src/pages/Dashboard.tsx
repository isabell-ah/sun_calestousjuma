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
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { mockQuestions, Question } from "../../seed/mock_questions";
import { PAGINATE } from "@/lib/CONSTATS";
import { getDifficultyColor } from "@/lib/island";
import { Footer } from "react-day-picker";
import FooterComponent from "@/components/Footer";

const Dashboard = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Simulates API call with loading state and pagination
    const fetchQuestions = async (page: number) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const startIndex = (page - 1) * PAGINATE;
        const endIndex = startIndex + PAGINATE;
        const pageQuestions = mockQuestions.slice(startIndex, endIndex);

        setQuestions(pageQuestions);
        setTotalPages(Math.ceil(mockQuestions.length / PAGINATE));
        setLoading(false);
    };

    useEffect(() => {
        fetchQuestions(currentPage);
    }, [currentPage]);

    // Store the selected question in localStorage to pass to /code page
    const handleQuestionClick = (question: Question) => {
        localStorage.setItem("selectedQuestion", JSON.stringify(question));
        navigate("/code");
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Coding Challenges
                            </h1>
                            <p className="text-text-secondary mt-2">
                                Choose from {mockQuestions.length} programming
                                challenges across all difficulty levels
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <span>•</span>
                            <span>{mockQuestions.length} total questions</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="rounded-lg border border-border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">
                                            #
                                        </TableHead>
                                        <TableHead>Question</TableHead>
                                        {/* <TableHead className="w-20">
                                            Hint
                                        </TableHead> */}
                                        <TableHead className="w-24">
                                            Difficulty
                                        </TableHead>
                                        <TableHead className="w-32">
                                            Category
                                        </TableHead>
                                        <TableHead className="w-24 text-right">
                                            Acceptance
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                            </Table>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">
                                            #
                                        </TableHead>
                                        <TableHead>Question</TableHead>
                                        <TableHead className="w-20">
                                            Hint
                                        </TableHead>
                                        <TableHead className="w-24">
                                            Difficulty
                                        </TableHead>
                                        <TableHead className="w-32">
                                            Category
                                        </TableHead>
                                        <TableHead className="w-24 text-right">
                                            Acceptance
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {questions.map((question, index) => (
                                        <TableRow
                                            key={question.id}
                                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                                            onClick={() =>
                                                handleQuestionClick(question)
                                            }
                                        >
                                            <TableCell className="font-mono text-sm text-muted-foreground">
                                                {(currentPage - 1) * PAGINATE +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-medium hover:text-primary transition-colors">
                                                        {question.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <User className="h-3 w-3" />
                                                        <span>
                                                            {question.submissions.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                    {question.description}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getDifficultyColor(
                                                        question.difficulty
                                                    )}
                                                >
                                                    {question.difficulty}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {question.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-sm">
                                                {question.acceptanceRate}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 py-8">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from(
                                { length: Math.min(5, totalPages) },
                                (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={
                                                currentPage === pageNum
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            className="w-8 h-8 p-0"
                                            onClick={() =>
                                                handlePageChange(pageNum)
                                            }
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                }
                            )}
                        </div>

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
                </div>
            </main>

            <FooterComponent />
        </div>
    );
};

export default Dashboard;
