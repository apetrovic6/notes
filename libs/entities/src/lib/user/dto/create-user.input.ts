import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { BaseInput } from '../../base.input';

@InputType('UserInput')
export class CreateUserInput extends OmitType(BaseInput, ['id'] as const) {
  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
