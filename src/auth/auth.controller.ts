import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './get_user_decorator';
import { UserAuth } from './user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) userAuth: UserAuth) {
    const user = await this.authService.signUp(userAuth);
    return user;
  }

  @Post('sign-in')
  async signIn(@Body(ValidationPipe) userAuth: UserAuth) {
    const user = await this.authService.signIn(userAuth);
    return user;
  }
}
