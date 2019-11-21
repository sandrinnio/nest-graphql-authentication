import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpArgs } from './dto/signup.args';
import { SignInPayload } from './dto/signin.type';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './user.decorator';
import { User } from './user.entity';
import { SignInArgs } from './dto/signin.args';
import { UserRepository } from './user.repository';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User): Promise<User | null> {
    try {
      return await this.userRepository.findOne(user, {relations: ['posts', 'comments']});
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async getUsers(): Promise<User[] | null> {
    try {
      return await this.userRepository.find({relations: ['posts', 'comments']});
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Mutation(() => SignInPayload)
  async signIn(@Args() signInArgs: SignInArgs): Promise<SignInPayload | null> {
    try {
      const { email, password } = signInArgs.record;
      const user = await this.userRepository.findOne({email});

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.authService.signIn(password, user);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  @Mutation(() => SignInPayload)
  async signUp(@Args() signUpArgs: SignUpArgs): Promise<SignInPayload | null> {
    try {
      const { name, email, age, password } = signUpArgs.record;

      return await this.authService.signUp(name, email, age, password);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
