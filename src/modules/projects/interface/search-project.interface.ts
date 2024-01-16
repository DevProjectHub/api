import { Project, JobVacancy } from '@prisma/client';

export type ISearchProject = (Project & { jobVacancies: JobVacancy[] })[];
