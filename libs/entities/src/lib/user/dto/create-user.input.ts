import { InputType, Int, Field } from '@nestjs/graphql';
import { BaseInput } from "../../base.input";

@InputType()
export class CreateUserInput extends BaseInput{

}
