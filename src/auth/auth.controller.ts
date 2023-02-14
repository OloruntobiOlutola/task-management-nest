import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuth } from './user.dto';

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
