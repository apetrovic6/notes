import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from '@notes/entities/user';
import { AuthService } from './auth.service';
import { AuthOutput } from '@notes/entities/user';
import { Request } from 'express';

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
}
