import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class BaseInput {
  @Field(returns => ID, { name: 'id', description: 'Unique identifier' })
  id: string;
}
