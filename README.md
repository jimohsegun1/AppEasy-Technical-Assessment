# 🚀 Mini Job Tracker

A full-stack mini job tracker web app built with **Next.js**, **TypeScript**, and **Node.js API routes** — enhanced with an AI-powered job description analyzer.

## 📌 Features

### 🎯 Core Job Tracking
- ✅ Add a new job application with:
  - Job Title
  - Company Name
  - Application Link
  - Status (Applied, Interviewing, Rejected, Offer)
- 🗂️ View all job applications in a dashboard-style table
- ✏️ Edit or 🗑️ delete existing applications
- 🎨 Clean, responsive UI with TailwindCSS

### 🤖 AI-Powered Analyzer *(Bonus)*
- Paste a job description and click **"Analyze"**
- AI returns:
  - A short summary of the job
  - 3 resume skills to highlight
- Powered by **OpenAI gpt-3.5-turbo**, with fallback to mocked data if needed

### 💾 Data Storage
- Jobs are stored in a local `jobs.json` file (no external DB required)
- API endpoints:
  - `GET /api/jobs` — Get all jobs
  - `POST /api/jobs` — Add new job
  - `PUT /api/jobs/:id` — Update job
  - `DELETE /api/jobs/:id` — Delete job
  - `POST /api/analyze` — Analyze job description (AI)

## 📂 Folder Structure

```
my-appy/
├── app/
│ ├── page.tsx # Home (Job table)
│ ├── add-job/page.tsx # Add job form
│ ├── edit-job/[id]/page.tsx # Edit job form
├── components/
│ ├── JobTable.tsx
│ ├── JobForm.tsx
│ └── AnalyzeJob.tsx
├── data/
│ └── jobs.json # Local job storage
├── pages/
│ └── api/
│ ├── jobs/
│ │ ├── index.ts # GET, POST
│ │ └── [id].ts # PUT, DELETE
│ └── analyze.ts # AI job analysis

```

- .env.local
    - OPENAI_API_KEY_SECONDARY=your_key1
    - OPENAI_API_KEY_PRIMARY=your_key2

- npm run dev
