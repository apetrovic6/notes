import { InputType, Field } from '@nestjs/graphql';
import { BaseInput } from "../../base.input";


@InputType()
export class CreateNoteInput extends BaseInput {
  @Field(() => String, { description: 'Title of the note' })
  title: string;

  @Field(() => String, { description: 'Content of the note' })
  content: string;
}
