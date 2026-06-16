import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async create(email: string, password: string, name = ''): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hash, name });
    return this.repo.save(user);
  }
}
