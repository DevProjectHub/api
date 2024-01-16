import { RequirementAnswer, Profile, JobVacancy } from "@prisma/client";

  export interface GetSpecificSubscriptionPerformResult {
    id: string;
    profileId: string;
    jobVacancyId: string;
    requirementAnswers: RequirementAnswer[];
    profile: Profile;
    jobVacancy: JobVacancy;
  }
