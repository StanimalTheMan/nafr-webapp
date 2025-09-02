This is the minimal note-taking webapp per the architecture vision.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 — you'll land on `/login`.

Login is stubbed: entering any email/password sets a `session` cookie then redirects to `/notes`.

The notes editor autosaves to `localStorage` only. No backend yet.

## Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
- `npm start`: Start production server after build.

## Notes

- `/src/middleware.ts` protects `/notes` by requiring a `session` cookie.
- UI is minimal and framework-agnostic inside `src/features/*`.
