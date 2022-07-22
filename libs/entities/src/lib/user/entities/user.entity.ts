import { ObjectType, Field, Int } from '@nestjs/graphql';
import {BaseEntity} from "../../base.entity";
import {Column, Entity} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{
  @Field(() => String, {description: "User email"})
  @Column({ unique: true })
  email: string

  @Field(() => String, {description: "User password"})
  @Column()
  password: string
}
