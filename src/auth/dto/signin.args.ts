import { Field, InputType, ArgsType } from 'type-graphql';

@InputType()
class SignInRecord {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ArgsType()
export class SignInArgs {
  @Field()
  record: SignInRecord;
}
