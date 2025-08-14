# Overview

This is a modern full-stack web application for an instructional designer's portfolio website. Built with React frontend and Express.js backend, it showcases projects, blog posts, testimonials, and provides a contact system. The application uses a PostgreSQL database with Drizzle ORM and features a modern UI built with shadcn/ui components and Tailwind CSS.

# User Preferences

Preferred communication style: Simple, everyday language.
Design aesthetic: Bold, modern gradient design inspired by sanimani.com with dramatic visual impact.
Color palette: Indigo-purple-pink-amber gradient background with white text and glassmorphism effects.

# System Architecture

## Frontend Architecture
- **React SPA**: Single-page application using Vite as the build tool and development server
- **Routing**: Wouter for client-side routing with pages for Home, About, Portfolio, Blog, and Contact
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Design System**: Modern gradient-based design with indigo-purple-pink-amber color palette
- **Visual Effects**: Glassmorphism navigation, backdrop blur effects, and dramatic typography
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **TypeScript**: Full TypeScript support with path aliases for clean imports

## Backend Architecture
- **Express.js**: RESTful API server with middleware for JSON parsing and request logging
- **File Structure**: Monorepo structure with shared schema between client and server
- **API Routes**: CRUD operations for projects, blog posts, testimonials, and contact submissions
- **File Uploads**: Multer integration for handling SCORM packages and media files
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

## Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schema definitions using Drizzle and Zod
- **Tables**: Projects, blog posts, testimonials, and contact submissions with proper relationships
- **Development**: In-memory storage fallback for development/testing environments
- **Migrations**: Drizzle Kit for database migrations and schema management

## External Dependencies
- **Database Provider**: Neon Database (serverless PostgreSQL) via `@neondatabase/serverless`
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with custom design tokens and component variants
- **File Storage**: Local file system with multer for development (uploads directory)
- **Fonts**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Development**: Replit-specific development tools and banner integration