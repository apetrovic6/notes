import { Test, TestingModule } from '@nestjs/testing';
import { NotesResolver } from '../notes.resolver';
import { NotesService } from '../notes.service';
import { NotesUserFieldResolverModule } from '../../notes-user-field-resolver/notes-user-field-resolver.module';
import { noteStub } from './stubs/note.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note, UpdateNoteInput, User } from '@notes-app/entities';
import { NotesUserFieldResolverService } from '../../notes-user-field-resolver/notes-user-field-resolver.service';
import { userStub } from '../../user/tests/stubs/user.stub';

jest.mock('../notes.service');
jest.mock('../../notes-user-field-resolver/notes-user-field-resolver.service');
jest.mock('../../user/user.service');

describe('NotesResolver', () => {
  let noteResolver: NotesResolver;
  let notesService: NotesService;
  let notesUserFieldResolverService: NotesUserFieldResolverService;
  const mockRepo = {
    create: jest.fn().mockImplementation(() => userStub()),
  };

  const mockNoteRepository = {
    create: jest.fn().mockImplementation(() => noteStub()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NotesUserFieldResolverModule],
      providers: [NotesResolver, NotesService, NotesUserFieldResolverService],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepo)
      .overrideProvider(getRepositoryToken(Note))
      .useValue(mockNoteRepository)
      .compile();

    noteResolver = module.get<NotesResolver>(NotesResolver);
    notesService = module.get<NotesService>(NotesService);
    notesUserFieldResolverService = module.get<NotesUserFieldResolverService>(
      NotesUserFieldResolverService
    );

    jest.clearAllMocks();
  });

  describe('Notes', () => {
    it('should be defined', () => {
      expect(noteResolver).toBeDefined();
    });

    describe("When 'findOne' is called", () => {
      let note: Note;

      beforeEach(async () => {
        note = await noteResolver.findOne(noteStub().id);
      });

      test('It should call notesService ', async () => {
        expect(await notesService.findOne).toBeCalledWith(noteStub().id);
      });

      test('It should return the note', () => {
        expect(note).toEqual(noteStub());
      });

      it("It should return null if the note doesn't exist", async () => {
        await jest
          .spyOn(notesService, 'findOne')
          .mockImplementation(() => null);

        expect(notesService.findOne('23jnkasdf')).toBeNull();
      });
    });

    describe('When findAll is called', () => {
      let notes;

      beforeEach(async () => {
        notes = await noteResolver.findAll();
      });

      test('It should call noteService', async () => {
        expect(await notesService.findAll).toBeCalled();
      });

      it('It should return an array of notes', () => {
        expect([noteStub()]).toEqual(notes);
      });
    });

    describe('When createNote is called', () => {
      let note;
      beforeEach(async () => {
        note = await noteResolver.createNote(noteStub());
      });

      test('It should call notesService', async () => {
        expect(await notesService.create).toBeCalledWith(noteStub());
      });

      test('It should return the created note', () => {
        expect(note).toEqual(noteStub());
      });
    });

    describe('When updateNote is called', () => {
      let updateNoteInput: UpdateNoteInput;
      let note;

      beforeEach(async () => {
        updateNoteInput = {
          id: noteStub().id,
          title: 'Updated Title',
        };
        note = await noteResolver.updateNote(updateNoteInput);
      });

      test('It should call notesService', async () => {
        expect(await notesService.update).toBeCalledWith(
          note.id,
          updateNoteInput
        );
      });

      test('It should return the updated note', async () => {
        note = await notesService.update(note.id, updateNoteInput);
        expect(note).toEqual(noteStub());
      });
    });

    describe('When removeNote is called', () => {
      let note;
      beforeEach(() => {
        note = noteResolver.removeNote(noteStub().id);
      });

      test('It should call notesService', async () => {
        expect(await notesService.remove).toBeCalledWith(noteStub().id);
      });

      test('It should return null', async () => {
        expect(note).toBeNull();
      });
    });

    describe('When ResolveField (user) is called', () => {
      let user;
      let note;

      beforeEach(() => {
        note = noteStub();
        user = notesUserFieldResolverService.resolveUser(note);
      });

      test('It should call notesUserFieldResolverService', async () => {
        expect(notesUserFieldResolverService.resolveUser).toBeCalledWith(note);
      });

      test('It should return the user', async () => {
        expect(user).toEqual(note.user);
      });
    });
  });
});
