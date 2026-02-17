import { create } from "zustand";
import { Category, Priority, Ticket } from "../lib/types";
import { INITIAL_TICKETS } from "../lib/data";

interface TicketState {
  tickets: Ticket[];
  filterPriority: Priority | "All";
  filterCategory: Category | "All";
  filterStatus: "Open" | "Resolved";

  // Actions
  setTickets: (tickets: Ticket[]) => void;
  resolveTicket: (id: string) => void;
  setPriorityFilter: (p: Priority | "All") => void;
  setCategoryFilter: (c: Category | "All") => void;
  setStatusFilter: (status: "Open" | "Resolved") => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: INITIAL_TICKETS,
  filterPriority: "All",
  filterCategory: "All",
  filterStatus: "Open",

  setTickets: (tickets) => set({ tickets }),

  resolveTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, status: "Resolved" } : t,
      ),
    })),

  setPriorityFilter: (p) => set({ filterPriority: p }),
  setCategoryFilter: (c) => set({ filterCategory: c }),
  setStatusFilter: (status) => set({ filterStatus: status }),
}));
