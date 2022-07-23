import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@notes-app/entities';
import { NotesUserFieldResolverModule } from '../notes-user-field-resolver/notes-user-field-resolver.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotesUserFieldResolverModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
