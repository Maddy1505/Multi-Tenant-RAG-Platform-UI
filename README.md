# DocMind

A modern, production-ready **multi-tenant SaaS** document intelligence platform built with React, Tailwind CSS, Recharts, and Lucide icons.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

The app will open at **http://localhost:3000**.

---

## 📁 Project Structure

```
docmind/
├── public/
│   └── index.html
└── src/
    ├── data/
    │   └── mockData.js          # All mock JSON (tenants, docs, analytics)
    ├── utils/
    │   ├── formatters.js        # formatCurrency, formatFileSize, etc.
    │   └── navigation.js        # NAV_ITEMS constant
    ├── components/
    │   ├── Sidebar.jsx          # Fixed left navigation
    │   ├── Navbar.jsx           # Top bar with user profile
    │   ├── Modal.jsx            # Reusable modal dialog
    │   ├── MetricCard.jsx       # KPI card with change indicator
    │   ├── StatusBadge.jsx      # Colored status pill
    │   ├── PlanBadge.jsx        # Plan tier pill
    │   ├── UsageBar.jsx         # Inline progress bar
    │   ├── ChatMessage.jsx      # Single chat bubble
    │   └── ChartTooltip.jsx     # Recharts custom tooltip
    ├── pages/
    │   ├── DashboardPage.jsx    # Metrics, activity feed, top tenants, revenue chart
    │   ├── TenantsPage.jsx      # Table, search/filter, add/delete modal
    │   ├── DocumentsPage.jsx    # Drag & drop upload, file list
    │   ├── ChatPage.jsx         # Q&A chat with mock AI responses
    │   └── AnalyticsPage.jsx    # Bar, pie, and line charts
    ├── App.jsx                  # Root — routing + shared state
    ├── index.js                 # ReactDOM entry point
    └── index.css                # Tailwind directives + global styles
```

---

## 🛠 Tech Stack

| Layer      | Library            |
|------------|--------------------|
| UI         | React 18 (hooks)   |
| Styling    | Tailwind CSS 3     |
| Icons      | Lucide React       |
| Charts     | Recharts           |
| Font       | DM Sans (Google)   |

---

## ✨ Features

- **Dashboard** – KPI cards, activity feed, top tenants, revenue area chart
- **Tenants** – Searchable / filterable table, add tenant modal, inline delete
- **Documents** – Drag & drop upload zone, per-tenant file list, status badges
- **Q&A Chat** – ChatGPT-style UI, tenant switcher, typing indicator, mock AI
- **Analytics** – Bar chart, donut pie chart, dual-axis trends line chart
- **Sidebar** – Collapsible icon-only mode with smooth transition
- **Dark theme** – Slate-950 background, violet/indigo accent palette

---

## 📦 Build for Production

```bash
npm run build
```

Output is in the `build/` folder — ready to deploy to Vercel, Netlify, or any static host.
