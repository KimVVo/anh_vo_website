import express from "express";
import cors from "cors";
import { profile } from "./profile";

const app = express();
app.use(cors());

app.get("/api/profile", (_req, res) => {
  res.json(profile);
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
