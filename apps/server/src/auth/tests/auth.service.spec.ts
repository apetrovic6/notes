import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtUtilsService, PasswordService } from '@notes/auth-helpers';
import { userStub } from '../../user/tests/stubs/user.stub';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Request } from 'express';

jest.mock('../auth.service');
jest.mock('../../user/user.service');
jest.mock('@notes/auth-helpers');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PasswordService, UserService, JwtUtilsService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When signup is called', () => {
    let user;
    const req = {} as Request;

    beforeEach(() => {
      const userArgs = {
        email: userStub.email,
        password: userStub.password,
      };

      service.signup(userArgs, req as Request).subscribe(data => (user = data));
    });

    it('It should be defined', () => {
      expect(service.signup).toBeDefined();
    });

    it("It should call service's signup method with user's email and password", () => {
      const { email, password } = userStub;
      expect(service.signup).toHaveBeenCalledWith({ email, password }, req);
    });

    it('It should return a token', () => {
      expect(user).toEqual({ token: expect.any(String) });
    });
  });

  describe('When signin is called', () => {
    let user;
    const req = {} as Request;
    beforeEach(() => {
      const authArgs = {
        email: userStub.email,
        password: userStub.password,
      };

      service.signin(authArgs, req).subscribe(data => (user = data));
    });

    it('It should be defined', () => {
      expect(service.signin).toBeDefined();
    });

    it("It should call service's signin method with user's email and password", () => {
      const { email, password } = userStub;
      expect(service.signin).toHaveBeenCalledWith({ email, password }, req);
    });

    it('It should return a token', () => {
      expect(user).toEqual({ token: expect.any(String) });
    });

    it("It should throw an error if user's credentials are invalid", () => {
      jest.spyOn(service, 'signin').mockImplementationOnce(() => {
        throw new UnauthorizedException('Invalid credentials');
      });

      expect(() =>
        service.signin(
          { email: userStub.email, password: 'invalidPassword' },
          req
        )
      ).toThrowError(UnauthorizedException);
    });
  });
});
