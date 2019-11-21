import { InputType, Field, ArgsType, ID } from 'type-graphql';

@InputType()
class CreateCommentRecord {
  @Field()
  text: string;

  @Field(() => ID)
  postId: string;
}

@ArgsType()
export class CreateCommentArgs {
  @Field()
  record: CreateCommentRecord;
}
