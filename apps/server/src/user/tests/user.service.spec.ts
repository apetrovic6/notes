import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@notes/entities/user';
import { userStub } from './stubs/user.stub';
import { of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockRepo = {
    create: createUserInput => userStub,
    save: () => of(userStub),
    find: () => of([userStub]),
    findOne: () => of(userStub),
    update: () => of({ ...userStub, email: 'newemail@email.com' }),
    delete: () => of(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When create is called', () => {
    it('Should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('It should create a user', async () => {
      let user;

      service
        .create({
          email: 'test@email.com',
          password: '123456',
        })
        .subscribe(res => (user = res));

      await expect(user).toBeDefined();

      expect(user).toEqual(userStub);
    });
  });

  describe('When findAll is called', () => {
    it('Should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('It should find all users', () => {
      let users;

      service.findAll().subscribe(res => (users = res));

      expect(users).toBeDefined();

      expect(users).toEqual([userStub]);
    });
  });

  describe('When findOne is called', () => {
    it('Should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('It should find one user', () => {
      let user;

      service.findOne(userStub.id).subscribe(res => (user = res));

      expect(user).toBeDefined();

      expect(user).toEqual(userStub);
    });

    it('It should throw an error if user is not found', () => {
      jest.spyOn(mockRepo, 'findOne').mockImplementationOnce(() => {
        throw new NotFoundException('User not found');
      });

      expect(() => service.findOne('123')).toThrowError('User not found');
    });
  });

  describe('When update is called', () => {
    it('It should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('It should update a user', () => {
      let user;

      service
        .update(userStub.id, {
          id: userStub.id,
          email: 'newemail@email.com',
        })
        .subscribe(res => (user = res));

      expect(user).toBeDefined();
      expect(user).toEqual({ email: 'newemail@email.com', ...userStub });
    });
  });

  describe('When remove is called', () => {
    it('It should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('It should remove a user', () => {
      let user;

      service.remove(userStub.id).subscribe(res => (user = res));

      expect(user).toBeNull();
    });
  });
});
