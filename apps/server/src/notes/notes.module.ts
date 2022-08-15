import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '@notes/entities/notes';
import { UserModule } from '../user/user.module';
import { PubSubModule } from '../pubsub/pub-sub.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), UserModule, PubSubModule],
  providers: [NotesResolver, NotesService],
  exports: [NotesService],
})
export class NotesModule {}
