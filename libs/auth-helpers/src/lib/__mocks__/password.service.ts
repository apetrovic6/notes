import { hash, verify } from 'argon2';

export const PasswordService = fn().mockReturnValue({
  hashPassword: fn().mockReturnValue(of('hashString')),
  verifyPassword: fn().mockReturnValue(true),
});
