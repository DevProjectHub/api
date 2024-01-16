import { RequirementAnswerEnum } from "@prisma/client";

export interface ISubscribeJob {
  requirementId: string;
  answer: RequirementAnswerEnum;
}
