import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(userAuth: UserAuth) {
    const { username, password } = userAuth;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(salt, password);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      const user = await newUser.save();
      return this.generateAndSendToken(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(userAuth: UserAuth) {
    const { username, password } = userAuth;
    const user = await this.userRepository.findOneBy({ username });
    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return this.generateAndSendToken(user);
  }
  private async generateAndSendToken(user) {
    const payload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
  private async hashPassword(salt: string, password: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
