import { fn } from 'jest-mock';
import { noteStub } from '../tests/stubs/note.stub';
import { of } from 'rxjs';

export const NotesService = fn().mockReturnValue({
  create: fn().mockReturnValue(of(noteStub())),
  findOne: fn().mockReturnValue(of(noteStub())),
  findAll: fn().mockReturnValue(of([noteStub(), noteStub()])),
  update: fn().mockReturnValue(of(noteStub())),
  remove: fn().mockReturnValue(of(null)),
  notes: fn().mockReturnValue(of([noteStub()])),
});
