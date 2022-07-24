import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, User } from '@notes-app/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, map, switchMap } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create({
      ...createUserInput,
      createdAt: new Date(),
    });
    return from(this.userRepository.save(user));
  }

  findAll() {
    return from(this.userRepository.find({ relations: ['notes'] }));
  }

  findOne(id: string) {
    return from(this.userRepository.findOne({ where: { id } })).pipe(
      map(user => {
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      })
    );
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return from(this.userRepository.update(id, updateUserInput)).pipe(
      switchMap(() => this.findOne(id))
    );
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
