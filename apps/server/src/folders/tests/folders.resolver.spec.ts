import { Test, TestingModule } from '@nestjs/testing';
import { FoldersResolver } from '../folders.resolver';
import { FoldersService } from '../folders.service';
import { CreateFolderInput, Folder } from '@notes/entities/folders';
import { userStub } from '../../user/tests/stubs/user.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { folderStub } from './stubs/folderStub';
import { of } from 'rxjs';

jest.mock('../folders.service');

describe('FoldersResolver', () => {
  let resolver: FoldersResolver;
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
      providers: [FoldersResolver, FoldersService],
    })
      .overrideProvider(getRepositoryToken(Folder))
      .useValue(folderRepo)
      .compile();

    resolver = module.get<FoldersResolver>(FoldersResolver);
    service = module.get<FoldersService>(FoldersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('When createFolder is called', () => {
    let folder: Folder;

    const folderInput: CreateFolderInput = {
      title: 'Test Folder',
      user: userStub,
    };

    beforeEach(done => {
      resolver.createFolder(folderInput).subscribe(res => (folder = res));
      done();
    });

    it('It should be defined', () => {
      expect(resolver.createFolder).toBeDefined();
    });

    it('It should be called with the correct arguments', () => {
      expect(service.create).toBeCalledWith(folderInput);
    });
  });
});
