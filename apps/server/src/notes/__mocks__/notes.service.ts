import { fn } from 'jest-mock';
import { noteStub } from '../tests/stubs/note.stub';

export const NotesService = fn().mockReturnValue({
  create: fn().mockReturnValue(noteStub()),
  findOne: fn().mockReturnValue(noteStub()),
  findAll: fn().mockReturnValue([noteStub()]),
  update: fn().mockReturnValue(noteStub()),
  remove: fn().mockReturnValue(null),
  notes: fn().mockReturnValue([noteStub()]),
});
