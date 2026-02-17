"use client";

import { useTicketStore } from "@/store/TicketStore";
import { AlertTriangle, BarChart3, CheckCircle, Zap } from "lucide-react";

export default function StatsCards() {
  const { tickets, setStatusFilter, filterStatus } = useTicketStore();

  const total = tickets.length;
  const highPriority = tickets.filter(
    (t) => t.priority === "High" && t.status == "Open",
  ).length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;

  const categories = tickets.map((t) => t.category);
  const mode = categories
    .sort(
      (a, b) =>
        categories.filter((v) => v === a).length -
        categories.filter((v) => v === b).length,
    )
    .pop();

  const stats = [
    {
      label: "Critical / High",
      value: highPriority,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Trending Issue",
      value: mode || "None",
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div
        onClick={() => setStatusFilter("Open")}
        className={`p-4 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${filterStatus === "Open" ? "ring-2 ring-blue-500 bg-blue-50/50" : "bg-white hover:bg-gray-50"}`}
      >
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
          <Zap size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Active Threats</p>
          <p className="text-2xl font-bold text-gray-900">{total - resolved}</p>
        </div>
      </div>

      <div
        onClick={() => setStatusFilter("Resolved")}
        className={`p-4 rounded-xl border shadow-sm flex items-center gap-4 cursor-pointer transition-all ${filterStatus === "Resolved" ? "ring-2 ring-green-500 bg-green-50/50" : "bg-white hover:bg-gray-50"}`}
      >
        <div className="p-3 rounded-lg bg-green-50 text-green-600">
          <CheckCircle size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Resolved</p>
          <p className="text-2xl font-bold text-gray-900">{resolved}</p>
        </div>
      </div>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4"
        >
          <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
            <stat.icon size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
