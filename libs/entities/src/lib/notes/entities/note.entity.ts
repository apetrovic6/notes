import { BaseEntity } from "../../base.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {User} from "../../user";

@ObjectType()
@Entity()
export class Note extends BaseEntity {
  @Field(() => String, { description: 'Title of the note' })
  @Column()
  title: string;

  @Field(() => String, { description: 'Content of the note' })
  @Column()
  content: string;

  @Field(() => User, { description: 'User who created the note' })
  @ManyToOne(() => User, user => user.notes)
  user: User;
}
