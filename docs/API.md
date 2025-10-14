# Bestie API Documentation

A coding platform backend API with authentication, problem management, and submission tracking.

## 🚀 Base URL
```
http://localhost:3001/api
```

## 🔐 Authentication

### Google OAuth
- **GET** `/auth/google` - Initiate Google OAuth login
- **GET** `/auth/google/callback` - OAuth callback handler
- **GET** `/auth/me` - Get current authenticated user
- **POST** `/auth/logout` - Logout current user

## 📝 Problems

### Get All Problems
```http
GET /problems
```
Returns list of all coding problems with basic info.

### Get Single Problem
```http
GET /problems/:id
```
Returns detailed problem information including test cases and hints.

**Response:**
```json
{
  "id": "problem_id",
  "title": "Two Sum",
  "description": "Given an array of integers...",
  "difficulty": "easy",
  "category": "arrays",
  "testCases": "[{\"input\": {...}, \"output\": [...]}]",
  "hints": "[\"Use a hash map...\"]"
}
```

## 💻 Submissions

### Submit Code
```http
POST /submissions
```
**Body:**
```json
{
  "problemId": "problem_id",
  "code": "def solution()...",
  "language": "python"
}
```

### Get My Submissions
```http
GET /submissions/my
```
Returns user's submission history with problem details.

## 👥 Users

### Get Leaderboard
```http
GET /users/leaderboard
```
Returns top 10 users by XP.

**Response:**
```json
[
  {
    "id": "user_id",
    "name": "John Doe",
    "avatar": "https://...",
    "xp": 1500,
    "level": 5
  }
]
```

### Get User Profile
```http
GET /users/:id
```
Returns user profile information.

## 🏥 Health Check
```http
GET /health
```
Returns API status.

## 📊 Database Schema

### User
- `id` - Unique identifier
- `email` - User email
- `name` - Display name
- `avatar` - Profile picture URL
- `googleId` - Google OAuth ID
- `xp` - Experience points
- `level` - User level
- `streak` - Current streak

### Problem
- `id` - Unique identifier
- `title` - Problem title
- `description` - Problem description
- `difficulty` - easy/medium/hard
- `category` - Problem category
- `testCases` - JSON test cases
- `hints` - JSON hints array

### Submission
- `id` - Unique identifier
- `userId` - User who submitted
- `problemId` - Problem being solved
- `code` - Submitted code
- `language` - Programming language
- `status` - pending/accepted/wrong_answer/error
- `score` - Points earned
- `runtime` - Execution time
- `memory` - Memory usage

## 🔧 Environment Variables

```env
DATABASE_URL="file:./dev.db"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
JWT_SECRET="your_jwt_secret"
SESSION_SECRET="your_session_secret"
PORT=3001
FRONTEND_URL="http://localhost:1312"
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Push database schema:
```bash
npx prisma db push
```

4. Seed database:
```bash
npm run db:seed
```

5. Start development server:
```bash
npm run dev
```

## 📈 Features

- ✅ Google OAuth authentication
- ✅ Problem management
- ✅ Code submission tracking
- ✅ User profiles and XP system
- ✅ Leaderboard
- ✅ SQLite database with Prisma ORM
- 🔄 Code execution (coming soon)
- 🔄 Real-time updates (coming soon)