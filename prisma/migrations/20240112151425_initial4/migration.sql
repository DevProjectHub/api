/*
  Warnings:

  - A unique constraint covering the columns `[projectId,profileId]` on the table `ProjectProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectProfile_projectId_profileId_key" ON "ProjectProfile"("projectId", "profileId");
