import { Note } from '@notes-app/entities';
import { userStub } from '../../../user/tests/stubs/user.stub';

export const noteStub = (): Note => ({
  id: 'd0594ffa-bada-4bfe-bf14-7c44ae110f38',
  title: 'Test Note',
  content: 'This is a test note',
  user: userStub(),
  createdAt: new Date('2022-07-23T00:00:00.000Z'),
  userId: userStub().id,
});
