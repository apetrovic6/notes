import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class PasswordService {
  hashPassword(password: string) {
    return hash(password, {
      hashLength: 40,
      timeCost: 5,
    });
  }

  verifyPassword(hash: string, password: string) {
    return verify(hash, password);
  }
}
