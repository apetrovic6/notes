import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Note } from '../../notes';
import { BaseEntity } from '../../base';
import { Folder } from '@notes/entities/folders';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String, { description: 'User email' })
  @Column({ unique: true })
  email: string;

  @Field(() => String, { description: 'User password' })
  @Column()
  password: string;

  @Field(() => [Note], { nullable: true, defaultValue: [] })
  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @Field(() => [Folder], {
    nullable: true,
    description: 'User folder',
    defaultValue: [],
  })
  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[];
}
