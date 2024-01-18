import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtSignature } from './jwt-signature.interface';
import { JwtAuthPayload } from './jwt-auth-payload.interface';
import { JwtMailPayload } from './jwt-mail-payload.interface';
import { JwtForgetPasswordPayload } from './jwt-forget-password-payload.interface';

export namespace JwtStrategiesImplementation {
  export type Configure = JwtSignOptions | JwtVerifyOptions;
  export type Payload =
    | JwtMailPayload
    | JwtAuthPayload
    | JwtForgetPasswordPayload;

  type IConfigureStrategy<T> = {
    sign: (payload: T) => Promise<JwtSignature>;
    verify: (token: string) => Promise<T>;
  };

  export interface Interface {
    auth: IConfigureStrategy<JwtAuthPayload>;
    mail: IConfigureStrategy<JwtMailPayload>;
    forgetPassword: IConfigureStrategy<JwtForgetPasswordPayload>;
  }
}
