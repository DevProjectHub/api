-- DropForeignKey
ALTER TABLE "JobSubscription" DROP CONSTRAINT "JobSubscription_jobVacancyId_fkey";

-- DropForeignKey
ALTER TABLE "JobSubscription" DROP CONSTRAINT "JobSubscription_profileId_fkey";

-- DropForeignKey
ALTER TABLE "JobVacancy" DROP CONSTRAINT "JobVacancy_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectProfile" DROP CONSTRAINT "ProjectProfile_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectProfile" DROP CONSTRAINT "ProjectProfile_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_jobVacancyId_fkey";

-- DropForeignKey
ALTER TABLE "RequirementAnswer" DROP CONSTRAINT "RequirementAnswer_jobSubscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "RequirementAnswer" DROP CONSTRAINT "RequirementAnswer_requirementId_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProfile" ADD CONSTRAINT "ProjectProfile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectProfile" ADD CONSTRAINT "ProjectProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobVacancy" ADD CONSTRAINT "JobVacancy_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_jobVacancyId_fkey" FOREIGN KEY ("jobVacancyId") REFERENCES "JobVacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSubscription" ADD CONSTRAINT "JobSubscription_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSubscription" ADD CONSTRAINT "JobSubscription_jobVacancyId_fkey" FOREIGN KEY ("jobVacancyId") REFERENCES "JobVacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequirementAnswer" ADD CONSTRAINT "RequirementAnswer_jobSubscriptionId_fkey" FOREIGN KEY ("jobSubscriptionId") REFERENCES "JobSubscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequirementAnswer" ADD CONSTRAINT "RequirementAnswer_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
