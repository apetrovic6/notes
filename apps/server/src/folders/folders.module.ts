import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersResolver } from './folders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from '@notes/entities/folders';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  providers: [FoldersResolver, FoldersService],
})
export class FoldersModule {}
