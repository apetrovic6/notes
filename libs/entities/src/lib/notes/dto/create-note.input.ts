import { InputType, Field, OmitType } from '@nestjs/graphql';
import { BaseInput } from '../../base';
import { Folder } from '../../folders';

@InputType('NoteInput')
export class CreateNoteInput extends OmitType(BaseInput, ['id'] as const) {
  @Field(() => String, { description: 'Title of the note' })
  title: string;

  @Field(() => String, { description: 'Content of the note', nullable: true })
  content?: string;

  @Field(type => BaseInput, { description: 'Folder of the note' })
  folder: Folder;

  @Field(() => Boolean, {
    description: 'Shared note',
    nullable: true,
    defaultValue: false,
  })
  shared: boolean;
}
