
## License

Copyright © 2025 Andrii Dorokhov  
This project is licensed under the MIT License.

# AI Balance — Your Mood & Productivity Assistant

**AI Balance** is a full-stack productivity and mood-tracking app powered by OpenAI GPT.  
It helps users reflect on their day, track emotional states, set goals, and receive personalized AI recommendations to improve their well-being and focus.

---

## 🔧 Tech Stack

- **Frontend**: React, React Router, Context API, Vite, Axios
- **Backend**: FastAPI, Python 3.11, OpenAI API, PostgreSQL
- **AI**: OpenAI GPT-3.5 turbo
- **Web3**: Ethers.js, MetaMask, Ethereum, NFT API (planned), IPFS (planned)
- **DevOps**: Docker, GitHub Actions, Railway / Render / Supabase, `.env` secrets

---

## 🛠️ Development Environment

- **Node.js**: v20.19.2
- **Python**: 3.11.12

---

## ✨ Key Features

### 🧠 Daily Mood Tracking
- One entry per day
- GPT analyzes reflection, generates summary and mood detection
- Optional tone and category classification

### 🎯 Goal Management
- Create, view, and edit personal goals
- GPT-assisted suggestions
- Goal progress and completion tracking

### 📊 Analytics & History
- Timeline of emotional and goal progress
- Mood and productivity graphs (Recharts)
- Filter by mood, date range, and keywords

### 📚 AI Recommendations
- Personalized suggestions (books, prompts, quotes)
- GPT-generated summaries, ideas, and daily encouragement
- Regenerate option for smarter content

### 🔐 Authentication & Authorization
- Register/login with email + JWT
- Protected routes (frontend + backend)
- User profile with editable name, email, password

---

## 🧩 Planned Enhancements

- Voice input (Whisper API)
- PDF report generator
- PWA/mobile version
- Reminders (email or push)
- Avatar-based visual assistant
- Telegram integration (mood tracking via bot)

---

## 🔗 Web3 Integration

AI Balance integrates modern Web3 features to offer users a richer and more connected experience — blending emotional self-care with digital ownership.

### ✅ Implemented features
- 💼 Connect wallet via MetaMask
- 📊 Display ETH balance
- 🎨 Show owned NFTs
- 📋 Copy wallet address + link to Etherscan
- 🔒 Protected Web3 page (only for authenticated users)

### 🧪 Planned additions
- 🎖️ NFT badges for emotional streaks or goal milestones
- 🌍 Store selected entries permanently on IPFS
- 🧬 Public ENS profile with aggregated progress (opt-in)
- 🗳 DAO-style voting on future feature proposals

> Web3 functionality is fully optional. The core journaling experience works without it.

---

## 📂 Project Structure


