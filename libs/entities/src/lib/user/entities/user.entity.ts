import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Note } from '../../notes';
import { BaseEntity } from '../../base';
import { Folder } from '../../folders';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String, { description: 'User email' })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Note], { nullable: true, defaultValue: [] })
  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @Column({ nullable: true })
  public currentRefreshTokenHash?: string;

  @Field(() => [Folder], {
    nullable: true,
    description: 'User folder',
    defaultValue: [],
  })
  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[];
}
