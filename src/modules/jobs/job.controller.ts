import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { NewJobVacancyDto } from './dto/new-job-vacancy.dto';
import { SignedRequest } from '../auth/interface/signed-request.interface';
import { SubscribeJobDto } from './dto/subscribe-job.dto';
import { AcceptCandidateProvider } from './provider/accept-candidate.provider';
import { GetSpecificSubscriptionProvider } from './provider/get-specific-subscription.provider';
import { GetSubscriptionsProvider } from './provider/get-subscriptions.provider';
import { NewJobVacancyProvider } from './provider/new-vacancy.provider';
import { RefuseCandidateProvider } from './provider/refuse-candidate.provider';
import { SubscribeJobProvider } from './provider/subscribe-job.provider';
import { Public } from 'src/shared/decorators/public.decorator';
import { GetJobsResumeProvider } from './provider/get-resume-jobs.provider';
import { IGetResumeJobs } from '../projects/interface/get-resume-projects.provider';

@Controller('jobs')
export class JobController {
  constructor(
    private newJobVacancyProvider: NewJobVacancyProvider,
    private getSubscriptionsProvider: GetSubscriptionsProvider,
    private getSpecificSubscriptionProvider: GetSpecificSubscriptionProvider,
    private acceptCandidateProvider: AcceptCandidateProvider,
    private refuseCandidateProvider: RefuseCandidateProvider,
    private subscribeJobProvider: SubscribeJobProvider,
    private getProjectsResumeProvider: GetJobsResumeProvider,
  ) {}

  @Get('projectId/:projectId/subscriptions')
  async getSubscriptionsFromAProject(@Param('projectId') projectId: string) {
    return await this.getSubscriptionsProvider.perform(projectId);
  }

  @Get('subscriptions/:jobSubscriptionId')
  async getSpecificSubscription(
    @Param('jobSubscriptionId') jobSubscriptionId: string,
  ) {
    return await this.getSpecificSubscriptionProvider.perform(
      jobSubscriptionId,
    );
  }

  @Public()
  @Get('resume')
  async getProjectsResume(): Promise<IGetResumeJobs[]> {
    return await this.getProjectsResumeProvider.perform();
  }

  @Post('new')
  async newVacancy(@Body() data: NewJobVacancyDto) {
    return await this.newJobVacancyProvider.perform(data);
  }

  @Patch('subscriptions/:jobSubscriptionId/accept')
  async acceptCandidate(@Param('jobSubscriptionId') jobSubscriptionId: string) {
    return await this.acceptCandidateProvider.perform(jobSubscriptionId);
  }

  @Patch('subscriptions/:jobSubscriptionId/refuse')
  async refuseCandidate(@Param('jobSubscriptionId') jobSubscriptionId: string) {
    return await this.refuseCandidateProvider.perform(jobSubscriptionId);
  }

  @Patch('jobVacancyId/:jobVacancyId/subscribe')
  async subscribeToJob(
    @Param('jobVacancyId') jobVacancyId: string,
    @Req() req: SignedRequest,
    @Body() data: SubscribeJobDto[],
  ) {
    return await this.subscribeJobProvider.perform(
      jobVacancyId,
      req.user.profileId,
      data,
    );
  }
}
