import { fn } from 'jest-mock';

export const PasswordService = fn().mockReturnValue({
  hashPassword: fn().mockReturnValue(
    pass => new Promise(resolve => resolve('hashedPassword'))
  ),
  verifyPassword: fn().mockReturnValue(new Promise(resolve => resolve(true))),
});
