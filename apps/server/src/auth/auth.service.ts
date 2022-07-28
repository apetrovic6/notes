import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@notes/entities/user';
import { from, map, switchMap } from 'rxjs';
import { PasswordService } from '@notes/auth-helpers';

@Injectable()
export class AuthService {
  constructor(private readonly passwordService: PasswordService) {}

  signup(userArgs: CreateUserInput) {
    return from(of(userStub()));
  }

  signin(authArgs: CreateUserInput) {
    return from(of(userStub()));
  }

  validateUser() {
    return;
  }
}
