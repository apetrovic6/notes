import { fn } from 'jest-mock';
import { of } from 'rxjs';
import { userStub } from '../../user/tests/stubs/user.stub';

export const AuthService = fn().mockReturnValue({
  signup: fn().mockReturnValue(of(userStub())),
  signin: fn().mockReturnValue(of(userStub())),
  validateUser: fn().mockReturnValue(of(userStub())),
});
