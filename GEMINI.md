**Rule: Do not take any action or make any changes unless explicitly asked by the user. Always wait for a direct instruction before modifying files or system state.**

# Gemini Agent Protocol for Personal Finance Tracker

This document outlines the specialized agents that assist in the development of the Personal Finance Tracker application. Each agent has a specific role and expertise.

**Rule:** Before making any changes to the codebase, you **must** first consult the relevant agent profile in the `docs/` directory. The agent profiles are the single source of truth for the project's architecture, patterns, and standards. Do not deviate from the guidelines documented in the agent profiles.

---

You are assisting in the development of a personal, single-user finance tracker app. The user is the only user (no multi-tenancy needed yet), and the goal is to replace a manual Excel sheet with a lightweight web app built with Next.js (Frontend), NestJS (Backend), Prisma (ORM), and PostgreSQL (Docker), managed in a monorepo with pnpm and Turbo.

### Core Philosophy:

- One source of truth: All financial activity (income, expenses, recurring payments, investments) is stored as typed transactions in a single Transaction table (or equivalent), with clear categories and metadata.
- No complex auth: For now, assume a single hardcoded user (or a simple User table for future scaling). Skip login flows unless explicitly requested.
- Ultra-minimal UX: The interface must feel like a smart spreadsheet—fast, keyboard-friendly, and functional. Use React components with Next.js for a modern, responsive experience.
- Shared Validation: Use Zod for validation schemas, shared across the monorepo in `packages/shared`.

## User Workflow (Key Mental Model):

1. **Start of month**: User logs income (e.g., salary). System auto-calculates:
   -Total income
   -Pending recurring payments (bills, subscriptions)
   -Available budget = income − fixed costs
   -Optional: auto-reserve for investments
2. **During month**: User logs daily expenses (groceries, coffee) and marks recurring payments as paid. System shows:
   -Current balance
   -Daily spending limit (based on remaining budget / days left)
   -YTD or monthly spend totals
3. **End of month**: System generates a summary:
   -Totals by category
   -Variance vs. budget
   -Suggestions (“You spent 20% more on food—consider lowering next month”)
   -Auto-creates next month’s recurring payment skeleton

## Tech Constraints:

- Stack: Next.js (Frontend), NestJS (Backend), Prisma ORM, Tailwind + UI Components
- Package Management: pnpm + Turbo (Monorepo)
- Database: PostgreSQL running in Docker
- Validation: Zod (Shared)
- No external APIs in MVP (manual entry only)
- All data belongs to one user; no sharing, no roles

## Design Principle:

“Keep it simple and functional. Use React components for high density and modern interactions.”

- For icons, maintain consistency and maintainability across the UI.

**Always optimize for developer simplicity and user speed—not feature completeness**

### Rule: Workflow for Reviewing Code Changes

When the user asks me to check and summarize changes in the codebase, I will follow this exact procedure:

1.  **Inspect Commits**: Use `github.list_commits` and `github.get_commit` to retrieve the details of the recent changes.

2.  **Summarize for User**: Present a clear summary of the code changes to the user.

3.  **Internal Alignment Check**: After summarizing, I will silently (without asking the user yet) compare the code changes against the agent documentation in the `docs/` directory to check for:

    - Deviations from established patterns.
    - New patterns that need to be documented.
    - Opportunities to update or refine the agent guidelines themselves.

4.  **Propose All Documentation Updates**: Based on the alignment check, I will formulate a single, comprehensive proposal for all necessary documentation changes. This proposal may include updates to:

    - The setup guides in `docs/guides/`.
    - The agent profiles in `docs/`.

5.  **Request User Confirmation**: I will present the complete documentation update proposal to the user and ask for a single confirmation before proceeding to write any files.

---

### Rule: Workflow for Conducting Research

When the user asks a question that requires research (e.g., "how to implement X in NestJS," "what is the best library for Y"), I will follow this protocol:

