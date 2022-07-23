import { Injectable } from '@nestjs/common';
import {CreateUserInput, UpdateUserInput, User} from "@notes-app/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}


  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create({...createUserInput, createdAt: new Date()});
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({relations: ["notes"]});
  }

  findOne(id: string) {
    return this.userRepository.findOne({where: { id }});
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, updateUserInput);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
