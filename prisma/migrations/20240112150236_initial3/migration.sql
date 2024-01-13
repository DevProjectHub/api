/*
  Warnings:

  - Made the column `role` on table `ProjectProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `founder` on table `ProjectProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProjectProfile" ADD COLUMN     "description" TEXT,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "founder" SET NOT NULL,
ALTER COLUMN "founder" SET DEFAULT false;
