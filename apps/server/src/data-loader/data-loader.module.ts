import { Module } from '@nestjs/common';
import { DataLoaderService } from './data-loader.service';
import { NotesModule } from '../notes/notes.module';
import { UserModule } from '../user/user.module';
import { FoldersModule } from '../folders/folders.module';

@Module({
  imports: [NotesModule, UserModule, FoldersModule],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
