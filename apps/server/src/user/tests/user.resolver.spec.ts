import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@notes/entities/user';
import { Note } from '@notes/entities/notes';
import { noteStub } from '../../notes/tests/stubs/note.stub';
import { userStub } from './stubs/user.stub';
import { DataLoaderService } from '../../data-loader/data-loader.service';
import { DataLoaderModule } from '../../data-loader/data-loader.module';
import { Folder } from '@notes/entities/folders';
import { folderStub } from '../../folders/tests/stubs/folderStub';

jest.mock('../user.service');
jest.mock('../../notes/notes.service');
jest.mock('../../data-loader/data-loader.service');

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(() => userStub),
  };
  const mockNoteRepository = {
    create: jest.fn().mockImplementation(() => noteStub),
  };

  const mockFolderRepository = {
    create: jest.fn().mockImplementation(() => folderStub),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataLoaderModule],
      providers: [UserResolver, UserService, DataLoaderService],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .overrideProvider(getRepositoryToken(Note))
      .useValue(mockNoteRepository)
      .overrideProvider(getRepositoryToken(Folder))
      .useValue(mockFolderRepository)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  describe('UserResolver', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });

    describe('When createUser is called', () => {
      let user: User;

      beforeEach(done => {
        resolver.createUser(userStub).subscribe(res => (user = res));
        done();
      });

      it('It should call userService', () => {
        expect(userService.create).toBeCalledWith(userStub);
      });

      it('It should return the user', () => {
        expect(user).toEqual(userStub);
      });
    });

    // describe('When ResolveField notes is called', () => {
    //   let notes = [];
    //
    //   beforeEach(done => {
    //     resolver.notes(userStub).subscribe(res => (notes = res));
    //     done();
    //   });
    //
    //   it('It should call notesUserFieldResolverService', () => {
    //     expect(notesUserFieldResolverService.resolveNotes).toBeCalledWith(
    //       userStub().id
    //     );
    //   });
    //
    //   it('It should return an array of notes', async () => {
    //     expect(notes).toEqual([noteStub()]);
    //   });
    // });
  });
});
