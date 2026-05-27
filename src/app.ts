import express from "express";
import cors from "cors";
import missionRoutes from "./routes/mission.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/missions", missionRoutes);

export default app;