import { JobVacancy, Profile, Project, ProjectProfile } from '@prisma/client';

export type IGetProject = Project & {
  owner: Profile;
  jobVacancies: JobVacancy[];
  members: (ProjectProfile & { profile: Profile })[];
};
