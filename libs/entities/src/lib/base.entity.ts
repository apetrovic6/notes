import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseEntity {
  @Field(returns => ID, { name: 'id', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date, { description: 'Date of creation' })
  @Column()
  createdAt: Date;

  // @Field(() => Date, { description: 'Last updated' })
  // @Column()
  // updatedAt: Date;
}
