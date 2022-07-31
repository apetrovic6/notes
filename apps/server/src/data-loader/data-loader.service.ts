import { Injectable } from '@nestjs/common';
import { NotesService } from '../notes/notes.service';
import { UserService } from '../user/user.service';
import { FoldersService } from '../folders/folders.service';
import { Note } from '@notes/entities/notes';
import { User } from '@notes/entities/user';
import DataLoader from 'dataloader';
import { Folder } from '@notes/entities/folders';

@Injectable()
export class DataLoaderService {
  constructor(
    private readonly notesService: NotesService,
    private readonly userService: UserService,
    private readonly folderService: FoldersService
  ) {}

  getLoaders() {
    return {
      notesLoader: this._createNotesLoader(),
      userLoader: this._createUserLoader(),
      folderLoader: this._createFolderLoader(),
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

  private _createFolderLoader() {
    return new DataLoader<string, Folder[]>(
      async (keys: readonly string[]) =>
        await this.folderService.loadFolders(keys as string[])
    );
  }
}
