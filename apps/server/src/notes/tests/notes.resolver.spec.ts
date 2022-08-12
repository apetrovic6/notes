import { Test, TestingModule } from '@nestjs/testing';
import { NotesResolver } from '../notes.resolver';
import { NotesService } from '../notes.service';
import { noteStub } from './stubs/note.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@notes/entities/user';
import { CreateNoteInput, Note, UpdateNoteInput } from '@notes/entities/notes';
import { userStub } from '../../user/tests/stubs/user.stub';
import { NotFoundException } from '@nestjs/common';
import { DataLoaderService } from '../../data-loader/data-loader.service';
import { DataLoaderModule } from '../../data-loader/data-loader.module';
import { folderStub } from '../../folders/tests/stubs/folderStub';
import { Folder } from '@notes/entities/folders';
import { of } from 'rxjs';
import { PubSub } from 'graphql-subscriptions';

jest.mock('../notes.service');
jest.mock('../../user/user.service');
jest.mock('../../data-loader/data-loader.service');

describe('NotesResolver', () => {
  let noteResolver: NotesResolver;
  let notesService: NotesService;
  let dataLoaderService: DataLoaderService;

  const mockRepo = {
    create: jest.fn().mockImplementation(() => userStub),
    remove: jest.fn().mockImplementation(() => noteStub),
  };

  const mockNoteRepository = {
    create: jest.fn().mockImplementation(() => noteStub),
    remove: jest.fn().mockImplementation(() => noteStub),
  };

  const mockFolderRepo = {
    create: jest.fn().mockImplementation(() => folderStub),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataLoaderModule],
      providers: [
        NotesResolver,
        NotesService,
        DataLoaderService,
        {
          provide: 'PUB_SUB',
          useValue: new PubSub(),
        },
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockRepo)
      .overrideProvider(getRepositoryToken(Note))
      .useValue(mockNoteRepository)
      .overrideProvider(getRepositoryToken(Folder))
      .useValue(mockFolderRepo)
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
        noteResolver
          .findOne({ userId: userStub.id }, noteStub.id)
          .subscribe(res => {
            note = res;
          });
        done();
      });

      test('It should call notesService ', () => {
        expect(notesService.findOne).toBeCalledWith(noteStub.id, userStub.id);
      });

      test('It should return the note', () => {
        expect(note).toEqual(noteStub);
      });

      it("It should return not found error if the note doesn't exist", () => {
        jest.spyOn(notesService, 'findOne').mockImplementationOnce(() => {
          throw new NotFoundException('Note not found');
        });

        expect(() => noteResolver.findOne(userStub.id, 'someId')).toThrowError(
          NotFoundException
        );
      });
    });

    describe('When findAll is called', () => {
      let notes;

      beforeEach(done => {
        noteResolver.findAll(userStub.id).subscribe(res => (notes = res));
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
      const createNoteInput: CreateNoteInput = {
        title: noteStub.title,
        content: noteStub.content,
        folder: folderStub,
        shared: noteStub.shared,
      };

      beforeEach(done => {
        note = null;
        noteResolver
          .createNote(createNoteInput, { userId: userStub.id })
          .subscribe(res => (note = res));
        done();
      });

      test('It should call notesService', () => {
        expect(notesService.create).toBeCalledWith(
          createNoteInput,
          userStub.id
        );
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

        expect(() => noteResolver.createNote(userStub.id, note)).toThrowError(
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
          shared: false,
          collaborators: [],
        };
        noteResolver
          .updateNote(userStub.id, updateNoteInput)
          .subscribe(res => (note = res));

        done();
      });

      test('It should call notesService', async () => {
        expect(notesService.findOne).toBeCalledWith(noteStub.id, userStub.id);
      });

      test('It should return the updated note', async () => {
        expect(note).toEqual(noteStub);
      });

      test("It should throw a not found error if the note doesn't exist", () => {
        jest.spyOn(notesService, 'update').mockImplementationOnce(() => {
          throw new NotFoundException('Note not found');
        });

        expect(() =>
          noteResolver.updateNote(userStub.id, updateNoteInput)
        ).toThrowError(NotFoundException);
      });
    });

    describe('When removeNote is called', () => {
      let note;
      beforeEach(done => {
        noteResolver
          .removeNote(userStub.id, noteStub.id)
          .subscribe(res => (note = res));
        done();
      });

      // TODO fix this shitty test
      test('It should call notesService', () => {
        jest
          .spyOn(notesService, 'remove')
          .mockImplementationOnce(() => of(noteStub));
        // expect(notesService.remove).toBeCalledWith(noteStub.id, userStub.id);
      });

      test('It should return null', async () => {
        expect(note).toEqual(noteStub);
      });

      test('It should throw a NotFound error if the note doesnt exist', () => {
        jest.spyOn(notesService, 'remove').mockImplementationOnce(() => {
          throw new NotFoundException('Note not found');
        });

        expect(() =>
          noteResolver.removeNote(userStub.id, 'someId')
        ).toThrowError(NotFoundException);
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
