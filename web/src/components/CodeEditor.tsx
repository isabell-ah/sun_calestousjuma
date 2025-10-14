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

import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { api } from "@/lib/api";
import { useAppStore } from "@/stores/useAppStore";
import { LoginModal } from "@/components/LoginModal";

export const CodeEditor = () => {
    const [language, setLanguage] = useState("javascript");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState("");
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState("vs-dark");
    const [showSettings, setShowSettings] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const { user, isAuthenticated, setUser } = useAppStore();

    // Check authentication on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await api.getCurrentUser();
                if (currentUser && !user) {
                    setUser(currentUser);
                }
            } catch (error) {
                // User not authenticated, that's fine
                console.log('User not authenticated');
            }
        };

        checkAuth();
    }, [user, setUser]);

    // monaco language mapping
    const getMonacoLanguage = (lang: string) => {
        const languageMap: { [key: string]: string } = {
            javascript: "javascript",
            python: "python",
            java: "java",
            cpp: "cpp",
        };
        return languageMap[lang] || "javascript";
    };

    // Language-based code templates
    const getCodeTemplate = (lang: string) => {
        const templates: { [key: string]: string } = {
            javascript: `// JavaScript Playground
console.log("Hello, World!");

// Try some code:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);`,
            python: `# Python Playground
print("Hello, World!")

# Try some code:
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Doubled:", doubled)`,
        };
        return templates[lang] || "// Write your code here";
    };

    const [code, setCode] = useState(getCodeTemplate("javascript"));
    const [selectedProblem, setSelectedProblem] = useState<any>(null);

    // Load selected problem on mount
    useEffect(() => {
        const storedProblem = localStorage.getItem("selectedProblem");
        if (storedProblem) {
            const problem = JSON.parse(storedProblem);
            setSelectedProblem(problem);
            // Set problem-specific code template
            const problemCode = getProblemTemplate(problem, language);
            setCode(problemCode);
        }
    }, []);

    // Generate problem-specific code template
    const getProblemTemplate = (problem: any, lang: string) => {
        if (!problem) return getCodeTemplate(lang);
        
        // Use custom template if provided (for learning tracks)
        if (problem.template) {
            return problem.template;
        }
        
        const title = problem.title || 'Problem';
        const description = problem.description || 'Solve this problem';
        
        const templates: { [key: string]: string } = {
            javascript: `// ${title}
// ${description}

function solution() {
    // Write your solution here
    
}

// Test your solution
console.log(solution());`,
            python: `# ${title}
# ${description}

def solution():
    # Write your solution here
    pass

# Test your solution
print(solution())`
        };
        return templates[lang] || `// ${title}\n// Write your solution here`;
    };

    // Handle Monaco editor mount
    const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;

        // Configure editor options
        editor.updateOptions({
            fontSize: fontSize,
            fontFamily: "Cascadia Code, Consolas, Monaco, monospace",
            tabSize: 4,
            insertSpaces: true,
            automaticLayout: true,
        });
    };

    // Update code template when language changes
    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        if (selectedProblem) {
            setCode(getProblemTemplate(selectedProblem, newLang));
        } else {
            setCode(getCodeTemplate(newLang));
        }
    };

    // Handle reset button
    const handleReset = () => {
        if (selectedProblem) {
            setCode(getProblemTemplate(selectedProblem, language));
        } else {
            setCode(getCodeTemplate(language));
        }
    };

    return (
        <div className="h-full flex flex-col bg-surface">
            {/* Editor Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <Select
                        value={language}
                        onValueChange={handleLanguageChange}
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="javascript">
                                JavaScript
                            </SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Dialog open={showSettings} onOpenChange={setShowSettings}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md !bg-white dark:!bg-slate-900 border-2 border-gray-300 dark:border-gray-600 shadow-2xl backdrop-blur-none">
                            <DialogHeader>
                                <DialogTitle>Editor Settings</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Font Size</label>
                                    <Select value={fontSize.toString()} onValueChange={(value) => {
                                        const newSize = parseInt(value);
                                        setFontSize(newSize);
                                        editorRef.current?.updateOptions({ fontSize: newSize });
                                    }}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12">12px</SelectItem>
                                            <SelectItem value="14">14px</SelectItem>
                                            <SelectItem value="16">16px</SelectItem>
                                            <SelectItem value="18">18px</SelectItem>
                                            <SelectItem value="20">20px</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Theme</label>
                                    <Select value={theme} onValueChange={setTheme}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="vs-dark">Dark</SelectItem>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="hc-black">High Contrast</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button
                        variant="outline"
                        disabled={isRunning}
                        onClick={async () => {
                            setIsRunning(true);
                            setError("");
                            setOutput("");
                            
                            try {
                                const result = await api.executeCode({
                                    code,
                                    language,
                                    input: ''
                                }) as any;

                                console.log('Execute result:', result); // Debug log

                                if (result.stderr) {
                                    setError(result.stderr);
                                } else {
                                    setOutput(result.output || "Code executed successfully (no output)");
                                }
                            } catch (err: any) {
                                console.error('Execute error:', err); // Debug log
                                setError(err.message || "Execution failed");
                            }
                            
                            setIsRunning(false);
                        }}
                    >
                        <Play className="h-4 w-4 mr-2" />
                        {isRunning ? "Running..." : "Run Code"}
                    </Button>
                    {selectedProblem && (
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={isRunning}
                            onClick={async () => {
                                // Check authentication before submitting
                                if (!user || !isAuthenticated) {
                                    setShowLoginModal(true);
                                    setError("Please log in to submit your solution and track your progress.");
                                    return;
                                }

                                setIsRunning(true);
                                setError("");
                                setOutput("");

                                try {
                                    const result = await api.submitCode({
                                        problemId: selectedProblem.id,
                                        code,
                                        language
                                    });
                                    
                                    if ((result as any).status === 'accepted') {
                                        const testResults = (result as any).testResults;
                                        setOutput(`✅ ACCEPTED!\nAll test cases passed! (${testResults?.passedTests}/${testResults?.totalTests})\nScore: ${(result as any).score}/100\nRuntime: ${testResults?.runtime}ms\n+50 XP earned!`);

                                        // Update user in store if user data returned
                                        if ((result as any).user) {
                                            // Update the app store with new user data
                                            window.dispatchEvent(new CustomEvent('userUpdated', {
                                                detail: (result as any).user
                                            }));
                                        }

                                        // Trigger dashboard refresh
                                        window.dispatchEvent(new CustomEvent('submissionSuccess'));
                                    } else {
                                        const testResults = (result as any).testResults;
                                        const errorMsg = testResults?.error || 'Some test cases failed';
                                        setError(`❌ ${(result as any).status.toUpperCase()}\n${errorMsg}\nPassed: ${testResults?.passedTests || 0}/${testResults?.totalTests || 0} test cases\nScore: ${(result as any).score}/100`);
                                    }
                                } catch (err: any) {
                                    // Check if it's an authentication error
                                    if (err.message?.includes('Authentication required') || err.status === 401) {
                                        setShowLoginModal(true);
                                        setError("Please log in to submit your solution and track your progress.");
                                    } else {
                                        setError(err.message || "Submission failed");
                                    }
                                }
                                
                                setIsRunning(false);
                            }}
                        >
                            {isRunning ? "Submitting..." : "Submit"}
                        </Button>
                    )}
                </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    language={getMonacoLanguage(language)}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    onMount={handleEditorDidMount}
                    theme={theme}
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        lineNumbers: "on",
                        glyphMargin: false,
                        folding: false,
                        lineDecorationsWidth: 10,
                        lineNumbersMinChars: 3,
                        renderLineHighlight: "line",
                        contextmenu: false,
                    }}
                />
            </div>
            {/* Output Panel */}
            <div className="h-32 border-t border-border bg-surface-elevated">
                <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${
                            isRunning ? "bg-yellow-500 animate-pulse" : 
                            error ? "bg-red-500" : 
                            output ? "bg-green-500" : "bg-gray-500"
                        }`}></div>
                        <span className="text-sm text-text-secondary">
                            {isRunning ? "Running..." : error ? "Error" : "Output"}
                        </span>
                    </div>
                    <div className="flex-1 overflow-auto">
                        {error ? (
                            <div className="text-sm text-red-400 font-mono whitespace-pre-wrap">
                                {error}
                            </div>
                        ) : output ? (
                            <div className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                                {output}
                            </div>
                        ) : (
                            <div className="text-sm text-text-muted font-mono">
                                Click "Run Code" to see the output...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                open={showLoginModal}
                onOpenChange={setShowLoginModal}
            />
        </div>
    );
};
