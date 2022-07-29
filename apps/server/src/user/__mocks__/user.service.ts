import { fn } from 'jest-mock';
import { userStub } from '../tests/stubs/user.stub';
import { of } from 'rxjs';

export const UserService = fn().mockReturnValue({
  create: fn().mockReturnValue(of(userStub)),
  findOne: fn().mockReturnValue(of(userStub)),
  findAll: fn().mockReturnValue(of([userStub])),
  update: fn().mockReturnValue(of(userStub)),
  findByEmail: fn().mockReturnValue(of(userStub)),
});
