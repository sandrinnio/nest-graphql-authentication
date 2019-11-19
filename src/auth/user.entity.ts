import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';

@Entity()
@Unique(['email'])
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @MinLength(6)
  password: string;
}
