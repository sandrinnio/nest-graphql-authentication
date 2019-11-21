import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostArgs } from './dto/createpost.args';
import { Post } from './post.entity';
import { UseGuards, InternalServerErrorException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/user.decorator';
import { User } from '../auth/user.entity';
import { PostRepository } from './post.repository';

@Resolver('Posts')
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly postRepository: PostRepository,
  ) {}

  @Query(() => [Post])
  async getPosts(): Promise<Post[] | null> {
    try {
      return await this.postsService.getPosts();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Query(() => Post)
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
  async deletePost(@Args('id') id: string, @CurrentUser() user: User): Promise<void | null> {
    try {
      const post = await this.postRepository.findOne({ id, author: user });

      if (!post) {
        throw new InternalServerErrorException('This post does not belongs to you');
      }

      await this.postRepository.delete(post.id);
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
