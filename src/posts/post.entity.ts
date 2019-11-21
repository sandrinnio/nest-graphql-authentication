import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from '../auth/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @IsNotEmpty()
  @Field()
  title: string;

  @Column()
  @IsNotEmpty()
  @Field()
  description: string;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id'})
  @Field(() => User)
  author: User;

  @OneToMany(type => Comment, comment => comment.post)
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
