import { fn } from 'jest-mock';
import { of } from 'rxjs';

export const JwtUtilsService = fn().mockReturnValue({
  sign: fn().mockReturnValue(of({ token: 'tokenString' })),
  verify: fn().mockReturnValue(of({ sub: 'userId' })),
  decode: fn().mockReturnValue(of({ sub: 'userId' })),
});
