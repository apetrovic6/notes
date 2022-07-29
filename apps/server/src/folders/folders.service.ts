import { Injectable } from '@nestjs/common';
import {
  CreateFolderInput,
  Folder,
  UpdateFolderInput,
} from '@notes/entities/folders';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, of, switchMap } from 'rxjs';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>
  ) {}

  create(createFolderInput: CreateFolderInput) {
    return from(of(this.folderRepository.create(createFolderInput))).pipe(
      switchMap(folder => this.folderRepository.save(folder))
    );
  }

  findAll() {
    return `This action returns all folders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderInput: UpdateFolderInput) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
