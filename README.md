# Anh Vo – Portfolio

React + Vite + Tailwind CSS (client) and Express + TypeScript (server).

    npm install
    npm run dev      # web on http://localhost:5173, API on http://localhost:4000

The portfolio is a single page with anchored navigation. Edit the resume content and blog entries in
`server/src/profile.ts`; the page reads them from `/api/profile`.

Add Anh's portrait at `client/public/profile.jpg` (or change `profilePhoto` in the profile data to another
path). Blog posts are shown in the Life & notes section. Add photos under `client/public/blog/` and add
entries to `blogPosts` with a title, date, caption, image path, and optional category.

## Deploy on Vercel

Import the repo at vercel.com/new (leave Root Directory as the repo root). `vercel.json` sets the build,
and the `api/` folder becomes the serverless API. No environment variables are needed.
