import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from '../../base';
import { User } from '@notes/entities/user';
import { Note } from '@notes/entities/notes';

@InputType()
export class CreateFolderInput {
  @Field(() => String, { description: 'Folder name' })
  title: string;

  @Field(() => BaseInput, { description: 'User who created the folder' })
  user: User;

  @Field(() => [BaseInput], { description: 'Notes in the folder' })
  notes: Note[];
}
