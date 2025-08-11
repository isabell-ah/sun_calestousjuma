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


package main

import (
	"unsafe"
)

type Memory struct {
	ptr  unsafe.Pointer
	size uintptr
}

func (src *Memory) memcpy(dst *Memory) {
	size := src.size
	srcBytes := uintptr(src.ptr)
	dstBytes := uintptr(dst.ptr)
	for i := uintptr(0); i < size; i++ {
		*(*byte)(unsafe.Pointer(dstBytes + i)) = *(*byte)(unsafe.Pointer(srcBytes + i))
	}
}

func main() {
	var srcVal int = 12345
	var dstVal int = 0

	src := Memory{ptr: unsafe.Pointer(&srcVal), size: unsafe.Sizeof(srcVal)}
	dst := Memory{ptr: unsafe.Pointer(&dstVal)}

	src.memcpy(&dst)

	println(dstVal)
}
