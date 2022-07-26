import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, User } from '@notes/entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { catchError, EMPTY, from, map, of, switchMap } from 'rxjs';

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

    return from(of(this.userRepository.create(user))).pipe(
      switchMap(userEntity => this.userRepository.save(userEntity)),
      catchError(err => {
        if (err.code === '23505') {
          throw new BadRequestException('Email already exists');
        }
        return EMPTY;
      })
    );
  }

  findAll() {
    return from(this.userRepository.find());
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

  findByEmail(email: string) {
    return from(this.userRepository.findOne({ where: { email } })).pipe(
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
    return from(this.userRepository.delete(id));
  }

  async loadUsers(ids: string[]) {
    const users = await this.userRepository.findBy({
      id: In(ids),
    });

    const userMap: { [key: string]: User } = {};

    users.forEach(user => {
      userMap[user.id] = user;
    });

    return ids.map(id => userMap[id]);
  }
}
