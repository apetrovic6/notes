import DataLoader from 'dataloader';
import { User } from '@notes/entities/user';
import { Note } from '@notes/entities/notes';
import { Folder } from '@notes/entities/folders';

export interface IDataLoaders {
  notesLoader: DataLoader<string, Note>;
  userLoader: DataLoader<string, User>;
}

export type UserLoader = DataLoader<string, User>;
export type NotesLoader = DataLoader<string, Note>;
export type FolderLoader = DataLoader<string, Folder>;

export enum EDataLoader {
  notes = 'notesLoader',
  user = 'userLoader',
  folder = 'folderLoader',
}
