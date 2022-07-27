import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FoldersService } from './folders.service';
import {
  Folder,
  CreateFolderInput,
  UpdateFolderInput,
} from '@notes/entities/folders';

@Resolver(() => Folder)
export class FoldersResolver {
  constructor(private readonly foldersService: FoldersService) {}

  @Mutation(() => Folder)
  createFolder(
    @Args('createFolderInput') createFolderInput: CreateFolderInput
  ) {
    return this.foldersService.create(createFolderInput);
  }

  @Query(() => [Folder], { name: 'folders' })
  findAll() {
    return this.foldersService.findAll();
  }

  @Query(() => Folder, { name: 'folder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.foldersService.findOne(id);
  }

  @Mutation(() => Folder)
  updateFolder(
    @Args('updateFolderInput') updateFolderInput: UpdateFolderInput
  ) {
    return this.foldersService.update(updateFolderInput.id, updateFolderInput);
  }

  @Mutation(() => Folder)
  removeFolder(@Args('id', { type: () => Int }) id: number) {
    return this.foldersService.remove(id);
  }
}
