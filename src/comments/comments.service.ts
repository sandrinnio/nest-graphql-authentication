import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async getComment(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id, {relations: ['owner', 'post']});

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async deleteComment(id: string, user: User): Promise<void> {
    await this.getComment(id);

    const comment = await this.commentRepository.findOne({ id, owner: user });

    if (!comment) {
      throw new InternalServerErrorException('Comment does not belongs to you');
    }

    await this.commentRepository.delete(comment.id);
  }
}
