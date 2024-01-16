import {
  JobSubscription,
  Profile,
  Requirement,
  RequirementAnswer,
} from '@prisma/client';

  export interface IGetSubscriptionsPerformResult {
    id: string;
    description: string;
    projectId: string;
    role: string;
    requirements: Requirement[];
    jobSubscriptions: (JobSubscription & {
      profile: Profile;
      requirementAnswers: RequirementAnswer[];
    })[];
  }
