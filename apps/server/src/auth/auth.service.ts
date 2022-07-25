import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@notes-app/entities';
import { from, of } from 'rxjs';
import { userStub } from '../user/tests/stubs/user.stub';
import { PasswordService } from '@notes-app/auth-helpers';

@Injectable()
export class AuthService {
  constructor(private readonly passwordService: PasswordService) {}

  signup(userArgs: CreateUserInput) {
    return from(of(userStub()));
  }

  signin() {
    return;
  }

  validateUser() {
    return;
  }
}
