import { CreateNoteInput } from './create-note.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CollabInput } from '../../user/dto/collab.input';
import { User } from '../../user/entities/user.entity';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @Field(() => ID, { name: 'id', description: 'Unique identifier' })
  id: string;

  @Field({ nullable: true })
  shared: boolean;

  @Field(() => [CollabInput], {
    nullable: true,
    name: 'collaborators',
    description: 'Array of the collaborators',
  })
  collaborators: User[];
}
