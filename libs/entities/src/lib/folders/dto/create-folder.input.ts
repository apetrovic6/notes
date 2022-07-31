import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from '../../base';
import { Note } from '../../notes';

@InputType()
export class CreateFolderInput {
  @Field(() => String, { description: 'Folder name' })
  title: string;

  @Field(() => [BaseInput], {
    description: 'Notes in the folder',
    nullable: true,
  })
  notes?: Note[];
}
