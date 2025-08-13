# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## How to run local copy of projects web

1. Clone this repository
2. Go to folder `cd ./ten-factors-new/`
2. Install dependencies: `pnpm i` or `npm i`
3. Run development server: `pnpm dev` or `npm run dev`
4. Open `http://localhost:5173` in browser

## Figma MCP + Claude Sonnet 4 / GPT-5 low reasoning

Project in progress with Figma MCP + Claude Sonnet 4

# Ten Factors Landing Page Plan

## Notes
- Work in folder /ten-factors-new/
- Use React + Tailwind CSS for frontend implementation, initialized with Vite.
- Use normalize.css from https://cdnjs.com/libraries/normalize
- Terminal commands I'll do by myself, dont propose me to run them by you, just write them to me and end your message. Use pnpm.
- Dont start next task, when you check current task - finish you answer and wait for next command.
- Follow modular component structure (Header, Footer, Sections, Cards, etc.).
- Use provided image constants for assets.
- Ensure adaptive/responsive design for desktop, tablet, and mobile.
- Use Tailwind's responsive utilities for breakpoints.
- Organize code into components, utils, and styles directories as needed.
- Tailwind CSS v4.1.11.
- Utility styles are handled via Tailwind v4's new approach, not the config file.

## Task List
- [x] Initialize Vite project with React and Tailwind CSS
- [x] Set up Tailwind CSS config for custom colors and breakpoints
- [x] Set up normalize.css
- [x] Create base folder structure (components, assets, utils, styles)
- [x] Implement Header and Navigation Bar
- [x] Implement Hero/Intro section ("Ten Factors")
- [x] Improve header, create separate object for navigation links to make them reusable (for mobile and desktop nav)
- [x] Create mobile menu as slide-in drawer
  - [x] Create reusable NavigationLinks component
  - [x] Implement MobileMenu component as slide-in drawer
  - [x] Integrate MobileMenu with Header
- [x] Add internationalization (i18n) support and integrate react-i18next
  - [x] Refactor NAVIGATION constants to use translation keys
  - [x] Wire up i18n in main.jsx
  - [x] Update NavigationLinks, Header, MobileMenu, and Hero to use useTranslation and translation keys
- [x] Improve Footer to figma like https://www.figma.com/design/G5VUrQWb4DgotGneDCgaSf/Ten-Factors?node-id=155-9035&m=dev 
  - [x] Implement Subscribe to our newsletter
  - [x] Implement i18n
- [x] Implement Usage Process section (with steps) https://www.figma.com/design/G5VUrQWb4DgotGneDCgaSf/Ten-Factors?node-id=118-16502&m=dev
  - [x] Implement i18n
- [x] Implement Case Studies section https://www.figma.com/design/G5VUrQWb4DgotGneDCgaSf/Ten-Factors?node-id=118-16534&m=dev
  - [x] Implement i18n
  - [x] Implement horisontal smooth slider with case studies, it should be horizontal on desktop and mobile
- [x] Implement Testimonials section
  - [x] Implement testimonial card
  - [x] Use same slider as case studies
  - [x] Implement i18n
- [x] Implement CTA section ("Ready to try Ten-Factors?") https://www.figma.com/design/G5VUrQWb4DgotGneDCgaSf/Ten-Factors?node-id=118-16495&m=dev
- [x] Implement Contributors section https://www.figma.com/design/G5VUrQWb4DgotGneDCgaSf/Ten-Factors?node-id=118-18802&m=dev
  - [x] Implement as grid with 3 per row on lg, responsive on mobile/tablet
  - [x] Use avatars (not company logos)
  - [x] Implement i18n
- [x] Implement Read Further section https://www.figma.com/design/G5VUrQWb4DgotGneDCgaSf/Ten-Factors?node-id=118-18802&m=dev
  - [x] Fetch Dev Mode code for Frame 43 (node-id=118-16688)
  - [x] Generate React component for Frame 43
  - [x] Integrate component into appropriate location in codebase
  - [x] Make card as component and use it with i18n
  - [x] Implement i18n
- [ ] Ensure all sections/components are responsive (mobile/tablet/desktop)
- [ ] Refactor and optimize components for reusability

## Current Goal
Ensure all sections/components are responsive (mobile/tablet/desktop)
