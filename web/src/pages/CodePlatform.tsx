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
import {
    ResizablePanel,
    ResizablePanelGroup,
    ResizableHandle,
} from "@/components/ui/resizable";
import { CodeEditor } from "@/components/CodeEditor";
import { QuestionPanel } from "@/components/QuestionPanel";
import { Header } from "@/components/Header";
import { useMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Code, FileText } from "lucide-react";

const CodePlatform = () => {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<"code" | "question">("code");
    const isMobile = useMobile();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="h-screen flex flex-col bg-background">
            <Header />

            <div className="flex-1 p-4">
                {isMobile ? (
                    <div className="h-full flex flex-col">
                        {/* Mobile Tab Navigation */}
                        <div className="flex mb-4 bg-muted rounded-lg p-1">
                            <Button
                                variant={activeTab === "code" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setActiveTab("code")}
                                className="flex-1"
                            >
                                <Code className="h-4 w-4 mr-2" />
                                Code
                            </Button>
                            <Button
                                variant={activeTab === "question" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setActiveTab("question")}
                                className="flex-1"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Problem
                            </Button>
                        </div>
                        
                        {/* Mobile Content */}
                        <div className="flex-1 rounded-lg border border-border overflow-hidden">
                            {activeTab === "code" ? <CodeEditor /> : <QuestionPanel />}
                        </div>
                    </div>
                ) : (
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="rounded-lg border border-border"
                    >
                        <ResizablePanel
                            defaultSize={60}
                            minSize={40}
                            className="relative"
                        >
                            <CodeEditor />
                        </ResizablePanel>

                        <ResizableHandle className="w-2 bg-border hover:bg-border-hover transition-colors" />

                        <ResizablePanel defaultSize={40} minSize={25}>
                            <QuestionPanel />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                )}
            </div>
        </div>
    );
};

export default CodePlatform;
