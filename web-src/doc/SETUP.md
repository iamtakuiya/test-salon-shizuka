# Salon Shizuka — Complete Development Setup

> Every file, every command, in order. Follow top to bottom.

---

## Prerequisites

Install these before starting:

```bash
# Check versions
node --version   # Need 20+
npm --version    # Need 10+
git --version
```

If you don't have Node 20:
```bash
# macOS/Linux — use nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20

# Windows — download from https://nodejs.org/en (LTS)
```

---

## Step 1 — Create Monorepo Root

```bash
mkdir salon-shizuka
cd salon-shizuka
mkdir -p apps/web apps/api shared docs
```

---

## Step 2 — Root `package.json`

```bash
# In salon-shizuka/
touch package.json
```

```json
{
  "name": "salon-shizuka",
  "private": true,
  "workspaces": [
    "apps/*",
    "shared"
  ],
  "scripts": {
    "dev:web": "npm run dev --workspace=apps/web",
    "dev:api": "npm run dev --workspace=apps/api",
    "build:web": "npm run build --workspace=apps/web",
    "type-check": "tsc --noEmit --project apps/web/tsconfig.json && tsc --noEmit --project apps/api/tsconfig.json"
  }
}
```

---

## Step 3 — Root `.gitignore`

```bash
touch .gitignore
```

```
# Dependencies
node_modules/

# Environment — NEVER commit these
.env
.env.local
.env.development.local
.env.production.local

# Build outputs
dist/
build/

# Database
*.db
*.db-journal

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/settings.json
.idea/

# Logs
*.log
logs/

# Prisma
apps/api/src/db/migrations/
```

---

## Step 4 — Frontend Setup (`apps/web`)

### 4.1 Scaffold with Vite

```bash
cd apps/web
npm create vite@latest . -- --template react-ts
# When prompted "Current directory is not empty" → y (overwrite)
# Template: react-ts
```

This creates: `index.html`, `src/`, `vite.config.ts`, `tsconfig.json`, `package.json`

### 4.2 Frontend `package.json`

Replace the generated `apps/web/package.json` entirely:

```json
{
  "name": "@salon-shizuka/web",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.24.0",
    "@reduxjs/toolkit": "^2.3.0",
    "react-redux": "^9.1.0",
    "react-hook-form": "^7.52.0",
    "@hookform/resolvers": "^3.6.0",
    "gsap": "^3.12.5",
    "axios": "^1.7.0",
    "sass": "^1.77.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.3.0",
    "eslint": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.0"
  }
}
```

### 4.3 `apps/web/vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../../shared'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy API calls in dev — no CORS issues
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Auto-import abstracts into every SCSS file
        additionalData: `@use "@/styles/abstracts/variables" as *; @use "@/styles/abstracts/mixins" as *;`,
      },
    },
  },
});
```

### 4.4 `apps/web/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../../shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 4.5 `apps/web/tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 4.6 `apps/web/index.html`

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="SALON SHIZUKA — 完全予約制プライベートサロン。渋谷区神宮前。" />
    <title>SALON SHIZUKA</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&family=Jost:wght@300;400;500&family=Noto+Serif+JP:wght@400;500&family=Noto+Sans+JP:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Step 5 — Frontend Source Files

### 5.1 `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import App from './App';
import '@/styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 5.2 `src/App.tsx`

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/templates/MainLayout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 5.3 `src/app/store.ts`

```ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { bookingReducer } from '@/features/booking/store/bookingSlice';
import { uiReducer } from '@/app/store/slices/uiSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks — use these instead of raw useDispatch/useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### 5.4 `src/app/store/slices/uiSlice.ts`

```ts
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    mobileMenuOpen: false,
  },
  reducers: {
    openMobileMenu: (state) => { state.mobileMenuOpen = true; },
    closeMobileMenu: (state) => { state.mobileMenuOpen = false; },
    toggleMobileMenu: (state) => { state.mobileMenuOpen = !state.mobileMenuOpen; },
  },
});

export const { openMobileMenu, closeMobileMenu, toggleMobileMenu } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
```

### 5.5 `src/features/booking/store/bookingSlice.ts`

```ts
import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
}

