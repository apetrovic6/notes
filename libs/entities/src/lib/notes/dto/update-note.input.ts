import { CreateNoteInput } from './create-note.input';
import {InputType, Field, PartialType, ID} from '@nestjs/graphql';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {

}
