import prisma from "../utils/prisma";

export const createMission = async (data: any) => {
  const mission = await prisma.mission.create({
    data: {
      missionName: data.missionName,
      rocket: data.rocket,
      destination: data.destination,
      launchDate: new Date(data.launchDate),
      status: data.status
    }
  });

  return mission;
};

export const getAllMissions = async () => {
  const missions = await prisma.mission.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return missions;
};

export const getMissionById = async (id: number) => {
  const mission = await prisma.mission.findUnique({
    where: {
      id
    }
  });

  return mission;
};

export const updateMission = async (
  id: number,
  data: any
) => {

  const mission = await prisma.mission.update({
    where: {
      id
    },

    data: {
      missionName: data.missionName,
      rocket: data.rocket,
      destination: data.destination,
      launchDate: new Date(data.launchDate),
      status: data.status
    }
  });

  return mission;
};

export const deleteMission = async (id: number) => {

  const mission = await prisma.mission.delete({
    where: {
      id
    }
  });

  return mission;
};