import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from '@notes/entities/user';
import { AuthService } from './auth.service';
import { AuthOutput } from '@notes/entities/user';
import { Request } from 'express';
import { User as UserD } from '../user/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@notes/auth-helpers';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput, { name: 'signup' })
  signup(
    @Context('req') req: Request,
    @Args('getAuthArgs', { type: () => CreateUserInput })
    userArgs: CreateUserInput
  ) {
    return this.authService.signup(userArgs, req);
  }

  @Mutation(() => AuthOutput, { name: 'login' })
  signin(
    @Context('req') req: Request,
    @Args('authArgs', { type: () => CreateUserInput }) authArgs: CreateUserInput
  ) {
    return this.authService.signin(authArgs, req);
  }

  @Mutation(() => AuthOutput!, { name: 'logout' })
  async logout(
    @Context('req')
    req: Request,
    @UserD() user: { userId: string }
  ) {
    this.authService.logout(req);
    return { token: 'Signed out' };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  me(@UserD() user: { userId: string }) {
    return this.authService.me(user.userId);
  }
}
