# Deploy **Chat‑Shizuka** to Netlify – Step‑by‑Step Guide

This document walks you through getting the `@salon-shizuka/web` Vite app live on Netlify.

---
## Prerequisites
- **Git** (>= 2.30) – to push the code to a remote repository.
- **Node.js** (>= 18) – the same version you use locally.
- **Netlify account** – free tier is sufficient.
- (Optional) **Netlify CLI** – `npm i -g netlify-cli` for local preview and manual deploys.

---
## 1. Make sure the repo is clean and pushed
```bash
# From the project root
cd /Users/tk.code/Downloads/chat-shizuka

git status                 # should show a clean working tree

git add -A
git commit -m "Prepare Netlify deployment"
git push origin main       # or your chosen branch
```
If the repo does not yet exist on a Git‑host:
```bash
git remote add origin git@github.com:<YOUR_USER>/chat-shizuka.git
git push -u origin main
```
---
## 2. Verify the Netlify configuration
A `netlify.toml` file already lives at the repository root:
```toml
[build]
  command = "cd web-src/web && npm ci && npm run build"
  publish = "web-src/web/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
- **`command`** – changes into the Vite project, installs exact dependencies (`npm ci` reads `package‑lock.json`), then runs `vite build`.
- **`publish`** – tells Netlify that the static assets are under `web-src/web/dist`.
- **Redirect** – SPA fallback so deep links resolve to `index.html`.

If you need environment variables (e.g. `VITE_API_URL`), add them later in Netlify UI (see step 5).
---
## 3. Create the Netlify site (Web UI)
1. Log in to <https://app.netlify.com>.
2. Click **“New site from Git”.**
3. Choose your Git provider (GitHub/GitLab/Bitbucket) and authorize Netlify.
4. Select the `chat-shizuka` repository.
5. Choose the branch you just pushed (usually `main`).
6. Netlify automatically reads `netlify.toml`; you should see:
   - Build command: `cd web-src/web && npm ci && npm run build`
   - Publish directory: `web-src/web/dist`
7. Click **“Deploy site”.**
Netlify will clone the repo, run the build, and give you a temporary URL like `https://awesome‑shizuka‑12345.netlify.app`.
---
## 4. (Optional) Add environment variables
If your code references `import.meta.env.VITE_…` values:
1. In the site dashboard, go to **Site settings → Build & deploy → Environment → Environment variables**.
2. Click **“Add variable”**, enter the key exactly as used (`VITE_API_URL`, etc.) and its value.
3. Save – the next deploy will have these values injected.
---
## 5. Verify the deployment
- Open the Netlify URL in a browser.
- Click through a few pages and test navigation directly to nested routes (e.g. `…/reservation`).
- Open DevTools → Network and ensure all assets load from the `dist/` folder (no 404s).
- If you see a 404 on refresh of a deep link, double‑check the `[[redirects]]` rule in `netlify.toml`.
---
## 6. (Optional) Use the Netlify CLI for local preview / manual deploys
```bash
# Install once
npm i -g netlify-cli

# Log in (opens a browser window)
netlify login

# Link the local repo to the Netlify site you created
netlify link   # choose “Existing site” → pick your site

# Run a production‑style build locally
netlify build   # uses the same command from netlify.toml

# Serve the built output locally (http://localhost:8888)
netlify dev
```
To trigger a manual production deploy:
```bash
netlify deploy --prod
```
---
## 7. Deploying future changes
1. Make your code change.
2. `git add . && git commit -m "Your message"`
3. `git push origin main`
Netlify automatically detects the push, runs the build, and updates the live site.
---
## 8. Quick checklist (copy‑paste into your own notes)
```
[ ] 1️⃣  Verify Node & Git are installed.
[ ] 2️⃣  Commit & push all changes to the remote branch.
[ ] 3️⃣  Confirm `netlify.toml` exists at repo root.
[ ] 4️⃣  Create Netlify site → New site from Git → select repo/branch.
[ ] 5️⃣  (Optional) Add any VITE_ env vars in Site Settings → Build & Deploy → Environment.
[ ] 6️⃣  Wait for build → test live URL.
[ ] 7️⃣  (Optional) Use Netlify CLI for local preview or manual deploy.
[ ] 8️⃣  For future work: commit → push → Netlify auto‑rebuilds.
```
---
## 9. Clean‑up notes
- The project already builds locally with `npm run build` (see previous logs). No further TypeScript tweaks are required.
- If you ever need to change the build command (e.g., add `npm run lint` first), edit the `command` field in `netlify.toml`.

You’re now ready to keep iterating on **Chat‑Shizuka** and have every change automatically published by Netlify! 🎉