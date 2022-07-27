import { Module } from '@nestjs/common';
import { DataLoaderService } from './data-loader.service';
import { NotesModule } from '../notes/notes.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [NotesModule, UserModule],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
