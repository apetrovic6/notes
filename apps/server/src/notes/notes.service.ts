import { Injectable } from '@nestjs/common';

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateNoteInput, Note, UpdateNoteInput} from "@notes-app/entities";



@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note> ) {
  }
  create(createNoteInput: CreateNoteInput) {
    const note = this.noteRepository.create({...createNoteInput, createdAt: new Date()});
    return this.noteRepository.save(note);
  }

  findAll() {
    return this.noteRepository.find();
  }

  findOne(id: string) {
    return this.noteRepository.findOne({ where: { id }})
  }

  update(id: string, updateNoteInput: UpdateNoteInput) {
    return `This action updates a #${id} note`;
  }

  remove(id: string) {
    return `This action removes a #${id} note`;
  }
}
