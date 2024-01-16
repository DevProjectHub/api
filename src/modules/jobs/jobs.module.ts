import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { AcceptCandidateProvider } from './provider/accept-candidate.provider';
import { GetSpecificSubscriptionProvider } from './provider/get-specific-subscription.provider';
import { GetSubscriptionsProvider } from './provider/get-subscriptions.provider';
import { NewJobVacancyProvider } from './provider/new-vacancy.provider';
import { RefuseCandidateProvider } from './provider/refuse-candidate.provider';
import { PrismaModule } from 'prisma/prisma.module';
import { SubscribeJobProvider } from './provider/subscribe-job.provider';

@Module({
  imports: [PrismaModule],
  controllers: [JobController],
  providers: [
    NewJobVacancyProvider,
    GetSubscriptionsProvider,
    GetSpecificSubscriptionProvider,
    AcceptCandidateProvider,
    RefuseCandidateProvider,
    SubscribeJobProvider
  ],
})
export class JobsModule {}
