import { fn } from 'jest-mock';
import { from } from 'rxjs';

export const JwtUtilsService = fn().mockReturnValue({
  sign: fn().mockReturnValue(from('tokenString')),
  verify: fn().mockReturnValue(from('userId')),
  decode: fn().mockReturnValue(from('userId')),
});
