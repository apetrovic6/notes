import { Injectable } from '@nestjs/common';
import { Note, User } from '@notes-app/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotesUserFieldResolverService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>
  ) {}

  resolveUser(id: string) {
    return this.userRepository.findOne({ where: { notes: { id } } });
  }

  resolveNotes(userId: string) {
    return this.noteRepository.find({ where: { user: { id: userId } } });
  }
}
