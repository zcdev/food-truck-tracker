# Food Truck Tracker 🚚

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?logo=next.js)](https://nextjs.org/)
[![React.js](https://img.shields.io/badge/React.js-61DAFB?logo=react\&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel\&logoColor=white)](https://vercel.com/)

## Live Demo
Explore the Food Truck Tracker — a real-time simulated, search-enabled web app: [https://food-truck-tracker-app.vercel.app](https://food-truck-tracker-app.vercel.app)

## Overview

**Deliverable:** Built with a focus on real-time scheduling, the app balances responsiveness with backend cost constraints. It emphasizes clean information architecture, efficient state management, and mobile-first performance, wrapped in a vibrant, user-friendly interface that reduces friction and keeps interactions fast and effortless.

**Purpose:** The Food Truck Tracker app helps busy, on-the-go users quickly find food options without the hassle of planning or cooking. It delivers a streamlined, food-truck-first experience with simple search and filtering, enabling fast, intuitive decision-making.

## Tech Stack

- Next.js 16+ (App Router)
- React Server & Client Components
- TypeScript
- Tailwind CSS
- Vercel Deployment
- Swiper.js (carousel plugin)

## Architecture

**UI & State Management:** <br />Optimized state updates by `useEffect()` to minimize unnecessary re-renders, ensuring smooth interactions under frequent time-based updates.

**SSR/CSR Boundary Handling:** <br />Resolved hydration issues by isolating time-sensitive logic to the client, preventing server-client render mismatches in production.

**URL State Management with `useSearchParams`:** <br />Enabled dynamic rendering and leveraged Next.js App Router `useSearchParams` to persist query parameters across navigation, ensuring consistent routing behavior in edge cases while preserving scroll position.

## Features

**Real-Time Scheduling:** <br />Built a live clock to compute durations from the current client time, accurately calculating upcoming arrivals down to the millisecond and formatting output in 12-hour time.

**Swiper Carousel Integration:** <br />Implemented a touch-optimized carousel using Swiper.js with autoplay, maintaining responsive layouts and consistent slide dimensions across viewports.

**Hot Menu Item Search:** <br />Develop a client-side search with controlled input state and dynamic filtering logic to return relevant menu items with minimal re-rendering.

**Schedule Sorting:** <br />Implement accessible sorting controls on the schedule table header to allow users to toggle between ascending and descending order.

**Food Truck Modal:** <br />Designed and built a lightweight modal to display detailed food truck info.

## Dev Notes
[What I Learned from Two Next.js Production Bugs (Part 1)](https://zoechang.dev/blog/two-nextjs-prod-bugs-part-1)<br />
[What I Learned from Two Next.js Production Bugs (Part 2)](https://zoechang.dev/blog/two-nextjs-prod-bugs-part-2)

## Assets
- **[Canva](https://canva.com)** – Slider backgrounds, food truck logo elements.
- **[emojis.com](https://www.emojis.com/)** – Hot menu item image assets.

![GitHub repo size](https://img.shields.io/github/repo-size/zcdev/food-truck-tracker)
![GitHub last commit](https://img.shields.io/github/last-commit/zcdev/food-truck-tracker)