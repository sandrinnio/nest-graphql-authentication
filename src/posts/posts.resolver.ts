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
  constructor(
    private readonly postsService: PostsService,
  ) {}

  @Query(() => [Post])
  @UseGuards(GqlAuthGuard)
  async getPosts(): Promise<Post[] | null> {
    try {
      return await this.postsService.getPosts();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Query(() => Post)
  @UseGuards(GqlAuthGuard)
  async getPost(@Args('id') id: string): Promise<Post | null> {
    try {
      return await this.postsService.getPost(id);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Mutation(() => String, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deletePost(@Args('id') id: string, @CurrentUser() user: User): Promise<void> {
    try {
      await this.postsService.deletePost(id, user);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args()
    createPostArgs: CreatePostArgs,
    @CurrentUser()
    user: User,
  ): Promise<Post | null> {
    try {
      const { title, description } = createPostArgs.record;

      return await this.postsService.createPost(title, description, user);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
