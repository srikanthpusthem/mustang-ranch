=== PROJECT STATUS (2025-09-29T21:35:23.038Z) ===

## Git
branch: main
cd6f7d5 2025-09-17 Make chat icon highly visible with blue color and pulsing animation
2e2ae92 2025-09-17 Fix back button navigation and update FAQ with comprehensive questions
64b841f 2025-09-17 Fix back button navigation and Next.js 15 params async issues
985e9c0 2025-09-17 Improve AgentDock visibility in light mode - add border, shadow, and animation
09de138 2025-09-17 Fix 'New West' visibility - make it more prominent with mustang color

## Uncommitted
M package.json
?? scripts/

## package.json
name: mustang-ranch
scripts: dev, build, start, lint, test, test:ui, test:run, status
deps: @hookform/resolvers, @radix-ui/react-dialog, @radix-ui/react-label, @radix-ui/react-select, @radix-ui/react-slot, @testing-library/jest-dom, @testing-library/react, @types/jest, @vitejs/plugin-react, class-variance-authority, clsx, framer-motion, jsdom, lucide-react, next, next-seo, react, react-dom, react-hook-form, shadcn-ui, tailwind-merge, tailwindcss-animate, vitest, zod
devDeps: @eslint/eslintrc, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, eslint, eslint-config-next, tailwindcss, tw-animate-css, typescript

## Routes
/about
/admin
/community
/contact
/invest
/invest/[slug]
/page.tsx

## Key files
✔ src/components/AgentDock.tsx
✘ src/agent/AgentProvider.tsx
✔ src/data/opportunities.json
✔ src/app/api/agent/route.ts
✔ src/app/api/contact/route.ts
✔ src/app/invest/page.tsx
✔ src/app/invest/[slug]/page.tsx

## File tree (depth 2)
📁 .github
  📁 workflows
    📄 azure-static-web-apps.yml
📄 .gitignore
📄 README.md
📄 components.json
📄 eslint.config.mjs
📄 next-env.d.ts
📄 next.config.ts
📁 out
  📁 404
    📄 index.html
  📄 404.html
  📁 _next
    📁 m4hxErT62_WX29iXCEUtb
    📁 static
  📁 about
    📄 index.html
    📄 index.txt
  📁 admin
    📄 index.html
    📄 index.txt
  📁 community
    📄 index.html
    📄 index.txt
  📁 contact
    📄 index.html
    📄 index.txt
  📄 favicon.ico
  📄 file.svg
  📄 globe.svg
  📄 index.html
  📄 index.txt
  📁 invest
    📁 community-garden-network
    📁 heritage-seed-preservation
    📄 index.html
    📄 index.txt
    📁 prairie-barn-estates
    📁 rustic-ridge-ranch
    📁 sagebrush-stallions
    📁 thunder-ranch-mustangs
  📄 next.svg
  📄 robots.txt
  📄 sitemap.xml
  📄 vercel.svg
  📄 window.svg
📄 package-lock.json
📄 package.json
📄 postcss.config.mjs
📁 public
  📄 file.svg
  📄 globe.svg
  📄 next.svg
  📄 robots.txt
  📄 vercel.svg
  📄 window.svg
📁 scripts
  📄 status.mjs
📁 src
  📁 __tests__
    📄 AgentDock.test.tsx
    📁 api
    📄 setup.ts
  📁 app
    📁 about
    📁 admin
    📁 api
    📁 community
    📁 contact
    📄 favicon.ico
    📄 globals.css
    📁 invest
    📄 layout.tsx
    📄 page.tsx
    📄 sitemap.ts
  📁 components
    📄 AgentDock.tsx
    📄 AgentProvider.tsx
    📄 FAQ.tsx
    📄 Hero.tsx
    📄 Navbar.tsx
    📄 OpportunityCard.tsx
    📄 OpportunityDetails.tsx
    📄 PillarCard.tsx
    📄 Stat.tsx
    📄 Testimonial.tsx
    📁 ui
  📁 data
    📄 opportunities.json
  📁 lib
    📄 utils.ts
📄 staticwebapp.config.json
📄 tailwind.config.ts
📄 tsconfig.json
📄 vitest.config.ts