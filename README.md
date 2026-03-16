# DSAI Organizational Structure

React app for viewing and editing the DSAI organizational chart. Standalone frontend (Vite + React); ready to connect to a backend later.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (e.g. http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deploy to Vercel

1. **Create a new repo on GitHub** (e.g. `dsai-org-chart-app` or `dsai-organizational-structure`).

2. **Push this folder as the repo root:**
   ```bash
   cd dsai-org-chart-app
   git init
   git add .
   git commit -m "Initial commit: DSAI Organizational Structure app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **In Vercel:** Import the new GitHub repo. Leave **Root Directory** blank (this project is the root). Vercel will detect Vite and use `npm run build` and `dist/`.

4. Deploy. The app will be available at your Vercel URL.

## Stack

- React 19 + Vite 8
- jspdf + html2canvas for PDF export
- Responsive layout, undo/redo, search, section PDFs

## Project layout

- `src/App.jsx` – Root layout, state, undo/redo, PDF export
- `src/components/` – AppHeader, ChartContainer, ChartSection, TreeNode, FormPanel
- `src/data/orgChartData.js` – Tree data
- `src/constants/colors.js` – Section colors
- `src/utils/treeUtils.js` – Tree helpers
- `vercel.json` – SPA rewrites for Vercel
