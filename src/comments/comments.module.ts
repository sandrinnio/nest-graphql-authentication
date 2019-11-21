import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    PostsModule,
  ],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
