# KU-ONLINE Marketplace Frontend

## Overview

KU-ONLINE is a modern marketplace frontend application built for the Kurdistan region. It serves as a multi-vendor platform where users can browse, buy, and sell products across various categories. The application features a responsive design with support for multiple languages (English, Kurdish, Arabic) and provides a comprehensive marketplace experience with user authentication, product management, messaging systems, and review capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router for server-side rendering and modern React patterns
- **UI Framework**: ShadCN UI components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom orange-themed color scheme and CSS variables
- **Language**: TypeScript for type safety and better developer experience
- **State Management**: React hooks and server components for data fetching

### Layout and Navigation
- **Responsive Design**: Mobile-first approach with dedicated mobile navigation
- **Desktop Layout**: Traditional header with search, filters, and user actions
- **Mobile Layout**: Bottom navigation bar with floating sell button
- **Theme Support**: Light/dark mode toggle with system preference detection

### Authentication System
- **Provider**: Supabase Auth with multiple authentication methods
- **Social Login**: Google OAuth integration
- **Phone Authentication**: OTP-based phone number verification
- **Session Management**: Server-side session handling with middleware
- **Authorization**: Role-based access control for different user types

### Database Design
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: PostgreSQL with tables for users, products, categories, messages, and reviews
- **Relationships**: Foreign key relationships between entities
- **Data Types**: Support for JSON fields, decimal pricing, and timestamp tracking

### Product Management
- **Categories**: Hierarchical category system with icons and multilingual support
- **Listings**: Rich product listings with multiple images, conditions, and pricing
- **Search and Filtering**: Advanced filtering by category, location, condition, and price range
- **Image Handling**: Next.js Image optimization with remote pattern support

### Communication Features
- **Messaging System**: Real-time chat between buyers and sellers
- **Review System**: Rating and review functionality for seller reputation
- **Notifications**: Toast notifications for user feedback

### Mobile Experience
- **Progressive Web App**: Mobile-optimized interface with native app feel
- **Touch Interactions**: Swipe gestures and touch-friendly components
- **Performance**: Optimized images and lazy loading for mobile networks

### Internationalization
- **Multi-language**: Support for English, Kurdish (Sorani), and Arabic
- **Currency**: Iraqi Dinar (IQD) as primary currency
- **Localization**: Regional preferences for Kurdistan market

## External Dependencies

### Authentication and Backend
- **Supabase**: Primary backend service for authentication, database, and real-time features
- **Supabase Auth**: User authentication and session management
- **Supabase Database**: PostgreSQL database hosting

### UI and Styling
- **Radix UI**: Headless UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: PT Sans font family for typography

### Development Tools
- **Drizzle Kit**: Database migration and schema management
- **Postgres**: Database driver for connection and queries
- **TypeScript**: Type checking and development experience

### Image and Media
- **Next.js Image**: Optimized image loading and processing
- **External Image Hosts**: Placeholder.co and Picsum.photos for development

### Enhanced Components
- **Embla Carousel**: Touch-friendly carousel component for image galleries
- **Date-fns**: Date formatting and manipulation utilities
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: CSS class merging utilities

### Deployment Configuration
- **Replit Optimization**: Configured for Replit hosting environment
- **Port Configuration**: Custom port 5000 for development and production
- **CORS Handling**: Configured for Replit proxy environment