import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@notes-app/entities';
import { from, of } from 'rxjs';
import { userStub } from '../user/tests/stubs/user.stub';

@Injectable()
export class AuthService {
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
