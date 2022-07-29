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
import { User } from '@notes/entities/user';
import { JwtAuthGuard } from '@notes/auth-helpers';
import { EDataLoader, UserLoader } from '../data-loader/IDataLoaders';
import { NotesService } from './notes.service';
import { Loader } from '../data-loader/decorators/loader.decorator';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Note)
  createNote(@Args('createNoteInput') createNoteInput: CreateNoteInput) {
    return this.notesService.create(createNoteInput);
  }

  @Query(() => [Note], { name: 'notes' })
  findAll() {
    return this.notesService.findAll();
  }

  @Query(() => Note, { name: 'note' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.notesService.findOne(id);
  }

  @Mutation(() => Note)
  updateNote(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput.id, updateNoteInput);
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
