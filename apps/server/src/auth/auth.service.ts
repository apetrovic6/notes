import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@notes/entities/user';
import { from, map, switchMap } from 'rxjs';
import { PasswordService } from '@notes/auth-helpers';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService
  ) {}

  signup(userArgs: CreateUserInput) {
    return from(this.passwordService.hashPassword(userArgs.password)).pipe(
      map(hash => (userArgs.password = hash)),
      switchMap(() => this.userService.create(userArgs))
    );
  }

  signin(authArgs: CreateUserInput) {
    return from(this.userService.findByEmail(authArgs.email)).pipe(
      switchMap(user =>
        this.passwordService.verifyPassword(user.password, authArgs.password)
      )
    );
  }

  validateUser() {
    return;
  }
}
