import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FoldersService } from './folders.service';
import {
  Folder,
  CreateFolderInput,
  UpdateFolderInput,
} from '@notes/entities/folders';
import { Observable } from 'rxjs';
import { User } from '../user/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@notes/auth-helpers';
import { Loader } from '../data-loader/decorators/loader.decorator';
import { EDataLoader, NotesLoader } from '../data-loader/IDataLoaders';

@UseGuards(JwtAuthGuard)
@Resolver(() => Folder)
export class FoldersResolver {
  constructor(private readonly foldersService: FoldersService) {}

  @Mutation(() => Folder)
  createFolder(
    @User() user: { userId: string },
    @Args('createFolderInput') createFolderInput: CreateFolderInput
  ) {
    return this.foldersService.create(createFolderInput, user.userId);
  }

  @Query(() => [Folder], { name: 'folders' })
  findAll(@User() { userId }: { userId: string }) {
    return this.foldersService.findAll(userId);
  }

  @Query(() => Folder, { name: 'folder' })
  findOne(@Args('id', { type: () => ID }) id: string): Observable<Folder> {
    return this.foldersService.findOne(id);
  }

  @Mutation(() => Folder)
  updateFolder(
    @User() user: { userId: string },
    @Args('updateFolderInput') updateFolderInput: UpdateFolderInput
  ) {
    return this.foldersService.update(
      updateFolderInput.id,
      updateFolderInput,
      user.userId
    );
  }

  @Mutation(() => Folder)
  removeFolder(
    @User() user: { userId: string },
    @Args('id', { type: () => ID }) folderId: string
  ) {
    return this.foldersService.remove(folderId, user.userId);
  }

  @ResolveField('notes')
  notes(
    @Parent() folder: Folder,
    @Loader(EDataLoader.notes) loader: NotesLoader
  ) {
    return loader.load(folder.id);
  }
}
