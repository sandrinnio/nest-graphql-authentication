import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { SignInPayload } from './dto/signin.type';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(password: string, user: User): Promise<SignInPayload | null> {

    const match = await bcrypt.compare(password, user.password);

    if (!match) { throw new UnauthorizedException('Invalid Credentials'); }

    const payload = { id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, user };
  }

  async signUp(name: string, email: string, age: number, password: string): Promise<SignInPayload | null> {

    const salt = await bcrypt.genSalt(10);

    const user = new User();
    user.name = name;
    user.email = email;
    user.age = age;
    user.password = await bcrypt.hash(password, salt);

    await this.userRepository.save(user);

    const payload = { id: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, user };
  }

  async deleteUser(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
  }
}
