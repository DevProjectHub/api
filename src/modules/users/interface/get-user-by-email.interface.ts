import { User } from '@prisma/client';

export type IGetUserByEmail = User & { profile: { id: string } };
