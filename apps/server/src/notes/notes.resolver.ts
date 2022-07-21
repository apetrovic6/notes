import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { CreateNoteInput, Note, UpdateNoteInput } from '@notes-app/entities';


@Resolver(of => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

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
}
