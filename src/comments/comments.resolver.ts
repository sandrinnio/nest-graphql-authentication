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

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      return await this.commentsService.createComment(text, post, user);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
