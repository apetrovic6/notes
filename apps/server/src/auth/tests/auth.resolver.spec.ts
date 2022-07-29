import { Test, TestingModule } from '@nestjs/testing';
import { fn, spyOn } from 'jest-mock';
import { AuthResolver } from '../auth.resolver';
import { AuthService } from '../auth.service';
import { userStub } from '../../user/tests/stubs/user.stub';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('../auth.service');

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolver, AuthService],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Signup', () => {
    let user: { token: string };

    beforeEach(done => {
      resolver
        .signup({ email: userStub().email, password: userStub().password })
        .subscribe(data => (user = data));

      done();
    });

    it('Should be defined', () => {
      expect(resolver.signup).toBeDefined();
    });

    it("Should call service's signup method with user's email and password", () => {
      const { email, password } = userStub();
      expect(service.signup).toHaveBeenCalledWith({
        email,
        password,
      });
    });

    it('Should return user', () => {
      expect(user).toEqual({ token: expect.any(String) });
    });
  });

  describe('Login', () => {
    let user;

    beforeEach(done => {
      resolver
        .signin({ email: userStub().email, password: userStub().password })
        .subscribe(data => (user = data));

      done();
    });

    it('Should be defined', () => {
      expect(resolver.signin).toBeDefined();
    });

    it("Should call service's login method with user's email and password", () => {
      const { email, password } = userStub();
      expect(service.signin).toHaveBeenCalledWith({
        email,
        password,
      });
    });

    it('Should return a token', () => {
      expect(user).toEqual({ token: expect.any(String) });
    });

    it('Should throw an error if user credentials are invalid', () => {
      spyOn(service, 'signin').mockImplementationOnce(() => {
        throw new UnauthorizedException('Invalid credentials');
      });

      expect(() =>
        resolver.signin({
          email: userStub().email,
          password: userStub().password,
        })
      ).toThrow(UnauthorizedException);
    });
  });
});
