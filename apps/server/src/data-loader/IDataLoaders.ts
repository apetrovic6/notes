import DataLoader from 'dataloader';
import { Note, User } from '@notes-app/entities';

export interface IDataLoaders {
  notesLoader: DataLoader<string, Note>;
  userLoader: DataLoader<string, User>;
}

export type UserLoader = DataLoader<string, User>;

export type NotesLoader = DataLoader<string, Note>;

export enum EDataLoader {
  notes = 'notesLoader',
  user = 'userLoader',
}
