import { InputType, Field, Int, ArgsType } from 'type-graphql';

@InputType()
class SignUpRecord {
  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field(() => Int)
  age: number;

  @Field()
  password: string;
}

// tslint:disable-next-line: max-classes-per-file
@ArgsType()
export class SignUpArgs {
  @Field()
  record: SignUpRecord;
}
