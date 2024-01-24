export interface IGetResumeJobs {
  id: string;
  description: string;
  role: string;
  projectId: string;
  requirements: Requirement[];
  createdAt: Date;
}

interface Requirement {
  id: string;
  require: string;
  jobVacancyId: string;
}
