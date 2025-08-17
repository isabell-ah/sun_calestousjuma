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

// BIG BIG BIG TODO SYNTAX HIGLIGHTING

import { useState } from "react";
import { Play, RotateCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const CodeEditor = () => {
    // TODO based on lang
    const [code, setCode] = useState(`function twoSum(nums, target) {
    // Your solution here
    
    }`);

    // spent so many hours on this bs, damn
    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();

            const { selectionStart, selectionEnd, value } = e.target;
            /* hardcord spaces  TODO is there a btter way?*/
            const tab = "    ";

            const newCode =
                value.substring(0, selectionStart) +
                tab +
                value.substring(selectionEnd);

            setCode(newCode);

            setTimeout(() => {
                e.target.selectionStart = selectionStart + tab.length;
                e.target.selectionEnd = selectionStart + tab.length;
            }, 0);
        }
    };

    // TODO
    const [language, setLanguage] = useState("javascript");

    return (
        <div className="h-full flex flex-col bg-surface">
            {/* Editor Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <Select value={language} onValueChange={setLanguage}>
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
                    <Button variant="ghost" size="sm">
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                    </Button>
                    <Button className="bg-primary hover:bg-primary-hover text-primary-foreground glow-effect">
                        <Play className="h-4 w-4 mr-2" />
                        {/* TODO */}
                        Run Code
                    </Button>
                </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 p-4">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown} // Add the event handler here
                    className="w-full h-full bg-transparent text-text-primary font-mono text-sm resize-none outline-none"
                    placeholder="Write your code here..."
                    spellCheck={false}
                />
            </div>
            {/* TOD0 */}
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
