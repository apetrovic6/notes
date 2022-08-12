import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CollabInput {
  @Field()
  id: string;

  @Field()
  email: string;
}
