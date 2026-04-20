# Umurava AI Talent Screener: Project Specification

## 1. Project Overview
This system is a high-performance AI orchestration tool designed to transform the recruitment bottleneck. It ingests structured data from the Umurava platform and unstructured resumes from external sources, using Google Gemini to perform deep-context matching and provide defensible hiring recommendations.

## 2. System Architecture
The application follows a decoupled MERN-like architecture optimized for AI throughput.

* **Frontend:** Next.js (App Router) + Tailwind CSS + Redux Toolkit.
    * *Key Feature:* A "Selection Reasoning" dashboard that visualizes candidate gaps vs. strengths.
* **Backend:** Node.js + TypeScript + Express.
    * *Key Feature:* An asynchronous processing queue for handling bulk PDF uploads without timing out the API.
* **Database:** MongoDB.
    * *Schemas:* `Jobs`, `Candidates`, `ScreeningReports` (stores AI outputs to minimize redundant LLM calls).
* **AI Layer:** Gemini 1.5 Pro/Flash.
    * *Role:* Feature extraction from PDFs, semantic matching, and natural language explanation.

## 3. The AI Decision Flow (The Core)
To ensure accuracy and explainability, the system follows this logic:

1.  **Context Injection:** The Job Description is converted into a structured "Ideal Candidate Profile" (JSON).
2.  **Unstructured Parsing:** External PDFs are parsed via `pdf-parse` and sent to Gemini to be transformed into the Umurava Talent Schema format.
3.  **Semantic Scoring:** Candidates are scored across four dimensions:
    * **Hard Skill Alignment:** (Technical stack match)
    * **Experience Density:** (Years of relevant work vs. total years)
    * **Educational Relevance:** (Degree vs. industry)
    * **Growth Potential:** (Extracted from career trajectory)
4.  **Reasoning Generation:** The AI identifies the "Critical Gap" (the #1 reason why a candidate might fail) and the "Value Add" (why they are a top pick).

## 4. Technical Requirements & Deliverables
### Functional Requirements
- **Bulk Upload:** Support for ZIP or multiple PDF uploads.
- **Dynamic Ranking:** A sortable table of the Top 10/20 candidates with "Match Scores."
- **Exportability:** Download the shortlist as a CSV/Excel for HR meetings.

### Non-Functional Requirements
- **Latency:** AI analysis should take < 5 seconds per candidate.
- **Security:** Use environment variables for Gemini API keys; do not store raw resumes post-analysis if privacy is a concern.

## 5. Development Milestones
- **Phase 1:** Setup Next.js/Node.js boilerplate and MongoDB connection.
- **Phase 2:** Implement Gemini API integration for single-candidate parsing.
- **Phase 3:** Build the ranking algorithm (The "Ranker" prompt).
- **Phase 4:** UI/UX development for the Recruiter Dashboard.
- **Phase 5:** Deployment on Vercel/Railway and final documentation.

## 6. Assumptions & Limitations
- **PDF Quality:** System assumes readable text (OCR is out of scope for the MVP unless specifically integrated).
- **Schema Rigidity:** External resumes will be forced into the Umurava Talent Schema to maintain consistency.
