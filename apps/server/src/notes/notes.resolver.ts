import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateNoteInput, Note, UpdateNoteInput } from '@notes/entities/notes';
import { JwtAuthGuard } from '@notes/auth-helpers';
import { EDataLoader, UserLoader } from '../data-loader/IDataLoaders';
import { NotesService } from './notes.service';
import { Loader } from '../data-loader/decorators/loader.decorator';
import { User } from '../user/get-user.decorator';
import { lastValueFrom, mergeMap, of } from 'rxjs';
import { IsOnlineInput } from '@notes/entities/notes';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@UseGuards(JwtAuthGuard)
@Resolver(() => Note)
export class NotesResolver {
  constructor(
    private readonly notesService: NotesService,
    @Inject('PUB_SUB') private readonly pubSub: RedisPubSub
  ) {}

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
    this.pubSub.publish('isOnline', {
      isOnline: {
        id: user.userId,
        email: 'dummy@dummy.com',
      },
    });

    return this.notesService.findOne(id, user.userId);
  }

  @Mutation(() => Note)
  updateNote(
    @User() user: { userId: string },
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput
  ) {
    return this.notesService
      .update(updateNoteInput.id, updateNoteInput, user.userId)
      .pipe(
        mergeMap(note => {
          this.pubSub.publish('noteUpdated', { noteUpdated: note });
          return of(note);
        })
      );
  }

  @Mutation(() => Note)
  addCollaborator(
    @User() user: { userId: string },
    @Args('noteId', { type: () => String }) noteId: string,
    @Args('collaboratorEmail', { type: () => String }) collaboratorEmail: string
  ) {
    return this.notesService.addCollaborator(
      noteId,
      user.userId,
      collaboratorEmail
    );
  }
  @Query(() => [Note], { name: 'getNotesForCollaborator' })
  getNotesForCollaborator(@User() user: { userId: string }) {
    this.pubSub.publish('isOnline', {
      isOnline: {
        id: user.userId,
        email: 'dummy@dummy.com',
      },
    });
    return this.notesService.getNotesForCollaborator(user.userId);
  }

  @Mutation(() => Note)
  removeNote(
    @User() user: { userId: string },
    @Args('id', { type: () => ID }) id: string
  ) {
    return this.notesService.remove(id, user.userId);
  }

  @ResolveField('user', () => User)
  async user(
    @Parent() note: Note,
    @Loader(EDataLoader.user) loader: UserLoader
  ) {
    return loader.load(note.userId);
  }

  @Mutation(() => Note, { name: 'collabUpdateNote' })
  async collabUpdateNote(
    @User() user: { userId: string },
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput
  ) {
    const updateNote = await lastValueFrom(
      this.notesService.collabUpdateNote(user.userId, updateNoteInput)
    );

    this.pubSub.publish('noteUpdated', { noteUpdated: updateNote });
    return updateNote;
  }

  @Subscription(() => Note, {
    filter: (payload, variables) =>
      payload.noteUpdated.collaborators.find(
        collab => collab.id === variables.id
      ) || payload.noteUpdated.userId === variables.id,
  })
  noteUpdated(@Args('id') id: string) {
    return this.pubSub.asyncIterator('noteUpdated');
  }

  @Subscription(() => IsOnlineInput)
  isOnline() {
    return this.pubSub.asyncIterator('isOnline');
  }
}
