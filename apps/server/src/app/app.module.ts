import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { NotesModule } from '../notes/notes.module';
import { UserModule } from '../user/user.module';
import { DbModule } from '../db/db.module';
import { GraphQlModule } from '../graph-ql/graph-ql.module';

@Module({
  imports: [DbModule, GraphQlModule, NotesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
