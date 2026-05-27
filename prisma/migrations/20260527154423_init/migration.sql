-- CreateTable
CREATE TABLE "Mission" (
    "id" SERIAL NOT NULL,
    "missionName" TEXT NOT NULL,
    "rocket" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);
