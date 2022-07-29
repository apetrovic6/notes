import { Injectable } from '@nestjs/common';
import { CreateFolderInput, UpdateFolderInput } from '@notes/entities/folders';

@Injectable()
export class FoldersService {
  create(createFolderInput: CreateFolderInput) {
    return 'This action adds a new folder';
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