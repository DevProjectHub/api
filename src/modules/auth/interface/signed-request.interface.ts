import { Request } from 'express';
import { JwtAuthPayload } from './jwt-auth-payload.interface';

export interface SignedRequest extends Request {
  user: JwtAuthPayload;
}
