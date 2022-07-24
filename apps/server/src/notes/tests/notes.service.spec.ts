import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '@notes-app/entities';
import { userStub } from '../../user/tests/stubs/user.stub';
import { fn } from 'jest-mock';
import { noteStub } from './stubs/note.stub';
import { of } from 'rxjs';

describe('NotesService', () => {
  let service: NotesService;

  const noteRepository = {
    create: fn().mockImplementation(() => of(noteStub())),
    save: fn().mockImplementation(() => of(noteStub())),
    find: fn().mockImplementation(() => of([noteStub(), noteStub()])),
    findOne: fn().mockImplementation(() => of(noteStub())),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: noteRepository },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  describe('Notes Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('When create is called', () => {
      let createNoteInput;

      beforeEach(() => {
        createNoteInput = {
          title: 'Test Title',
          content: 'Test Content',
          user: { id: userStub().id },
        };
      });

      it('Should return a note', () => {
        service.create(createNoteInput).subscribe(res => {
          expect(res).toEqual(noteStub());
        });
      });
    });

    describe('When findAll is called', () => {
      it('It should be defined', () => {
        expect(service.findAll()).toBeDefined();
      });

      it('It should return an array of notes', () => {
        let notes;

        service
          .findAll()
          .subscribe(res => expect(res).toEqual([noteStub(), noteStub()]));
      });
    });

    describe('When findOne is called', () => {
      let note;

      beforeEach(() => {
        note = noteStub();
      });

      it('It should be defined', () => {
        expect(service.findOne(note)).toBeDefined();
      });

      it('It should return a note', () => {
        // expect(service.findOne(userStub().id)).toEqual(note);

        service.findOne(note).subscribe(res => expect(res).toEqual(note));
      });

      //   TODO It should return an error if no note is found
      //   it("It should return an error if no note is found", async () => {
      //     note = null
      //     expect(await service.findOne("asdfsdf098")).toBeNull()
      //   })
    });
  });
});
