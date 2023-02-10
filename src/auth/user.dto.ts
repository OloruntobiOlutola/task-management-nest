import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserAuth {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export interface Payload {
  username: string;
}
