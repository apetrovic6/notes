import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '../../base';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Note } from '../../notes';
import { User } from '@notes/entities/user';

@ObjectType()
@Entity()
export class Folder extends BaseEntity {
  @Field(() => String, { description: 'Folder name' })
  @Column()
  title: string;

  @Field(() => [Note], { description: 'Notes in the folder' })
  @OneToMany(() => Note, note => note.folder)
  notes: Note[];

  @Field(() => User, { description: 'User who owns the folder' })
  @ManyToOne(() => User, user => user.folders)
  user: User;
}
