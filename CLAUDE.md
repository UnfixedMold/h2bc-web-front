# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
No test framework is currently configured in this project.

## Architecture

This is a Next.js 15 e-commerce frontend built with TypeScript, Tailwind CSS, and React 19. The application uses the App Router structure.

### Key Integrations
- **Medusa.js**: E-commerce backend integration via `@medusajs/js-sdk`
  - SDK instance: `lib/medusa.js`
  - Configured with environment variables for backend URL and publishable key
- **Model Viewer**: 3D model display using Google's model-viewer web component
- **Region Management**: Global context for handling multiple regions/currencies via cookies

### Directory Structure
- `app/` - Next.js App Router pages and components
  - `components/` - Shared UI components (footer, header, buttons, inputs)
  - `shop/` - E-commerce pages and shop-specific components
  - `providers/` - React context providers (RegionProvider)
- `lib/` - Utility libraries and SDK configurations
- `types/` - TypeScript type definitions

### State Management
- **RegionProvider**: Global context for region/currency selection
  - Persists selected region in cookies (365 day expiration)
  - Fetches regions from Medusa backend on app initialization
  - Falls back to environment variable defaults on API failure

### Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - Medusa store API key
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Medusa backend URL (defaults to localhost:9000)
- `NEXT_PUBLIC_DEFAULT_REGION_ID` - Fallback region ID
- `NEXT_PUBLIC_DEFAULT_REGION_SHORT_NAME` - Default region display name

### Styling Approach
- Tailwind CSS v4 with PostCSS
- Centralized breakpoints in `lib/breakpoints.ts` matching Tailwind defaults
- Geist fonts (sans and mono) loaded from Google Fonts
- Component library pattern with consistent button and input components

### Code Patterns
- TypeScript strict mode enabled
- ESLint with Next.js and TypeScript rules
- File-based routing with App Router
- React Server Components by default, Client Components marked with "use client"
- Cookie-based state persistence for user preferences