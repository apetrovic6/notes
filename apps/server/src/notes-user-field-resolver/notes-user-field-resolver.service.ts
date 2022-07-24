import { Injectable, NotFoundException } from '@nestjs/common';
import { Note, User } from '@notes-app/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';

@Injectable()
export class NotesUserFieldResolverService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>
  ) {}

  resolveUser(id: string) {
    return from(this.userRepository.findOne({ where: { notes: { id } } })).pipe(
      map(user => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      })
    );
  }

  resolveNotes(userId: string) {
    return from(
      this.noteRepository.find({ where: { user: { id: userId } } })
    ).pipe(
      map(notes => {
        if (!notes) {
          throw new NotFoundException('Notes not found');
        }
        return notes;
      })
    );
  }
}