(client/src/)
```plaintext
.
├── LICENSE
├── README.md
├── client
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── api
│   │   │   ├── authService.js
│   │   │   ├── config.js
│   │   │   ├── entryService.js
│   │   │   ├── goalService.js
│   │   │   ├── gptService.js
│   │   │   └── userService.js
│   │   ├── assets
│   │   │   └── animations
│   │   │       ├── waves.json
│   │   │       ├── waves_blue.json
│   │   │       └── waves_lavanda.json
│   │   ├── components
│   │   │   ├── App
│   │   │   │   ├── App.jsx
│   │   │   │   └── index.js
│   │   │   ├── BlurOverlay
│   │   │   │   ├── BlurOverlay.jsx
│   │   │   │   └── BlurOverlay.module.css
│   │   │   ├── Button
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.js
│   │   │   ├── DashboardForm
│   │   │   │   ├── DashboardForm.jsx
│   │   │   │   └── DashboardForm.module.css
│   │   │   ├── DashboardHeader
│   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   └── DashboardHeader.module.css
│   │   │   ├── DashboardLoader
│   │   │   │   ├── DashboardLoader.jsx
│   │   │   │   └── DashboardLoader.module.css
│   │   │   ├── DashboardResult
│   │   │   │   ├── DashboardResult.jsx
│   │   │   │   └── DashboardResult.module.css
│   │   │   ├── EntryItem
│   │   │   │   ├── EntryItem.jsx
│   │   │   │   └── EntryItem.module.css
│   │   │   ├── EntryList
│   │   │   │   ├── EntryList.jsx
│   │   │   │   └── EntryList.module.css
│   │   │   ├── ExpandableText
│   │   │   │   ├── ExpandableText.jsx
│   │   │   │   └── ExpandableText.module.css
│   │   │   ├── Header
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.module.css
│   │   │   │   └── index.js
│   │   │   ├── HistoryFilters
│   │   │   │   ├── HistoryFilters.jsx
│   │   │   │   └── HistoryFilters.module.css
│   │   │   ├── LogoutButton
│   │   │   │   ├── LogoutButton.jsx
│   │   │   │   └── LogoutButton.module.css
│   │   │   ├── MoodChart
│   │   │   │   ├── MoodChart.jsx
│   │   │   │   └── MoodChart.module.css
│   │   │   ├── PasswordField
│   │   │   │   ├── PasswordField.jsx
│   │   │   │   └── PasswordField.module.css
│   │   │   ├── PrivateRoute
│   │   │   │   ├── PrivateRoute.jsx
│   │   │   │   └── PrivateRoute.module.css
│   │   │   ├── Spinner
│   │   │   │   ├── Spinner.jsx
│   │   │   │   └── Spinner.module.css
│   │   │   ├── Textarea
│   │   │   │   ├── Textarea.jsx
│   │   │   │   └── index.js
│   │   │   └── WavesLottie
│   │   │       ├── WavesLottie.jsx
│   │   │       └── WavesLottie.module.css
│   │   ├── context
│   │   │   └── auth
│   │   │       └── AuthContext.jsx
│   │   ├── hooks
│   │   │   └── useEntries.js
│   │   ├── index.css
│   │   ├── layouts
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── TopNav.jsx
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── AboutPage
│   │   │   │   ├── AboutPage.jsx
│   │   │   │   └── AboutPage.module.css
│   │   │   ├── DashboardPage
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── DashboardPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── GoalsPage
│   │   │   │   ├── GoalsPage.jsx
│   │   │   │   ├── GoalsPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── HistoryPage
│   │   │   │   ├── HistoryPage.jsx
│   │   │   │   ├── HistoryPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── LoginPage
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── LoginPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── RegisterPage
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   ├── RegisterPage.module.css
│   │   │   │   └── index.js
│   │   │   ├── ReportPage
│   │   │   │   ├── ReportPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── SettingsPage
│   │   │   │   ├── SettingsPage.jsx
│   │   │   │   ├── SettingsPage.module.css
│   │   │   │   └── index.js
│   │   │   └── VerifyEmailPage
│   │   │       ├── VerifyEmailPage.jsx
│   │   │       └── VerifyEmailPage.module.css
│   │   ├── router
│   │   │   └── router.jsx
│   │   ├── services
│   │   │   ├── authService.js
│   │   │   ├── axios.js
│   │   │   └── config.js
│   │   └── utils
│   │       └── moodUtils.js
│   └── vite.config.js
├── server
│   ├── alembic
│   │   ├── README
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions
│   ├── alembic.ini
│   ├── app
│   │   ├── __init__.py
│   │   ├── auth
│   │   │   └── dependencies.py
│   │   ├── core
│   │   │   ├── config.py
│   │   │   ├── email.py
│   │   │   └── security.py
│   │   ├── database.py
│   │   ├── db
│   │   │   ├── base.py
│   │   │   ├── base_class.py
│   │   │   ├── init_db.py
│   │   │   └── session.py
│   │   ├── main.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── entry.py
│   │   │   ├── goal.py
│   │   │   └── user.py
│   │   ├── routers
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── email.py
│   │   │   ├── entry.py
│   │   │   ├── goals.py
│   │   │   ├── gpt.py
│   │   │   ├── status.py
│   │   │   └── user.py
│   │   ├── schemas
│   │   │   ├── __init__.py
│   │   │   ├── email_request.py
│   │   │   ├── entry.py
│   │   │   ├── goal.py
│   │   │   ├── gpt.py
│   │   │   └── user.py
│   │   ├── services
│   │   │   ├── __init__.py
│   │   │   └── gpt_service.py
│   │   └── utils
│   │       ├── email_token.py
│   │       └── mood.py
│   └── requirements.txt
└── structure.txt

67 directories, 194 files


```



## 🎯 Project Objectives

- Showcase strong full-stack architecture
- Demonstrate modern UI with GPT integration
- Deliver a useful, creative AI-based productivity tool
