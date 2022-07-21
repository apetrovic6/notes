import { BaseEntity } from "../base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Note extends BaseEntity {
  @Field(() => String, { description: 'Title of the note' })
  @Column()
  title: string;

  @Field(() => String, { description: 'Content of the note' })
  @Column()
  content: string;
}
