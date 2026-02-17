import { useTicketStore } from "@/store/TicketStore";
import { AnimatePresence } from "framer-motion";
import TicketItem from "./TicketItem";

export default function TicketList() {
  const { tickets, filterPriority, filterCategory, filterStatus } =
    useTicketStore();

  // Filtering Logic
  const filteredTickets = tickets.filter((ticket) => {
    const matchPriority =
      filterPriority === "All" || ticket.priority === filterPriority;
    const matchCategory =
      filterCategory === "All" || ticket.category === filterCategory;

    const matchStatus = ticket.status === filterStatus;
    return matchPriority && matchCategory && matchStatus;
  });
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        {filterStatus === "Open"
          ? "Incoming Transmissions"
          : "Mission Logs (Resolved)"}
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {filteredTickets.length}
        </span>
      </h2>

      {filteredTickets.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
          <p className="text-gray-500">
            No active threats detected. Good work, Avenger.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredTickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
