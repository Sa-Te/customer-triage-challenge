"use client";

import { Ticket } from "@/lib/types";
import { useTicketStore } from "@/store/TicketStore";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Clock, Shield } from "lucide-react";
import { useState } from "react";

interface TicketItemProps {
  ticket: Ticket;
}

export default function TicketItem({ ticket }: TicketItemProps) {
  const resolveTicket = useTicketStore((state) => state.resolveTicket);
  const [expanded, setExpanded] = useState(false);

  // colors based on priority
  const priorityColors = {
    High: "bg-red-100 text-red-800 border-red-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all flex flex-col gap-3"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full border ${priorityColors[ticket.priority]}`}
          >
            {ticket.priority.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500 font-mono">#{ticket.id}</span>
        </div>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={12} />
          {new Date(ticket.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer group"
      >
        <h3 className="font-semibold text-gray-900">{ticket.customerName}</h3>
        <p className="text-sm text-gray-600 mt-1">{ticket.body}</p>
      </div>

      <div className="flex justify-between items-center mt-auto pt-3 border-t">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
          {ticket.category}
        </span>

        {ticket.status === "Open" ? (
          <button
            onClick={() => resolveTicket(ticket.id)}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-green-600 transition-colors"
          >
            <CheckCircle size={14} />
            Resolve
          </button>
        ) : (
          <span className="flex items-center gap-1 text-xs font-bold text-green-600">
            <Shield size={14} />
            Resolved
          </span>
        )}
      </div>
    </motion.div>
  );
}
