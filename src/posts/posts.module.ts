import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
  ],
  providers: [PostsResolver, PostsService],
  exports: [
    PostsService,
  ],
})
export class PostsModule {}
