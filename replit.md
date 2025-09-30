# KU-ONLINE Marketplace

## Overview

KU-ONLINE is a Next.js-based marketplace application designed for the Kurdistan region. Currently implemented as a frontend-only demonstration with mock data, the application showcases a modern e-commerce interface with product browsing, filtering, and multilingual support. The project uses the Next.js App Router, ShadCN UI components, and Tailwind CSS for styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 15.3.3 with App Router**: Chosen for its file-based routing, server components support, and optimized performance. The App Router provides better data fetching patterns and streaming capabilities compared to the Pages Router.
- **TypeScript**: Provides type safety across the codebase, reducing runtime errors and improving developer experience with better IDE support.
- **React 18**: Leverages concurrent features and improved hydration for better user experience.

### UI Architecture
- **Component Library**: ShadCN UI with Radix UI primitives provides accessible, customizable components. This approach gives full control over styling while maintaining accessibility standards.
- **Styling System**: Tailwind CSS with CSS variables for theming enables consistent design across light/dark modes and allows easy color scheme customization.
- **Design Tokens**: Uses HSL color values stored in CSS variables for flexible theming. Primary color is orange (#F97316), with warm earth tones throughout.

### Layout Structure
- **Responsive Design**: Mobile-first approach with separate mobile navigation component and desktop header.
- **Layout Components**: 
  - `AppLayout`: Wraps pages with header
  - `AppHeader`: Desktop navigation with search and filters
  - `MobileNav`: Fixed bottom navigation for mobile devices
  - `AnnouncementBar`: Marquee-style promotional banner

### Data Management
- **Mock Data Strategy**: Currently uses hardcoded product arrays in components (`placeholderProducts`). This allows frontend development without backend dependencies.
- **Product Schema**: Defined TypeScript interfaces in `src/lib/types.ts` for type safety:
  - Products include: id, name, price (in IQD), seller info, category, condition, location, and timestamps
  - Seller objects contain name and avatar URL

### Image Handling
- **Next.js Image Optimization**: Configured to allow images from `placehold.co` and `picsum.photos` for mock data.
- **Responsive Images**: Uses Next.js Image component with appropriate sizing hints for different viewport widths.

### State Management
- **Local Component State**: Uses React hooks (useState, useEffect) for simple state management.
- **No Global State Library**: Current architecture doesn't require Redux/Zustand as there's no complex state sharing or backend integration yet.

### Routing
- **File-Based Routing**: Next.js App Router with route groups for organization.
- **Client Components**: Pages and interactive components use "use client" directive for client-side interactivity.

### Internationalization (Planned)
- **Language Switcher Component**: UI exists for Kurdish (Sorani), Arabic, and English but not yet implemented.
- **Design Consideration**: Architecture accommodates future i18n integration through component structure.

### Build Configuration
- **TypeScript & ESLint**: Build errors ignored (`ignoreBuildErrors: true`) for rapid prototyping - should be enabled for production.
- **Path Aliases**: `@/` alias configured for clean imports from src directory.

### Performance Optimizations
- **Image Optimization**: Next.js automatic image optimization with remote patterns configured.
- **Component Code Splitting**: Automatic code splitting through Next.js dynamic imports.
- **CSS Optimization**: Tailwind CSS purges unused styles in production.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Headless UI primitives for accessible components (Dialog, Dropdown, Select, Toast, etc.)
- **Embla Carousel**: Carousel functionality for product galleries
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority (CVA)**: Utility for managing component variants

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **tailwind-merge**: Merges Tailwind classes intelligently
- **tailwindcss-animate**: Animation utilities for Tailwind
- **PostCSS**: CSS processor for Tailwind

### Utilities
- **clsx**: Conditional className utility
- **date-fns**: Date formatting and manipulation

### Fonts
- **Google Fonts**: PT Sans font family loaded via CDN for body and headline text

### Development Tools
- **TypeScript**: Type checking
- **ESLint**: Code linting (currently disabled in builds)

### Future Integration Points
The architecture is designed to easily integrate with:
- **Backend API**: RESTful or GraphQL endpoints can replace mock data
- **Database**: PostgreSQL with Drizzle ORM (mentioned in notes) or other databases
- **Authentication**: Google OAuth, email/password, phone verification (planned per blueprint)
- **Real-time Features**: WebSocket integration for messaging (planned per blueprint)
- **Search Service**: Elasticsearch or similar for multilingual search (planned per blueprint)
- **File Storage**: For user-uploaded product images
- **Translation Service**: For real-time multilingual support (planned per blueprint)