# Anh Vo – Portfolio

React + Vite + Tailwind CSS (client) and Express + TypeScript (server).

    npm install
    npm run dev      # web on http://localhost:5173, API on http://localhost:4000

The portfolio is a single page with anchored navigation. Edit the resume content in
`server/src/profile.ts`; the page reads it from `/api/profile`.

The portrait is served from `client/public/profile-photo.jpg` (or change `profilePhoto` in the profile data to another
path).
The About section's View resume button opens `client/public/anh_vo_resume_103026.pdf` in a new tab.
School logos are served from `client/public/logos/` and configured in each school entry in `server/src/profile.ts`.
Award evidence images are stored under `client/public/certificates/` and configured on their matching awards in
`server/src/profile.ts`.
Volunteer proof photos are stored under `client/public/volunteer/` and configured on the volunteer role in
`server/src/profile.ts`.
Hobby photos are imported from `server/src/hobbies/cooking/` and `server/src/hobbies/crochet/` and bundled with the
client. Hobby descriptions are configured in the `hobbies` section of `server/src/profile.ts`.

## Deploy on Vercel

Import the repo at vercel.com/new (leave Root Directory as the repo root). `vercel.json` sets the build,
and the `api/` folder becomes the serverless API. No environment variables are needed.
