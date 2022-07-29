import { fn } from 'jest-mock';
import { of } from 'rxjs';
import { userStub } from '../../user/tests/stubs/user.stub';

export const AuthService = fn().mockReturnValue({
  signup: fn().mockReturnValue(of({ token: 'tokenString' })),
  signin: fn().mockReturnValue(of({ token: 'tokenString' })),
  validateUser: fn().mockReturnValue(of(userStub)),
});
