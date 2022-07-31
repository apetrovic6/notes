import { hash, verify } from 'argon2';

export const PasswordService = {
  hashPassword: (password: string) =>
    hash(password, {
      hashLength: 40,
      timeCost: 5,
    }),
  verifyPassword: (hash, password) => verify(hash, password),
};
