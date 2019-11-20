import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostArgs } from './dto/createpost.args';
import { Post } from './post.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/user.decorator';
import { User } from '../auth/user.entity';

@Resolver('Posts')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post], { nullable: true })
  getPosts(): Promise<Post[]> {
    return this.postsService.getPosts();
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  deletePost(@Args('id') id: string, @CurrentUser() user: User): Promise<string> {
    return this.postsService.deletePost(id, user);
  }

  @Mutation(() => Post, { nullable: true })
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args()
    createPostArgs: CreatePostArgs,
    @CurrentUser()
    user: User,
  ): Promise<Post> {
    return this.postsService.createPost(createPostArgs, user);
  }
}
