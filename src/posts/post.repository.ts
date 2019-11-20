import { Repository, EntityRepository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostArgs } from './dto/createpost.args';
import { User } from '../auth/user.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostArgs: CreatePostArgs, user: User): Promise<Post> {
    const { title, description } = createPostArgs.record;

    const post = new Post();
    post.title = title;
    post.description = description;
    post.author = user;

    return await post.save();
  }
}
