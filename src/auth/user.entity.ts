import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';
import { Post } from '../posts/post.entity';

@Entity()
@Unique(['email'])
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsEmail()
  @Field()
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @OneToMany(type => Post, post => post.author)
  @Field(() => [Post], { nullable: true })
  posts: Post[];
}
