import { Test, TestingModule } from '@nestjs/testing';
import { DataLoaderService } from '../data-loader.service';
import { NotesService } from '../../notes/notes.service';
import { UserService } from '../../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@notes/entities/user';
import { Note } from '@notes/entities/notes';
import { Folder } from '@notes/entities/folders';
import { FoldersService } from '../../folders/folders.service';

describe('DataLoaderService', () => {
  let service: DataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataLoaderService,
        NotesService,
        UserService,
        FoldersService,
        {
          provide: getRepositoryToken(Note),
          useValue: { find: jest.fn() },
        },
        {
          provide: getRepositoryToken(User),
          useValue: { find: jest.fn() },
        },
        {
          provide: getRepositoryToken(Folder),
          useValue: { find: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<DataLoaderService>(DataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getLoaders', () => {
    it('It should be defined', () => {
      expect(service.getLoaders).toBeDefined();
    });

    it('It should return an object', () => {
      expect(service.getLoaders()).toBeInstanceOf(Object);
    });

    it('It should return an object with notesLoader and userLoader', () => {
      expect(service.getLoaders()).toHaveProperty('notesLoader');
      expect(service.getLoaders()).toHaveProperty('userLoader');
    });
  });
});