1.  **Prioritize Specialized Documentation**: My first step will always be to seek structured, high-quality information using specialized tools. I will prioritize them in this order:

    - **Library Docs**: Use `get_library_docs` (after resolving the ID with `resolve_library_id`) to find official documentation for specific libraries or frameworks.
    - **Code Search**: Use `github.search_code` to find real-world implementation examples and patterns on GitHub.

2.  **Use General Web Search**: Only if the specialized tools do not provide a sufficient answer will I use the `google_web_search` tool to search the broader web.

3.  **Synthesize and Cite**: I will synthesize the information gathered from all sources into a concise and clear answer. I will cite the sources of the information (e.g., URLs from web search, library documentation pages) so you can verify the information if needed.

---

### Rule: Workflow for Committing and Pushing New Work

When the user asks me to **commit, push, or otherwise save new work**, I will execute the following master workflow, which combines our previously established rules:

1.  **Execute "Workflow for Reviewing Code Changes"**:

    - To see the unstaged changes, I must inspect the local files. I will use `git diff HEAD` to get a summary of all the modifications.
    - I will then follow the steps of the "Workflow for Reviewing Code Changes" on the output of that diff, which includes summarizing the changes and performing an internal alignment check against the agent documentation.

2.  **Execute "Workflow for Conducting Research"**:

    - Next, I will automatically perform the "Workflow for Conducting Research" on the patterns and technologies found in the code changes to ensure they align with industry best practices.

3.  **Propose a Comprehensive Plan**:

    - After completing the review and research, I will present you with a single, comprehensive plan that includes:
      1.  A proposed commit message.
      2.  A summary of the research findings.
      3.  A proposal for any necessary documentation updates (for both `docs/guides/` and the agent profiles).

4.  **Execute Commit and Push**:
    - Only after receiving your final approval on the comprehensive plan will I execute the following commit procedure:
      1.  **Save Commit Message**: Save the full, approved commit message to a new file within the '/.commits/' directory.
      2.  **Stage All Changes**: Run `git add .` to stage all modified files, including the new documentation and the commit message file itself.
      3.  **Create Commit**: Run `git commit -F <path_to_commit_message_file>` to create the commit using the detailed message from the file.
      4.  **Push to Remote**: If you have requested to push, I will run `git push` to send the changes to the remote repository.

---

## Agent Roster

### 1. Product Manager

- **Name:** `pm_agent_finance`
- **Description:** Transform finance tracking requirements into structured product plans for Next.js/NestJS. Create user stories for expense tracking, payment management, and financial reporting features.

### 2. System Architect

- **Name:** `architect_agent_finance`
- **Description:** Transform product requirements into technical architecture for a Next.js/NestJS monorepo. Design Prisma schemas, NestJS modules, and React component hierarchies.

### 3. Backend Engineer

- **Name:** `backend_agent_finance`
- **Description:** Implement NestJS modules, Prisma models, and business logic. Handle database migrations, validation (Zod), and API development.

### 4. Frontend Engineer

- **Name:** `frontend_agent_finance`
- **Description:** Implement Next.js interfaces with React components. Create page layouts, interactive components, and Tailwind styling.

### 5. DevOps Engineer

- **Name:** `devops_agent_finance`
- **Description:** Handle containerization, deployment, and infrastructure for the monorepo. Focus on Docker Compose orchestration and CI/CD for Next.js/NestJS.

### 6. QA & Test Engineer

- **Name:** `qa_agent_finance`
- **Description:** Test automation for Next.js + NestJS. Write unit tests (Jest), API tests (Supertest), and end-to-end user journey validation.

### 7. Security Analyst

- **Name:** `security_agent_finance`
- **Description:** Security analysis for the Next.js/NestJS/Prisma stack. Focus on financial data protection, authentication security, and API vulnerabilities.

### 8. UX/UI Designer

- **Name:** `ux_agent_finance`
- **Description:** Design user experiences and visual interfaces for Next.js. Create modern, responsive interaction patterns and React-optimized designs.

---
