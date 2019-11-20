import { InputType, Field, ArgsType } from 'type-graphql';

@InputType()
class CreatePostRecord {
  @Field()
  title: string;

  @Field()
  description: string;
}

@ArgsType()
export class CreatePostArgs {
  @Field()
  record: CreatePostRecord;
}
