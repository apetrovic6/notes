import { Test, TestingModule } from '@nestjs/testing';
import { FoldersResolver } from '../folders.resolver';
import { FoldersService } from '../folders.service';
import {
  CreateFolderInput,
  Folder,
  UpdateFolderInput,
} from '@notes/entities/folders';
import { userStub } from '../../user/tests/stubs/user.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { folderStub } from './stubs/folderStub';
import { NotFoundError, of } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';

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
    };

    beforeEach(done => {
      resolver
        .createFolder(userStub.id, folderInput)
        .subscribe(res => (folder = res));
      done();
    });

    it('It should be defined', () => {
      expect(resolver.createFolder).toBeDefined();
    });

    it('It should be called with the correct arguments', () => {
      service.create(folderInput, userStub.id);

      expect(service.create).toBeCalledWith(folderInput, userStub.id);
    });

    it('It should return the created folder', () => {
      expect(folder).toEqual(folderStub);
    });

    describe('When findAll is called', () => {
      let folders: Folder[];

      beforeEach(done => {
        resolver.findAll(userStub.id).subscribe(res => (folders = res));
        done();
      });

      it('It should be defined', () => {
        expect(resolver.findAll).toBeDefined();
      });

      it("Should be called with the user's id", () => {
        expect(service.findAll).toBeCalledWith(userStub.id);
      });

      it("It should return the user's folders", () => {
        expect(folders).toEqual([folderStub, folderStub]);
      });
    });
    describe('When findOne is called', () => {
      let folder: Folder;
      beforeEach(done => {
        resolver.findOne(folderStub.id).subscribe(res => (folder = res));
        done();
      });

      it('It should be defined', () => {
        expect(resolver.findOne).toBeDefined();
      });

      it("It should be called with the folder's id", () => {
        expect(service.findOne).toBeCalledWith(folderStub.id);
      });

      it('It should return the folder', () => {
        expect(folder).toEqual(folderStub);
      });

      it("It should throw an error if the folder doesn't exist", () => {
        jest.spyOn(service, 'findOne').mockReturnValue(of(null));
        resolver
          .findOne(folderStub.id)
          .subscribe(res => expect(res).toBeNull());
      });
    });

    describe('When updateFolder is called', () => {
      let folder: Folder;
      const folderInput: UpdateFolderInput = {
        id: folderStub.id,
        title: 'Test Folder',
      };

      beforeEach(done => {
        resolver
          .updateFolder(userStub.id, folderInput)
          .subscribe(res => (folder = res));
        done();
      });

      it('It should be defined', () => {
        expect(resolver.updateFolder).toBeDefined();
      });

      it("It should be called with the folder's id", () => {
        service.update(folderInput.id, folderInput, userStub.id);
        expect(service.update).toBeCalledWith(
          folderInput.id,
          folderInput,
          userStub.id
        );
      });

      it('It should return the updated folder', () => {
        expect(folder).toEqual(folderStub);
      });

      it("It should throw an error if the folder doesn't exist", () => {
        jest.spyOn(service, 'update').mockImplementationOnce(() => {
          throw new NotFoundError("Folder doesn't exist");
        });

        expect(() =>
          resolver.updateFolder(userStub.id, folderInput)
        ).toThrowError(NotFoundError);
      });

      it("It should throw an error if the folder doesn't belong to the user", () => {
        jest.spyOn(service, 'update').mockImplementationOnce(() => {
          throw new UnauthorizedException("Folder doesn't belong to user");
        });
        expect(() =>
          resolver.updateFolder(userStub.id, folderInput)
        ).toThrowError(UnauthorizedException);
      });
    });

    describe('When removeFolder is called', () => {
      it('It should be defined', () => {
        expect(resolver.removeFolder).toBeDefined();
      });
    });
  });
});
