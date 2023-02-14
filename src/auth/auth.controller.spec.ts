import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signUp: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    signIn: jest.fn((dto) => {
      const { username, password } = dto;
      if (username === 'bayo' && password === 'password') {
        return {
          id: 1,
          username,
        };
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const userAuth = {
      username: 'kenaa@example.com',
      password: '123456',
    };

    const result = await controller.signUp(userAuth);

    expect(result).toEqual({
      id: 1,
      username: 'kenaa@example.com',
      password: '123456',
    });
  });

  it('should sign in a user with username and password', async () => {
    const userAuth = {
      username: 'bayo',
      password: 'password',
    };

    const result = await controller.signIn(userAuth);

    expect(result).toEqual({
      id: 1,
      username: 'bayo',
    });
  });
});
