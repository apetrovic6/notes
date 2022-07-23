import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note, User } from '@notes-app/entities';
import { NotesUserFieldResolverService } from '../../notes-user-field-resolver/notes-user-field-resolver.service';
import { NotesUserFieldResolverModule } from '../../notes-user-field-resolver/notes-user-field-resolver.module';
import { noteStub } from '../../notes/tests/stubs/note.stub';
import { userStub } from './stubs/user.stub';

jest.mock('../user.service');
jest.mock('../../notes-user-field-resolver/notes-user-field-resolver.service');
jest.mock('../../notes/notes.service');

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;
  let notesUserFieldResolverService: NotesUserFieldResolverService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(() => userStub()),
  };
  const mockNoteRepository = {
    create: jest.fn().mockImplementation(() => noteStub()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NotesUserFieldResolverModule],
      providers: [UserResolver, UserService, NotesUserFieldResolverService],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .overrideProvider(getRepositoryToken(Note))
      .useValue(mockNoteRepository)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
    notesUserFieldResolverService = module.get<NotesUserFieldResolverService>(
      NotesUserFieldResolverService
    );

    jest.clearAllMocks();
  });

  describe('UserResolver', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });

    describe('When createUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await resolver.createUser(userStub());
      });

      it('It should call userService', async () => {
        expect(await userService.create).toBeCalledWith(userStub());
      });

      it('It should return the user', async () => {
        expect(user).toEqual(userStub());
      });
    });

    describe('When ResolveField notes is called', () => {
      let notes = [];

      beforeEach(async () => {
        notes = await resolver.notes(userStub());
      });

      it('It should call notesUserFieldResolverService', async () => {
        expect(await notesUserFieldResolverService.resolveNotes).toBeCalledWith(
          userStub().id
        );
      });

      it('It should return an array of notes', async () => {
        expect([notes]).toEqual([noteStub()]);
      });
    });
  });
});
