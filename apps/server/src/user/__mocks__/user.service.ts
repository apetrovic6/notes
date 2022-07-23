import { fn } from 'jest-mock';
import { userStub } from '../tests/stubs/user.stub';

export const UserService = fn().mockReturnValue({
  create: fn().mockReturnValue(userStub()),
  findOne: fn().mockReturnValue(userStub()),
  findAll: fn().mockReturnValue([userStub()]),
  update: fn().mockReturnValue(userStub()),
});
