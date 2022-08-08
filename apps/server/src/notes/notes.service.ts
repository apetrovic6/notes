import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateNoteInput, Note, UpdateNoteInput } from '@notes/entities/notes';
import {
  catchError,
  from,
  lastValueFrom,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    private readonly userService: UserService
  ) {}
  create(createNoteInput: CreateNoteInput, userId: string) {
    const note = this.noteRepository.create({
      ...createNoteInput,
      user: {
        id: userId,
      },
      createdAt: new Date(),
    });

    return from(this.noteRepository.save(note)).pipe(
      map((note: Note) => note),
      catchError(err => throwError(err))
    );
  }

  findAll(userId: string) {
    return from(
      this.noteRepository.find({
        where: {
          user: { id: userId },
        },
      })
    );
  }

  findOne(id: string, userId: string) {
    return from(
      this.noteRepository.findOne({
        where: {
          id,
          user: {
            id: userId,
          },
        },
      })
    ).pipe(
      map(note => {
        if (!note) {
          // throw new NotFoundException('Note not found');
          return this.noteRepository.findOne({
            where: {
              id,
              collaborators: {
                id: userId,
              },
            },
          });
        }
        return note;
      })
    );
  }

  update(id: string, updateNoteInput: UpdateNoteInput, userId: string) {
    return from(this.noteRepository.update(id, updateNoteInput)).pipe(
      switchMap(() => {
        return this.findOne(id, userId);
      })
    );
  }

  remove(id: string, userId: string) {
    return from(
      this.noteRepository.findOne({
        where: {
          id,
          user: { id: userId },
        },
      })
    ).pipe(switchMap(note => this.noteRepository.remove(note)));
  }

  async addCollaborator(
    noteId: string,
    userId: string,
    collaboratorEmail: string
  ) {
    const note = await this.noteRepository.findOne({
      where: {
        id: noteId,
        user: { id: userId },
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const user = await lastValueFrom(
      this.userService.findByEmail(collaboratorEmail)
    );

    note.collaborators = [...note.collaborators, user];
    return this.noteRepository.save(note);
  }

  // TODO - add tests
  async loadNotes(ids: string[]) {
    const notes = await this.noteRepository.findBy({
      folder: {
        id: In(ids),
      },
    });

    const notesMap: { [key: string]: Note[] } = {};

    notes.forEach(note => {
      notesMap[note.folderId] = [...(notesMap[note.folderId] || []), note];
    });

    return ids.map(id => notesMap[id]);
  }

  getNotesForCollaborator(userId: string) {
    return this.noteRepository.find({
      relations: ['folder'],
      where: {
        collaborators: {
          id: userId,
        },
      },
    });
  }
}
