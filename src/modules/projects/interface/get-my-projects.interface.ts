import { Profile, Project } from "@prisma/client";

export type IGetMyProjects = (Project & { owner: Profile })[]