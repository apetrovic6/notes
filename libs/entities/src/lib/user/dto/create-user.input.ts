import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from "../../base.input";

@InputType()
export class CreateUserInput extends BaseInput{
  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
