import { Router } from "express";

import {
  createMissionController,
  getAllMissionsController,
  getMissionByIdController,
  updateMissionController,
  deleteMissionController
} from "../controllers/mission.controller";

const router = Router();

router.get("/", getAllMissionsController);

router.get("/:id", getMissionByIdController);

router.put("/:id", updateMissionController);

router.delete("/:id", deleteMissionController);

router.post("/", createMissionController);

export default router;