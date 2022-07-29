import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from '@notes/entities/user';
import { AuthService } from './auth.service';
import { AuthOutput } from '@notes/entities/user';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput, { name: 'signup' })
  signup(
    @Args('getAuthArgs', { type: () => CreateUserInput })
    userArgs: CreateUserInput
  ) {
    return this.authService.signup(userArgs);
  }

  @Mutation(() => User, { name: 'login' })
  signin(
    @Args('authArgs', { type: () => CreateUserInput }) authArgs: CreateUserInput
  ) {
    return this.authService.signin(authArgs);
  }
}
