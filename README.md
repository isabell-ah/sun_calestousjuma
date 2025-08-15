# bestie?

A full-stack web platform for competitive programming practice and skill tracking.  
Inspired by [Boot.dev](https://boot.dev) but tailored for interactive coding challenges, real-time leaderboards/scoreboard

---

## Overview

This platform allows users to solve coding problems directly in their browser, view real-time leaderboards, track their XP, streaks, and achievements, and store progress in local browser storage for offline continuity.

The front-end is built with **React**, the back-end with **Go**, and real-time leaderboard updates are handled with **WebSockets**.

---

> [!NOTE]  
> This is a draft & nothing is decided yet - .

## Stack

-   **Frontend**: React, TailwindCSS (UI), Local Storage & IndexedDB for persistence
-   **Backend**: Go (Gin/Fiber/Echo framework), sqlite
-   **Realtime**: WebSockets (Leaderboard, Live Events)
-   **Build Tools**: Vite, & maybe Docker
-   **Auth**: OAuth2 for Google/Facebook login

---

## Features (Planned)

-   **Interactive coding challenges** (multiple difficulty levels)
-   **Note panel** alongside the code editor (Markdown support)
-   **XP system** based on problem difficulty and completion speed
-   **Daily streaks** with visual indicators
-   **Real-time leaderboards** with WebSocket updates
-   **User profile with stats**
-   **Achievements & badges**
-   **Progress storage** in browser for offline use
-   **Dark/Light theme toggle**
-   **Challenge discussions/comments**

---

## UI Layout Idea

-   **Left Sidebar**:
    -   Profile info, XP, streak counter
    -   Navigation menu (Challenges, Leaderboard, Profile)
-   **Main Content**:
    -   Code editor (Monaco or Ace), I like Cascadia tho
    -   Test results/output panel
-   **Right Sidebar**:
    -   Notes/Problem description
    -   Scrollable hints/discussions
-   **Bottom bar**:
    -   Submission button, Run tests, Timer

---

## Development Flow

| Ticket ID | Feature         | Description                                      | Priority | Status |
| --------- | --------------- | ------------------------------------------------ | -------- | ------ |
| FE-001    | Project setup   | Initialize React (Vite), TailwindCSS, routing    | High     | Todo   |
| FE-002    | UI scaffolding  | Layout: left nav, main editor, right notes panel | High     | Todo   |
| FE-003    | Code editor     | Integrate Monaco editor with syntax highlighting | High     | Todo   |
| FE-004    | Notes panel     | Scrollable notes & hints (Markdown render)       | Medium   | Todo   |
| FE-005    | Leaderboard UI  | Real-time updates via WebSocket mock             | High     | Todo   |
| FE-006    | Profile panel   | Show XP, streaks, badges                         | Medium   | Todo   |
| FE-007    | Local storage   | Persist progress in localStorage & IndexedDB     | High     | Todo   |
| FE-008    | Auth (frontend) | Login/Signup UI with JWT                         | High     | Todo   |
| FE-009    | Theme toggle    | Dark/Light mode with persistence                 | Low      | Todo   |
| BE-001    | Go API setup    | Basic REST API, PostgreSQL connection            | High     | Todo   |
| BE-002    | Auth API        | JWT-based authentication endpoints               | High     | Todo   |
| BE-003    | Challenge API   | CRUD for challenges/questions                    | High     | Todo   |
| BE-004    | Submission API  | Evaluate code & return results                   | High     | Todo   |
| BE-005    | Leaderboard API | WebSocket for real-time rankings                 | High     | Todo   |
| BE-006    | XP/Badge system | Backend logic for gamification                   | Medium   | Todo   |
| BE-007    | Offline sync    | Merge local progress with server on login        | Medium   | Todo   |
| UX-001    | Animations      | Smooth transitions for XP gains, streak popups   | Low      | Todo   |
| UX-002    | Sounds          | Audio cues for correct submissions               | Low      | Todo   |
| UX-003    | Badges art      | Design and integrate achievement icons           | Low      | Todo   |

---

## Future Ideas

-   **Live coding duels** (face-off challenges)
-   **Team leaderboards** (group competition)
-   **Weekly events** with special badges
-   **AI hints** (automated feedback on submissions)
-   **Progress export/import** (JSON file backup)
-   **Mobile app** (React Native wrapper)

---
