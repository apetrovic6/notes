import { fn } from 'jest-mock';
import { userStub } from '../../user/tests/stubs/user.stub';
import { noteStub } from '../../notes/tests/stubs/note.stub';

export const NotesUserFieldResolverService = fn().mockReturnValue({
  resolveUser: fn().mockReturnValue(userStub()),
  resolveNotes: fn().mockReturnValue(noteStub()),
});
