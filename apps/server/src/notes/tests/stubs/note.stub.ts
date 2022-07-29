import { Note } from '@notes/entities/notes';
import { userStub } from '../../../user/tests/stubs/user.stub';
import { folderStub } from '../../../folders/tests/stubs/folderStub';

export const noteStub = {
  id: 'd0594ffa-bada-4bfe-bf14-7c44ae110f38',
  title: 'Test Note',
  content: 'This is a test note',
  user: userStub,
  createdAt: new Date('2022-07-23T00:00:00.000Z'),
  userId: '6c4aa2d2-9b6f-4661-b68d-17ffaef0aa95',
  folder: folderStub,
};
