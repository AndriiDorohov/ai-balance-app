## License

Copyright © 2025 Andrii Dorokhov  
This project is licensed under the MIT License.


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
### 🔗 Web3 Integration (Optional Module)

AI Balance also supports optional Web3 features for users who want to store important emotional entries in a decentralized way or receive NFT rewards for personal achievements.

- 🔐 Login with MetaMask (alternative to email authentication)
- 🎖️ NFT badges for emotional streaks, goal completions, or mood breakthroughs
- 🌍 Store meaningful entries permanently on IPFS
- 🧬 Public ENS profile with emotional progress and achievements
- 🗳 DAO-style voting for future feature development (in progress)

> Web3 functionality is entirely optional. It is being added gradually and is not required to use the core app.

---

## 📂 Project Structure


(client/src/)
```plaintext
.
├── LICENSE
├── README.md
├── client
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── api
│   │   │   ├── authService.js
│   │   │   ├── config.js
│   │   │   ├── entryService.js
│   │   │   ├── goalService.js
│   │   │   ├── gptService.js
│   │   │   └── userService.js
│   │   ├── assets
│   │   │   └── animations
│   │   │       ├── waves.json
│   │   │       ├── waves_blue.json
│   │   │       └── waves_lavanda.json
│   │   ├── components
│   │   │   ├── App
│   │   │   │   ├── App.jsx
│   │   │   │   └── index.js
│   │   │   ├── BlurOverlay
│   │   │   │   ├── BlurOverlay.jsx
│   │   │   │   └── BlurOverlay.module.css
│   │   │   ├── Button
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.js
│   │   │   ├── DashboardForm
│   │   │   │   ├── DashboardForm.jsx
│   │   │   │   └── DashboardForm.module.css
│   │   │   ├── DashboardHeader
│   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   └── DashboardHeader.module.css
│   │   │   ├── DashboardLoader
│   │   │   │   ├── DashboardLoader.jsx
│   │   │   │   └── DashboardLoader.module.css
│   │   │   ├── DashboardResult
│   │   │   │   ├── DashboardResult.jsx
│   │   │   │   └── DashboardResult.module.css
│   │   │   ├── EntryItem
│   │   │   │   ├── EntryItem.jsx
│   │   │   │   └── EntryItem.module.css
│   │   │   ├── EntryList
│   │   │   │   ├── EntryList.jsx
│   │   │   │   └── EntryList.module.css
│   │   │   ├── ExpandableText
│   │   │   │   ├── ExpandableText.jsx
│   │   │   │   └── ExpandableText.module.css
│   │   │   ├── Header
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.module.css
│   │   │   │   └── index.js
│   │   │   ├── HistoryFilters
│   │   │   │   ├── HistoryFilters.jsx
│   │   │   │   └── HistoryFilters.module.css
│   │   │   ├── LogoutButton
│   │   │   │   ├── LogoutButton.jsx
│   │   │   │   └── LogoutButton.module.css
│   │   │   ├── MoodChart
│   │   │   │   ├── MoodChart.jsx
│   │   │   │   └── MoodChart.module.css
│   │   │   ├── PasswordField
│   │   │   │   ├── PasswordField.jsx
│   │   │   │   └── PasswordField.module.css
│   │   │   ├── PrivateRoute
│   │   │   │   ├── PrivateRoute.jsx
│   │   │   │   └── PrivateRoute.module.css
│   │   │   ├── Spinner
│   │   │   │   ├── Spinner.jsx
│   │   │   │   └── Spinner.module.css
│   │   │   ├── Textarea
│   │   │   │   ├── Textarea.jsx
│   │   │   │   └── index.js
│   │   │   └── WavesLottie
│   │   │       ├── WavesLottie.jsx
│   │   │       └── WavesLottie.module.css
│   │   ├── context
│   │   │   └── auth
│   │   │       └── AuthContext.jsx
│   │   ├── hooks
│   │   │   └── useEntries.js
│   │   ├── index.css
│   │   ├── layouts
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── TopNav.jsx
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── AboutPage
│   │   │   │   ├── AboutPage.jsx
│   │   │   │   └── AboutPage.module.css
│   │   │   ├── DashboardPage
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── DashboardPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── GoalsPage
│   │   │   │   ├── GoalsPage.jsx
│   │   │   │   ├── GoalsPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── HistoryPage
│   │   │   │   ├── HistoryPage.jsx
│   │   │   │   ├── HistoryPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── LoginPage
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── LoginPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── RegisterPage
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   ├── RegisterPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── ReportPage
│   │   │   │   ├── ReportPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── SettingsPage
│   │   │   │   ├── SettingsPage.jsx
│   │   │   │   ├── SettingsPage.module.css
│   │   │   │   └── index.js
│   │   │   └── VerifyEmailPage
│   │   │       ├── VerifyEmailPage.jsx
│   │   │       └── VerifyEmailPage.module.css
│   │   ├── router
│   │   │   └── router.jsx
│   │   ├── services
│   │   │   ├── authService.js
│   │   │   ├── axios.js
│   │   │   └── config.js
│   │   └── utils
│   │       └── moodUtils.js
│   └── vite.config.js
├── server
│   ├── alembic
│   │   ├── README
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   ├── alembic.ini
│   ├── app
│   │   ├── __init__.py
│   │   ├── auth
│   │   │   └── dependencies.py
│   │   ├── core
│   │   │   ├── config.py
│   │   │   ├── email.py
│   │   │   └── security.py
│   │   ├── database.py
│   │   ├── db
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   ├── init_db.py
│   │   │   └── session.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── entry.py
│   │   │   ├── goal.py
│   │   │   └── user.py
│   │   ├── routers
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── email.py
│   │   │   ├── entry.py
│   │   │   ├── goals.py
│   │   │   ├── gpt.py
│   │   │   ├── status.py
│   │   │   └── user.py
│   │   ├── schemas
│   │   │   ├── __init__.py
│   │   │   ├── email_request.py
│   │   │   ├── entry.py
│   │   │   ├── goal.py
│   │   │   ├── gpt.py
│   │   │   └── user.py
│   │   ├── services
│   │   │   ├── __init__.py
│   │   │   └── gpt_service.py
│   │   └── utils
│   │       ├── email_token.py
│   │       └── mood.py
│   └── requirements.txt
└── structure.txt

67 directories, 194 files


```



## 🎯 Project Objectives

- Showcase strong full-stack architecture
- Demonstrate modern UI with GPT integration
- Deliver a useful, creative AI-based productivity tool
