import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFolderInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
