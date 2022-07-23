import { Module } from '@nestjs/common';
import { NotesUserFieldResolverService } from './notes-user-field-resolver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note, User } from '@notes-app/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Note])],
  providers: [NotesUserFieldResolverService],
  exports: [NotesUserFieldResolverService],
})
export class NotesUserFieldResolverModule {}
