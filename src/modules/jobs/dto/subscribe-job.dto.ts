import { RequirementAnswerEnum } from '@prisma/client';
import { ISubscribeJob } from '../interface/subscribe-job.interface';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SubscribeJobDto implements ISubscribeJob {
  @IsNotEmpty()
  @IsString()
  requirementId: string;

  @IsNotEmpty()
  @IsEnum(RequirementAnswerEnum)
  answer: RequirementAnswerEnum;
}
