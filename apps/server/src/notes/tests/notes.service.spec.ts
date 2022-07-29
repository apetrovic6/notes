import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '@notes/entities/notes';
import { userStub } from '../../user/tests/stubs/user.stub';
import { fn } from 'jest-mock';
import { noteStub } from './stubs/note.stub';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('NotesService', () => {
  let service: NotesService;

  const noteRepository = {
    create: fn().mockImplementation(() => of(noteStub)),
    save: fn().mockImplementation(() => of(noteStub)),
    find: fn().mockImplementation(() => of([noteStub, noteStub])),
    findOne: fn().mockImplementation(() => of(noteStub)),
    update: fn().mockImplementation(() => of(noteStub)),
    delete: fn().mockImplementation(() => of(null)),
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
          user: '6c4aa2d2-9b6f-4661-b68d-17ffaef0aa95',
        };
      });

      it('Should return a note', () => {
        service.create(createNoteInput).subscribe(res => {
          expect(res).toEqual(noteStub);
        });
      });
    });

    describe('When findAll is called', () => {
      it('It should be defined', () => {
        expect(service.findAll()).toBeDefined();
      });

      it('It should return an array of notes', () => {
        service
          .findAll()
          .subscribe(res => expect(res).toEqual([noteStub, noteStub]));
      });
    });

    describe('When findOne is called', () => {
      let note;

      beforeEach(() => {
        note = noteStub;
      });

      it('It should be defined', () => {
        expect(service.findOne(note)).toBeDefined();
      });

      it('It should return a note', () => {
        service.findOne(note).subscribe(res => expect(res).toEqual(note));
      });

      it('It should return an error if no note is found', async () => {
        jest.spyOn(service, 'findOne').mockImplementationOnce(id => {
          throw new NotFoundException('Note not found');
        });
        expect(() => service.findOne('123')).toThrowError(NotFoundException);
      });
    });

    describe('When update is called', () => {
      it('should be defined', () => {
        expect(service.update).toBeDefined();
      });

      it('It should return an updated note', () => {
        const updatedNote = { id: noteStub.id, title: 'Updated Title' };

        service.update(noteStub.id, updatedNote).subscribe(res => {
          expect(res).toEqual(noteStub);
        });
      });
    });

    describe('When remove is called', () => {
      it('It should be defined', () => {
        expect(service.remove).toBeDefined();
      });

      it('It should return null', () => {
        service.remove(noteStub.id).subscribe(res => {
          expect(res).toEqual(null);
        });
      });

      it('It should return an error if no note is found', async () => {
        jest.spyOn(service, 'remove').mockImplementationOnce(id => {
          throw new NotFoundException('Note not found');
        });
        expect(() => service.remove('123')).toThrowError(NotFoundException);
      });
    });

    describe('When loadNotes is called', () => {
      it('It should be defined', () => {
        expect(service.loadNotes).toBeDefined();
      });

      // TODO Test loadNotes
      // it('It should return an array of notes', () => {});
    });
  });
});
