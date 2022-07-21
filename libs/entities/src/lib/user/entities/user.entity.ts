import { ObjectType, Field, Int } from '@nestjs/graphql';
import {BaseEntity} from "../../base.entity";
import {Entity} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{

}
