import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from '@notes/entities/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'signup' })
  signup(
    @Args('getAuthArgs', { type: () => CreateUserInput })
    userArgs: CreateUserInput
  ): Observable<User> {
    return this.authService.signup(userArgs);
  }

  @Mutation(() => User, { name: 'login' })
  signin(
    @Args('authArgs', { type: () => CreateUserInput }) authArgs: CreateUserInput
  ): Observable<User> {
    return this.authService.signin(authArgs);
  }
}
