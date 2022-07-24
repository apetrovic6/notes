import { fn } from 'jest-mock';
import { userStub } from '../../user/tests/stubs/user.stub';
import { noteStub } from '../../notes/tests/stubs/note.stub';
import { of } from 'rxjs';

export const NotesUserFieldResolverService = fn().mockReturnValue({
  resolveUser: fn().mockReturnValue(of(userStub())),
  resolveNotes: fn().mockReturnValue(of(noteStub())),
});
