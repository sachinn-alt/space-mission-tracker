import { Request, Response } from "express";
import { missionSchema } from "../validations/mission.validation";
import {
  createMission,
  getAllMissions,
  getMissionById,
  updateMission,
  deleteMission
} from "../services/mission.service";

export const createMissionController = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = missionSchema.parse(req.body);

    const mission = await createMission(validatedData);

    res.status(201).json({
      success: true,
      data: mission
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllMissionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const missions = await getAllMissions();

    res.status(200).json({
      success: true,
      count: missions.length,
      data: missions
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMissionByIdController = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    const mission = await getMissionById(id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: "Mission not found"
      });
    }

    res.status(200).json({
      success: true,
      data: mission
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const updateMissionController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const validatedData = missionSchema.parse(req.body);

    const mission = await updateMission(id, validatedData);

    res.status(200).json({
      success: true,
      data: mission
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

export const deleteMissionController = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const mission = await deleteMission(id);

    res.status(200).json({
      success: true,
      message: "Mission deleted successfully",
      data: mission
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};