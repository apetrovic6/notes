import { InputType, Field, OmitType } from '@nestjs/graphql';
import { BaseInput } from '../../base.input';
import { User } from '../../user';

@InputType('NoteInput')
export class CreateNoteInput extends OmitType(BaseInput, ['id'] as const) {
  @Field(() => String, { description: 'Title of the note' })
  title: string;

  @Field(() => String, { description: 'Content of the note' })
  content: string;

  @Field(type => BaseInput, { description: 'User who created the note' })
  user: User;
}
