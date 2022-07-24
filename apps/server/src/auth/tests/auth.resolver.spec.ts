import { User } from '@notes-app/entities';

import { AuthResolver } from '../auth.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { userStub } from '../../user/tests/stubs/user.stub';

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
    let user: User;

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
      expect(user).toEqual(userStub());
    });
  });
});
