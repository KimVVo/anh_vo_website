# Anh Vo – Portfolio

React + Vite + Tailwind CSS (client) and Express + TypeScript (server).

    npm install
    npm run dev      # web on http://localhost:5173, API on http://localhost:4000

Edit your content in `server/src/profile.ts`. The page reads it from `/api/profile`.

## Deploy on Vercel

Import the repo at vercel.com/new (leave Root Directory as the repo root). `vercel.json` sets the build,
and the `api/` folder becomes the serverless API. No environment variables are needed.
