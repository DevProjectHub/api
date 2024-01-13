import { IsNotEmpty, IsString } from 'class-validator';
import { IAddMember } from '../interface/add-member.interface';

export class AddMemberDto implements IAddMember {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
