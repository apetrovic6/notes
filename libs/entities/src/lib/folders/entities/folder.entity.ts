import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../base';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Note } from '../../notes';
import { User } from '../../user';

@ObjectType()
@Entity()
export class Folder extends BaseEntity {
  @Field(() => String, { description: 'Folder name' })
  @Column()
  title: string;

  @Field(() => [Note], { description: 'Notes in the folder', nullable: true })
  @OneToMany(() => Note, note => note.folder, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  notes?: Note[];

  @Field(() => User, { description: 'User who owns the folder' })
  @ManyToOne(() => User, user => user.folders)
  user: User;
}
