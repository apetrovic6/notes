import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateNoteInput, Note, UpdateNoteInput } from '@notes/entities/notes';
import { catchError, from, map, switchMap, throwError } from 'rxjs';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>
  ) {}
  create(createNoteInput: CreateNoteInput) {
    const note = this.noteRepository.create({
      ...createNoteInput,
      createdAt: new Date(),
    });

    return from(this.noteRepository.save(note)).pipe(
      map((note: Note) => note),
      catchError(err => throwError(err))
    );
  }

  findAll() {
    return from(this.noteRepository.find());
  }

  findOne(id: string) {
    return from(this.noteRepository.findOne({ where: { id } })).pipe(
      map(note => {
        if (!note) {
          throw new NotFoundException('Note not found');
        }
        return note;
      })
    );
  }

  update(id: string, updateNoteInput: UpdateNoteInput) {
    return from(this.noteRepository.update(id, updateNoteInput)).pipe(
      switchMap(() => {
        return this.findOne(id);
      })
    );
  }

  remove(id: string) {
    return from(this.noteRepository.delete(id)).pipe(map(() => null));
  }

  // TODO - add tests
  async loadNotes(ids: string[]) {
    const notes = await this.noteRepository.findBy({
      user: {
        id: In(ids),
      },
    });

    const notesMap: { [key: string]: Note[] } = {};

    notes.forEach(note => {
      notesMap[note.userId] = [...(notesMap[note.userId] || []), note];
    });

    return ids.map(id => notesMap[id]);
  }
}
