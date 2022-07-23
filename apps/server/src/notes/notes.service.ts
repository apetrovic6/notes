import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteInput, Note, UpdateNoteInput } from '@notes-app/entities';

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
    return this.noteRepository.save(note);
  }

  findAll() {
    return this.noteRepository.find();
  }

  findOne(id: string) {
    return this.noteRepository.findOne({ where: { id } });
  }

  async update(id: string, updateNoteInput: UpdateNoteInput) {
    const note = await this.noteRepository.findOne({ where: { id } });

    const updatedNote = {
      ...note,
      ...updateNoteInput,
    };

    return this.noteRepository.save(updatedNote);
  }

  remove(id: string) {
    this.noteRepository.delete(id);
  }
}
