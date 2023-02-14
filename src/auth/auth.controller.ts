import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuth } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-up')
  async signUp(@Body(ValidationPipe) userAuth: UserAuth) {
    const user = await this.authService.signUp(userAuth);
    return {
      ...user,
      id: 1,
    };
  }

  @Post('sign-in')
  async signIn(@Body(ValidationPipe) userAuth: UserAuth) {
    const user = await this.authService.signIn(userAuth);
    return user;
  }

  @Get()
  async findAllUsers() {
    const users = await this.authService.findAllUsers();
    return {
      ...users,
      status: 'success',
    };
  }
}
