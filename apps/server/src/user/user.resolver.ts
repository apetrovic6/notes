import {Resolver, Query, Mutation, Args, ID, ResolveField, Parent} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, Note, UpdateUserInput, User } from "@notes-app/entities";
import { NotesUserFieldResolverService } from "../notes-user-field-resolver/notes-user-field-resolver.service";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly notesUserFieldResolverService: NotesUserFieldResolverService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }

  @ResolveField('notes', () => [Note])
  notes(@Parent() user: User) {
    return this.notesUserFieldResolverService.resolveNotes(user.id );
  }
}
