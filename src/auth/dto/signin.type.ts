import { Field, ObjectType } from 'type-graphql';
import { User } from '../user.entity';

@ObjectType()
export class SignInPayload {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
