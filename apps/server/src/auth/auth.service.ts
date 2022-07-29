import { Injectable } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { CreateUserInput } from '@notes/entities/user';
import { PasswordService } from '@notes/auth-helpers';
import { JwtUtilsService } from '@notes/auth-helpers';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly jwtService: JwtUtilsService
  ) {}

  signup(userArgs: CreateUserInput) {
    return from(this.passwordService.hashPassword(userArgs.password)).pipe(
      map(hash => (userArgs.password = hash)),
      switchMap(() => this.userService.create(userArgs)),
      switchMap(user => this.jwtService.sign(user.id)),
      map(token => ({ token }))
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