interface BookingState {
  selectedDate: string | null;
  selectedTime: string | null;
  selectedServices: ServiceItem[];
  selectedAddons: ServiceItem[];
}

const initialState: BookingState = {
  selectedDate: null,
  selectedTime: null,
  selectedServices: [],
  selectedAddons: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    toggleService(state, action: PayloadAction<ServiceItem>) {
      const idx = state.selectedServices.findIndex(s => s.id === action.payload.id);
      if (idx >= 0) {
        state.selectedServices.splice(idx, 1);
      } else {
        state.selectedServices.push(action.payload);
      }
    },
    toggleAddon(state, action: PayloadAction<ServiceItem>) {
      const idx = state.selectedAddons.findIndex(a => a.id === action.payload.id);
      if (idx >= 0) {
        state.selectedAddons.splice(idx, 1);
      } else {
        state.selectedAddons.push(action.payload);
      }
    },
    resetBooking: () => initialState,
  },
});

export const { setDate, setTime, toggleService, toggleAddon, resetBooking } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;

// Selectors
const selectBooking = (state: RootState) => state.booking;

export const selectTotal = createSelector(
  [selectBooking],
  (booking) =>
    [...booking.selectedServices, ...booking.selectedAddons]
      .reduce((sum, item) => sum + item.price, 0)
);

export const selectIsDateTimeSelected = createSelector(
  [selectBooking],
  (booking) => booking.selectedDate !== null && booking.selectedTime !== null
);
```

### 5.6 `src/services/api.ts`

```ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor — log errors in dev
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('[API Error]', error.response?.data ?? error.message);
    }
    return Promise.reject(error);
  }
);
```

### 5.7 `src/services/bookingService.ts`

```ts
import { api } from './api';
import type { BookingPayload } from '@shared/schemas/bookingSchema';

export const bookingService = {
  async submit(payload: BookingPayload): Promise<{ success: boolean }> {
    const { data } = await api.post<{ success: boolean }>('/api/booking', payload);
    return data;
  },
};
```

### 5.8 `src/services/newsletterService.ts`

```ts
import { api } from './api';

export const newsletterService = {
  async subscribe(email: string): Promise<{ success: boolean }> {
    const { data } = await api.post<{ success: boolean }>('/api/newsletter', { email });
    return data;
  },
};
```

### 5.9 `src/components/templates/MainLayout/MainLayout.tsx`

```tsx
// Placeholder — assemble all section organisms here as you build them
export const MainLayout = () => {
  return (
    <main>
      <p style={{ fontFamily: 'var(--font-serif)', padding: '2rem' }}>
        SALON SHIZUKA — setup working ✓
      </p>
    </main>
  );
};
```

---

## Step 6 — Sass Architecture

Create every folder and file:

```bash
cd apps/web/src
mkdir -p styles/abstracts styles/base styles/layout styles/components styles/pages
```

### 6.1 `src/styles/abstracts/_variables.scss`

```scss
// ─── Colors ──────────────────────────────────────────
$color-bg:           #FAF5EF;
$color-text:         #3D3733;
$color-text-muted:   #7A6E66;
$color-accent:       #C9A96E;
$color-accent-dark:  #A8834A;
$color-white:        #FFFFFF;
$color-border:       #E8DDD2;
$color-success:      #4A7C59;
$color-error:        #C0392B;

// ─── Typography ──────────────────────────────────────
$font-serif:   'Cormorant Garamond', 'Noto Serif JP', serif;
$font-sans:    'Jost', 'Noto Sans JP', sans-serif;
$font-logo:    'Great Vibes', cursive;

// ─── Font Sizes ──────────────────────────────────────
$fs-xs:    0.75rem;   //  12px
$fs-sm:    0.875rem;  //  14px
$fs-base:  1rem;      //  16px
$fs-md:    1.125rem;  //  18px
$fs-lg:    1.25rem;   //  20px
$fs-xl:    1.5rem;    //  24px
$fs-2xl:   2rem;      //  32px
$fs-3xl:   2.5rem;    //  40px
$fs-4xl:   3.5rem;    //  56px
$fs-hero:  clamp(2.5rem, 6vw, 5rem);

