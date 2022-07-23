import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '@notes-app/entities';

describe('NotesService', () => {
  let service: NotesService;

  const noteRepository = {
    create: fn().mockImplementation(() => noteStub()),
    save: fn().mockImplementation(() => noteStub()),
    find: fn().mockImplementation(() => [noteStub()]),
    findOne: fn().mockImplementation(() => noteStub()),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: noteRepository },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
