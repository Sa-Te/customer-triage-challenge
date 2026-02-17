# Customer Support Triage Dashboard (AI-Powered)

## 🚀 The Mission

Built for the [Company Name] 24-Hour Build Challenge. This tool solves the "noisy inbox" problem for support leads by automatically categorizing and prioritizing incoming tickets using AI, allowing for rapid triage without manual sorting.

## 🏗️ Tech Stack & Design Decisions

- **Framework:** Next.js 14 (App Router) - Chosen for speed of deployment and server-side capabilities.
- **Language:** TypeScript - For type safety and strict data modeling.
- **State Management:** Zustand - Selected over Redux/Context for its minimal boilerplate and performance in handling client-side filtered lists.
- **Validation:** Zod - Ensures the "mock" data and AI responses adhere to strict schema structures.
- **AI Engine:** Google Gemini Flash (Via API) - Used for zero-latency classification of tickets.
- **Styling:** Tailwind CSS + Lucide React - For a clean, accessible "Command Center" UI.

## ⚡ Key Features

1.  **Smart Triage:** Automated analysis of ticket sentiment to assign `Priority` (High/Medium/Low).
2.  **Auto-Categorization:** Sorts tickets into `Bug`, `Billing`, or `Feature Request` automatically.
3.  **Instant Filter:** Real-time filtering by category and priority status.
4.  **"One-Click" Resolution:** Optimistic UI updates for marking tickets as resolved.

## 🛠️ How to Run Locally

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
    - Create a `.env.local` file.
    - Add your API key: `NEXT_PUBLIC_GEMINI_API_KEY=your_key_here`
    - _(Note: The app runs in "Offline Mode" with pre-calculated tags if no key is provided)._

4.  **Run the App**
    ```bash
    npm run dev
    ```
    Open http://localhost:3000

## 🔮 Future Improvements (If I had 48 hours)

- **Persistance:** Connect to a Supabase/Postgres DB to save state permanently.
- **Draft Generation:** Use the LLM to write the actual email reply based on the issue context.
- **RAG:** Ingest company documentation so the AI can answer the ticket automatically.
