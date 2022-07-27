import { Injectable } from '@nestjs/common';
import { NotesService } from '../notes/notes.service';
import { UserService } from '../user/user.service';
import { Note } from '@notes/entities/notes';
import { User } from '@notes/entities/user';
import DataLoader from 'dataloader';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly notesService: NotesService,
    private readonly userService: UserService
  ) {}

  getLoaders() {
    return {
      notesLoader: this._createNotesLoader(),
      userLoader: this._createUserLoader(),
    };
  }

  private _createNotesLoader() {
    return new DataLoader<string, Note[]>(
      async (keys: readonly string[]) =>
        await this.notesService.loadNotes(keys as string[])
    );
  }

  private _createUserLoader() {
    return new DataLoader<string, User>(
      async (keys: readonly string[]) =>
        await this.userService.loadUsers(keys as string[])
    );
  }
}
