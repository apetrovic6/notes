import { Folder } from '@notes/entities/folders';
import { userStub } from '../../../user/tests/stubs/user.stub';
import { noteStub } from '../../../notes/tests/stubs/note.stub';

export const folderStub = {
  id: 'b91da0c6-8061-4bf9-b2b2-25f9ededdd75',
  createdAt: new Date('2022-07-23T00:00:00.000Z'),
  title: 'Test Folder',
  notes: [noteStub],
  userId: '6c4aa2d2-9b6f-4661-b68d-17ffaef0aa95',
  user: userStub,
};
