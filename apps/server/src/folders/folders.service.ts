import { Injectable } from '@nestjs/common';
import {
  CreateFolderInput,
  Folder,
  UpdateFolderInput,
} from '@notes/entities/folders';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, map, NotFoundError, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>
  ) {}

  create(createFolderInput: CreateFolderInput, userId: string) {
    return from(
      of(
        this.folderRepository.create({
          ...createFolderInput,
          createdAt: new Date(),
          user: { id: userId },
        })
      )
    ).pipe(switchMap(folder => this.folderRepository.save(folder)));
  }

  findAll(userId: string): Observable<Folder[]> {
    return from(
      this.folderRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
      })
    );
  }

  findOne(id: string): Observable<Folder> {
    return from(
      this.folderRepository.findOne({
        where: {
          id,
        },
      })
    ).pipe(
      map(folder => {
        if (!folder) {
          throw new NotFoundError('Folder not found');
        }
        return folder;
      })
    );
  }

  update(
    id: string,
    updateFolderInput: UpdateFolderInput,
    userId
  ): Observable<Folder> {
    return from(
      this.folderRepository.update(
        {
          user: {
            id: userId,
          },
          id,
        },
        updateFolderInput
      )
    ).pipe(switchMap(() => this.findOne(id)));
  }

  remove(folderId: string, userId: string) {
    return from(
      this.folderRepository.delete({
        id: folderId,
        user: {
          id: userId,
        },
      })
    );
  }
}
