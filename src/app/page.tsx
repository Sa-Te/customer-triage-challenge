"use client";

import TicketList from "@/components/TicketList";
import { useTicketStore } from "@/store/TicketStore";
import { Priority, Category } from "@/lib/types";
import StatsCards from "@/components/StatsCards";

export default function Dashboard() {
  const {
    setPriorityFilter,
    setCategoryFilter,
    filterPriority,
    filterCategory,
  } = useTicketStore();

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              S.H.I.E.L.D. <span className="text-blue-600">Helpdesk</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Global Threat Triage System (v1.0)
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white border text-sm font-medium rounded-lg hover:bg-gray-50"
            >
              Reset System
            </button>
            <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 shadow-lg">
              + New Ticket
            </button>
          </div>
        </header>

        {/* Stats */}
        <StatsCards />

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-wrap gap-4 items-center">
          <span className="text-sm font-semibold text-gray-700">
            Filter By:
          </span>

          <select
            className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={filterPriority}
            onChange={(e) =>
              setPriorityFilter(e.target.value as Priority | "All")
            }
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={filterCategory}
            onChange={(e) =>
              setCategoryFilter(e.target.value as Category | "All")
            }
          >
            <option value="All">All Categories</option>
            <option value="Bug">Bugs</option>
            <option value="Billing">Billing</option>
            <option value="Feature Request">Feature Requests</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* The Grid */}
        <TicketList />
      </div>
    </main>
  );
}
