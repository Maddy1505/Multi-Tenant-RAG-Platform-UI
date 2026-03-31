import {
  LayoutDashboard,
  Building2,
  FileText,
  MessageSquare,
  BarChart2,
} from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "tenants",   icon: Building2,       label: "Tenants"   },
  { id: "documents", icon: FileText,         label: "Documents" },
  { id: "chat",      icon: MessageSquare,    label: "Q&A Chat"  },
  { id: "analytics", icon: BarChart2,        label: "Analytics" },
];
