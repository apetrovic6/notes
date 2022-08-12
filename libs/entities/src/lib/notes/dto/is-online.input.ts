import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('isOnline')
export class IsOnlineInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  email: string;
}
