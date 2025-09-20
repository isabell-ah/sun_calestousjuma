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

import { useState, useRef } from "react";
import { Play, RotateCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

export const CodeEditor = () => {
    const [language, setLanguage] = useState("javascript");
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
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

    // Language-based code templates (just a comment for each language)
    const getCodeTemplate = (lang: string) => {
        const commentMap: { [key: string]: string } = {
            javascript: `// Write your code here`,
            python: "# Write your code here",
            java: "// Write your code here",
            cpp: "// Write your code here",
        };
        return commentMap[lang] || "// Write your code here";
    };

    const [code, setCode] = useState(getCodeTemplate("javascript"));

    // Handle Monaco editor mount
    const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;

        // Configure editor options
        editor.updateOptions({
            fontSize: 14,
            fontFamily: "Cascadia Code, Consolas, Monaco, monospace",
            tabSize: 4,
            insertSpaces: true,
            automaticLayout: true,
        });
    };

    // Update code template when language changes
    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        setCode(getCodeTemplate(newLang));
    };

    // Handle reset button
    const handleReset = () => {
        setCode(getCodeTemplate(language));
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
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                        className="bg-primary hover:bg-primary-hover text-primary-foreground glow-effect"
                        onClick={async () => {
                            if (language === "python") {
                                try {
                                    // @ts-ignore
                                    if (!window.pyodide) {
                                        await new Promise<void>(
                                            (resolve, reject) => {
                                                const script =
                                                    document.createElement(
                                                        "script"
                                                    );
                                                script.src =
                                                    "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
                                                script.onload = () => resolve();
                                                script.onerror = () =>
                                                    reject(
                                                        new Error(
                                                            "Failed to load Pyodide"
                                                        )
                                                    );
                                                document.body.appendChild(
                                                    script
                                                );
                                            }
                                        );
                                        // @ts-ignore
                                        window.pyodide = await (
                                            window as any
                                        ).loadPyodide();
                                    }

                                    // @ts-ignore
                                    const pyodide = window.pyodide;

                                    // Run Python code
                                    // `code` is whatever the user has written in your editor
                                    const result =
                                        await pyodide.runPythonAsync(code);

                                    console.log("Python output:", result);
                                } catch (err) {
                                    console.error("Python error:", err);
                                }
                            } else {
                                console.log(
                                    "Code execution not yet implemented for this language"
                                );
                            }
                        }}
                    >
                        <Play className="h-4 w-4 mr-2" />
                        Run Code
                    </Button>
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
                    theme="vs-dark"
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
            {/* TODO Output Panel  */}
            <div className="h-32 border-t border-border bg-surface-elevated">
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span className="text-sm text-text-secondary">
                            Output
                        </span>
                    </div>
                    <div className="text-sm text-text-muted font-mono">
                        Click "Run Code" to see the output...
                    </div>
                </div>
            </div>
        </div>
    );
};
