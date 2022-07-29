import { Test, TestingModule } from '@nestjs/testing';
import { FoldersService } from '../folders.service';
import { of } from 'rxjs';
import { folderStub } from './stubs/folderStub';
import { Folder } from '@notes/entities/folders';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FoldersService', () => {
  let service: FoldersService;

  const folderRepo = {
    find: jest.fn(),
    findOne: jest.fn().mockReturnValue(of(folderStub)),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoldersService,
        { provide: getRepositoryToken(Folder), useValue: folderRepo },
      ],
    }).compile();

    service = module.get<FoldersService>(FoldersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
