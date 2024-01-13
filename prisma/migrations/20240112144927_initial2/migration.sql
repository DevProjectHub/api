/*
  Warnings:

  - The `founder` column on the `ProjectProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProjectProfile" DROP COLUMN "founder",
ADD COLUMN     "founder" BOOLEAN;
