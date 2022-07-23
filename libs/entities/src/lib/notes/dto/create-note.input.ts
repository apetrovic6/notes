import { InputType, Field } from '@nestjs/graphql';
import { BaseInput } from "../../base.input";
import { User } from "../../user";


@InputType()
export class CreateNoteInput extends BaseInput {
  @Field(() => String, { description: 'Title of the note' })
  title: string;

  @Field(() => String, { description: 'Content of the note' })
  content: string;

  @Field(type => BaseInput, { description: 'User who created the note' })
  user: User;
}
