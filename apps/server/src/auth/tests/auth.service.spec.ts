import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PasswordService } from '@notes/auth-helpers';
import { userStub } from '../../user/tests/stubs/user.stub';

jest.mock('../auth.service');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PasswordService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When signup is called', () => {
    let user;

    beforeEach(() => {
      const userArgs = {
        email: userStub().email,
        password: userStub().password,
      };

      service.signup(userArgs).subscribe(data => (user = data));
    });

    it('It should be defined', () => {
      expect(service.signup).toBeDefined();
    });

    it("It should call service's signup method with user's email and password", () => {
      const { email, password } = userStub();
      expect(service.signup).toHaveBeenCalledWith({
        email,
        password,
      });
    });

    it('It should return user', () => {
      expect(user).toEqual(userStub());
    });
  });
});
