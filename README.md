# 🛡️ S.H.I.E.L.D. Helpdesk (AI-Powered Triage)

> **"If you want to build a ship, don’t drum up people to collect wood… teach them to long for the endless immensity of the sea."**

Built for the **Founding Engineer Challenge**.
This is not just a dashboard; it's an **intelligent command center** designed to handle high-volume chaos with zero latency. I chose a **Superhero Theme** to demonstrate how the UI handles diverse, unstructured data (e.g., "Hulk smash keyboard" vs. "Billing issue").

🔗 **Live Deployment:** (https://customer-triage-challenge-argoswluy-sa-tes-projects.vercel.app/)

## 🚀 Key Features (The "Innovation" Layer)

- **🧠 AI-Powered Ingestion:** The "New Transmission" button doesn't just add a row; it sends the raw text to **Google Gemini 2.5 Flash**, which intelligently tags it with `Priority` and `Category`.
- **⚡ Optimistic UI:** The interface feels instant. Status changes happen locally before validaiton, mimicking a high-performance desktop app.
- **🔍 Multi-Dimensional Filtering:** Slice data by Priority, Category, and Status (Open/Resolved) simultaneously.
- **💾 Local Persistence:** Uses `zustand-persist` to save the state to LocalStorage, ensuring data survives page reloads without a database.

## 🛠️ Tech Stack & Architecture

I prioritized **speed of iteration** and **type safety** for this 24-hour sprint.

- **Framework:** Next.js 14 (App Router) – For easy API route integration.
- **State:** Zustand – Selected over Context/Redux for its performance with filtered lists (no unnecessary re-renders).
- **Validation:** Zod – Defines the "Schema of Truth" for both mock data and AI responses.
- **Styling:** Tailwind CSS + Framer Motion – For a clean, "Command Center" aesthetic with smooth layout transitions.
- **AI:** Google Gemini 2.5 Flash – Chosen for its generous free tier and sub-second latency.

## 🧪 Quality Assurance & Testing Strategy

_Given the 24-hour constraint, I prioritized feature completeness over automated coverage. However, in a production environment, this is how I would ensure stability:_

1.  **Unit Tests (Jest):** I would write tests for the `useTicketStore` to ensure filtering logic (e.g., "High Priority" + "Billing") returns the correct subset.
2.  **Integration Tests:** Test the `/api/analyze` route to mock the Gemini response and ensure it handles `500` errors gracefully (as implemented in my fallback logic).
3.  **E2E (Cypress/Playwright):** A simple flow: Open Modal -> Type Message -> Click Process -> Verify Card Appears.

## 🔮 Roadmap (If I had 48 hours)

- **RAG Integration:** Upload "S.H.I.E.L.D. Protocols" (PDFs) so the AI acts as a Tier 1 Support Agent and drafts a reply automatically.
- **Real Database:** Swap LocalStorage for Supabase (PostgreSQL) to enable multi-user collaboration.
- **Slack Alerts:** Webhook integration to ping the #ops channel when a "High Priority" threat is detected.

## 🏃‍♂️ How to Run Locally

1.  **Clone the repo**

    ```bash
    git clone [your-repo-link]
    cd customer-triage-challenge
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    - Create a `.env.local` file in the root.
    - Add your API key: `NEXT_PUBLIC_GEMINI_API_KEY=your_key_here`

4.  **Run the App**
    ```bash
    npm run dev
    ```
