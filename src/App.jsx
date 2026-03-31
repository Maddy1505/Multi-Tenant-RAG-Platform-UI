import { useState } from "react";

import Sidebar       from "./components/Sidebar";
import Navbar        from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import TenantsPage   from "./pages/TenantsPage";
import DocumentsPage from "./pages/DocumentsPage";
import ChatPage      from "./pages/ChatPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { MOCK_TENANTS } from "./data/mockData";

export default function App() {
  const [page,      setPage]      = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [tenants,   setTenants]   = useState(MOCK_TENANTS);

  const sidebarWidth = collapsed ? 64 : 240;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <DashboardPage tenants={tenants} />;
      case "tenants":   return <TenantsPage   tenants={tenants} setTenants={setTenants} />;
      case "documents": return <DocumentsPage tenants={tenants} />;
      case "chat":      return <ChatPage      tenants={tenants} />;
      case "analytics": return <AnalyticsPage tenants={tenants} />;
      default:          return <DashboardPage tenants={tenants} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Sidebar
        active={page}
        onNav={setPage}
        collapsed={collapsed}
        onToggle={() => setCollapsed(v => !v)}
      />

      <Navbar page={page} sidebarWidth={sidebarWidth} />

      <main
        className="transition-all duration-300 pt-14 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="p-6 max-w-6xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
