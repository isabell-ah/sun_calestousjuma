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

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak?: number;
  problemsSolved?: number;
  lastActive?: string;
}

interface CodeSession {
  language: string;
  code: string;
  lastModified: string;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Code editor state
  currentSession: CodeSession;
  
  // UI state
  theme: 'light' | 'dark';
  
  // Actions
  setUser: (user: User | null) => void;
  updateSession: (session: Partial<CodeSession>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addXP: (points: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      currentSession: {
        language: 'javascript',
        code: '// Write your code here',
        lastModified: new Date().toISOString(),
      },
      theme: 'dark',
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      updateSession: (sessionUpdate) => set((state) => ({
        currentSession: {
          ...state.currentSession,
          ...sessionUpdate,
          lastModified: new Date().toISOString(),
        }
      })),
      
      setTheme: (theme) => set({ theme }),
      
      addXP: (points) => set((state) => {
        if (!state.user) return state;
        
        const newXP = state.user.xp + points;
        const newLevel = Math.floor(newXP / 100) + 1; // Simple leveling system
        
        return {
          user: {
            ...state.user,
            xp: newXP,
            level: newLevel,
          }
        };
      }),
    }),
    {
      name: 'bestie-app-storage',
      partialize: (state) => ({
        user: state.user,
        currentSession: state.currentSession,
        theme: state.theme,
      }),
    }
  )
);