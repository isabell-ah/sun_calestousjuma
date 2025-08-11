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

import { createReadStream, createWriteStream, rename } from "fs";
import { glob } from "fs";

const LICENCE = `/* 
 * CJLF LICENSE (c) ${new Date().getFullYear()}
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
\n\n`;

export const strcmp = (a, b, size) => {
    if ((!a && !b) || size <= 0) {
        return 0;
    }

    for (let c = 0; c < size; c++) {
        if (c >= a.length || c >= b.length || a.charAt(c) != b.charAt(c)) {
            return 1;
        }
    }
    return 0;
};

const commit = () => {
    const size = 1 << 8;
    glob("**/*.{js,c,go,ts}", (_, pathnames) => {
        pathnames.forEach(async (pathname) => {
            const tmp = `${pathname}.tmp`;

            try {
                const firstChunk = await new Promise((resolve, reject) => {
                    const streamIn = createReadStream(pathname, {
                        start: 0,
                        end: size - 1,
                    });
                    streamIn.on("data", (chunk) => {
                        streamIn.close();
                        resolve(chunk);
                    });
                    streamIn.on("error", reject);
                    streamIn.on("end", () => resolve(Buffer.from("")));
                });

                const streamOut = createWriteStream(tmp);
                const streamIn = createReadStream(pathname);

                if (strcmp(firstChunk.toString(), LICENCE, size)) {
                    streamOut.write(LICENCE);
                }
                streamIn.pipe(streamOut, { end: true });

                streamOut.on("finish", () => {
                    rename(tmp, pathname, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            } catch (err) {
                console.error(`hey look something happened ${pathname}:`, err);
            }
        });
    });
};

commit();
