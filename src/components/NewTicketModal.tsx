"use client";

import { Ticket } from "@/lib/types";
import { useTicketStore } from "@/store/TicketStore";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MessageSquare, Sparkles, User, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTicketModal({ isOpen, onClose }: Props) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const addTicket = useTicketStore((state) => state.addTicket);

  const handleAnalyze = async () => {
    if (!message.trim() || !customerName.trim() || !email.trim()) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const aiData = await response.json();

      const newTicket: Ticket = {
        id: `T-${Math.floor(Math.random() * 10000)}`,
        customerName: customerName,
        email: email,
        body: message,
        priority: aiData.priority || "Medium",
        category: aiData.category || "General",
        status: "Open",
        createdAt: new Date().toISOString(),
      };

      addTicket(newTicket);
      setCustomerName("");
      setEmail("");
      onClose();
    } catch (error) {
      console.error("Analysis Failed:", error);
      alert("J.A.R.V.I.S is offline. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 pointer-events-auto">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <Sparkles className="text-purple-600" size={18} />
                    New Transmission
                  </h3>
                  <p className="text-xs text-gray-500">
                    Log a new distress signal manually
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    HERO / AGENT NAME
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 bg-gray-50 text-sm"
                      placeholder="e.g. Tony Stark"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    CONTACT FREQUENCY (EMAIL)
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-700 bg-gray-50 text-sm"
                      placeholder="e.g. ironman@stark.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    DISTRESS MESSAGE
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                    <textarea
                      className="w-full pl-10 pr-4 py-2 h-24 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none text-gray-700 bg-gray-50 text-sm"
                      placeholder="Describe the threat..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !message || !customerName || !email}
                  className="px-6 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg shadow-purple-500/20"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Running Diagnostics...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Process Ticket
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
