# AI Balance — Your Mood & Productivity Assistant

**AI Balance** is a full-stack productivity and mood-tracking app powered by OpenAI GPT.  
It helps users reflect on their day, track emotional states, set goals, and receive personalized AI recommendations to improve their well-being and focus.

---

## 🔧 Tech Stack

- **Frontend**: React, React Router, Zustand or Context API, Vite, Axios
- **Backend**: FastAPI, Python 3.11, OpenAI API, SQLite or PostgreSQL
- **AI**: OpenAI GPT-4.1 mini
- **DevOps**: Docker, GitHub Actions, Railway / Render / Supabase, `.env` secrets

---

## 🛠️ Development Environment

- **Node.js**: v20.19.2
- **Python**: 3.11.12


---

## ✨ Key Features

### 🧠 Daily Mood Tracking
- Select mood and energy level
- Add short reflection for the day
- GPT generates a summary and insights

### 🎯 Goal Management
- Create and track personal goals
- GPT-assisted goal suggestions
- Mark as complete or edit

### 📊 Analytics & History
- View charts of mood and productivity over time
- Timeline of emotional and task progress
- Weekly AI-generated suggestions

### 📚 AI Recommendations
- Personalized suggestions (books, movies, music)
- GPT-generated quotes and prompts
- Optional: chat interface with personal assistant

---

## 🛠️ DevOps & Infrastructure

> Handled by a dedicated team member.

- Frontend and backend separated in `client/` and `server/` directories
- Dockerized for local development and deployment
- GitHub Actions CI/CD (auto-deploy on push)
- Environment variables managed via `.env` and `.env.example`
- PostgreSQL via Railway or Supabase (in production)

---

## 🧩 Planned Enhancements

- Voice input (Whisper API)
- PDF report generator
- PWA/mobile version
- Reminder system (push or email)
- Avatar-based visual assistant

---

## 📂 Project Structure


(client/src/)
```plaintext
src/
├── components/
│   ├── App/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── index.js
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   └── index.js
│   ├── Input/
│   │   ├── Input.jsx
│   │   ├── Input.module.css
│   │   └── index.js
│   ├── Modal/
│   │   ├── Modal.jsx
│   │   ├── Modal.module.css
│   │   └── index.js
│   ├── Sidebar/
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.module.css
│   │   └── index.js
│   ├── Textarea/
│   │   ├── Textarea.jsx
│   │   ├── Textarea.module.css
│   │   └── index.js
│   └── ThemeToggle/
│       ├── ThemeToggle.jsx
│       ├── ThemeToggle.module.css
│       └── index.js
├── pages/
│   ├── DashboardPage/
│   │   ├── DashboardPage.jsx
│   │   └── index.js
│   ├── GoalsPage/
│   │   ├── GoalsPage.jsx
│   │   └── index.js
│   ├── HistoryPage/
│   │   ├── HistoryPage.jsx
│   │   └── index.js
│   ├── LoginPage/
│   │   ├── LoginPage.jsx
│   │   └── index.js
│   ├── RegisterPage/
│   │   ├── RegisterPage.jsx
│   │   └── index.js
│   ├── ReportPage/
│   │   ├── ReportPage.jsx
│   │   └── index.js
│   └── SettingsPage/
│       ├── SettingsPage.jsx
│       └── index.js
├── features/
│   ├── ai/
│   │   ├── AIResponseBlock.jsx
│   │   └── index.js
│   ├── entries/
│   │   ├── EntryForm.jsx
│   │   ├── HistoryTable.jsx
│   │   └── index.js
│   ├── goals/
│   │   ├── GoalForm.jsx
│   │   ├── GoalList.jsx
│   │   └── index.js
│   └── mood/
│       ├── MoodSelector.jsx
│       └── index.js
├── layouts/
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx
├── api/
│   ├── authService.js
│   ├── entryService.js
│   ├── goalService.js
│   └── gptService.js
├── services/
│   └── config.js
├── store/
│   └── (...userStore.js, entryStore.js...)
├── router/
│   └── router.jsx
├── utils/
│   ├── formatDate.js
│   └── getMoodColor.js
├── constants/
│   └── index.js
├── main.jsx
├── index.css

```

(server/)
```plaintext
server/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── entry.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── entries.py
│   │   ├── goals.py
│   │   └── gpt.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── gpt_service.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── security.py
│   └── database.py
├── requirements.txt
├── .env
├── Dockerfile
└── alembic/

```



## 🎯 Project Objectives

- Showcase strong full-stack architecture
- Demonstrate modern UI with GPT integration
- Deliver a useful, creative AI-based productivity tool
