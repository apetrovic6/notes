import { Test, TestingModule } from '@nestjs/testing';
import { NotesResolver } from '../notes.resolver';
import { NotesService } from '../notes.service';
import { noteStub } from './stubs/note.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@notes/entities/user';
import { Note, UpdateNoteInput } from '@notes/entities/notes';
import { userStub } from '../../user/tests/stubs/user.stub';
import { NotFoundException } from '@nestjs/common';
import { DataLoaderService } from '../../data-loader/data-loader.service';
import { DataLoaderModule } from '../../data-loader/data-loader.module';

jest.mock('../notes.service');
jest.mock('../../user/user.service');
jest.mock('../../data-loader/data-loader.service');

describe('NotesResolver', () => {
  let noteResolver: NotesResolver;
  let notesService: NotesService;
  let dataLoaderService: DataLoaderService;

  const mockRepo = {
    create: jest.fn().mockImplementation(() => userStub),
  };

  const mockNoteRepository = {
    create: jest.fn().mockImplementation(() => noteStub),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataLoaderModule],
      providers: [NotesResolver, NotesService, DataLoaderService],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepo)
      .overrideProvider(getRepositoryToken(Note))
      .useValue(mockNoteRepository)
      .compile();

    noteResolver = module.get<NotesResolver>(NotesResolver);
    notesService = module.get<NotesService>(NotesService);
    dataLoaderService = module.get<DataLoaderService>(DataLoaderService);

    jest.clearAllMocks();
  });

  describe('Notes', () => {
    it('should be defined', () => {
      expect(noteResolver).toBeDefined();
    });

    describe("When 'findOne' is called", () => {
      let note;

      beforeEach(done => {
        noteResolver.findOne(noteStub.id).subscribe(res => {
          note = res;
        });
        done();
      });

      test('It should call notesService ', () => {
        expect(notesService.findOne).toBeCalledWith(noteStub.id);
      });

      test('It should return the note', () => {
        expect(note).toEqual(noteStub);
      });

      it("It should return not found error if the note doesn't exist", () => {
        jest.spyOn(notesService, 'findOne').mockImplementationOnce(() => {
          throw new NotFoundException('Note not found');
        });

        expect(() => noteResolver.findOne('someId')).toThrowError(
          NotFoundException
        );
      });
    });

    describe('When findAll is called', () => {
      let notes;

      beforeEach(done => {
        noteResolver.findAll().subscribe(res => (notes = res));
        done();
      });

      test('It should call noteService', async () => {
        expect(await notesService.findAll).toBeCalled();
      });

      it('It should return an array of notes', () => {
        expect(notes).toEqual([noteStub, noteStub]);
      });
    });

    describe('When createNote is called', () => {
      let note;
      beforeEach(done => {
        noteResolver.createNote(noteStub).subscribe(res => (note = res));
        done();
      });

      test('It should call notesService', () => {
        expect(notesService.create).toBeCalledWith(noteStub);
      });

      test('It should return the created note', () => {
        expect(note).toEqual(noteStub);
      });

      test("It should throw an error if the user wasn't included", () => {
        jest.spyOn(notesService, 'create').mockImplementationOnce(() => {
          throw new Error('User not included');
        });

        const newNote = noteStub;
        newNote.user = null;

        expect(() => noteResolver.createNote(note)).toThrowError(
          'User not included'
        );
      });
    });

    describe('When updateNote is called', () => {
      let updateNoteInput: UpdateNoteInput;
      let note;

      beforeEach(done => {
        updateNoteInput = {
          id: noteStub.id,
          title: 'Updated Title',
        };
        noteResolver.updateNote(updateNoteInput).subscribe(res => (note = res));

        done();
      });

      test('It should call notesService', async () => {
        expect(notesService.findOne).toBeCalledWith(noteStub.id);
      });

      test('It should return the updated note', async () => {
        expect(note).toEqual(noteStub);
      });

      test("It should throw a not found error if the note doesn't exist", () => {
        jest.spyOn(notesService, 'update').mockImplementationOnce(() => {
          throw new NotFoundException('Note not found');
        });

        expect(() => noteResolver.updateNote(updateNoteInput)).toThrowError(
          NotFoundException
        );
      });
    });

    describe('When removeNote is called', () => {
      let note;
      beforeEach(done => {
        noteResolver.removeNote(noteStub.id).subscribe(res => (note = res));
        done();
      });

      test('It should call notesService', () => {
        expect(notesService.remove).toBeCalledWith(noteStub.id);
      });

      test('It should return null', async () => {
        expect(note).toBeNull();
      });

      test('It should throw a NotFound error if the note doesnt exist', () => {
        jest.spyOn(notesService, 'remove').mockImplementationOnce(() => {
          throw new NotFoundException('Note not found');
        });

        expect(() => noteResolver.removeNote('someId')).toThrowError(
          NotFoundException
        );
      });
    });

    // describe('When ResolveField (user) is called', () => {
    //   let user;
    //   let note;
    //
    //   beforeEach(done => {
    //     note = noteStub();
    //     notesUserFieldResolverService
    //       .resolveUser(note)
    //       .subscribe(res => (user = res));
    //     done();
    //   });
    //
    //   test('It should call notesUserFieldResolverService', async () => {
    //     expect(notesUserFieldResolverService.resolveUser).toBeCalledWith(note);
    //   });
    //
    //   test('It should return the user', async () => {
    //     expect(user).toEqual(note.user);
    //   });
    // });
  });
});
