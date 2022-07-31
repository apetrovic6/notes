import { folderStub } from '../../../folders/tests/stubs/folderStub';
import { noteStub } from '../../../notes/tests/stubs/note.stub';

export const userStub = {
  id: '6c4aa2d2-9b6f-4661-b68d-17ffaef0aa95',
  email: 'test@email.com',
  password: 'testing12345',
  createdAt: new Date('2022-07-20T00:00:00.000Z'),
  notes: [noteStub],
  folders: [folderStub],
};
