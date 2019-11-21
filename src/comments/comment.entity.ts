import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { Post } from '../posts/post.entity';
import { User } from '../auth/user.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @IsNotEmpty()
  @Field()
  text: string;

  @ManyToOne(type => Post, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  @Field(() => Post)
  post: Post;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id' })
  @Field(() => User)
  owner: User;
}
