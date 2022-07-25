import { Module } from '@nestjs/common';
import { NotesModule } from '../notes/notes.module';
import { UserModule } from '../user/user.module';
import { DbModule } from '../db/db.module';
import { GraphQlModule } from '../graph-ql/graph-ql.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, GraphQlModule, AuthModule, NotesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
