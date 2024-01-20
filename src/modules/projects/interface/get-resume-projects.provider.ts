export interface IGetResumeJobs {
  id: string;
  description: string;
  role: string;
  projectId: string;
  requirements: Requirement[];
}

interface Requirement {
  id: string;
  require: string;
  jobVacancyId: string;
}