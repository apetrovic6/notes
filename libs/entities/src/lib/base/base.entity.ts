import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseEntity {
  @Field(returns => ID, { name: 'id', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date, { description: 'Date of creation' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field(() => Date, { description: 'Last updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
