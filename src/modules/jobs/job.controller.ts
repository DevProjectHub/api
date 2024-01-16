import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { NewJobVacancyDto } from './dto/new-job-vacancy.dto';
import { SignedRequest } from '../auth/interface/signed-request.interface';
import { SubscribeJobDto } from './dto/subscribe-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get('projectId/:projectId/subscriptions')
  async getSubscriptionsFromAProject(@Param('projectId') projectId: string) {
    return await this.jobService.getSubscriptions(projectId);
  }

  @Get('subscriptions/:jobSubscriptionId')
  async getSpecificSubscription(
    @Param('jobSubscriptionId') jobSubscriptionId: string,
  ) {
    return await this.jobService.getSpecificSubscription(jobSubscriptionId);
  }

  @Post('new')
  async openNewVacancy(@Body() data: NewJobVacancyDto) {
    return await this.jobService.newVacancy(data);
  }

  @Patch('subscriptions/:jobSubscriptionId/accept')
  async acceptCandidate(@Param('jobSubscriptionId') jobSubscriptionId: string) {
    return await this.jobService.acceptCandidate(jobSubscriptionId);
  }

  @Patch('subscriptions/:jobSubscriptionId/refuse')
  async refuseCandidate(@Param('jobSubscriptionId') jobSubscriptionId: string) {
    return await this.jobService.refuseCandidate(jobSubscriptionId);
  }

  @Patch('jobVacancyId/:jobVacancyId/subscribe')
  async subscribeToJob(
    @Param('jobVacancyId') jobVacancyId: string,
    @Req() req: SignedRequest,
    @Body() data: SubscribeJobDto[],
  ) {
    return await this.jobService.subscribeToJob(
      jobVacancyId,
      req.user.profileId,
      data,
    );
  }
}