// ─── Spacing ─────────────────────────────────────────
$space-1:   0.25rem;  //  4px
$space-2:   0.5rem;   //  8px
$space-3:   0.75rem;  //  12px
$space-4:   1rem;     //  16px
$space-6:   1.5rem;   //  24px
$space-8:   2rem;     //  32px
$space-12:  3rem;     //  48px
$space-16:  4rem;     //  64px
$space-24:  6rem;     //  96px
$space-32:  8rem;     // 128px

// ─── Breakpoints ─────────────────────────────────────
$bp-mobile:  375px;
$bp-tablet:  768px;
$bp-laptop:  1024px;
$bp-desktop: 1280px;
$bp-wide:    1440px;

// ─── Z-index ─────────────────────────────────────────
$z-base:    1;
$z-overlay: 100;
$z-nav:     200;
$z-modal:   300;

// ─── Transitions ─────────────────────────────────────
$transition-fast:   150ms ease;
$transition-base:   250ms ease;
$transition-slow:   400ms ease;

// ─── Border Radius ───────────────────────────────────
$radius-sm:   4px;
$radius-md:   8px;
$radius-lg:   16px;
$radius-full: 9999px;

// ─── Container ───────────────────────────────────────
$container-max:     1280px;
$container-padding: $space-6;

// ─── CSS Custom Properties (for JS access) ───────────
:root {
  --font-serif:       #{$font-serif};
  --font-sans:        #{$font-sans};
  --font-logo:        #{$font-logo};
  --color-bg:         #{$color-bg};
  --color-text:       #{$color-text};
  --color-accent:     #{$color-accent};
  --color-border:     #{$color-border};
}
```

### 6.2 `src/styles/abstracts/_mixins.scss`

```scss
// ─── Breakpoint Mixins ───────────────────────────────
@mixin tablet {
  @media (min-width: #{$bp-tablet}) { @content; }
}

@mixin laptop {
  @media (min-width: #{$bp-laptop}) { @content; }
}

@mixin desktop {
  @media (min-width: #{$bp-desktop}) { @content; }
}

@mixin mobile-only {
  @media (max-width: #{$bp-tablet - 1px}) { @content; }
}

// ─── Typography Helpers ──────────────────────────────
@mixin font-serif($size: $fs-base, $weight: 400, $style: normal) {
  font-family: $font-serif;
  font-size: $size;
  font-weight: $weight;
  font-style: $style;
}

@mixin font-sans($size: $fs-base, $weight: 400) {
  font-family: $font-sans;
  font-size: $size;
  font-weight: $weight;
}

// ─── Layout Helpers ──────────────────────────────────
@mixin container {
  width: 100%;
  max-width: $container-max;
  margin-inline: auto;
  padding-inline: $container-padding;

  @include tablet {
    padding-inline: $space-8;
  }

  @include laptop {
    padding-inline: $space-12;
  }
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// ─── Accessibility ───────────────────────────────────
@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// ─── Focus Ring ──────────────────────────────────────
@mixin focus-ring {
  &:focus-visible {
    outline: 2px solid $color-accent;
    outline-offset: 3px;
  }
}

// ─── Section Spacing ─────────────────────────────────
@mixin section-padding {
  padding-block: $space-16;

  @include laptop {
    padding-block: $space-24;
  }
}
```

### 6.3 `src/styles/abstracts/_functions.scss`

```scss
// Convert px to rem
@function rem($px) {
  @return ($px / 16) * 1rem;
}

// Clamp fluid type: min size at mobile, max size at desktop
@function fluid($min-px, $max-px, $min-vw: 375, $max-vw: 1280) {
  $slope: ($max-px - $min-px) / ($max-vw - $min-vw);
  $intercept: $min-px - ($slope * $min-vw);

  @return clamp(
    #{rem($min-px)},
    #{$slope * 100}vw + #{rem($intercept)},
    #{rem($max-px)}
  );
}
```

### 6.4 `src/styles/base/_reset.scss`

```scss
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: $color-bg;
  color: $color-text;
  font-family: $font-sans;
  font-size: $fs-base;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

input,
textarea,
select {
  font: inherit;
  border: none;
  outline: none;
  background: none;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 400;
  line-height: 1.2;
}
```

### 6.5 `src/styles/base/_typography.scss`

```scss
h1, .h1 { @include font-serif($fs-4xl); }
h2, .h2 { @include font-serif($fs-3xl); }
h3, .h3 { @include font-serif($fs-2xl); }
h4, .h4 { @include font-serif($fs-xl); }

.text-serif   { font-family: $font-serif; }
.text-sans    { font-family: $font-sans; }
.text-logo    { font-family: $font-logo; }
.text-muted   { color: $color-text-muted; }
.text-accent  { color: $color-accent; }
.text-center  { text-align: center; }

// Section label style — "CONCEPT", "MENU" etc.
.section-label {
  @include font-sans($fs-xs, 400);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: $color-accent;
}
```

### 6.6 `src/styles/base/_globals.scss`

```scss
// Smooth scroll offset for fixed header
html {
  scroll-padding-top: 80px;
}

// Section anchors
section {
  @include section-padding;
}

// Container utility class
.container {
  @include container;
}
```

### 6.7 `src/styles/base/_animations.scss`

```scss
// CSS keyframes only — GSAP handles JS animations
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// Initial hidden state for GSAP targets
// Apply this class, GSAP removes the opacity via animation
.gsap-hidden {
  opacity: 0;
}
```

### 6.8 `src/styles/layout/_grid.scss`

```scss
.grid {
  display: grid;
  gap: $space-6;
}

.grid-2 {
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
}

.grid-3 {
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include laptop {
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid-4 {
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include desktop {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 6.9 `src/styles/layout/_header.scss`

```scss
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-nav;
  height: 80px;
  @include flex-between;
  padding-inline: $container-padding;
  background-color: rgba($color-bg, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid $color-border;

  @include laptop {
    padding-inline: $space-12;
  }
}
```

### 6.10 `src/styles/components/_button.scss`

```scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  padding: $space-3 $space-8;
  @include font-sans($fs-sm, 400);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: $radius-sm;
  transition: all $transition-base;
  cursor: pointer;
  @include focus-ring;

  &--primary {
    background-color: $color-accent;
    color: $color-white;
    border-color: $color-accent;

    &:hover {
      background-color: $color-accent-dark;
      border-color: $color-accent-dark;
    }
  }

  &--outline {
    background-color: transparent;
    color: $color-text;
    border-color: $color-text;

    &:hover {
      background-color: $color-text;
      color: $color-white;
    }
  }

  &--ghost {
    background-color: transparent;
    color: $color-accent;
    border-color: $color-accent;

    &:hover {
      background-color: $color-accent;
      color: $color-white;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

### 6.11 `src/styles/pages/_home.scss`

```scss
// Section-level overrides for the home page
// Keep component styles in components/
// Use this file for page-level layout composition only

.home {
  padding-top: 80px; // Offset for fixed header
}
```

### 6.12 `src/styles/main.scss`

```scss
// 7-1 Sass Architecture — import order matters

// Abstracts (no output — variables, mixins, functions)
@use 'abstracts/variables' as *;
@use 'abstracts/mixins' as *;
@use 'abstracts/functions' as *;

// Base
@use 'base/reset';
@use 'base/typography';
@use 'base/globals';
@use 'base/animations';

// Layout
@use 'layout/grid';
@use 'layout/header';

// Components
@use 'components/button';

// Pages
@use 'pages/home';
```

---

## Step 7 — Environment Files (Frontend)

```bash
# apps/web/
touch .env.development .env.production
```

`apps/web/.env.development`:
```
VITE_API_BASE_URL=http://localhost:4000
```

`apps/web/.env.production`:
```
VITE_API_BASE_URL=https://your-api.railway.app
```

---

## Step 8 — Backend Setup (`apps/api`)

### 8.1 Initialize

```bash
cd apps/api
npm init -y
mkdir -p src/config src/controllers src/services src/routes src/middleware src/db src/types
```

### 8.2 `apps/api/package.json`

```json
{
  "name": "@salon-shizuka/api",
  "private": true,
  "version": "0.0.1",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "express": "^4.19.0",
    "nodemailer": "^6.9.0",
    "axios": "^1.7.0",
    "zod": "^3.23.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^7.3.0",
    "dotenv": "^16.4.0",
    "@prisma/client": "^5.16.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "ts-node-dev": "^2.0.0",
    "prisma": "^5.16.0",
    "@types/express": "^4.17.0",
    "@types/nodemailer": "^6.4.0",
    "@types/cors": "^2.8.0",
    "@types/node": "^20.0.0"
  }
}
```

### 8.3 `apps/api/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["../../shared/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 8.4 `apps/api/src/config/env.ts`

```ts
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const envSchema = z.object({
  PORT:                      z.string().default('4000'),
  CORS_ORIGIN:               z.string().default('http://localhost:5173'),
  DATABASE_URL:              z.string(),
  GMAIL_USER:                z.string(),
  GMAIL_CLIENT_ID:           z.string(),
  GMAIL_CLIENT_SECRET:       z.string(),
  GMAIL_REFRESH_TOKEN:       z.string(),
  OWNER_EMAIL:               z.string().email(),
  LINE_CHANNEL_ACCESS_TOKEN: z.string(),
  LINE_OWNER_USER_ID:        z.string(),
  NEWSLETTER_NOTIFY_EMAIL:   z.string().email(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1); // Fail fast at startup — not at runtime
}

export const env = parsed.data;
```

### 8.5 `apps/api/src/db/schema.prisma`

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Booking {
  id        String   @id @default(cuid())
  name      String
  email     String
  date      String
  time      String
  services  String   // JSON.stringify array
  addons    String   // JSON.stringify array
  total     Int      // in yen, calculated server-side
  createdAt DateTime @default(now())
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  source    String   @default("website")
  createdAt DateTime @default(now())
}
```

### 8.6 `apps/api/src/db/client.ts`

```ts
import { PrismaClient } from '@prisma/client';

// Singleton pattern — one Prisma client per process
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### 8.7 `apps/api/src/services/logger.service.ts`

```ts
type LogLevel = 'info' | 'warn' | 'error';

const log = (level: LogLevel, msg: string, meta?: object) => {
  const entry = JSON.stringify({
    level,
    msg,
    ts: new Date().toISOString(),
    ...meta,
  });
  if (level === 'error') {
    console.error(entry);
  } else {
    console.log(entry);
  }
};

export const logger = {
  info:  (msg: string, meta?: object) => log('info', msg, meta),
  warn:  (msg: string, meta?: object) => log('warn', msg, meta),
  error: (msg: string, meta?: object) => log('error', msg, meta),
};
```

### 8.8 `apps/api/src/services/email.service.ts`

```ts
import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from './logger.service';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: env.GMAIL_USER,
    clientId: env.GMAIL_CLIENT_ID,
    clientSecret: env.GMAIL_CLIENT_SECRET,
    refreshToken: env.GMAIL_REFRESH_TOKEN,
  },
});

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
  total: number;
}

export async function sendOwnerNotification(booking: BookingData) {
  try {
    await transporter.sendMail({
      from: env.GMAIL_USER,
      to: env.OWNER_EMAIL,
      subject: `【新規予約】${booking.name} 様 — ${booking.date} ${booking.time}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9A96E;">新規ご予約が入りました</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>お名前</b></td><td style="padding: 8px;">${booking.name} 様</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>日時</b></td><td style="padding: 8px;">${booking.date} ${booking.time}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>合計</b></td><td style="padding: 8px;">¥${booking.total.toLocaleString()}</td></tr>
            <tr><td style="padding: 8px;"><b>Email</b></td><td style="padding: 8px;">${booking.email}</td></tr>
          </table>
        </div>
      `,
    });
    logger.info('Owner notification sent', { to: env.OWNER_EMAIL });
  } catch (err) {
    logger.error('Owner notification failed', { error: String(err) });
    throw err;
  }
}

export async function sendGuestConfirmation(booking: BookingData) {
  try {
    await transporter.sendMail({
      from: `"SALON SHIZUKA" <${env.GMAIL_USER}>`,
      to: booking.email,
      subject: `【ご予約確認】SALON SHIZUKA — ${booking.date}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9A96E;">ご予約ありがとうございます</h2>
          <p>${booking.name} 様</p>
          <p>以下の内容でご予約を承りました。</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>日時</b></td><td style="padding: 8px;">${booking.date} ${booking.time}</td></tr>
            <tr><td style="padding: 8px;"><b>合計（目安）</b></td><td style="padding: 8px;">¥${booking.total.toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 24px; color: #7A6E66; font-size: 14px;">24時間以内にご連絡いたします。<br>— SALON SHIZUKA</p>
        </div>
      `,
    });
    logger.info('Guest confirmation sent', { to: booking.email });
  } catch (err) {
    logger.error('Guest confirmation failed', { error: String(err) });
    throw err;
  }
}
```

### 8.9 `apps/api/src/services/line.service.ts`

```ts
import axios from 'axios';
import { env } from '../config/env';
import { logger } from './logger.service';

interface BookingData {
  name: string;
  date: string;
  time: string;
  total: number;
  email: string;
}

export async function pushLineMessage(booking: BookingData) {
  const text = [
    '📅 新規ご予約が入りました',
    `━━━━━━━━━━━━━━`,
    `お名前: ${booking.name} 様`,
    `日時: ${booking.date} ${booking.time}`,
    `合計: ¥${booking.total.toLocaleString()}`,
    `Email: ${booking.email}`,
    `━━━━━━━━━━━━━━`,
    `SALON SHIZUKA 予約システム`,
  ].join('\n');

  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to: env.LINE_OWNER_USER_ID,
        messages: [{ type: 'text', text }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
      }
    );
    logger.info('LINE notification sent');
  } catch (err) {
    logger.error('LINE notification failed', { error: String(err) });
    throw err;
  }
}
```

### 8.10 `apps/api/src/services/booking.service.ts`

```ts
import { prisma } from '../db/client';
import { sendOwnerNotification, sendGuestConfirmation } from './email.service';
import { pushLineMessage } from './line.service';
import { logger } from './logger.service';

interface ServiceItem {
  id: string;
  name: string;
  price: number;
}

interface BookingInput {
  name: string;
  email: string;
  date: string;
  time: string;
  services: ServiceItem[];
  addons: ServiceItem[];
}

export const bookingService = {
  async create(data: BookingInput) {
    // Always recalculate total server-side — never trust client value
    const total = [...data.services, ...data.addons]
      .reduce((sum, item) => sum + item.price, 0);

    const booking = await prisma.booking.create({
      data: {
        name:     data.name,
        email:    data.email,
        date:     data.date,
        time:     data.time,
        services: JSON.stringify(data.services),
        addons:   JSON.stringify(data.addons),
        total,
      },
    });

    logger.info('Booking saved', { id: booking.id, total });

    // Fire all notifications in parallel
    // allSettled: if LINE fails, emails still go out
    const results = await Promise.allSettled([
      sendOwnerNotification({ ...data, total }),
      sendGuestConfirmation({ ...data, total }),
      pushLineMessage({ ...data, total }),
    ]);

    results.forEach((result, i) => {
      const labels = ['ownerEmail', 'guestEmail', 'line'];
      if (result.status === 'rejected') {
        logger.error(`Notification failed: ${labels[i]}`, {
          reason: String(result.reason),
          bookingId: booking.id,
        });
      }
    });

    return booking;
  },
};
```

### 8.11 `apps/api/src/controllers/booking.controller.ts`

```ts
import type { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/booking.service';
import { logger } from '../services/logger.service';

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await bookingService.create(req.body);
    res.status(200).json({ success: true, id: booking.id });
  } catch (err) {
    logger.error('createBooking controller error', { error: String(err) });
    next(err);
  }
};
```

### 8.12 `apps/api/src/controllers/newsletter.controller.ts`

```ts
import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/client';
import { logger } from '../services/logger.service';

export const subscribeNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body as { email: string };

    await prisma.newsletter.upsert({
      where: { email },
      update: {},        // Already subscribed — no-op
      create: { email },
    });

    logger.info('Newsletter subscription', { email });
    res.status(200).json({ success: true });
  } catch (err) {
    logger.error('subscribeNewsletter error', { error: String(err) });
    next(err);
  }
};
```

### 8.13 `apps/api/src/middleware/validateBooking.ts`

```ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const serviceItemSchema = z.object({
  id:    z.string(),
  name:  z.string(),
  price: z.number().min(0),
});

const bookingSchema = z.object({
  name:     z.string().min(1, '名前は必須です').max(100),
  email:    z.string().email('有効なメールアドレスを入力してください'),
  date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付形式が正しくありません'),
  time:     z.string().regex(/^\d{2}:\d{2}$/, '時間形式が正しくありません'),
  services: z.array(serviceItemSchema).min(1, 'メニューを選択してください'),
  addons:   z.array(serviceItemSchema),
});

export const validateBooking = (req: Request, res: Response, next: NextFunction) => {
  const result = bookingSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      issues: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};

const newsletterSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
});

export const validateNewsletter = (req: Request, res: Response, next: NextFunction) => {
  const result = newsletterSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      issues: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};
```

### 8.14 `apps/api/src/middleware/rateLimiter.ts`

```ts
import rateLimit from 'express-rate-limit';

export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: '予約の送信が多すぎます。しばらくしてからもう一度お試しください。' },
});

export const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: '登録の試行が多すぎます。' },
});
```

### 8.15 `apps/api/src/middleware/errorHandler.ts`

```ts
import type { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.service';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error('Unhandled error', { message: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
};
```

### 8.16 `apps/api/src/routes/booking.routes.ts`

```ts
import { Router } from 'express';
import { createBooking } from '../controllers/booking.controller';
import { validateBooking } from '../middleware/validateBooking';
import { bookingLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', bookingLimiter, validateBooking, createBooking);

export default router;
```

### 8.17 `apps/api/src/routes/newsletter.routes.ts`

```ts
import { Router } from 'express';
import { subscribeNewsletter } from '../controllers/newsletter.controller';
import { validateNewsletter } from '../middleware/validateBooking';
import { newsletterLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', newsletterLimiter, validateNewsletter, subscribeNewsletter);

export default router;
```

### 8.18 `apps/api/src/app.ts`

```ts
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './services/logger.service';
import bookingRoutes from './routes/booking.routes';
import newsletterRoutes from './routes/newsletter.routes';

const app = express();

// ─── Middleware ───────────────────────────────────────
app.use(cors({
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '10kb' })); // Limit payload size

// ─── Health check ────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────
app.use('/api/booking',    bookingRoutes);
app.use('/api/newsletter', newsletterRoutes);

// ─── Global error handler (must be last) ─────────────
app.use(errorHandler);

// ─── Start ───────────────────────────────────────────
app.listen(Number(env.PORT), () => {
  logger.info(`API running on http://localhost:${env.PORT}`);
});

export default app;
```

---

## Step 9 — Environment Files (Backend)

```bash
# apps/api/
touch .env.local .env.example
```

`apps/api/.env.example`:
```bash
# Copy to .env.local and fill in real values
# NEVER commit .env.local

PORT=4000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=file:./dev.db

# Gmail OAuth2 — get from Google Cloud Console
GMAIL_USER=your@gmail.com
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=
OWNER_EMAIL=owner@example.com

# LINE Messaging API — get from LINE Developers Console
LINE_CHANNEL_ACCESS_TOKEN=
LINE_OWNER_USER_ID=

# Newsletter
NEWSLETTER_NOTIFY_EMAIL=owner@example.com
```

---

## Step 10 — Install and Run

```bash
# From salon-shizuka/ root

# Install all workspace dependencies
npm install

# ─── Backend first ───────────────────────────────────
cd apps/api

# Copy and fill in env file
cp .env.example .env.local
# Edit .env.local with your real credentials

# Generate Prisma client + create SQLite database
npx prisma generate
npx prisma db push

# Start backend
npm run dev
# → http://localhost:4000
# → GET http://localhost:4000/health should return { "status": "ok" }

# ─── Frontend (new terminal) ─────────────────────────
cd apps/web
npm run dev
# → http://localhost:5173
```

---

## Step 11 — Verify Everything Works

```bash
# Test the health endpoint
curl http://localhost:4000/health

# Test booking validation (should return 400)
curl -X POST http://localhost:4000/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name": "", "email": "bad"}'

# Expected response:
# { "error": "Validation failed", "issues": { "name": [...], "email": [...], ... } }

# Open frontend
open http://localhost:5173
# Should show: "SALON SHIZUKA — setup working ✓"
```

---

## Step 12 — Gmail OAuth2 Setup

You need this before email notifications work.

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable **Gmail API**
3. Create OAuth2 credentials → **Web application** type
4. Add `https://developers.google.com/oauthplayground` as an authorized redirect URI
5. Go to [OAuth Playground](https://developers.google.com/oauthplayground)
6. Click gear icon → check "Use your own OAuth credentials" → paste your Client ID and Secret
7. In Step 1, find and authorize: `https://mail.google.com/`
8. In Step 2, click "Exchange authorization code for tokens"
9. Copy the **Refresh Token** → paste into `.env.local` as `GMAIL_REFRESH_TOKEN`
10. Copy Client ID and Client Secret → paste into `.env.local`

---

## Step 13 — LINE Messaging API Setup

1. Go to [LINE Developers Console](https://developers.line.biz)
2. Create a provider → Create a **Messaging API** channel
3. Under "Messaging API" tab → scroll to **Channel access token** → Issue a token → copy to `LINE_CHANNEL_ACCESS_TOKEN`
4. The owner must add the bot as a LINE friend via the QR code on the same page
5. To get the owner's `LINE_OWNER_USER_ID`:
   - In the channel settings, enable webhook
   - Add this temporary route to your Express app:
   ```ts
   app.post('/webhook', express.json(), (req, res) => {
     console.log(JSON.stringify(req.body, null, 2));
     res.status(200).send('OK');
   });
   ```
   - Use [ngrok](https://ngrok.com) to expose your local server: `ngrok http 4000`
   - Set the webhook URL in LINE console to `https://your-ngrok-url.ngrok-free.app/webhook`
   - Have the owner send any message to the bot
   - The `userId` field in the logged JSON is the `LINE_OWNER_USER_ID` (starts with `U`)
   - Paste it into `.env.local`, remove the temp route

---

## Project File Summary

After completing all steps, your structure should be:

```
salon-shizuka/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── store.ts
│   │   │   │   └── store/slices/uiSlice.ts
│   │   │   ├── components/
│   │   │   │   └── templates/MainLayout/MainLayout.tsx
│   │   │   ├── features/
│   │   │   │   └── booking/store/bookingSlice.ts
│   │   │   ├── services/
│   │   │   │   ├── api.ts
│   │   │   │   ├── bookingService.ts
│   │   │   │   └── newsletterService.ts
│   │   │   ├── styles/
│   │   │   │   ├── abstracts/_variables.scss
│   │   │   │   ├── abstracts/_mixins.scss
│   │   │   │   ├── abstracts/_functions.scss
│   │   │   │   ├── base/_reset.scss
│   │   │   │   ├── base/_typography.scss
│   │   │   │   ├── base/_globals.scss
│   │   │   │   ├── base/_animations.scss
│   │   │   │   ├── layout/_grid.scss
│   │   │   │   ├── layout/_header.scss
│   │   │   │   ├── components/_button.scss
│   │   │   │   ├── pages/_home.scss
│   │   │   │   └── main.scss
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   ├── .env.development
│   │   └── .env.production
│   │
│   └── api/
│       ├── src/
│       │   ├── config/env.ts
│       │   ├── controllers/
│       │   │   ├── booking.controller.ts
│       │   │   └── newsletter.controller.ts
│       │   ├── db/
│       │   │   ├── client.ts
│       │   │   └── schema.prisma
│       │   ├── middleware/
│       │   │   ├── errorHandler.ts
│       │   │   ├── rateLimiter.ts
│       │   │   └── validateBooking.ts
│       │   ├── routes/
│       │   │   ├── booking.routes.ts
│       │   │   └── newsletter.routes.ts
│       │   ├── services/
│       │   │   ├── booking.service.ts
│       │   │   ├── email.service.ts
│       │   │   ├── line.service.ts
│       │   │   └── logger.service.ts
│       │   └── app.ts
│       ├── tsconfig.json
│       ├── package.json
│       ├── .env.local       ← your real secrets (gitignored)
│       └── .env.example     ← committed, no real values
│
├── package.json
├── .gitignore
└── README.md
```

---

## Quick Reference

```bash
# Start both servers (two terminals)
cd apps/web && npm run dev      # → localhost:5173
cd apps/api && npm run dev      # → localhost:4000

# Type check everything
npm run type-check              # from root

# Prisma — view database in browser
cd apps/api && npm run db:studio

# After changing schema.prisma
npx prisma db push
npx prisma generate
```
