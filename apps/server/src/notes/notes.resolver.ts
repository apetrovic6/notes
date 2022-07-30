import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CreateNoteInput, Note, UpdateNoteInput } from '@notes/entities/notes';
import { JwtAuthGuard } from '@notes/auth-helpers';
import { EDataLoader, UserLoader } from '../data-loader/IDataLoaders';
import { NotesService } from './notes.service';
import { Loader } from '../data-loader/decorators/loader.decorator';
import { User } from '../user/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
    @User() user: { userId: string }
  ) {
    return this.notesService.create(createNoteInput, user.userId);
  }

  @Query(() => [Note], { name: 'notes' })
  findAll(@User() user: { userId: string }) {
    return this.notesService.findAll(user.userId);
  }

  @Query(() => Note, { name: 'note' })
  findOne(
    @User() user: { userId: string },
    @Args('id', { type: () => ID }) id: string
  ) {
    return this.notesService.findOne(id, user.userId);
  }

  @Mutation(() => Note)
  updateNote(
    @User() user: { userId: string },
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput
  ) {
    return this.notesService.update(
      updateNoteInput.id,
      updateNoteInput,
      user.userId
    );
  }

  @Mutation(() => Note)
  removeNote(@Args('id', { type: () => ID }) id: string) {
    return this.notesService.remove(id);
  }

  @ResolveField('user', () => User)
  async user(
    @Parent() note: Note,
    @Loader(EDataLoader.user) loader: UserLoader
  ) {
    return loader.load(note.userId);
  }
}
