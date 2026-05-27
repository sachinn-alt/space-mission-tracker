import { z } from "zod";

export const missionSchema = z.object({
  missionName: z.string().min(3),
  rocket: z.string().min(2),
  destination: z.string().min(2),
  launchDate: z.string(),
  status: z.enum([
    "Scheduled",
    "Launched",
    "Completed",
    "Cancelled"
  ])
});