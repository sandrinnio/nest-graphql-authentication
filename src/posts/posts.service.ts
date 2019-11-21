import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
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

  async deletePost(id: string, user: User): Promise<void> {
    const post = await this.postRepository.findOne({ id, author: user });

    if (!post) {
      throw new InternalServerErrorException('This post does not belongs to you');
    }

    await this.postRepository.delete(post.id);
  }

  async createPost(title: string, description: string, user: User): Promise<Post | null> {

    const post = new Post();
    post.title = title;
    post.description = description;
    post.author = user;

    return await this.postRepository.save(post);
  }
}
