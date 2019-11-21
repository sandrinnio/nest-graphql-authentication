import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CreateCommentArgs } from './dto/createcomment.args';
import { CurrentUser } from '../auth/user.decorator';
import { User } from '../auth/user.entity';
import { PostsService } from '../posts/posts.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver('Comments')
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async createComment(
    @Args()
    createCommentArgs: CreateCommentArgs,
    @CurrentUser()
    user: User,
  ): Promise<Comment | null> {
    try {
      const { text, postId } = createCommentArgs.record;

      const post = await this.postsService.getPost(postId);

      return await this.commentsService.createComment(text, post, user);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteComment(
    @Args('id')
    id: string,
    @CurrentUser()
    user: User,
  ): Promise<boolean> {
    try {
      await this.commentsService.deleteComment(id, user);
      return true;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
