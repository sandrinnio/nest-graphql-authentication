import { Field, InputType, ArgsType } from 'type-graphql';

@InputType()
class SignInRecord {
  @Field()
  email: string;

  @Field()
  password: string;
}

// tslint:disable-next-line: max-classes-per-file
@ArgsType()
export class SignInArgs {
  @Field()
  record: SignInRecord;
}
