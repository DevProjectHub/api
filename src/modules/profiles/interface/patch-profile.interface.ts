import { ICreateProfile } from './create-profile.interface';

export interface IPatchProfile extends Partial<ICreateProfile> {}
