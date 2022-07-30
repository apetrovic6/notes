import { CreateFolderInput } from './create-folder.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFolderInput extends PartialType(CreateFolderInput) {
  @Field(() => ID)
  id: string;
}
