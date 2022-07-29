import { fn } from 'jest-mock';
import { folderStub } from '../tests/stubs/folderStub';
import { of } from 'rxjs';

export const FoldersService = fn().mockReturnValue({
  create: fn().mockReturnValue(of(folderStub)),
  findOne: fn().mockReturnValue(of(folderStub)),
  findAll: fn().mockReturnValue(of([folderStub, folderStub])),
  update: fn().mockReturnValue(of(folderStub)),
  remove: fn().mockReturnValue(of(null)),
});
