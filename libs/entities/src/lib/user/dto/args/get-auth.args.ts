import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetAuthArgs {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}
