import { BadRequestException, Injectable } from '@nestjs/common';
import { from, map, merge, switchMap } from 'rxjs';
import { CreateUserInput } from '@notes/entities/user';
import { PasswordService } from '@notes/auth-helpers';
import { JwtUtilsService } from '@notes/auth-helpers';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly jwtService: JwtUtilsService
  ) {}

  signup(userArgs: CreateUserInput, req: Request) {
    return from(this.passwordService.hashPassword(userArgs.password)).pipe(
      map(hash => (userArgs.password = hash)),
      switchMap(() => this.userService.create(userArgs)),
      switchMap(user => this.jwtService.sign(user.id)),
      map(token => {
        req?.res?.cookie('Authorization', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });

        return { token: 'signed in' };
      })
    );
  }

  signin(authArgs: CreateUserInput, req: Request) {
    return from(this.userService.findByEmail(authArgs.email)).pipe(
      switchMap(user =>
        merge(
          this.passwordService.verifyPassword(user.password, authArgs.password)
        )
          .pipe(
            map(isValid => {
              if (!isValid) {
                throw new BadRequestException('Invalid credentials');
              }
              return user;
            })
          )
          .pipe(switchMap(user => this.jwtService.sign(user.id)))
          .pipe(
            map(token => {
              req.res?.cookie('Authorization', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
              });

              return { token: 'signed in' };
            })
          )
      )
    );
  }

  validateUser() {
    return;
  }

  me(userId: string) {
    return from(this.userService.findOne(userId)).pipe(
      map(user => {
        return {
          id: user.id,
          email: user.email,
        };
      })
    );
  }

  logout(req: Request) {
    req.res?.clearCookie('Authorization');
    return 'logged out';
  }
}
