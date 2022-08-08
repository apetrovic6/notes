import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../base';
import { User } from '../../user';
import { Folder } from '../../folders';

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

  @Column()
  folderId: string;

  @Field(() => User, { description: 'User who created the note' })
  @ManyToOne(() => User, user => user.notes)
  user: User;

  @Field(() => Folder, { description: 'Folder of the note' })
  @ManyToOne(() => Folder, folder => folder.notes, { onDelete: 'CASCADE' })
  folder: Folder;

  @ManyToMany(() => User, { cascade: true, eager: true, persistence: true })
  @JoinTable()
  @Field(() => [User], { description: 'Collaborators' })
  collaborators: User[];
}
