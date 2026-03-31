export const MOCK_TENANTS = [
  { id: 1, name: "Acme Corp", plan: "Enterprise", usage: 92, status: "active", docs: 148, queries: 3420, revenue: 4200, joined: "2024-01-12" },
  { id: 2, name: "NovaTech Labs", plan: "Pro", usage: 67, status: "active", docs: 89, queries: 1870, revenue: 1200, joined: "2024-02-08" },
  { id: 3, name: "Stellar AI", plan: "Pro", usage: 45, status: "active", docs: 56, queries: 980, revenue: 1200, joined: "2024-02-20" },
  { id: 4, name: "DataForge Inc", plan: "Starter", usage: 30, status: "active", docs: 22, queries: 450, revenue: 400, joined: "2024-03-01" },
  { id: 5, name: "Horizon Systems", plan: "Enterprise", usage: 88, status: "active", docs: 203, queries: 5610, revenue: 4200, joined: "2024-01-05" },
  { id: 6, name: "BlueWave Analytics", plan: "Pro", usage: 55, status: "suspended", docs: 44, queries: 720, revenue: 1200, joined: "2024-03-15" },
  { id: 7, name: "Quantum Dynamics", plan: "Starter", usage: 12, status: "trial", docs: 8, queries: 95, revenue: 0, joined: "2024-04-01" },
  { id: 8, name: "Meridian Cloud", plan: "Enterprise", usage: 74, status: "active", docs: 177, queries: 4100, revenue: 4200, joined: "2024-01-28" },
];

export const MOCK_DOCUMENTS = {
  1: [
    { id: 1, name: "Q4 Financial Report.pdf", size: "2.4 MB", status: "processed", uploaded: "2 hours ago", pages: 42 },
    { id: 2, name: "Product Roadmap 2025.docx", size: "1.1 MB", status: "processed", uploaded: "1 day ago", pages: 18 },
    { id: 3, name: "Customer Survey Results.xlsx", size: "856 KB", status: "pending", uploaded: "3 hours ago", pages: 5 },
    { id: 4, name: "Technical Architecture.pdf", size: "4.2 MB", status: "processed", uploaded: "3 days ago", pages: 67 },
  ],
  2: [
    { id: 5, name: "API Documentation v3.pdf", size: "3.1 MB", status: "processed", uploaded: "5 hours ago", pages: 88 },
    { id: 6, name: "Sprint Planning Notes.docx", size: "420 KB", status: "processing", uploaded: "30 mins ago", pages: 8 },
  ],
  3: [
    { id: 7, name: "ML Model Performance.pdf", size: "1.8 MB", status: "processed", uploaded: "1 day ago", pages: 24 },
    { id: 8, name: "Dataset Analysis.xlsx", size: "5.6 MB", status: "processed", uploaded: "2 days ago", pages: 12 },
  ],
};

export const MOCK_ACTIVITY = [
  { id: 1, type: "upload", tenant: "Acme Corp", action: "Uploaded Q4 Financial Report.pdf", time: "2 min ago" },
  { id: 2, type: "query", tenant: "Horizon Systems", action: "Asked 14 questions in Q&A session", time: "8 min ago" },
  { id: 3, type: "upload", tenant: "NovaTech Labs", action: "Uploaded API Documentation v3.pdf", time: "23 min ago" },
  { id: 4, type: "tenant", tenant: "Quantum Dynamics", action: "New tenant trial started", time: "1 hr ago" },
  { id: 5, type: "query", tenant: "Meridian Cloud", action: "Generated 8-page summary report", time: "2 hrs ago" },
  { id: 6, type: "upload", tenant: "Stellar AI", action: "Uploaded Dataset Analysis.xlsx", time: "3 hrs ago" },
];

export const ANALYTICS_QUERIES = [
  { name: "Acme Corp", queries: 3420 },
  { name: "Horizon", queries: 5610 },
  { name: "Meridian", queries: 4100 },
  { name: "NovaTech", queries: 1870 },
  { name: "Stellar AI", queries: 980 },
  { name: "BlueWave", queries: 720 },
  { name: "DataForge", queries: 450 },
];

export const PLAN_DISTRIBUTION = [
  { name: "Enterprise", value: 3, color: "#6366f1" },
  { name: "Pro", value: 3, color: "#8b5cf6" },
  { name: "Starter", value: 2, color: "#a78bfa" },
];

export const TREND_DATA = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  queries: Math.floor(Math.random() * 8000) + 4000,
  docs: Math.floor(Math.random() * 80) + 30,
  revenue: Math.floor(Math.random() * 5000) + 12000,
}));

export const AI_RESPONSES = [
  "Based on the uploaded documents, I found several key insights. The Q4 financial report shows a **23% increase in recurring revenue** compared to Q3, with enterprise clients driving most of the growth.",
  "According to the technical architecture document, the system uses a microservices approach with **Kubernetes orchestration**. The API gateway handles rate limiting at 10,000 req/min per tenant.",
  "The dataset analysis reveals **3 significant correlations** in the customer behavior data. Retention rates are highest among users who engage with the product within the first 48 hours of signup.",
  "I analyzed the product roadmap and identified **5 major feature releases** planned for 2025. The AI integration milestone is scheduled for Q2, with beta access for Enterprise customers in March.",
  "From the survey results, **78% of customers** rate the onboarding experience as excellent or very good. The main pain point identified is the initial data migration process.",
];
