import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpArgs } from './dto/signup.args';
import { SignInPayload } from './dto/signin.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './user.decorator';
import { User } from './user.entity';
import { SignInArgs } from './dto/signin.args';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return this.authService.getCurrentUser(user);
  }

  @Query(() => [User], { nullable: true })
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Mutation(() => SignInPayload, { nullable: true })
  signIn(@Args() signInArgs: SignInArgs): Promise<SignInPayload | null> {
    return this.authService.signIn(signInArgs);
  }

  @Mutation(() => SignInPayload, { nullable: true })
  signUp(@Args() signUpArgs: SignUpArgs): Promise<SignInPayload | null> {
    return this.authService.signUp(signUpArgs);
  }
}
