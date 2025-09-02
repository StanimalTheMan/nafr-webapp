# Conversation Summary (Catch-up Context)

The user is building a **note-taking app** with a focus on **simplicity** and incremental complexity. They want to proceed step by step, starting with basic authentication and gradually layering features and infrastructure.

---

## Authentication Plan

- **Phase 1:** Email + password (server sessions with secure cookies, Argon2/bcrypt hashing, `users`, `password_credentials`, `sessions` tables).
- **Phase 2:** Passwordless magic links (one-time tokens stored hashed, short TTL, delivered via email).
- **Phase 3:** OAuth (Google, GitHub, Apple), with account linking and security safeguards (PKCE, state, nonce, linking only by verified email or existing session).

---

## Backend Stack

- **Language:** Golang.
- **Database:** Preference for SQL (PostgreSQL recommended for auth & notes); discussed NoSQL (DocumentDB/MongoDB) but leaned towards Postgres for reliability and schema clarity.
- **API:** RESTful (not GraphQL, less familiarity with GraphQL).
- **Persistence:** Start with Postgres, migrations handled with `golang-migrate` or `goose`.

---

## Frontend Stack

- **Language:** TypeScript.
- **Framework:** Next.js + React + Tailwind (debated React Router vs Next.js).

  - Next.js App Router chosen for SSR, built-in middleware, and cookie-based auth redirection before render.
  - React Router considered more SPA-oriented but less convenient for session-based auth UX.

- **Design:** Separate **routing shell** (Next-specific) from **framework-agnostic feature components** in `features/*` so migration to React Router is possible later.

  - Example: `app/notes/page.tsx` (Next route) simply renders `features/notes/NotesPage.tsx` (UI/logic).
  - Thin wrappers for `Link` and `router` hooks abstract routing to avoid lock-in.

---

## Infrastructure & DevOps

- **CI/CD:** GitHub Actions (build/test → Docker build → push images to GHCR/ECR).
- **Containerization:** Docker, multi-stage builds.
- **Deployment:** Kubernetes (Helm charts, ArgoCD).
- **Cloud:** AWS initially, but with **cloud-agnostic patterns**:

  - Ingress via nginx + cert-manager.
  - DNS with external-dns.
  - Secrets via External Secrets Operator (AWS Secrets Manager now, Vault/GCP later).
  - Postgres via RDS/Aurora, but option for CloudNativePG operator.
  - Object storage using S3-compatible clients.

- **IaC:** Terraform + Terragrunt for modular, environment-based infrastructure.

---

## Development Flow

- Initially considered scaffolding with **v0.dev** using a detailed Go/Postgres/Next.js brief.
- Decided instead to **start locally** with **Next.js + Cursor** to rapidly prototype.
- Starter project created:

  - Next.js App Router with `/login`, `/notes`, and `middleware.ts`.
  - Feature components for login form, protected routes, and a local-storage backed notes editor.
  - Portable design to allow eventual switch to React Router if desired.
  - Ready to connect to Go backend once available by changing `NEXT_PUBLIC_API_BASE`.

---

## Key Takeaways

1. **Start small:** Local Next.js app with localStorage notes and stub login.
2. **Backend next:** Go API with sessions and Postgres for persistence.
3. **Iterate auth:** Email+password → magic links → OAuth.
4. **Infrastructure later:** Containerize, add CI/CD, deploy with Kubernetes + ArgoCD, cloud-agnostic patterns.
5. **Maintain portability:** Feature components are framework-agnostic, so routing shell (Next.js) can be swapped for React Router with minimal effort.

---

This context provides the full trajectory: from MVP web app in Next.js with Cursor, to Go backend, to staged authentication, to eventual production infra on AWS/Kubernetes but designed cloud-agnostic.
