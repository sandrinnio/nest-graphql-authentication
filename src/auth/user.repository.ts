import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { SignUpArgs } from './dto/signup.args';
import * as bcrypt from 'bcrypt';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.findOne({ email });

    if (!user) { throw new NotFoundException('User not found'); }

    const match = await bcrypt.compare(pass, user.password);

    if (!match) { throw new InternalServerErrorException('Email or password is incorrect'); }

    const { password, ...result } = user;
    return result;
  }

  async signUp(signUpArgs: SignUpArgs): Promise<any> {
    const { name, email, age, password } = signUpArgs.record;

    const salt = await bcrypt.genSalt(10);

    const user = new User();
    user.name = name;
    user.email = email;
    user.age = age;
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return user;
  }
}
