# Release Notes

## v0.1 - Initial Release

**Release Date:** December 2024

### 🎉 What's New

This is the initial release of the NAFR (Note-taking App) web application, implementing the core architecture as outlined in the project's technical vision.

### ✨ Features

#### Authentication

- **Stub Authentication**: Simple email/password login form
- **Session Management**: Cookie-based sessions with 7-day expiration
- **Route Protection**: Middleware-based protection for `/notes` route
- **Automatic Redirects**: Seamless redirects between login and notes pages

#### Notes Management

- **Local Storage**: Browser-based note persistence using localStorage
- **Auto-save**: Notes automatically save as you type (300ms debounce)
- **Simple Editor**: Clean, minimal textarea interface
- **Logout Functionality**: Easy session termination

#### Technical Infrastructure

- **Next.js 15.5.2**: App Router with TypeScript and Tailwind CSS
- **Framework-Agnostic Design**: Feature components separated from routing shell
- **Docker Support**: Multi-stage Dockerfile with standalone Next.js output
- **CI/CD Pipeline**: GitHub Actions workflow for automated builds and releases
- **Version Management**: Automated version enforcement and tagging

### 🏗️ Architecture

#### Frontend Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks with localStorage persistence

#### Development & Deployment

- **Containerization**: Docker with multi-stage builds
- **Registry**: GitHub Container Registry (GHCR) integration
- **CI/CD**: GitHub Actions with release-based triggers
- **Local Testing**: `./run` script for local pipeline simulation

### 🔧 Technical Details

#### File Structure

```
web/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── login/page.tsx   # Login route
│   │   ├── notes/page.tsx   # Protected notes route
│   │   └── page.tsx         # Root redirect
│   ├── features/            # Framework-agnostic components
│   │   ├── auth/            # Authentication components
│   │   └── notes/           # Notes management components
│   └── middleware.ts        # Route protection middleware
├── Dockerfile               # Multi-stage container build
├── VERSION                  # Current version (v0.1)
└── RELEASE_NOTES.md         # This file
```

#### Key Components

- **LoginForm**: Stub authentication with form validation
- **NotesPage**: localStorage-backed note editor with auto-save
- **Middleware**: Cookie-based session protection
- **Dockerfile**: Optimized production container build

### 🚀 Getting Started

#### Local Development

```bash
cd web
npm install
npm run dev
# Open http://localhost:3000
```

#### Docker Build

```bash
cd web
docker build -t nafr-webapp:latest .
docker run -p 3000:3000 nafr-webapp:latest
```

#### CI/CD Testing

```bash
# From project root
./run  # Simulates GitHub Actions locally
```

### 📋 Known Limitations

- **Authentication**: Currently stub-based (any email/password works)
- **Data Persistence**: Notes only stored in browser localStorage
- **No Backend**: No server-side API or database integration yet
- **Single User**: No multi-user support or user management

### 🔮 Next Steps

This release establishes the foundation for the full application. Future releases will include:

- **Phase 1**: Go backend with PostgreSQL database
- **Phase 2**: Real authentication with password hashing
- **Phase 3**: Magic link authentication
- **Phase 4**: OAuth integration (Google, GitHub, Apple)
- **Phase 5**: Production deployment with Kubernetes

### 🐛 Bug Fixes

- Fixed Suspense boundary issue with `useSearchParams()` in LoginForm
- Resolved Docker build failures during static generation
- Ensured proper middleware route protection

### 📦 Dependencies

- **Next.js**: 15.5.2
- **React**: 19.1.0
- **TypeScript**: ^5
- **Tailwind CSS**: ^4
- **Node.js**: 20 (Alpine in Docker)

---

_This release represents the first milestone in building a production-ready note-taking application with modern web technologies and cloud-native deployment practices._
