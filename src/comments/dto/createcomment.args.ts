import { InputType, Field, ArgsType, ID } from 'type-graphql';
import { Post } from '../../posts/post.entity';

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
