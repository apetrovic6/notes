import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '@notes-app/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NotesResolver, NotesService],
  exports: [NotesService],
})
export class NotesModule {}
