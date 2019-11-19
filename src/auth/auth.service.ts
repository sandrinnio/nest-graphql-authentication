import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { SignUpArgs } from './dto/signup.args';
import { SignInPayload } from './dto/signin.type';
import { SignInArgs } from './dto/signin.args';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInArgs: SignInArgs): Promise<SignInPayload> {
    const { email, password } = signInArgs.record;

    const user = await this.userRepository.signIn(email, password);
    if (!user) { throw new UnauthorizedException('Invalid Credentials'); }

    const payload = { id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, user };
  }

  async signUp(signUpArgs: SignUpArgs): Promise<SignInPayload> {
    const user = await this.userRepository.signUp(signUpArgs);

    const payload = { id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, user };
  }
}
