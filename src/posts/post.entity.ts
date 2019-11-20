import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { User } from '../auth/user.entity';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
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

  @ManyToOne(type => User)
  @JoinColumn({ referencedColumnName: 'id'})
  @Field(() => User)
  author: User;
}
