import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../base';
import { User } from '@notes/entities/user';
import { Folder } from '@notes/entities/folders';

@ObjectType()
@Entity()
export class Note extends BaseEntity {
  @Field(() => String, { description: 'Title of the note' })
  @Column()
  title: string;

  @Field(() => String, { description: 'Content of the note' })
  @Column()
  content: string;

  @Column()
  userId: string;

  @Field(() => User, { description: 'User who created the note' })
  @ManyToOne(() => User, user => user.notes)
  user: User;

  @Field(() => Folder, { description: 'Folder of the note' })
  @ManyToOne(() => Folder, folder => folder.notes)
  folder: Folder;
}
