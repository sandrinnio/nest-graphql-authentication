import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CreatePostArgs } from './dto/createpost.args';
import { Post } from './post.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async getPosts(): Promise<Post[] | null> {
    return await this.postRepository.find({relations: ['author', 'comments']});
  }

  async getPost(id: string): Promise<Post | null> {
    return await this.postRepository.findOne(id, {relations: ['author', 'comments']});
  }

  createPost(createPostArgs: CreatePostArgs, user: User): Promise<Post> {
    return this.postRepository.createPost(createPostArgs, user);
  }

  async deletePost(id: string, user: User): Promise<string> {
    const post = await this.postRepository.findOne({ id, author: user });
    if (!post) { throw new InternalServerErrorException('This post does not belongs to you'); }
    await this.postRepository.delete(post.id);
    return 'Post successfuly removed';
  }
}
