import { fn } from 'jest-mock';
import { of } from 'rxjs';

export const PasswordService = fn().mockReturnValue({
  hashPassword: fn().mockReturnValue(of('hashString')),
  verifyPassword: fn().mockReturnValue(true),
});
