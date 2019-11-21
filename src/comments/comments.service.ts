import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { User } from '../auth/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  async createComment(text: string, post: Post, user: User): Promise<Comment | null> {

    const comment = new Comment();
    comment.text = text;
    comment. owner = user;
    comment.post = post;

    return await this.commentRepository.save(comment);
  }
}
