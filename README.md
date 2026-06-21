# Gen-AI Interview Prep Platform

An AI-powered platform that takes your resume, job description, and a short self-description, then generates a personalized interview prep report — technical questions, behavioral questions, skill gap analysis, and a day-wise preparation roadmap. Built this to actually help me prep for placements instead of just reading random question banks online.

🔗 **Live Demo:** _coming soon_
🔗 **Backend API:** _coming soon_

---

## What it does

You upload your resume (PDF), paste a job description, write a quick self-description — and the app:

- Calculates a **match score** between your profile and the job
- Generates **technical interview questions** (with intention behind each question + how to answer)
- Generates **behavioral interview questions** (same format)
- Identifies **skill gaps** with severity levels (low/medium/high)
- Builds a **day-wise preparation roadmap** so you know what to study and when
- Lets you **download your resume** back as a PDF

Basically tried to simulate what an actual interviewer/mentor would tell you before walking into an interview.

---

## Tech Stack

**Frontend**
- React.js (Vite)
- React Router DOM
- SCSS
- Axios

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication (httpOnly cookies)
- Groq API (`llama-3.3-70b-versatile`) — OpenAI-compatible SDK
- pdf-parse (resume text extraction)
- pdfkit (resume PDF generation)
- Zod (schema validation for AI responses)

---

## Why Groq instead of OpenAI/Gemini?

Honestly started with Gemini, hit free-tier rate limits within minutes of testing. Tried OpenAI next, ran into billing/quota issues too. Switched to Groq — it's free, fast, and uses an OpenAI-compatible SDK so the integration code barely changed. Would recommend it for anyone building on a student budget.

---

## Project Structure

```
Gen-AI/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js    # JWT verification
│   │   │   └── file.middleware.js    # Resume upload handling (multer)
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── blacklist.model.js    # Logged-out token blacklist
│   │   │   └── interviewReport.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.routes.js
│   │   └── services/
│   │       └── ai.service.js         # Groq integration + PDF generation
│   ├── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/
        │   │   ├── components/
        │   │   ├── hooks/
        │   │   │   └── useAuth.js
        │   │   ├── pages/             # Login, Register
        │   │   ├── services/          # auth.api.js
        │   │   ├── auth.context.jsx
        │   │   └── auth.form.scss
        │   └── interview/
        │       ├── hooks/
        │       │   └── useInterview.js
        │       ├── pages/             # Interview report page
        │       ├── services/          # interview.api.js
        │       ├── style/
        │       └── interview.context.jsx
        ├── style/
        │   └── button.scss
        ├── App.jsx
        ├── app.routes.jsx
        ├── main.jsx
        └── style.scss
```

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (free M0 cluster works fine) or local MongoDB
- Groq API key — get one free at [console.groq.com](https://console.groq.com)

### 1. Clone the repo

```bash
git clone https://github.com/jaimin45-art/Gen-AI.git
cd Gen-AI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Run the backend:

```bash
npm run dev
```

Server should start on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` (if using env-based API URL):

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

App should be live on `http://localhost:5173`

---

## Screenshots

> _Will add screenshots here once UI is finalized_

| Login | Interview Report |
|-------|------------------|
| _placeholder_ | _placeholder_ |

---

## Key Features (Detailed)

### 🔐 Authentication
- JWT-based auth with httpOnly cookies (more secure than localStorage)
- Protected routes — unauthenticated users get redirected to login automatically

### 🤖 AI Report Generation
- Resume PDF is parsed server-side using `pdf-parse`
- Prompt engineered to return structured JSON (had to redesign the schema a few times to stop the AI from returning a JSON *schema* instead of actual data — that was a fun bug to debug)
- Response validated against expected fields before saving to DB

### 📄 Resume PDF Export
- Generates a downloadable PDF version of your resume using `pdfkit`

---

## Known Issues / Things I'm Still Improving

- Resume PDF export is fairly basic right now (plain text layout) — want to make it look more like an actual formatted resume template
- AI sometimes needs a retry if Groq's response doesn't match the expected JSON shape — adding a retry mechanism is on the list
- No loading skeletons yet, just a basic "Loading..." text

---

## What I Learned Building This

- Debugging silent failures in React state (turns out `value={a, b, c}` in Context.Provider doesn't do what you'd expect — comma operator strikes again)
- Why explicitly returning values from async functions matters (`finally` blocks don't save you if `try` never returns)
- Prompt engineering for structured JSON output — and why forcing a model to follow a Zod schema isn't as straightforward as it sounds with some providers
- CORS + cookie handling differences between local and production environments

---

## Author

**Jaimin Modi**
B.E. Computer Engineering, LDRP-ITR, Gandhinagar
[GitHub](https://github.com/jaimin45-art) · [LinkedIn](https://linkedin.com/in/jaimin-modi-590566285)

---

## License

This project is open source and available for learning purposes. Feel free to fork it and build on top of it.
