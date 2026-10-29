import type { VercelRequest, VercelResponse } from "@vercel/node";
import { profile } from "../server/src/profile";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).json(profile);
}
