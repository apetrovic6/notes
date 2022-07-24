import { NotesUserFieldResolverService } from '../notes-user-field-resolver.service';
import { Test, TestingModule } from '@nestjs/testing';
import { from, of } from 'rxjs';
import { noteStub } from '../../notes/tests/stubs/note.stub';
import { userStub } from '../../user/tests/stubs/user.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note, User } from '@notes-app/entities';
import { NotFoundException } from '@nestjs/common';

jest.mock('../notes-user-field-resolver.service.ts');

describe('NotesUserFieldResolverService', () => {
  let service: NotesUserFieldResolverService;

  const noteRepository = {
    find: jest.fn().mockImplementation(() => of([noteStub(), noteStub()])),
  };

  const userRepository = {
    findOne: jest.fn().mockImplementation(() => of(userStub())),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesUserFieldResolverService,
        { provide: getRepositoryToken(Note), useValue: noteRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
      ],
    }).compile();

    service = module.get<NotesUserFieldResolverService>(
      NotesUserFieldResolverService
    );
  });

  describe('Notes User Field Resolver Service', () => {
    it('It should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('When resolveNotes is called', () => {
      it('It should be defined', () => {
        expect(service.resolveNotes).toBeDefined();
      });

      it('It should return an array of notes', () => {
        service.resolveNotes(userStub().id).subscribe(res => {
          expect(res).toEqual([noteStub()]);
        });
      });

      it("It should throw an error if the user doesn't exist", () => {
        jest.spyOn(service, 'resolveNotes').mockImplementationOnce(() => {
          throw new NotFoundException("User doesn't exist");
        });

        expect(() => service.resolveNotes('someId')).toThrowError(
          NotFoundException
        );
      });
    });

    describe('When resolveUser is called', () => {
      it('It should be defined', () => {
        expect(service.resolveUser).toBeDefined();
      });

      it('Should return a user', () => {
        service.resolveUser(userStub().id).subscribe(res => {
          expect(res).toEqual(userStub());
        });
      });

      it("Should throw an error if the user doesn't exist", () => {
        jest.spyOn(service, 'resolveUser').mockImplementationOnce(() => {
          throw new NotFoundException('User not found');
        });
        expect(() => service.resolveUser('someId')).toThrowError(
          NotFoundException
        );
      });
    });
  });
});
