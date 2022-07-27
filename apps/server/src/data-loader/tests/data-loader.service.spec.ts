import { Test, TestingModule } from '@nestjs/testing';
import { DataLoaderService } from '../data-loader.service';
import { NotesService } from '../../notes/notes.service';
import { UserService } from '../../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note, User } from '@notes-app/entities';

describe('DataLoaderService', () => {
  let service: DataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataLoaderService,
        NotesService,
        UserService,
        {
          provide: getRepositoryToken(Note),
          useValue: { find: jest.fn() },
        },
        {
          provide: getRepositoryToken(User),
          useValue: { find: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<DataLoaderService>(DataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
