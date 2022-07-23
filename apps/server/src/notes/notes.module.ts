import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "@notes-app/entities";
import { NotesUserFieldResolverModule } from "../notes-user-field-resolver/notes-user-field-resolver.module";


@Module({
  imports: [TypeOrmModule.forFeature([Note]), NotesUserFieldResolverModule],
  providers: [NotesResolver, NotesService],
  exports: [NotesService],
})
export class NotesModule {}
